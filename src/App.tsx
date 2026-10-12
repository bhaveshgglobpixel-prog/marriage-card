import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { HeroArch } from './components/HeroArch';
import { ScratchDate } from './components/ScratchDate';
import { AnimatedCard } from './components/AnimatedCard';
import { ScheduleSection } from './components/ScheduleSection';
import { VenueSection } from './components/VenueSection';
import { ThreeOptionRsvp } from './components/ThreeOptionRsvp';
import { RsvpModal } from './components/RsvpModal';
import { FooterSection } from './components/FooterSection';
import { FallingPetals } from './components/FallingPetals';
import { AudioPlayer } from './components/AudioPlayer';
import { RsvpStatus, RsvpResponse } from './types';

const STORAGE_KEY = 'wedding_rsvp_response_15dec';

export default function App() {
  const [petalsActive, setPetalsActive] = useState(true);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [rsvpResponse, setRsvpResponse] = useState<RsvpResponse | null>(null);

  // Load saved RSVP from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRsvpResponse(JSON.parse(saved) as RsvpResponse);
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const handleSelectRsvpStatus = (status: RsvpStatus, guestName?: string) => {
    const updated: RsvpResponse = {
      status,
      guestName: guestName !== undefined ? guestName : rsvpResponse?.guestName,
      guestCount: status === 'attending' ? (rsvpResponse?.guestCount || 1) : 1,
      message: rsvpResponse?.message || '',
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable fallback
    }

    setRsvpResponse(updated);
  };

  const scrollToDate = () => {
    const el = document.getElementById('the-date');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#383431] relative selection:bg-[#B9DEEF] selection:text-[#1B365D]">
      {/* Falling Romantic Rose Petals Canvas */}
      <FallingPetals enabled={petalsActive} />

      {/* Floating Audio & Petals Control */}
      <AudioPlayer
        petalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
      />

      {/* Clean Top Navigation Bar with RSVP CTA opening the 3-button Attendance Modal */}
      <TopNav
        onOpenRsvp={() => setIsRsvpModalOpen(true)}
        onScrollToRsvp={scrollToRsvp}
      />

      {/* Dedicated Attendance Modal containing ONLY the 3 response buttons */}
      <RsvpModal
        isOpen={isRsvpModalOpen}
        onClose={() => setIsRsvpModalOpen(false)}
        currentResponse={rsvpResponse}
        onSelectStatus={handleSelectRsvpStatus}
        onScrollToDetails={scrollToRsvp}
      />

      {/* Main Wedding Invitation Card Content */}
      <main className="flex flex-col items-center w-full">
        {/* 1. Hero Italian Stone Arch & Romantic Announcement */}
        <HeroArch onScrollToDate={scrollToDate} />

        {/* 2. The Date: 15 December with Scratch-to-Reveal Cards & Live Countdown Timer */}
        <ScratchDate />

        {/* 3. Animated Wedding Invitation Card: Realistic Opening on Tap/Click */}
        <AnimatedCard />

        {/* 4. Schedule of Events: Mandap Ceremony, Dinner & Raas Garba */}
        <ScheduleSection />

        {/* 5. Wedding Venue & Google Maps Integration */}
        <VenueSection />

        {/* 6. Professional Attendance Section: Exactly 3 response buttons with instant selection */}
        <ThreeOptionRsvp
          currentResponse={rsvpResponse}
          onSelectStatus={handleSelectRsvpStatus}
        />

        {/* 7. Footer: Couple Portrait, Share, and Celebration Closing */}
        <FooterSection />
      </main>
    </div>
  );
}
