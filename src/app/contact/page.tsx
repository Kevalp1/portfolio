"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Facebook, MessageCircle } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from "@/components/ContactsPageHeader";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group relative flex items-center justify-center w-16 h-16 rounded-full",
      "bg-neutral-900 border border-neutral-800 text-neutral-400",
      "hover:bg-white hover:text-black hover:scale-110",
      "transition-all duration-300 ease-out",
      "shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
    )}
    aria-label={label}
  >
    <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
  </Link>
);

const ContactItem = ({ href, icon: Icon, label, value }: { href: string; icon: React.ElementType; label: string; value: string }) => (
  <a
    href={href}
    className={cn(
      "group flex flex-col items-center justify-center p-8 rounded-3xl",
      "bg-neutral-900/50 border border-neutral-800",
      "hover:bg-neutral-800 hover:border-neutral-700",
      "transition-all duration-300 ease-out"
    )}
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-sm md:text-base font-medium tracking-widest uppercase text-neutral-500 mb-2">{label}</span>
    <span className="text-lg md:text-2xl font-light text-white group-hover:text-neutral-200 transition-colors break-all text-center">{value}</span>
  </a>
);

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#121212] pt-32 pb-24 px-4 md:px-12 selection:bg-white selection:text-black">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase text-neutral-400 mb-6">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8">
              Got a creative idea, <br className="hidden md:block" />
              <span className="text-neutral-500">brand story, or content need?</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-3xl text-neutral-400 font-light max-w-4xl mx-auto leading-tight px-2">
              Let&apos;s build something bold, visual, and unforgettable.
            </p>
          </motion.div>

          {/* Primary Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <ContactItem
              href="mailto:kevalparmar78@gmail.com"
              icon={Mail}
              label="Email"
              value="kevalparmar78@gmail.com"
            />
            <ContactItem
              href="tel:+919167432148"
              icon={Phone}
              label="Phone"
              value="+91 9167432148"
            />
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl bg-neutral-900/30 border border-neutral-800/50"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-neutral-500 mb-8">
              Connect on Socials
            </span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <SocialLink
                href="https://www.instagram.com/jerry__p/"
                icon={Instagram}
                label="Instagram"
              />
              <SocialLink
                href="https://www.facebook.com/JERRYP25/"
                icon={Facebook}
                label="Facebook"
              />
              <SocialLink
                href="https://wa.me/919167432148"
                icon={MessageCircle}
                label="WhatsApp"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
