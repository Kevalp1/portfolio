"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const experiences = [
  {
    role: "Manager - Production / Editor",
    company: "BondsIndia",
    duration: "March 2026 – Present",
    responsibilities: [
      "Lead end-to-end production of content for social media and digital marketing campaigns.",
      "Plan and supervise on-ground shoots, ensuring smooth execution and high-quality visual output.",
      "Manage and mentor a team of editors, overseeing post-production workflows and timelines.",
      "Ensure brand consistency, storytelling quality, and timely delivery across all digital content.",
    ]
  },
  {
    role: "Head of Design",
    company: "AVTR Meta Labs",
    duration: "Aug 2022 – March 2026",
    responsibilities: [
      "Created AI-powered visual content for virtual characters and brands.",
      "Used tools such as Midjourney, Runway ML, Studio D-ID, and FaceSwap.",
      "Led a 3D team to deliver Graphics, Videos, and Motion content for social platforms.",
      "Optimized 3D pipelines and rendering workflows for smoother production.",
    ]
  },
  {
    role: "Senior Visualizer",
    company: "Wiseape",
    duration: "May 2021 – Aug 2022",
    responsibilities: [
      "Designed graphic and video content for social media campaigns.",
      "Worked with brands including ITC, DABB, Aumi Sarees, and IPL Biologicals.",
      "Created multiple eCommerce banners and creatives.",
      "Maintained brand consistency across digital campaigns.",
    ]
  },
  {
    role: "Graphic Designer & Motion Grapher",
    company: "Inflex Media",
    duration: "Nov 2019 – May 2021",
    responsibilities: [
      "Produced graphic and video content for multiple brands.",
      "Wrote creative copy for social posts.",
      "Managed end-to-end social media activities including scheduling, posting, and client coordination.",
    ]
  },
  {
    role: "Graphic Designer",
    company: "Theme Unlimited",
    duration: "Aug 2018 – Nov 2019",
    responsibilities: [
      "Designed graphics for flex, banners, and social media.",
      "Worked with multiple clients and customized designs according to requirements.",
      "Provided translation support between English, Hindi, and Marathi.",
    ]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full bg-[#121212] pt-4 pb-12 px-4 md:px-12 text-white">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Experience
          </h2>
          <div className="h-px w-full bg-neutral-800" />
        </motion.div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className={cn(
                "relative pl-8 md:pl-12 border-l border-white/10"
              )}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{exp.role}</h3>
                  <p className="text-[#a1a1aa] text-base md:text-lg font-medium mt-1">{exp.company}</p>
                </div>
                <div className="text-xs md:text-sm font-mono tracking-widest text-neutral-500 uppercase px-3 py-1 bg-white/5 rounded-full w-fit">
                  {exp.duration}
                </div>
              </div>

              <ul className="list-disc leading-relaxed text-neutral-400 space-y-2 pl-4">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
