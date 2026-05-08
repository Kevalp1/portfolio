import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-white/20">
      
      <Header />

      {/* 500vh container containing the canvas and the overlay text */}
      <ScrollyCanvas />

      {/* Renders after the 500vh scroll animation is complete */}
      <Projects />
      <Experience />
      <Skills />
      <Contact />

    </main>
  );
}
