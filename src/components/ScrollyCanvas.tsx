"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 65; // frame_00 to frame_64

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Track scroll progress within the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Pad to 2 digits, example: frame_00_delay-0.066s.png
      const frameNum = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Render first frame immediately once all are loaded
          renderFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || imgArray.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Maintain aspect ratio, cover the screen
    const img = imgArray[index];
    if (!img) return;

    const ratio = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const centerX = (canvas.width - img.width * ratio) / 2;
    const centerY = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerX,
      centerY,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Resize canvas to fill window
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      // Re-render current frame based on scroll progress
      if (images.length > 0) {
        const frameIndex = Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1));
        renderFrame(frameIndex, images);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  // Map scroll progress (0-1) to frame index (0-64)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0) {
      renderFrame(Math.floor(latest), images);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />
        
        {/* Parallax Overlay Content mapped to the exact scroll progress */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
