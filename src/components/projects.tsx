"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sparkles, X } from "lucide-react";
import portfolioData from "@/data/portfolio";
import { ProjectCard } from "./project-card";
import { CustomIframe } from "./custom-iframe";

export function Projects() {
  const { resolvedTheme } = useTheme();
  const { projects } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Ensure theme is detected after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDarkMode = mounted && resolvedTheme === "dark";

  useEffect(() => {
    // Fallback: Show content after a short delay if observer hasn't triggered
    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 500);

    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(fallbackTimer);
        }
      },
      { 
        threshold: 0.05, 
        rootMargin: isMobile ? "-20px" : "-100px" 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedProject) {
        setExpandedProject(null);
      }
    };

    if (expandedProject) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [expandedProject]);

  return (
    <section
      id="projects"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
      ref={ref}
    >
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Projects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground dark:text-slate-400 max-w-4xl mx-auto font-light px-4">
            A collection of AI-powered projects showcasing innovation and expertise
          </p>
        </motion.div>

        {/* Projects Grid - 2 cards per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
                key={project.title}
              project={project}
              index={index}
              isInView={isInView}
              isDarkMode={isDarkMode}
              onExpand={setExpandedProject}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {expandedProject && (() => {
        const project = projects.find((p) => p.title === expandedProject);
        if (!project || !project.live || project.live === "https://example.com") return null;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 dark:bg-slate-950/95 backdrop-blur-md"
            onClick={() => setExpandedProject(null)}
          >
            {/* Close Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(null);
              }}
              className="absolute top-6 right-6 p-3 rounded-lg bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all z-50"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Project Info Header */}
            <div className="absolute top-6 left-6 z-50">
              <div className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-4">
                <h3 className="text-2xl font-black text-foreground dark:text-slate-200 mb-1">{project.title}</h3>
                {project.subtitle && (
                  <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">{project.subtitle}</p>
                )}
              </div>
            </div>

            {/* Fullscreen Iframe */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full p-6 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <CustomIframe
                src={project.live}
                title={project.title}
                className="w-full h-full rounded-lg border border-indigo-500/30 shadow-2xl"
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-fullscreen"
              />
            </motion.div>

            {/* Instructions */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-lg px-4 py-2">
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Press <kbd className="px-2 py-1 bg-muted dark:bg-slate-800 rounded text-indigo-600 dark:text-indigo-400 font-mono">ESC</kbd> to close
                </p>
              </div>
            </div>
          </motion.div>
        );
      })()}
    </section>
  );
}
