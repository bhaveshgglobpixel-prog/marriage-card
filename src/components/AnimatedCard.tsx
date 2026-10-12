import React, { useState } from 'react';
import { Sparkles, MailOpen, Mail, Heart, Clock, Calendar } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

export const AnimatedCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCard = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    romanticAudio.playEnvelopeOpen();
    setIsOpen((prev) => !prev);
  };

  return (
    <section id="invitation-card" className="relative w-full max-w-xl mx-auto py-14 px-4 flex flex-col items-center text-center scroll-mt-20 overflow-visible">
      {/* Soft floating decorative bubbles in background for magical atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        <div
          className="absolute top-10 left-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[#B9DEEF]/30 to-[#FAD2C0]/30 blur-xs animate-bubble-float"
          style={{ animationDuration: '8s', animationDelay: '0s' }}
        />
        <div
          className="absolute top-36 right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-[#F8B1A5]/25 to-[#B9DEEF]/35 blur-xs animate-bubble-float"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-16 left-12 w-14 h-14 rounded-full bg-gradient-to-tr from-[#FAF2D5]/35 to-[#B9DEEF]/30 blur-xs animate-bubble-float"
          style={{ animationDuration: '9s', animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-1/2 right-16 w-12 h-12 rounded-full bg-gradient-to-tr from-[#E6F3FA]/40 to-[#FCE6DF]/40 blur-xs animate-bubble-float"
          style={{ animationDuration: '11s', animationDelay: '3s' }}
        />
      </div>

      {/* Decorative top hearts header */}
      <div className="flex items-center justify-center gap-2 mb-4 text-[#7BB8DB]">
        <svg
          className="w-8 h-8 text-[#6FAED3] transform -rotate-12 transition-transform hover:scale-110"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 33 C10 24 5 18 5 12 C5 7 9 4 14 4 C17 4 19 6 20 8 C21 6 23 4 26 4 C31 4 35 7 35 12 C35 18 30 24 20 33 Z" />
        </svg>
        <span className="font-outfit text-xs uppercase tracking-[0.25em] text-[#7A726A] font-medium px-2">
          The Wedding Invitation
        </span>
        <svg
          className="w-6 h-6 text-[#8AC4E4] transform rotate-12 -translate-y-1 transition-transform hover:scale-110"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 33 C10 24 5 18 5 12 C5 7 9 4 14 4 C17 4 19 6 20 8 C21 6 23 4 26 4 C31 4 35 7 35 12 C35 18 30 24 20 33 Z" />
        </svg>
      </div>

      <h2 className="font-script text-5xl sm:text-6xl text-[#332F2C] tracking-wide mb-2">
        You Are Invited
      </h2>

      {/* Clear instruction hint for guests */}
      <div className="mb-6">
        <button
          onClick={handleToggleCard}
          className={`px-5 py-2 rounded-full font-outfit text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isOpen
              ? 'bg-[#FAF7F2] text-[#6E665E] border border-[#DDD5C8]'
              : 'bg-white text-[#1B365D] border-2 border-[#8EC5E5] animate-gentle-pulse font-semibold'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4A90B8]" />
          <span>{isOpen ? 'Tap anywhere to fold card' : '✨ Tap to Open Invitation ✨'}</span>
        </button>
      </div>

      {/* 3D Interactive Folding Wedding Card Container */}
      <div
        className="relative w-full max-w-md cursor-pointer select-none"
        onClick={handleToggleCard}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label="Wedding invitation card"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggleCard(e as unknown as React.MouseEvent);
          }
        }}
        style={{ perspective: 1200, WebkitPerspective: 1200 }}
      >
        {/* CARD WRAPPER */}
        <div className="relative w-full transition-all duration-700 ease-out">
          {/* INSIDE CONTENT (Shown after opening with smooth fade-in and expansion) */}
          <div
            className={`w-full bg-[#FCFAF7] rounded-3xl border-2 border-[#E8DFC8] shadow-2xl p-6 sm:p-8 text-center transition-all duration-700 ease-in-out ${
              isOpen
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-4 scale-95 pointer-events-none absolute inset-0'
            }`}
          >
            {/* Top Ornamental Header */}
            <div className="flex items-center justify-center gap-2 text-[#C4A47C] mb-3">
              <span className="w-8 h-px bg-[#D9CFBF]" />
              <span className="text-xs">✦</span>
              <span className="font-outfit text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C7654]">
                Wedding Celebration
              </span>
              <span className="text-xs">✦</span>
              <span className="w-8 h-px bg-[#D9CFBF]" />
            </div>

            {/* Couple Calligraphy */}
            <h3 className="font-script text-4xl sm:text-5xl text-[#2B2724] tracking-wide leading-tight">
              Alexa & Richard
            </h3>

            {/* Heartfelt Invitation Prose */}
            <div className="my-4 space-y-2 font-outfit text-[#524C46] text-sm sm:text-base leading-relaxed font-light">
              <p>
                Together with their families, Alexa & Richard request the honor of your presence as they unite in marriage.
              </p>
              <p className="text-xs sm:text-sm text-[#7A7167]">
                Your love and blessings mean the world to us as we begin our new journey together.
              </p>
            </div>

            {/* Date Highlight Box */}
            <div className="my-5 p-3.5 rounded-2xl bg-[#F7F2E8] border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-center gap-2 text-[#7A633F]">
                <Calendar className="w-4 h-4 text-[#8C7654]" />
                <span className="font-outfit text-base sm:text-lg font-bold tracking-wider uppercase">
                  15 December
                </span>
              </div>
            </div>

            {/* 3 Events clearly shown on inside of card */}
            <div className="mt-4 pt-4 border-t border-[#EDE5D8] space-y-3 text-left">
              <p className="font-outfit text-xs uppercase tracking-widest text-center text-[#8C7654] font-semibold mb-3">
                Events of the Day
              </p>

              {/* Event 1 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/80 border border-[#F0EBE1] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#EEF7FC] text-[#1B365D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-outfit text-xs font-bold text-[#1B365D] block">
                    2:00 PM – Mandap Ceremony
                  </span>
                  <span className="font-outfit text-xs text-[#6B635A]">
                    Sacred vows, traditional rituals, and auspicious blessings.
                  </span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/80 border border-[#F0EBE1] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#FFF5EB] text-[#8C4A3A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-outfit text-xs font-bold text-[#8C4A3A] block">
                    6:00 PM – Dinner
                  </span>
                  <span className="font-outfit text-xs text-[#6B635A]">
                    A joyous banquet celebration with family and friends.
                  </span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/80 border border-[#F0EBE1] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#F3EBF9] text-[#5C2B7D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-outfit text-xs font-bold text-[#5C2B7D] block">
                    9:00 PM – Raas Garba
                  </span>
                  <span className="font-outfit text-xs text-[#6B635A]">
                    Rhythmic traditional folk dancing and music under the stars.
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer Flourish */}
            <div className="mt-6 pt-3 flex items-center justify-center gap-1.5 text-[#A69B8D]">
              <Heart className="w-3.5 h-3.5 text-[#E68E80] fill-[#E68E80]" />
              <span className="font-script text-xl text-[#6E645A]">Alexa & Richard</span>
            </div>

            <p className="font-outfit text-[11px] text-[#A69B8D] mt-2">
              (Tap anywhere to fold card closed)
            </p>
          </div>

          {/* FRONT COVER OF CARD (Shown when closed) */}
          <div
            className={`w-full rounded-3xl overflow-hidden shadow-2xl border-3 border-[#E5DAC0] bg-gradient-to-br from-[#FCFAF7] via-[#F8F3EA] to-[#EFE7D8] p-7 sm:p-9 text-center transition-all duration-700 ease-in-out relative ${
              isOpen
                ? 'opacity-0 pointer-events-none scale-95 absolute inset-0'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Elegant Double Gold Inset Border */}
            <div className="absolute inset-3 border border-[#D9CBA8] rounded-2xl pointer-events-none opacity-80" />
            <div className="absolute inset-4.5 border border-[#E8DFC8] rounded-xl pointer-events-none opacity-60" />

            {/* Corner Decorative Ornaments */}
            <span className="absolute top-5 left-5 text-[#C4A47C] text-sm pointer-events-none">❖</span>
            <span className="absolute top-5 right-5 text-[#C4A47C] text-sm pointer-events-none">❖</span>
            <span className="absolute bottom-5 left-5 text-[#C4A47C] text-sm pointer-events-none">❖</span>
            <span className="absolute bottom-5 right-5 text-[#C4A47C] text-sm pointer-events-none">❖</span>

            {/* Royal Monogram Emblem */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 bg-gradient-to-tr from-[#E8DFC8] via-[#FAF5EC] to-[#E2D5B8] p-1 shadow-md flex items-center justify-center border border-[#D9CBA8]">
              <div className="w-full h-full rounded-full border border-dashed border-[#C4A47C] flex flex-col items-center justify-center bg-white/70">
                <span className="font-outfit font-bold text-sm tracking-wider text-[#7A633F]">A & R</span>
                <span className="text-[10px] text-[#A8926B]">✦</span>
              </div>
            </div>

            {/* Title on Front Cover */}
            <p className="font-outfit text-xs uppercase tracking-[0.25em] text-[#8C7654] font-semibold mb-1">
              Wedding Invitation
            </p>

            <h3 className="font-script text-4xl sm:text-5xl text-[#2B2724] tracking-wide my-1">
              Alexa & Richard
            </h3>

            <p className="font-outfit text-sm text-[#6E645A] mt-2 font-medium">
              Request the pleasure of your company
            </p>

            {/* Wedding Date Highlight */}
            <div className="inline-block mt-4 px-4 py-1.5 rounded-full bg-white/90 border border-[#D9CBA8] shadow-2xs">
              <span className="font-outfit text-xs tracking-widest uppercase font-bold text-[#1B365D]">
                15 December
              </span>
            </div>

            {/* Tap to open button badge */}
            <div className="mt-8 pt-3 border-t border-[#E8DFC8]/60 flex flex-col items-center">
              <div className="flex items-center gap-2 text-xs font-outfit uppercase tracking-wider text-[#1B365D] font-bold">
                <MailOpen className="w-4 h-4 text-[#4A90B8]" />
                <span>Click or Tap to Open</span>
              </div>
              <span className="text-[11px] font-outfit text-[#8A7F73] mt-0.5">
                Unfold to read the invitation & event schedule
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick toggle button */}
      <button
        onClick={handleToggleCard}
        className="mt-6 flex items-center gap-2 font-outfit text-xs tracking-wider uppercase text-[#5A87A5] hover:text-[#1B365D] transition-colors font-semibold cursor-pointer min-h-[44px] px-4 py-2 rounded-full"
      >
        {isOpen ? (
          <>
            <Mail className="w-4 h-4" />
            <span>Fold Invitation Card</span>
          </>
        ) : (
          <>
            <MailOpen className="w-4 h-4" />
            <span>Open Invitation Card</span>
          </>
        )}
      </button>
    </section>
  );
};
