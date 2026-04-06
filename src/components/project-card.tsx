"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, ArrowUpRight, Code2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTechnologyIcon } from "@/lib/icons";
import { Project } from "@/data/portfolio";
import { CustomIframe } from "./custom-iframe";

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  isDarkMode: boolean;
  onExpand: (title: string) => void;
}

export function ProjectCard({
  project,
  index,
  isInView,
  isDarkMode,
  onExpand,
}: ProjectCardProps) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div
        className={cn(
          "relative h-full rounded-2xl border border-border dark:border-slate-700/50",
          "bg-card/50 dark:bg-slate-900/50 backdrop-blur-sm",
          "hover:border-indigo-500/50 hover:bg-muted/50 dark:hover:bg-slate-800/70",
          "transition-all duration-300 overflow-hidden",
          "flex flex-col"
        )}
      >
        {/* Project Preview/Iframe Section */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-background dark:bg-slate-950">
          {project.live && project.live !== "https://example.com" ? (
            <>
              <CustomIframe
                src={project.live}
                title={project.title}
              />
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
              {/* Fullscreen Button */}
              <motion.button
                onClick={() => onExpand(project.title)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize2 className="h-5 w-5" />
              </motion.button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
              <Code2 className="h-16 w-16 text-indigo-600/50 dark:text-indigo-400/50" />
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-black text-foreground dark:text-slate-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold">
                    {project.subtitle}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {project.github && project.github !== "https://github.com" && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted/50 dark:bg-slate-800/50 hover:bg-muted dark:hover:bg-slate-800 border border-indigo-500/20 hover:border-indigo-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="h-5 w-5 text-foreground/70 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                  </motion.a>
                )}
                {project.live && project.live !== "https://example.com" && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted/50 dark:bg-slate-800/50 hover:bg-muted dark:hover:bg-slate-800 border border-indigo-500/20 hover:border-indigo-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="h-5 w-5 text-foreground/70 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground/80 dark:text-slate-300 mb-6 text-base leading-relaxed font-light line-clamp-3">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="mb-6 space-y-2 flex-1">
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{
                    delay: index * 0.15 + idx * 0.05,
                    duration: 0.4,
                  }}
                  className="text-sm text-muted-foreground dark:text-slate-400 flex items-start gap-2"
                >
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1 font-black">▹</span>
                  <span className="font-medium">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 5).map((tech) => {
              const { icon: TechIcon, color: techColor } = getTechnologyIcon(tech, isDarkMode);
              return (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs rounded-lg bg-muted/80 dark:bg-slate-800/80 border border-indigo-500/30 text-foreground dark:text-slate-300 font-semibold hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all flex items-center gap-1.5"
                >
                  <TechIcon className="text-sm" style={{ color: techColor }} />
                  <span>{tech}</span>
                </motion.span>
              );
            })}
            {project.technologies.length > 5 && (
              <span className="px-3 py-1.5 text-xs rounded-lg bg-muted/80 dark:bg-slate-800/80 border border-indigo-500/30 text-muted-foreground dark:text-slate-400 font-semibold">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* View Project Link */}
          {project.live && project.live !== "https://example.com" && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all group/link"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Project</span>
              <ArrowUpRight className="h-4 w-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

