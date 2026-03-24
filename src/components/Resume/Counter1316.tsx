"use client";

import CircularText from "@/components/Animations/CircularText";
import Image from "next/image";

export default function Counter1316() {
  return (
    <div className="fixed bottom-10 right-10 z-[110] pointer-events-auto">
      <CircularText 
        text="ACKNOWLEDGE ME • 1316 • "
        spinDuration={15}
        onHover="speedUp"
        className="font-subheading tracking-widest scale-50 md:scale-75 lg:scale-100"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 bg-[--accent] rounded-full flex items-center justify-center border-4 border-black animate-pulse overflow-hidden">
           <Image src="/wetheones.webp" alt="We The Ones" width={48} height={48} className="w-full h-full object-contain p-1" />
        </div>
      </div>
    </div>
  );
}
