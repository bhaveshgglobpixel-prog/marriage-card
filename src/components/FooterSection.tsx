import React, { useState } from 'react';
import { Share2, Check, ArrowUp } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Alexa & Richard Wedding Invitation',
        text: 'Join us for the Dolce Vita wedding celebration of Alexa & Richard!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-xl mx-auto pt-10 pb-20 px-4 flex flex-col items-center text-center">
      {/* Script: Hope to see you there! */}
      <p className="font-script text-4xl sm:text-5xl text-[#524C46] tracking-wide">
        Hope to see you there!
      </p>

      {/* Couple Signature Names in script */}
      <h3 className="font-script text-3xl sm:text-4xl text-[#2B2724] tracking-wider mt-1">
        Alexa & Richard
      </h3>

      {/* Hand-drawn delicate Heart icon */}
      <div className="my-5 text-[#8AC4E4]">
        <svg
          className="w-8 h-8 mx-auto"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 34 C8 24 4 17 4 11 C4 6 8 3 13 3 C16.5 3 19 5.5 20 7.5 C21 5.5 23.5 3 27 3 C32 3 36 6 36 11 C36 17 32 24 20 34 Z" />
        </svg>
      </div>

      {/* Arched Portrait Photo of the couple with the REAL wedding photograph */}
      <div className="w-full max-w-xs aspect-[9/13] rounded-t-[140px] overflow-hidden shadow-2xl border-4 border-[#F2ECE1] bg-[#FAF7F2] relative group">
        <img
          src="/assets/couple_portrait.jpg"
          alt="Alexa and Richard embracing warmly on the beach"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Soft bottom scrim */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#26211C]/80 via-transparent to-transparent flex flex-col items-center justify-end pb-4 text-white">
          <span className="font-outfit text-xs uppercase tracking-[0.25em] font-medium text-white/90">
            15 December
          </span>
        </div>
      </div>

      {/* Share & Quick Utility Actions in Outfit font */}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={handleShare}
          className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DDD5C8] text-xs font-outfit uppercase tracking-wider text-[#5A544E] transition-all shadow-2xs cursor-pointer font-semibold"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#4A90B8]" />
              <span>Share Invitation</span>
            </>
          )}
        </button>

        <button
          onClick={scrollToTop}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#DDD5C8] text-[#5A544E] transition-all shadow-2xs cursor-pointer"
          title="Back to top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Quiet Footer Note in Outfit font */}
      <div className="mt-8 text-center text-xs text-[#A69D92] font-outfit">
        <p>Alexa & Richard · 15 December · Wedding Celebration</p>
      </div>
    </footer>
  );
};
