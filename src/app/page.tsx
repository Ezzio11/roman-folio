"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
// Critical static components that don't depend on heavy WebGL/Client logic
const Header = dynamic(() => import("@/components/Resume/Header"), { ssr: false });
const Objective = dynamic(() => import("@/components/Resume/Objective"), { ssr: false });


// Below-the-fold components are loaded dynamically
const Experience = dynamic(() => import("@/components/Resume/Experience"), { ssr: false });
const Skills = dynamic(() => import("@/components/Resume/Skills"), { ssr: false });
const DominanceDashboard = dynamic(() => import("@/components/Resume/DominanceDashboard"), { ssr: false });
const Education = dynamic(() => import("@/components/Resume/Education"), { ssr: false });
const References = dynamic(() => import("@/components/Resume/References"), { ssr: false });
const Contact = dynamic(() => import("@/components/Resume/Contact"), { ssr: false });
const Counter1316 = dynamic(() => import("@/components/Resume/Counter1316"), { ssr: false });
const GridMotion = dynamic(() => import("@/components/Animations/GridMotion"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/Animations/ClickSpark"), { ssr: false });
const AcknowledgeNavigator = dynamic(() => import("@/components/Resume/AcknowledgeNavigator"), { ssr: false });
const LazyHydrate = dynamic(() => import("@/components/LazyHydrate"), { ssr: false });
const BloodlineTree = dynamic(() => import("@/components/Resume/BloodlineTree"), { ssr: false });

const bloodlineItems = [
  { src: "/highlights/wrestlemania_unification_2022.webp", title: "Double Champion", desc: "WrestleMania 38: Unified the Universal & WWE Titles." },
  { src: "/highlights/crowned_as_tribal_chief.webp", title: "Acknowledge Me", desc: "Payback 2020: The birth of the Tribal Chief era." },
  { src: "/highlights/elimination_chamber_2018.webp", title: "Chamber Dominance", desc: "Outlasted everyone in the most dangerous structure." },
  { src: "/highlights/ulafala_win_again_solosikoa.webp", title: "Ulafala Reclaimed", desc: "Restored order to the Bloodline's hierarchy." },
  { src: "/highlights/universal_title_win_2020.webp", title: "The Reign Begins", desc: "Start of the historic 1316-day Universal Title run." },
  { src: "/highlights/undertaker_def_2017.webp", title: "Passing the Torch", desc: "WrestleMania 33: Claimed his yard." },
  { src: "/highlights/universal_title_win_2018.webp", title: "SummerSlam Conquest", desc: "Defeated Brock Lesnar to reclaim the gold." },
  { src: "/highlights/royal_rumble_2026.webp", title: "Rumble King", desc: "Leading the Bloodline into the new era." },
  { src: "/highlights/us_championship_2016.webp", title: "US Pride", desc: "Representing the nation as United States Champion." },
  { src: "/highlights/wwe_championship_first_win_2015.webp", title: "The First One", desc: "Defeated Dean Ambrose at Survivor Series." },
  { src: "/highlights/intercontienental_win_2017.webp", title: "Grand Slam", desc: "Captured the Intercontinental Championship." },
  { src: "/highlights/royal_rumble2015.webp", title: "2015 Rumble Winner", desc: "A journey that started with 29 others." },
  { src: "/highlights/wrestlemania_triple_threat_2021.webp", title: "Stacked and Pinned", desc: "Defeated Edge and Daniel Bryan simultaneously." },
  { src: "/highlights/shield_debut_2012.webp", title: "The Shield Debut", desc: "Survivor Series 2012: The world was changed." },
  { src: "/highlights/war_games_2022.webp", title: "WarGames Victory", desc: "The Bloodline proves their ultimate dominance." },
  { src: "/highlights/brock_lesnar_summerslam_2022.webp", title: "Last Man Standing", desc: "The tractor incident: Defeating the Beast." },
  { src: "/highlights/john_cena_summerslam_2021.webp", title: "Cena Acknowledged", desc: "Defeated the Cenation leader at SummerSlam." },
  "Spear",
  "Superman Punch",
  "Guillotine",
  "Acknowledge Me",
  "Head of the Table",
  "The Bloodline",
  "OTC",
  "1316 Days",
  "Undisputed",
  "Universal",
  "WWE Champ",
  "Island of Relevancy"
];

export default function Home() {
  return (
    <main className="relative min-h-screen text-[--foreground] transition-colors duration-500 selection:bg-[--accent] selection:text-white overflow-x-clip">
      <SplashCursor />

      <React.Suspense fallback={<div className="h-screen bg-black" />}>
        <AcknowledgeNavigator />
        <Counter1316 />
        <Hero />
      </React.Suspense>

      <div className="relative z-20">
        <div className="relative">
          <Header />
          <Objective />

          <LazyHydrate ssrHeight={800}>
            <Experience />
          </LazyHydrate>

          <section id="highlights" className="py-20 border-b border-[--border-color] relative z-10">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] mb-8 text-center font-subheading">
              Career Highlights
            </h2>
            <div className="h-[600px] w-full">
              <LazyHydrate ssrHeight={600}>
                <GridMotion items={bloodlineItems} />
              </LazyHydrate>
            </div>
          </section>
        </div>

        <LazyHydrate ssrHeight={4000}>
          <BloodlineTree />
          <div id="skills"><Skills /></div>
          <div id="dominance"><DominanceDashboard /></div>
          <div><Education /></div>
          <div><References /></div>
          <div id="contact"><Contact /></div>
        </LazyHydrate>
      </div>
    </main>
  );
}
