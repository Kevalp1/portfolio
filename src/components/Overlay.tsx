"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Global parallax for everything
  const globalY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Section 1: Intro (stays visible from 0% until 85%, fades out at 95%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.85, 0.95], [1, 1, 0]);

  // Section 2: Appears at 25%-40%, stays until 85%, fades out at 95%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.85, 0.95], [0, 1, 1, 0]);
  // Slide up into natural flex position
  const y2 = useTransform(scrollYProgress, [0.25, 0.4], [50, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none text-white font-sans antialiased flex flex-col justify-start pt-[30vh] md:pt-[35vh] px-8 md:px-24">
      {/* Group everything in one motion container for global parallax offset */}
      <motion.div style={{ y: globalY }} className="flex flex-col items-start gap-4 max-w-4xl">
        
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1 }}
          className="mb-24 md:mb-32"
        >
          <h1 className="text-6xl md:text-[6rem] font-bold tracking-tight mb-4 drop-shadow-2xl leading-none">
            Keval Parmar
          </h1>
          <p className="text-2xl md:text-5xl font-light text-neutral-300 drop-shadow-xl mt-2">
            Editor / AI Artist / Motion Grapher
          </p>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="w-fit flex flex-col"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-2xl leading-tight">
            In a world of noise,
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-2xl leading-tight text-neutral-300">
            I create visuals that cut through
          </h2>
          <p className="text-base md:text-lg font-light text-white mt-4 text-right">
            — powered by AI.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
