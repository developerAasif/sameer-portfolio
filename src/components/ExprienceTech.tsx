"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/data/portfolio";
import { getTechnologyIcon } from "@/lib/icons";

export function ExprienceTech({ exp, isDarkMode }: { exp: Experience; isDarkMode: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setWidth(window.innerWidth - 200);
      } else {
        setWidth(0);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="w-full md:w-auto overflow-x-auto md:overflow-visible">
      <div 
        className="flex gap-2 md:gap-3 md:w-max items-center pb-2 pr-12 md:pr-0"
        style={{ width: width > 0 ? `${width}px` : undefined }}
      >
        {exp.technologies.map((tech) => {
          const { icon: TechIcon, color: techColor } = getTechnologyIcon(tech, isDarkMode);
          return (
            <div
              key={tech}
              className="px-2.5 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-lg bg-muted/80 dark:bg-slate-800/80 border border-indigo-500/30 text-foreground dark:text-slate-300 font-semibold hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all cursor-default flex items-center gap-1.5 md:gap-2 flex-shrink-0 whitespace-nowrap"
            >
              <TechIcon className="text-sm md:text-base shrink-0" style={{ color: techColor }} />
              <span>{tech}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
