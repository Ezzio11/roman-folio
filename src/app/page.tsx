"use client";

import dynamic from 'next/dynamic';
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
import Header from "@/components/Resume/Header";
import Objective from "@/components/Resume/Objective";

// Below-the-fold components are loaded dynamically
const Experience = dynamic(() => import("@/components/Resume/Experience"), { ssr: false });
const Skills = dynamic(() => import("@/components/Resume/Skills"), { ssr: false });
const DominanceDashboard = dynamic(() => import("@/components/Resume/DominanceDashboard"), { ssr: false });
const Education = dynamic(() => import("@/components/Resume/Education"), { ssr: false });
const References = dynamic(() => import("@/components/Resume/References"), { ssr: false });
const Contact = dynamic(() => import("@/components/Resume/Contact"), { ssr: false });
const Counter1316 = dynamic(() => import("@/components/Resume/Counter1316"), { ssr: false });
const GridMotion = dynamic(() => import("@/components/Animations/GridMotion"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/Animations/SplashCursor"), { ssr: false });
const AcknowledgeNavigator = dynamic(() => import("@/components/Resume/AcknowledgeNavigator"), { ssr: false });
const PerformanceMonitor = dynamic(() => import("@/components/PerformanceMonitor"), { ssr: false });
const LazyHydrate = dynamic(() => import("@/components/LazyHydrate"), { ssr: false });

const bloodlineItems = [
  "/highlights/wrestlemania_unification_2022.webp", "Spear", "/highlights/crowned_as_tribal_chief.webp", "Superman Punch", "/highlights/elimination_chamber_2018.webp", "Elimination Chamber", "/highlights/ulafala_win_again_solosikoa.webp",
  "Guillotine", "/highlights/universal_title_win_2020.webp", "Acknowledge Me", "/highlights/undertaker_def_2017.webp", "Head of the Table", "/highlights/universal_title_win_2018.webp", "Tribal Chief",
  "/highlights/royal_rumble_2026.webp", "The Bloodline", "/highlights/us_championship_2016.webp", "Main Event", "/highlights/wwe_championship_first_win_2015.webp", "WrestleMania", "/highlights/intercontienental_win_2017.webp",
  "Royal Rumble", "/highlights/royal_rumble2015.webp", "1316 Days", "Undisputed", "Universal", "WWE Champ", "Island of Relevancy"
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[--background] text-[--foreground] transition-colors duration-500 selection:bg-[--accent] selection:text-white">
      <PerformanceMonitor />
      
      <LazyHydrate delay={1200}>
        <SplashCursor />
        <AcknowledgeNavigator />
        <Counter1316 />
      </LazyHydrate>

      <Hero />

      <div className="relative z-20 bg-[--background]">
        <LazyHydrate delay={2000}>
          <div className="relative">
            <Header />
            <Objective />
            <Experience />

            <section id="highlights" className="py-20 border-b border-[--border-color] relative z-10" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] mb-8 text-center font-subheading">
                Career Highlights
              </h2>
              <div className="h-[600px] w-full">
                <GridMotion items={bloodlineItems} />
              </div>
            </section>
          </div>

          <div id="skills" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}><Skills /></div>
          <div id="dominance" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}><DominanceDashboard /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}><Education /></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}><References /></div>
          <div id="contact" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}><Contact /></div>
        </LazyHydrate>
      </div>
    </main>
  );
}
