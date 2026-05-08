"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  youtubeId?: string;
  playlistId?: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, youtubeId, playlistId, onClose }: VideoModalProps) {
  if (!isOpen || (!youtubeId && !playlistId)) return null;

  const src = playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Controls */}
            <div className="flex items-center justify-end px-6 py-4 border-b border-white/10 bg-black/50">
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
