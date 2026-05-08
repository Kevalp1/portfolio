"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FeaturedVideosScroller from "./FeaturedVideosScroller";
import BrandCreativesScroller from "./BrandCreativesScroller";
import MotionGraphicsScroller from "./MotionGraphicsScroller";
import CreativeGraphicsScroller from "./CreativeGraphicsScroller";



export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="relative w-full bg-[#121212] py-32 px-4 md:px-[250px] text-white">
      <div className="w-full mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Work
          </h2>
          <div className="h-px w-full bg-neutral-800" />
        </motion.div>

        <FeaturedVideosScroller />
        <BrandCreativesScroller />
        <MotionGraphicsScroller />
        <CreativeGraphicsScroller />
      </div>
    </section>
  );
}
