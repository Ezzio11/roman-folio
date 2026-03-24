import React from "react";
import Stack from "@/components/Animations/Stack";
import Image from "next/image";

const timeline = [
  {
    year: "2010–2012",
    phase: "THE GENESIS",
    title: "FCW / NXT / THE SHIELD",
    role: "WWE Development",
    body: "Signed in 2010. Rebuilt the athlete into an entertainer. Ended this phase with a historic debut at Survivor Series 2012 as part of The Shield.",
    num: "04",
    theme: "from-[--accent]",
    image: "/education/NXT.webp"
  },
  {
    year: "2008",
    phase: "THE GRIND",
    title: "Jacksonville & Edmonton",
    role: "NFL → CFL Transition",
    body: "A brief camp stint with the Jaguars, followed by a full season with the Edmonton Eskimos in the CFL. Nine tackles before closing the book on football.",
    num: "03",
    theme: "from-green-950",
    image: "/education/JACKSONVILLE.webp"
  },
  {
    year: "2007",
    phase: "UNDRAFTED",
    title: "Minnesota Vikings",
    role: "UDFA Pursuit",
    body: "Signed as an undrafted free agent. Released after the first battle with Leukemia was discovered during his physical. The real fight began here.",
    num: "02",
    theme: "from-purple-950",
    image: "/education/VIKINGS.webp"
  },
  {
    year: "2003–2006",
    phase: "THE FOUNDATION",
    title: "Georgia Tech",
    role: "Defensive Tackle & Captain",
    body: "Three-year starter. First-team All-ACC. Recorded 29 TFLs and 12 sacks. Played alongside future legend Calvin 'Megatron' Johnson.",
    num: "01",
    theme: "from-blue-950",
    image: "/education/NCAA.webp"
  },
];

export default function Education() {
  const cards = timeline.map((item, i) => (
    <div 
      key={i} 
      className="relative w-full h-full overflow-hidden bg-[#050505] flex flex-col rounded-2xl border border-white/10 group shadow-2xl"
    >
      {/* ☝️ High-Contrast Archival Asset Layer — Subject Focused */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover brightness-[1.1] contrast-[1.2] grayscale group-hover:grayscale-0 transition-all duration-1000"
          priority={i === 0}
        />
        {/* Surgical Radial Vignette — Keeps the face (center-top) 100% clear */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_20%,_rgba(0,0,0,0.85)_100%)] opacity-80" />
      </div>

      {/* ☝️ Face-First Editorial Content */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Area: Purely Visual (No large text here to avoid masking face) */}
        <div className="flex-grow pt-12 px-12 relative">
           {/* Vertical Phase Label on the far left */}
           <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
             <p className="text-[10px] font-black text-[--accent] uppercase tracking-[0.6em] font-subheading whitespace-nowrap opacity-60">
               {item.phase}
             </p>
           </div>
        </div>

        {/* Bottom Area: Lower-Thirds Data Block */}
        <div className="p-8 md:p-12 space-y-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          
          <div className="space-y-1">
            <div className="flex items-baseline gap-4">
              <h3 className="text-4xl md:text-7xl font-black text-white font-heading uppercase tracking-tighter italic drop-shadow-2xl">
                {item.year}
              </h3>
            </div>
          </div>

          <div className="h-px w-12 bg-[--accent]/40" />

          <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-black text-white uppercase font-heading text-balance drop-shadow-md">
              {item.title}
            </h4>
            <p className="text-[10px] font-bold text-[--accent-gold] uppercase tracking-[0.3em] font-subheading">
              {item.role}
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-xs md:text-sm text-white/90 font-body italic leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none">
              &ldquo;{item.body}&rdquo;
            </p>
          </div>
        </div>

        {/* Ghost Watermark — Moved to non-competing corner */}
        <div className="absolute right-4 top-4 text-7xl font-black text-white/5 font-heading pointer-events-none select-none italic">
          {item.num}
        </div>
      </div>
    </div>
  ));

  return (
    <section
      className="relative py-48 px-8 bg-[#050000] border-b border-white/5 overflow-hidden"
      id="education"
    >
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-24">

        {/* Left Side: Copy */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[--accent] uppercase tracking-[0.8em] font-subheading">
              Before the Throne
            </p>
            <h2 className="text-6xl md:text-8xl font-black text-white font-subheading uppercase italic leading-none">
              Origins
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-base font-body italic leading-relaxed max-w-sm mx-auto lg:mx-0">
            Flip through the documented archives of the Tribal Chief. Every adversity was a step toward the Head of the Table.
          </p>
          <div className="flex items-center gap-4 justify-center lg:justify-start pt-8">
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              [ Click or Drag to Flip ]
            </div>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>

        {/* Right Side: The Stack */}
        <div className="w-full lg:w-[500px] h-[450px] md:h-[600px] relative flex items-center justify-center">
          <Stack
            cards={cards}
            randomRotation={true}
            sensitivity={150}
            sendToBackOnClick={true}
            animationConfig={{ stiffness: 200, damping: 20 }}
          />
        </div>

      </div>

      {/* ☝️ Ambient Deep Background Watermark */}
      <div className="absolute -bottom-24 -left-24 text-[300px] font-black text-white/[0.01] font-heading select-none pointer-events-none italic">
        ANOA&apos;I
      </div>
    </section>
  );
}
