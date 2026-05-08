"use client";

import { motion, useAnimationFrame, useMotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Placeholder images - the user should replace these with their actual graphics in the public folder
const GRAPHICS = [
  { id: "1", title: "Website Banners", image: "/website-banners.jpg", link: "https://www.behance.net/gallery/144857643/Ecommerce-Website-Banners?platform=direct" },
  { id: "2", title: "Event Stall Interior Design", image: "/event-stall.jpg", link: "https://www.behance.net/gallery/133494089/Interior-Design-3D" },
  { id: "3", title: "Office Interiors", image: "/office-interiors.jpg", link: "https://www.behance.net/gallery/133493939/Office-Interior-3D" },
  { id: "4", title: "Emailers", image: "/emailers.jpg", link: "https://www.behance.net/gallery/133490857/Emailers-Designs?platform=direct" },
];

export default function CreativeGraphicsScroller() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [widthOfOneSet, setWidthOfOneSet] = useState(0);

  const x = useMotionValue(0);

  // Measure the width of one set of items for wrapping
  useEffect(() => {
    const calcWidth = () => {
      if (innerRef.current && outerRef.current) {
        const totalScrollWidth = innerRef.current.scrollWidth;
        // Since we duplicate the list, the width of one set is exactly half
        setWidthOfOneSet(totalScrollWidth / 2);
      }
    };

    calcWidth();
    // Re-calculate after a short delay to ensure images have rendered
    setTimeout(calcWidth, 100);
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, []);

  // Wrap x infinitely in both directions
  useMotionValueEvent(x, "change", (latest) => {
    if (widthOfOneSet > 0) {
      if (latest <= -widthOfOneSet) {
        x.set(latest + widthOfOneSet);
      } else if (latest > 0) {
        x.set(latest - widthOfOneSet);
      }
    }
  });

  useAnimationFrame((_time, delta) => {
    // Auto-scroll only when not hovered and not dragging
    if (!isHovered && !isDragging) {
      const currentX = x.get();
      // Positive velocity so it scrolls left-to-right
      const baseVelocity = 1.0; 
      const moveBy = baseVelocity * (delta / 16.66); 
      x.set(currentX + moveBy);
    }
  });

  const scrollerItems = [...GRAPHICS, ...GRAPHICS]; // Duplicated for seamless loop

  return (
    <div className="relative w-full py-12 bg-neutral-950/50 rounded-3xl border border-white/5 overflow-hidden mb-16">
      <div className="px-8 md:px-12 mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Creative Graphics</h3>
        <p className="text-neutral-400">A showcase of design and typography</p>
      </div>

      <div ref={outerRef} className="relative flex w-full overflow-hidden pl-4 md:pl-12">
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-l from-[#121212] to-transparent" />

        <motion.div
          ref={innerRef}
          className="flex w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          // We remove constraints to allow infinite dragging in any direction
          dragElastic={0} 
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {scrollerItems.map((graphic, idx) => (
            <div
              key={`${graphic.id}-${idx}`}
              onClick={() => {
                // Prevent click if user was just dragging
                if (!isDragging && graphic.link) {
                  window.open(graphic.link, '_blank');
                }
              }}
              className="relative pr-6 shrink-0"
            >
              {/* Aspect ratio video is a standard 16:9 format matching the Featured Videos */}
              <div className="relative group w-[280px] sm:w-[350px] aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-colors">
                <Image
                  src={graphic.image}
                  alt={graphic.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Persistent dark gradient overlay so the text always pops */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <p className="font-bold text-xl text-white drop-shadow-lg truncate">
                    {graphic.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
