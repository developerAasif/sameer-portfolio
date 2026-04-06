"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/lib/icons";
import { ThemeToggle } from "./theme-toggle";
import portfolioData from "@/data/portfolio";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDarkMode = mounted && resolvedTheme === "dark";

  const socialLinks = [
    {
      name: "github",
      href: personal.social.github,
      ariaLabel: "Visit my GitHub profile",
    },
    {
      name: "linkedin",
      href: personal.social.linkedin,
      ariaLabel: "Visit my LinkedIn profile",
    },
    {
      name: "twitter",
      href: personal.social.twitter,
      ariaLabel: "Visit my Twitter/X profile",
    },
    {
      name: "email",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.contact.email)}&su=${encodeURIComponent('Contact from Portfolio')}`,
      ariaLabel: "Send me an email",
    },
  ];

  return (
    <motion.footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "flex items-center justify-center",
        "px-4 sm:px-6 lg:px-8 py-4"
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      }}
    >
      {/* Social Bar - Robotic themed container */}
      <motion.div
        className={cn(
          "flex items-center justify-center gap-3",
          "px-6 py-3 rounded-2xl",
          "bg-background/80 border border-indigo-500/30",
          "backdrop-blur-md shadow-lg shadow-indigo-500/20",
          "dark:bg-slate-900/80"
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        {socialLinks.map((link, index) => {
          const { icon: SocialIcon, color: iconColor } = getSocialIcon(link.name, isDarkMode);
          return (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className={cn(
                "relative h-10 w-10 rounded-full",
                "flex items-center justify-center",
                "transition-all duration-300",
                "hover:bg-indigo-500/20 hover:scale-110 border border-indigo-500/20",
                "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
                "group"
              )}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ color: iconColor }} className="flex items-center justify-center">
                <SocialIcon 
                  className="h-5 w-5 transition-colors" 
                  style={{ color: 'currentColor', fill: 'currentColor', stroke: 'currentColor' }}
                />
              </div>
            </motion.a>
          );
        })}

        {/* Divider */}
        <div className="h-8 w-px bg-indigo-500/30 mx-1" />

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.7,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
