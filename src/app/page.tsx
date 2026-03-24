import Hero from "@/components/Hero";
import Header from "@/components/Resume/Header";
import Objective from "@/components/Resume/Objective";
import Experience from "@/components/Resume/Experience";
import Skills from "@/components/Resume/Skills";
import DominanceDashboard from "@/components/Resume/DominanceDashboard";
import Education from "@/components/Resume/Education";
import References from "@/components/Resume/References";
import Contact from "@/components/Resume/Contact";
import Counter1316 from "@/components/Resume/Counter1316";
import GridMotion from "@/components/Animations/GridMotion";
import SplashCursor from "@/components/Animations/SplashCursor";
import AcknowledgeNavigator from "@/components/Resume/AcknowledgeNavigator";

const bloodlineItems = [
  "/highlights/wrestlemania_unification_2022.webp", "Spear", "/highlights/crowned_as_tribal_chief.webp", "Superman Punch", "/highlights/elimination_chamber_2018.webp", "Elimination Chamber", "/highlights/ulafala_win_again_solosikoa.webp",
  "Guillotine", "/highlights/universal_title_win_2020.webp", "Acknowledge Me", "/highlights/undertaker_def_2017.webp", "Head of the Table", "/highlights/universal_title_win_2018.webp", "Tribal Chief",
  "/highlights/royal_rumble_2026.webp", "The Bloodline", "/highlights/us_championship_2016.webp", "Main Event", "/highlights/wwe_championship_first_win_2015.webp", "WrestleMania", "/highlights/intercontienental_win_2017.webp",
  "Royal Rumble", "/highlights/royal_rumble2015.webp", "1316 Days", "Undisputed", "Universal", "WWE Champ", "Island of Relevancy"
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[--background] text-[--foreground] transition-colors duration-500 overflow-clip selection:bg-[--accent] selection:text-white">
      <SplashCursor />
      <AcknowledgeNavigator />
      <Counter1316 />

      <Hero />

      <div className="relative z-20 bg-[--background]">
        <div className="relative">
          <Header />
          <Objective />
          <div id="experience"><Experience /></div>

          <section id="highlights" className="py-20 border-b border-[--border-color] overflow-hidden">
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] mb-8 text-center font-subheading">
              Career Highlights
            </h2>
            <div className="h-[600px] w-full">
              <GridMotion items={bloodlineItems} />
            </div>
          </section>
        </div>

        <div id="skills"><Skills /></div>
        <div id="dominance"><DominanceDashboard /></div>
        <Education />
        <References />
        <div id="contact"><Contact /></div>
      </div>
    </main>
  );
}
