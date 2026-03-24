"use client";

import FallingText from "@/components/Animations/FallingText";

const skillsResource = [
  { category: "MANAGERIAL DOMINANCE", items: ["Personnel Management", "Crisis Resolution", "Succession Planning", "Strategic Negotiation"] },
  { category: "TACTICAL OFFENSE", items: ["Spear Deployment", "Superman Punch Precision", "Guillotine Choke-out", "Ring Generalship"] },
  { category: "ORATORY PROWESS", items: ["Public Speaking", "Acknowledge Me Branding", "Island Narrative Control", "Special Counsel Coordination"] },
  { category: "RESILIENCE", items: ["Main Event Stamina", "Steel Chair Resistance", "Iron Will", "Legacy Preservation"] },
];

export default function Skills() {
  // Flatten all skills into a single high-impact string for the physics engine
  const allSkills = skillsResource
    .flatMap(s => s.items)
    .join(" ")
    .toUpperCase();

  // Words that should be highlighted in crimson
  const highlights = ["SPEAR", "SUPERMAN", "GUILLOTINE", "ACKNOWLEDGE", "MAIN", "LEGACY"];

  return (
    <section id="skills" className="py-32 px-8 max-w-7xl mx-auto border-b border-[--border-color] relative z-10 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 items-start h-[600px]">
        {/* Left Side: Traditional Labels for Context */}
        <div className="w-full md:w-1/3 space-y-12">
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[--accent] mb-16 font-subheading">
            TACTICAL ARSENAL
          </h2>
          <div className="space-y-8">
            {skillsResource.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-black text-white/10 font-heading">0{index + 1}</span>
                  <h3 className="text-sm font-black text-white/60 font-heading uppercase tracking-widest">
                    {skill.category}
                  </h3>
                </div>
                <div className="h-0.5 w-0 group-hover:w-full bg-[--accent]/30 transition-all duration-500" />
              </div>
            ))}
          </div>
          
          <div className="pt-12">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] leading-relaxed">
              * Interact with the Arsenal. <br />
              Grab and throw the elements of dominance.
            </p>
          </div>
        </div>

        {/* Right Side: Falling Text Physics Arena */}
        <div className="flex-1 w-full h-full bg-white/[0.01] border border-white/5 rounded-3xl relative overflow-hidden cursor-crosshair group">
          <FallingText
            text={allSkills}
            highlightWords={highlights}
            trigger="scroll"
            fontSize="clamp(1.5rem, 4vw, 3rem)"
            gravity={0.8}
            mouseConstraintStiffness={0.1}
          />
          
          {/* Subtle instructions overlay that fades on hover */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
            <span className="text-[10px] font-black uppercase tracking-[1em] text-white/5">
              Field of Dominance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
