import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiAmazon,
  SiGit,
  SiSocketdotio,
  SiOpenai,
  SiTailwindcss,
  SiJavascript,
  SiGithub,
  SiLinkedin,
} from "react-icons/si";
import { FaBrain, FaShieldAlt, FaServer, FaBolt, FaCloud, FaTwitter } from "react-icons/fa";
import { TbBrandFramerMotion, TbBrandX } from "react-icons/tb";
import { HiMail } from "react-icons/hi";

// Icon and color mapping for technologies with dark mode support
const technologyIcons: Record<string, { icon: any; color: string; darkColor?: string }> = {
  "Next.js": { icon: SiNextdotjs, color: "#000000", darkColor: "#FFFFFF" }, // Black in light mode, white in dark mode
  "React.js": { icon: SiReact, color: "#61DAFB", darkColor: "#61DAFB" },
  React: { icon: SiReact, color: "#61DAFB", darkColor: "#61DAFB" },
  TypeScript: { icon: SiTypescript, color: "#3178C6", darkColor: "#3178C6" },
  Redux: { icon: SiRedux, color: "#764ABC", darkColor: "#764ABC" },
  "Fabric.js": { icon: TbBrandFramerMotion, color: "#8B5CF6", darkColor: "#8B5CF6" },
  "CSS/UI/UX": { icon: SiTailwindcss, color: "#06B6D4", darkColor: "#06B6D4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933", darkColor: "#339933" },
  Node: { icon: SiNodedotjs, color: "#339933", darkColor: "#339933" },
  "Express.js": { icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" }, // Black in light mode, white in dark mode
  Express: { icon: SiExpress, color: "#000000", darkColor: "#FFFFFF" },
  "REST API": { icon: FaServer, color: "#4F46E5", darkColor: "#4F46E5" },
  "MVC Architecture": { icon: FaServer, color: "#7C3AED", darkColor: "#7C3AED" },
  "Design Patterns": { icon: SiJavascript, color: "#F7DF1E", darkColor: "#F7DF1E" },
  MongoDB: { icon: SiMongodb, color: "#47A248", darkColor: "#47A248" },
  MySQL: { icon: SiMysql, color: "#4479A1", darkColor: "#4479A1" },
  Redis: { icon: SiRedis, color: "#DC382D", darkColor: "#DC382D" },
  "API Optimization": { icon: FaBolt, color: "#F59E0B", darkColor: "#F59E0B" },
  "Rate Limiting": { icon: FaShieldAlt, color: "#EF4444", darkColor: "#EF4444" },
  "Socket.io": { icon: SiSocketdotio, color: "#010101", darkColor: "#FFFFFF" }, // Almost black in light mode, white in dark mode
  Socket: { icon: SiSocketdotio, color: "#010101", darkColor: "#FFFFFF" },
  WebSockets: { icon: SiSocketdotio, color: "#6366F1", darkColor: "#6366F1" },
  BullMQ: { icon: FaServer, color: "#10B981", darkColor: "#10B981" },
  FCM: { icon: FaCloud, color: "#3B82F6", darkColor: "#3B82F6" },
  "AWS EC2": { icon: SiAmazon, color: "#FF9900", darkColor: "#FF9900" },
  "AWS S3": { icon: SiAmazon, color: "#569A31", darkColor: "#569A31" },
  AWS: { icon: SiAmazon, color: "#FF9900", darkColor: "#FF9900" },
  CloudFront: { icon: SiAmazon, color: "#FF9900", darkColor: "#FF9900" },
  Git: { icon: SiGit, color: "#F05032", darkColor: "#F05032" },
  OpenAI: { icon: SiOpenai, color: "#412991", darkColor: "#7C3AED" }, // Dark purple in light mode, lighter purple in dark mode
  LangChain: { icon: FaBrain, color: "#10B981", darkColor: "#10B981" },
  "Vector Search": { icon: FaBrain, color: "#8B5CF6", darkColor: "#8B5CF6" },
  "AI Integration": { icon: FaBrain, color: "#EC4899", darkColor: "#EC4899" },
  NextAuth: { icon: FaShieldAlt, color: "#6366F1", darkColor: "#6366F1" },
  "Secure Sessions": { icon: FaShieldAlt, color: "#10B981", darkColor: "#10B981" },
  "Token Validation": { icon: FaShieldAlt, color: "#F59E0B", darkColor: "#F59E0B" },
};

/**
 * Get icon and color for a technology by name
 * @param technologyName - Name of the technology
 * @param isDarkMode - Whether dark mode is active (optional, defaults to false)
 * @returns Object containing the icon component and color, or default values if not found
 */
export function getTechnologyIcon(technologyName: string, isDarkMode: boolean = false): { icon: any; color: string } {
  // Try exact match first
  if (technologyIcons[technologyName]) {
    const iconData = technologyIcons[technologyName];
    return {
      icon: iconData.icon,
      color: isDarkMode && iconData.darkColor ? iconData.darkColor : iconData.color,
    };
  }

  // Try case-insensitive match
  const lowerName = technologyName.toLowerCase();
  const found = Object.keys(technologyIcons).find(
    (key) => key.toLowerCase() === lowerName
  );

  if (found) {
    const iconData = technologyIcons[found];
    return {
      icon: iconData.icon,
      color: isDarkMode && iconData.darkColor ? iconData.darkColor : iconData.color,
    };
  }

  // Try partial match (e.g., "Next.js" matches "Next")
  const partialMatch = Object.keys(technologyIcons).find((key) =>
    lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)
  );

  if (partialMatch) {
    const iconData = technologyIcons[partialMatch];
    return {
      icon: iconData.icon,
      color: isDarkMode && iconData.darkColor ? iconData.darkColor : iconData.color,
    };
  }

  // Default fallback
  return { icon: FaServer, color: "#6366F1" };
}

/**
 * Get all available technology icons
 * @returns Record of all technology icons
 */
export function getAllTechnologyIcons(): Record<string, { icon: any; color: string }> {
  return technologyIcons;
}

// Social media icons mapping with colors optimized for visibility
const socialIcons: Record<string, { icon: any; color: string; darkColor?: string }> = {
  github: { icon: SiGithub, color: "#181717", darkColor: "#FFFFFF" }, // Dark grey in light mode, white in dark mode for better visibility
  linkedin: { icon: SiLinkedin, color: "#0A66C2", darkColor: "#0A66C2" }, // Blue works in both modes
  twitter: { icon: TbBrandX, color: "#000000", darkColor: "#FFFFFF" }, // Black in light mode, white in dark mode
  x: { icon: TbBrandX, color: "#000000", darkColor: "#FFFFFF" },
  email: { icon: HiMail, color: "#EA4335", darkColor: "#EA4335" }, // Red works in both modes
  mail: { icon: HiMail, color: "#EA4335", darkColor: "#EA4335" },
};

/**
 * Get icon and color for a social media platform by name
 * @param platformName - Name of the social media platform (github, linkedin, twitter, email)
 * @param isDarkMode - Whether dark mode is active (optional, defaults to false)
 * @returns Object containing the icon component and color, or default values if not found
 */
export function getSocialIcon(platformName: string, isDarkMode: boolean = false): { icon: any; color: string } {
  const lowerName = platformName.toLowerCase();
  
  // Try exact match first
  if (socialIcons[lowerName]) {
    const iconData = socialIcons[lowerName];
    return {
      icon: iconData.icon,
      color: isDarkMode && iconData.darkColor ? iconData.darkColor : iconData.color,
    };
  }

  // Try partial match
  const found = Object.keys(socialIcons).find((key) =>
    lowerName.includes(key) || key.includes(lowerName)
  );

  if (found) {
    const iconData = socialIcons[found];
    return {
      icon: iconData.icon,
      color: isDarkMode && iconData.darkColor ? iconData.darkColor : iconData.color,
    };
  }

  // Default fallback
  return { icon: HiMail, color: "#6366F1" };
}
