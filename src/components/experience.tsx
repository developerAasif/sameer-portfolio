"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Calendar, MapPin, Briefcase, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTechnologyIcon } from "@/lib/icons";
import portfolioData from "@/data/portfolio";
import { MagicCard } from "./magic-card";
import { ExprienceTech } from "./ExprienceTech";

export function Experience() {
  const { resolvedTheme } = useTheme();
  const { experience } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  // Ensure theme is detected after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = mounted && resolvedTheme === "dark";

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
      ref={ref}
    >


      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Professional Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-4xl mx-auto font-light px-4">
            My career milestones and professional growth
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.startDate}`}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <MagicCard
                gradientColor="rgba(99, 102, 241, 0.2)"
                className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6 pb-3 sm:pb-4 md:pb-6 border-b border-indigo-500/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <div className="p-1.5 sm:p-2 md:p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
                          <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black text-foreground dark:text-slate-200 mb-0.5 sm:mb-1">
                            {exp.position}
                          </h3>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-indigo-600 dark:text-indigo-400 font-bold">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Date and Location */}
                    <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 md:items-end md:text-right">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground dark:text-slate-400">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground dark:text-slate-400">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description Points */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    {/* Desktop: Always show heading and content */}
                    <div className="hidden md:block">
                      <h4 className="text-lg font-bold text-foreground dark:text-slate-300 mb-6 flex items-center gap-2">
                        <div className="h-1 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-4">
                        {exp.description.map((item, itemIndex) => (
                          <motion.li
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            transition={{
                              delay: index * 0.15 + itemIndex * 0.08,
                              duration: 0.5,
                            }}
                            className="flex items-start gap-4 group"
                          >
                            <div className="mt-1 flex-shrink-0">
                              <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors" />
                            </div>
                            <p className="text-foreground/90 dark:text-slate-300 leading-relaxed text-base md:text-lg font-medium flex-1">
                              {item}
                            </p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile: Expandable with hidden heading when collapsed */}
                    <div className="md:hidden">
                      <motion.div
                        animate={{
                          maxHeight: expandedItems[index] ? "2000px" : "0px",
                          opacity: expandedItems[index] ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <h4 className="text-base font-bold text-foreground dark:text-slate-300 mb-4 flex items-center gap-2">
                          <div className="h-1 w-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-3 pb-2">
                          {exp.description.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={
                                expandedItems[index]
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -20 }
                              }
                              transition={{
                                delay: itemIndex * 0.05,
                                duration: 0.4,
                              }}
                              className="flex items-start gap-3 group"
                            >
                              <div className="mt-0.5 flex-shrink-0">
                                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors" />
                              </div>
                              <p className="text-foreground/90 dark:text-slate-300 leading-relaxed text-sm font-medium flex-1">
                                {item}
                              </p>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.button
                        onClick={() => toggleExpanded(index)}
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-semibold text-xs mt-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{expandedItems[index] ? "Show Less" : "See More"}</span>
                        <motion.div
                          animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="w-full">
                    <h4 className="text-base sm:text-lg font-bold text-foreground dark:text-slate-300 mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full" />
                      Technologies Used
                    </h4>

                    <ExprienceTech exp={exp} isDarkMode={isDarkMode} />

                   


                  </div>

                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
