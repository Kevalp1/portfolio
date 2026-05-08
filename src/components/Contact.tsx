"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative w-full bg-[#121212] py-32 px-4 md:px-12 text-white">
      <div className="max-w-7xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8">
            Let&apos;s create something impactful together.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 font-light mb-12 md:mb-16 leading-relaxed">
            Whether you&apos;re building a brand, launching a product, or just want scroll-stopping content — I bring ideas to life through visuals, videos, and AI-powered creativity. I&rsquo;m always open to new collaborations, freelance gigs, or creative brainstorming.
          </p>
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="/contact"
            className={cn(
              "inline-flex items-center justify-center px-8 py-4 text-lg font-medium tracking-wide",
              "bg-white text-black hover:bg-neutral-200 transition-colors rounded-full",
              "shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            )}
          >
            Start a Conversation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
