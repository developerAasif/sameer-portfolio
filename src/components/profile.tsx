"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Download, Mail, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSocialIcon } from "@/lib/icons";
import { GradientOrbs } from "./gradient-orbs";
import portfolioData from "@/data/portfolio";
import PixelTransition from "./PixelTransition";
import myImg from "./../app/me.png";
import myImg2 from "./../app/me2.png";

export function Profile() {
  const { resolvedTheme } = useTheme();
  const { personal } = portfolioData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <section
      id="home"
      className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-20 pb-12 sm:pb-16 overflow-hidden scroll-mt-20"
    >
      {/* Subtle Gradient Orbs */}
      <GradientOrbs />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-40"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Profile Image */}
              <motion.div
                className="relative rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-full overflow-hidden border-4 border-slate-900 bg-slate-900 w-24 h-24 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                  <PixelTransition
                    firstContent={
                      <img
                        src={myImg2.src}
                        alt={personal.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="w-full h-full object-cover"
                      />
                    }
                    secondContent={
                      <img
                        src={myImg.src}
                        alt={personal.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="w-full h-full object-cover"
                      />
                    }
                    gridSize={12}
                    pixelColor="#ffffff"
                    once={false}
                    animationStepDuration={0.4}
                    className="custom-pixel-card w-full h-full"
                  />
                  {/* <img
                    src={personal.image}
                    alt={personal.name}
                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover"
                  /> */}
                </div>
              </motion.div>
              {/* Status Indicator */}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/10 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                {personal.availability}
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-3">
                <span className="block text-sm sm:text-base md:text-lg text-foreground/80 dark:text-slate-300 mb-1 sm:mb-2">
                  Hi, I'm
                </span>
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
                  {personal.name}
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground dark:text-slate-200 mb-1 sm:mb-2">
                {personal.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-slate-400 font-light">
                {personal.subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {personal.description}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 text-muted-foreground dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm">{personal.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <a
                  href={`mailto:${personal.contact.email}`}
                  className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {personal.contact.email}
                </a>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.a
                href="#contact"
                className={cn(
                  "group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg",
                  "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base md:text-lg",
                  "hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300",
                  "overflow-hidden",
                )}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Mail className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Get In Touch</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href={personal.resume}
                download
                className={cn(
                  "group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg",
                  "border-2 border-indigo-400/50 bg-background/80 dark:bg-slate-900/50 backdrop-blur-sm font-bold text-sm sm:text-base md:text-lg text-foreground dark:text-slate-200",
                  "hover:bg-indigo-500/10 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300",
                )}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="h-5 w-5" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4"
            >
              {Object.entries(personal.social).map(([platform, url]) => {
                const { icon: SocialIcon, color: iconColor } = getSocialIcon(
                  platform,
                  isDarkMode,
                );
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border border-indigo-500/30 bg-background/80 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-500/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      style={{ color: iconColor }}
                      className="flex items-center justify-center"
                    >
                      <SocialIcon
                        className="text-xl transition-colors"
                        style={{
                          color: "currentColor",
                          fill: "currentColor",
                          stroke: "currentColor",
                        }}
                      />
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
