"use client";

import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Mail, Phone, Sparkles } from "lucide-react";
import portfolioData from "@/data/portfolio";
import { MagicCard } from "./magic-card";

export function Contact() {
  const { personal } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
      ref={ref}
    >
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Contact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground dark:text-slate-400 max-w-4xl mx-auto font-light px-4">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <MagicCard gradientColor="rgba(99, 102, 241, 0.2)" className="p-6 sm:p-8 md:p-10 h-full border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 sm:mb-6 shadow-xl border border-indigo-400/30"
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-foreground dark:text-slate-200">Email</h3>
                <p className="text-muted-foreground dark:text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  Drop me a line anytime
                </p>
                <a
                  href={`mailto:${personal.contact.email}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline font-black text-lg"
                >
                  {personal.contact.email}
                </a>
              </div>
            </MagicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <MagicCard gradientColor="rgba(99, 102, 241, 0.2)" className="p-6 sm:p-8 md:p-10 h-full border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 sm:mb-6 shadow-xl border border-purple-400/30"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-foreground dark:text-slate-200">Phone</h3>
                <p className="text-muted-foreground dark:text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                  Call or WhatsApp me
                </p>
                <a
                  href={`tel:${personal.contact.phone}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline font-black text-lg"
                >
                  {personal.contact.phone}
                </a>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
