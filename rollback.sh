#!/bin/bash

# Rollback Script for Blue-Green Deployment
# This script switches back to the previous build (blue or green)

set -e  # Exit if any command fails

# ============================================
# CONFIGURATION - Same as deploy.sh
# ============================================
BASE_DIR="/var/www/html/sameer-portfolio/sameer-portfolio"

# Blue-Green build output folders
BLUE_BUILD_DIR="${BASE_DIR}/blue-build"
GREEN_BUILD_DIR="${BASE_DIR}/green-build"
NEXT_SYMLINK="${BASE_DIR}/.next"
ACTIVE_FOLDER_FILE="${BASE_DIR}/.active-folder"

# PM2 configuration
PM2_APP_NAME="sameer-portfolio-frontend"

# Folder names for tracking
BUILD_NAME_BLUE="blue-build"
BUILD_NAME_GREEN="green-build"

# ============================================
# HELPER FUNCTIONS
# ============================================

# Get which build is currently active
get_active_build_name() {
    if [ -f "$ACTIVE_FOLDER_FILE" ]; then
        cat "$ACTIVE_FOLDER_FILE"
    else
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
        echo ""
    fi
}

# ============================================
# MAIN ROLLBACK
# ============================================

echo "🔄 Starting rollback..."

# Step 1: Navigate to base directory
cd "$BASE_DIR"

# Step 2: Get current active build
CURRENT_BUILD_NAME=$(get_active_build_name)
CURRENT_BUILD_PATH=$(get_build_path "$CURRENT_BUILD_NAME")

echo "📁 Currently active build: $CURRENT_BUILD_NAME"

# Step 3: Determine which build to rollback to (the other one)
if [ "$CURRENT_BUILD_NAME" == "$BUILD_NAME_BLUE" ]; then
    ROLLBACK_BUILD_DIR="$GREEN_BUILD_DIR"
    ROLLBACK_BUILD_NAME="$BUILD_NAME_GREEN"
    echo "🔄 Rolling back to: $BUILD_NAME_GREEN"
else
    ROLLBACK_BUILD_DIR="$BLUE_BUILD_DIR"
    ROLLBACK_BUILD_NAME="$BUILD_NAME_BLUE"
    echo "🔄 Rolling back to: $BUILD_NAME_BLUE"
fi

# Step 4: Check if rollback build exists
if [ ! -d "$ROLLBACK_BUILD_DIR/.next" ]; then
    echo "❌ Error: Rollback build not found in $ROLLBACK_BUILD_DIR"
    echo "   Cannot rollback - previous build doesn't exist"
    exit 1
fi

echo "✅ Rollback build found: $ROLLBACK_BUILD_DIR/.next"

# Step 5: Stop current PM2 app
echo "🛑 Stopping current PM2 app..."
pm2 stop "$PM2_APP_NAME" 2>/dev/null || true
pm2 delete "$PM2_APP_NAME" 2>/dev/null || true

# Step 6: Update symlink to point to rollback build
echo "🔗 Updating symlink to rollback build..."
# Remove old symlink if exists
sudo rm -f "$NEXT_SYMLINK" 2>/dev/null || rm -f "$NEXT_SYMLINK"
# Create symlink to rollback build
ln -s "$ROLLBACK_BUILD_DIR/.next" "$NEXT_SYMLINK"
echo "✅ Symlink created: .next -> $ROLLBACK_BUILD_DIR/.next"

# Step 7: Start PM2 from base directory
echo "▶️  Starting PM2 from base directory..."
cd "$BASE_DIR"
pm2 start ecosystem.config.js

# Step 8: Save PM2 configuration
pm2 save

# Step 9: Update which build is now active
echo "$ROLLBACK_BUILD_NAME" > "$ACTIVE_FOLDER_FILE"

echo "✅ Rollback completed!"
echo "📁 Active build: $ROLLBACK_BUILD_NAME ($ROLLBACK_BUILD_DIR)"
echo "🔗 Symlink: .next -> $ROLLBACK_BUILD_DIR/.next"
echo "🔍 Check status: pm2 status"
echo "📝 View logs: pm2 logs $PM2_APP_NAME"
