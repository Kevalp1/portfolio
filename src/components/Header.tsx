"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/50 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="w-full px-20 md:px-48 flex items-center justify-end">
        <nav className="flex gap-6 md:gap-10">
          <a href="#" className="text-sm md:text-base font-medium text-white/70 hover:text-white transition-colors mix-blend-difference">
            Home
          </a>
          <a href="/#work" className="text-sm md:text-base font-medium text-white/70 hover:text-white transition-colors mix-blend-difference">
            Work
          </a>
          <a href="/contact" className="text-sm md:text-base font-medium text-white/70 hover:text-white transition-colors mix-blend-difference">
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
