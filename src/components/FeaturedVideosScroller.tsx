"use client";

import { motion, useAnimationFrame, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";

type PodcastItem = {
  id: string;
  title: string;
  youtubeId?: string;
  playlistId?: string;
  thumbnailUrl?: string;
};

const PODCASTS: PodcastItem[] = [
  { id: "1", title: "Music Videos", playlistId: "PLBBqkqVVUodlwA09CQdvw3-IoFYhmwFeW", thumbnailUrl: "/music_videos_new.jpg" },
  { id: "2", title: "Nestle Nangrow Podcast's", playlistId: "PLBBqkqVVUodmofqs2kpEkfjcHm6OccCuj", thumbnailUrl: "/whats_growing_on.png" },
  { id: "3", title: "Naina - Celebrity Podcasts", playlistId: "PLBBqkqVVUodk_2d10komwV71JN_SZJmwy", thumbnailUrl: "/naina_celebrity_thumb.png" },
  { id: "4", title: "Reels", playlistId: "PLBBqkqVVUodkeMnv426wCvJN1m6MoAo4j", thumbnailUrl: "/new-reels-thumb.jpg.png" },
];

export default function FeaturedVideosScroller() {
  const [activeItem, setActiveItem] = useState<{youtubeId?: string, playlistId?: string} | null>(null);
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
      const baseVelocity = -1.0; 
      const moveBy = baseVelocity * (delta / 16.66); 
      x.set(currentX + moveBy);
    }
  });

  const scrollerItems = [...PODCASTS, ...PODCASTS]; // Duplicated for seamless loop

  return (
    <div className="relative w-full py-12 bg-neutral-950/50 rounded-3xl border border-white/5 overflow-hidden mb-16">
      <div className="px-8 md:px-12 mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Featured Videos</h3>
        <p className="text-neutral-400">Click to watch the full videos</p>
      </div>

      <div ref={outerRef} className="relative flex w-full overflow-hidden pl-4 md:pl-12">
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 md:w-32 bg-gradient-to-l from-[#121212] to-transparent" />

        <motion.div
          ref={innerRef}
          className="flex w-max cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          // We remove constraints to allow infinite dragging in any direction
          dragElastic={0} // Elasticity isn't needed without bounds
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {scrollerItems.map((podcast, idx) => (
            <div
              key={`${podcast.id}-${idx}`}
              onClick={() => {
                // Prevent click if user was just dragging
                if (!isDragging) {
                  if (podcast.playlistId) {
                    window.open(`https://www.youtube.com/playlist?list=${podcast.playlistId}`, '_blank');
                  } else {
                    setActiveItem({ youtubeId: podcast.youtubeId });
                  }
                }
              }}
              className="relative pr-6 shrink-0"
            >
              <div className="relative group w-[280px] sm:w-[350px] aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-colors">
                <Image
                  src={podcast.thumbnailUrl || `https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`}
                  alt={podcast.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <Play className="text-white ml-1 w-6 h-6 fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-semibold text-white drop-shadow-md truncate">
                    {podcast.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <VideoModal
        isOpen={!!activeItem}
        youtubeId={activeItem?.youtubeId}
        playlistId={activeItem?.playlistId}
        onClose={() => setActiveItem(null)}
      />
    </div>
  );
}
