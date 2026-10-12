import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Heart } from 'lucide-react';

interface HeroArchProps {
  onScrollToDate: () => void;
}

export const HeroArch: React.FC<HeroArchProps> = ({ onScrollToDate }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Safe fallback if mobile browser blocks autoplay
      });
    }
  }, []);

  return (
    <section id="hero" className="relative w-full max-w-xl mx-auto pt-6 pb-12 px-4 flex flex-col items-center text-center overflow-hidden scroll-mt-20">
      {/* Top Monogram Crest */}
      <div className="mb-4 flex items-center justify-center gap-2 text-[#9A8F85]">
        <div className="w-8 h-px bg-[#D6CEC4]" />
        <span className="text-xs tracking-[0.3em] uppercase font-outfit font-light">A & R</span>
        <div className="w-8 h-px bg-[#D6CEC4]" />
      </div>

      {/* Main Classical Arched Window with Real Lake Como Video & Still */}
      <div className="relative w-full aspect-[9/15] sm:aspect-[9/14] rounded-t-[180px] sm:rounded-t-[220px] overflow-hidden shadow-2xl border-4 sm:border-[6px] border-[#F2ECE1] bg-[#FAF7F2]">
        
        {/* Real Looping Lake Como Villa Terrace Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero_still.png"
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/assets/hero_video.mp4" type="video/mp4" />
        </video>

        {/* High-Res Still Poster Fallback */}
        <img
          src="/assets/hero_still.png"
          alt="Lake Como Italian Villa Arch Terrace with Roses"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          referrerPolicy="no-referrer"
          loading="eager"
        />

        {/* Central Overlay: Couple Names & Announcement matching exact typography */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-24 sm:pt-28 px-4 pointer-events-none">
          <div className="bg-white/65 backdrop-blur-xs rounded-3xl px-6 py-6 border border-white/50 shadow-sm max-w-sm mx-auto">
            <h1 className="font-script text-5xl sm:text-6xl text-[#2B2724] tracking-wide leading-tight">
              Alexa & Richard
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[#5E5750] mt-1 font-light tracking-wide">
              are getting married!
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 text-[#9E9489]">
              <span className="w-6 h-px bg-[#C8BFB5]" />
              <Heart className="w-3.5 h-3.5 text-[#E68E80] fill-[#E68E80]/40" />
              <span className="w-6 h-px bg-[#C8BFB5]" />
            </div>

            <p className="font-outfit text-xs uppercase tracking-[0.25em] text-[#7A726A] mt-2 font-medium">
              15 December · Wedding Celebration
            </p>
          </div>
        </div>

        {/* Soft Bottom Fog / Gradient to blend seamlessly with page */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none" />
      </div>

      {/* Guidance to scratch date */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={onScrollToDate}
          className="group flex flex-col items-center text-[#8C8276] hover:text-[#2B2724] transition-colors focus:outline-none cursor-pointer py-2 px-4 rounded-full"
          aria-label="Scroll to date"
        >
          <span className="font-outfit text-sm tracking-wide text-[#6E665E]">Discover the Celebration Date</span>
          <ChevronDown className="w-4 h-4 mt-1 animate-bounce text-[#A59B8F] group-hover:text-[#2B2724]" />
        </button>
      </div>
    </section>
  );
};
