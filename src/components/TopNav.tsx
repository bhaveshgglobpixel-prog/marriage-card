import React from 'react';

interface TopNavProps {
  onOpenRsvp: () => void;
  onScrollToRsvp?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenRsvp, onScrollToRsvp }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRsvpLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Directly open the 3 attendance buttons modal when clicking RSVP
    onOpenRsvp();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Zone 1: Brand single text element wordmark */}
        <a
          href="#"
          onClick={scrollToTop}
          className="font-script text-2xl sm:text-3xl text-[#2B2724] hover:text-[#4A90B8] transition-colors whitespace-nowrap cursor-pointer"
        >
          Alexa & Richard
        </a>

        {/* Zone 2: Clean text navigation links in Outfit font */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-outfit uppercase tracking-widest text-[#6E665E] font-medium">
          <a href="#the-date" className="hover:text-[#1B365D] transition-colors py-1">
            The Date
          </a>
          <a href="#invitation-card" className="hover:text-[#1B365D] transition-colors py-1">
            Invitation
          </a>
          <a href="#schedule" className="hover:text-[#1B365D] transition-colors py-1">
            Schedule
          </a>
          <a href="#venue" className="hover:text-[#1B365D] transition-colors py-1">
            Venue
          </a>
          <a
            href="#rsvp"
            onClick={handleRsvpLinkClick}
            className="hover:text-[#1B365D] transition-colors py-1 cursor-pointer font-bold text-[#1B365D]"
          >
            RSVP
          </a>
        </nav>

        {/* Zone 3: 1 primary action button - Clicking opens the 3 attendance buttons modal */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRsvp}
            className="min-h-[38px] sm:min-h-[42px] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#8EC5E5] hover:bg-[#72B7DD] text-white font-outfit text-xs uppercase tracking-widest font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
          >
            RSVP
          </button>
        </div>
      </div>
    </header>
  );
};
