import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function App() {
  return (
    <div className="grain relative min-h-dvh">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-raised focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="aurora-hairline opacity-40" aria-hidden="true" />
        </div>
        <Experience />
        <Projects />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="aurora-hairline opacity-40" aria-hidden="true" />
        </div>
        <Education />
        <Skills />
        <Contact />
      </main>

      <Footer />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4200,
          style: {
            background: "rgba(19, 27, 46, 0.92)",
            color: "#e8ecf4",
            border: "1px solid rgba(124, 156, 255, 0.25)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            fontFamily: "Newsreader, Georgia, serif",
            fontSize: "15px",
          },
        }}
      />
    </div>
  );
}
