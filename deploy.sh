#!/bin/bash

# Simple Blue-Green Deployment Script
# This script builds in one folder while the app runs from another folder
# Then switches PM2 to the new build (zero downtime)

set -e  # Exit if any command fails

# ============================================
# CONFIGURATION - Update these if needed
# ============================================
# Your directory structure (ONE codebase, TWO build outputs):
# /var/www/html/aasif-portfolio/aasif-portfolio/
#   ├── src/                      (your source code - ONE copy)
#   ├── package.json
#   ├── node_modules/            (ONE copy - saves space!)
#   ├── blue-build/              (blue build output - just .next folder)
#   ├── green-build/             (green build output - just .next folder)
#   ├── .next -> blue-build/.next (symlink to active build)
#   └── .active-folder           (tracks which build is active)

# Base directory (where your code is)
BASE_DIR="/var/www/html/aasif-portfolio/aasif-portfolio"

# Blue-Green build output folders (only .next builds, not full clones)
BLUE_BUILD_DIR="${BASE_DIR}/blue-build"                      # Blue build output folder
GREEN_BUILD_DIR="${BASE_DIR}/green-build"                    # Green build output folder
NEXT_SYMLINK="${BASE_DIR}/.next"                             # Symlink to active build
ACTIVE_FOLDER_FILE="${BASE_DIR}/.active-folder"               # File to track which build is active

# PM2 configuration
PM2_APP_NAME="aasif-portfolio-frontend"                      # PM2 app name (must match ecosystem.config.js)
# Note: Port is configured in ecosystem.config.js (currently PORT: 2030)
# PM2 will automatically use the port from ecosystem.config.js when starting

# Folder names for tracking (used in .active-folder file)
BUILD_NAME_BLUE="blue-build"                                 # Name for blue build
BUILD_NAME_GREEN="green-build"                               # Name for green build

# ============================================
# HELPER FUNCTIONS
# ============================================

# Get which build is currently active (returns "blue-build" or "green-build")
get_active_build_name() {
    if [ -f "$ACTIVE_FOLDER_FILE" ]; then
        cat "$ACTIVE_FOLDER_FILE"
    else
        # First time - default to "blue-build"
        echo "$BUILD_NAME_BLUE"
    fi
}

# Get the full directory path based on build name
get_build_path() {
    local build_name=$1
    if [ "$build_name" == "$BUILD_NAME_BLUE" ]; then
        echo "$BLUE_BUILD_DIR"
    elif [ "$build_name" == "$BUILD_NAME_GREEN" ]; then
        echo "$GREEN_BUILD_DIR"
    else
        echo ""  # Invalid build name
    fi
}

# ============================================
# MAIN DEPLOYMENT
# ============================================

echo "🚀 Starting deployment..."

# Step 1: Navigate to base directory (where your code is)
cd "$BASE_DIR"

# Step 1b: Initialize folders if first time (automatic setup)
echo "🔧 Initializing blue-green folders..."
mkdir -p "$BLUE_BUILD_DIR" "$GREEN_BUILD_DIR" "$BASE_DIR/logs"

# Step 2: Pull latest code (ONE codebase)
echo "📥 Pulling latest code..."
if [ -d ".git" ]; then
    # Clean any local changes first (to avoid conflicts)
    echo "🧹 Cleaning local changes..."
    git reset --hard HEAD >/dev/null 2>&1 || true
    git clean -fd >/dev/null 2>&1 || true
    
    # Pull latest code (same as you were using before)
    echo "📥 Pulling from origin/main..."
    git pull origin main
    
    echo "✅ Code updated to latest version"
else
    echo "❌ Error: No git repository found in $BASE_DIR"
    echo "   Make sure you're in the directory with your code"
    exit 1
fi

# Step 3: Find out which build is currently active
ACTIVE_BUILD_NAME=$(get_active_build_name)
ACTIVE_BUILD_PATH=$(get_build_path "$ACTIVE_BUILD_NAME")
echo "📁 Currently active build: $ACTIVE_BUILD_NAME"

# Step 4: Determine which build folder to use (the inactive one)
if [ "$ACTIVE_BUILD_NAME" == "$BUILD_NAME_BLUE" ]; then
    NEW_BUILD_DIR="$GREEN_BUILD_DIR"
    NEW_BUILD_NAME="$BUILD_NAME_GREEN"
    echo "🔨 Will build in: $BUILD_NAME_GREEN (new build)"
else
    NEW_BUILD_DIR="$BLUE_BUILD_DIR"
    NEW_BUILD_NAME="$BUILD_NAME_BLUE"
    echo "🔨 Will build in: $BUILD_NAME_BLUE (new build)"
fi

# Step 5: Build folder already created in Step 1b, no need to create again

# Step 6: Install/update dependencies (in main directory - ONE copy)
echo "📦 Installing dependencies..."
sudo npm install --force

# Step 7: Remove .next symlink or directory before building (Next.js can't build into a symlink)
echo "🔗 Removing .next symlink/directory before building..."
# Check if .next exists and what it is
if [ -L "$NEXT_SYMLINK" ]; then
    echo "   Found symlink, removing..."
    sudo rm -f "$NEXT_SYMLINK"
elif [ -d "$NEXT_SYMLINK" ]; then
    echo "   Found directory, removing..."
    sudo rm -rf "$NEXT_SYMLINK"
elif [ -e "$NEXT_SYMLINK" ]; then
    echo "   Found file, removing..."
    sudo rm -f "$NEXT_SYMLINK"
fi
# Double check it's gone
if [ -e "$NEXT_SYMLINK" ]; then
    echo "⚠️  Warning: .next still exists, trying force remove..."
    sudo rm -rf "$NEXT_SYMLINK"
fi
echo "✅ .next removed (ready for fresh build)"

# Step 8: Verify .next is removed before building
if [ -e "$NEXT_SYMLINK" ]; then
    echo "❌ Error: .next still exists! Cannot build. Please remove it manually:"
    echo "   sudo rm -rf $NEXT_SYMLINK"
    exit 1
fi

# Step 9: Build the application to the new build folder
echo "🏗️  Building application to $NEW_BUILD_DIR..."
# Next.js builds to .next by default, so we'll build and then move it
sudo npm run build

# Step 10: Move .next to the build folder
if [ -d ".next" ]; then
    echo "📦 Moving build output to $NEW_BUILD_DIR..."
    # Remove old build in target folder if exists (use sudo for permission)
    sudo rm -rf "$NEW_BUILD_DIR/.next"
    # Move new build
    sudo mv .next "$NEW_BUILD_DIR/.next"
else
    echo "❌ Build failed! .next folder not found."
    exit 1
fi

echo "✅ Build completed successfully in $NEW_BUILD_DIR!"

# Step 11: Verify ecosystem.config.js exists
if [ ! -f "$BASE_DIR/ecosystem.config.js" ]; then
    echo "❌ Error: ecosystem.config.js not found in $BASE_DIR"
    exit 1
fi

# Step 12: Logs directory already created in Step 1b

# Step 13: Stop current PM2 app
echo "🛑 Stopping current PM2 app..."
pm2 stop "$PM2_APP_NAME" 2>/dev/null || true
pm2 delete "$PM2_APP_NAME" 2>/dev/null || true

# Step 14: Update symlink to point to new build
echo "🔗 Updating symlink to new build..."
# Remove old symlink if exists (use sudo if needed)
sudo rm -f "$NEXT_SYMLINK" 2>/dev/null || rm -f "$NEXT_SYMLINK"
# Create symlink to new build
ln -s "$NEW_BUILD_DIR/.next" "$NEXT_SYMLINK"
echo "✅ Symlink created: .next -> $NEW_BUILD_DIR/.next"

# Step 15: Start PM2 from base directory (it will use the .next symlink)
# PM2 reads port and all config from ecosystem.config.js
echo "▶️  Starting PM2 from base directory..."
echo "   (Port and config are read from ecosystem.config.js)"
cd "$BASE_DIR"
pm2 start ecosystem.config.js

# Step 16: Save PM2 configuration
pm2 save

# Step 17: Update which build is now active
echo "$NEW_BUILD_NAME" > "$ACTIVE_FOLDER_FILE"

echo "✅ Deployment completed!"
echo "📁 Active build: $NEW_BUILD_NAME ($NEW_BUILD_DIR)"
echo "🔗 Symlink: .next -> $NEW_BUILD_DIR/.next"
echo "🔍 Check status: pm2 status"
echo "📝 View logs: pm2 logs $PM2_APP_NAME"
