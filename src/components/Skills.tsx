"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI Tools",
    skills: ["HeyGen", "Runway ML", "SpeechMe", "Sync.so", "FaceSwap", "Roop Unleashed", "MidJourney", "DeepFace", "Applio", "Stable Diffusion", "Foocus", "Face Fusion", "Studio D-ID"]
  },
  {
    title: "Design Software",
    skills: ["Adobe Photoshop", "Adobe After Effects", "Adobe Premiere Pro", "Adobe Flash", "Adobe Illustrator", "3D Max", "Corel Draw", "ArtRage", "Mocha Pro"]
  },
  {
    title: "Programming",
    skills: ["C++", "Java", "MySQL"]
  },
  {
    title: "Soft Skills & Interests",
    skills: ["Creativity", "Leadership", "Problem-solving", "Movies & Sitcoms", "Travelling", "Music", "Trekking"]
  }
];

const languages = [
  { name: "ENGLISH", proficiency: "PROFESSIONAL - PROFICIENCY" },
  { name: "HINDI", proficiency: "FULL - PROFICIENCY" },
  { name: "GUJARATI", proficiency: "NATIVE - PROFICIENCY" },
  { name: "MARATHI", proficiency: "FULL - PROFICIENCY" },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full bg-[#121212] py-24 px-4 md:px-12 text-white">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-center md:text-left">
            Skills & Toolkit
          </h2>
          <div className="h-px w-full bg-neutral-800" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-6 text-neutral-200">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-full text-sm text-neutral-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-12">
            Languages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {languages.map((lang, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-white font-bold text-lg md:text-xl tracking-wide uppercase mb-2">
                  {lang.name}
                </span>
                <span className="text-neutral-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
