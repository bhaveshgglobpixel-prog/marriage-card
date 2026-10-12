import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Calendar, Check, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpStatus, RsvpResponse } from '../types';
import { romanticAudio } from '../utils/audioSynth';

interface ThreeOptionRsvpProps {
  currentResponse: RsvpResponse | null;
  onSelectStatus: (status: RsvpStatus, guestName?: string) => void;
}

export const ThreeOptionRsvp: React.FC<ThreeOptionRsvpProps> = ({
  currentResponse,
  onSelectStatus,
}) => {
  const [nameInput, setNameInput] = useState(currentResponse?.guestName || '');
  const [nameSaved, setNameSaved] = useState(false);

  const currentStatus = currentResponse?.status;

  const handleButtonClick = (status: RsvpStatus) => {
    onSelectStatus(status, nameInput.trim() || currentResponse?.guestName);

    if (status === 'attending') {
      romanticAudio.playChimeReveal();
      confetti({
        particleCount: 100,
        spread: 85,
        origin: { y: 0.7 },
        colors: ['#2D6A4F', '#8EC5E5', '#FAD2C0', '#F8B1A5', '#FFF3D6'],
      });
    } else {
      romanticAudio.playChimeReveal();
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStatus) {
      onSelectStatus(currentStatus, nameInput.trim());
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2500);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Alexa & Richard Wedding');
    const details = encodeURIComponent(
      'Wedding Celebrations on 15 December:\n' +
      '• 2:00 PM – Mandap Ceremony\n' +
      '• 6:00 PM – Dinner\n' +
      '• 9:00 PM – Raas Garba'
    );
    const start = '20261215T140000';
    const end = '20261216T000000';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="rsvp"
      className="w-full max-w-2xl mx-auto py-16 px-4 flex flex-col items-center text-center scroll-mt-24"
    >
      {/* Luxury Stationery Card Frame */}
      <div className="w-full bg-[#FAF7F2] rounded-3xl sm:rounded-[36px] border-2 border-[#E7DFD0] shadow-xl p-6 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative corner flourishes */}
        <div className="absolute top-4 left-4 text-[#D8CCA9] opacity-40 select-none pointer-events-none text-xs font-serif-luxury">
          ✦ ❦
        </div>
        <div className="absolute top-4 right-4 text-[#D8CCA9] opacity-40 select-none pointer-events-none text-xs font-serif-luxury">
          ❦ ✦
        </div>
        <div className="absolute bottom-4 left-4 text-[#D8CCA9] opacity-40 select-none pointer-events-none text-xs font-serif-luxury">
          ✦ ❦
        </div>
        <div className="absolute bottom-4 right-4 text-[#D8CCA9] opacity-40 select-none pointer-events-none text-xs font-serif-luxury">
          ❦ ✦
        </div>

        {/* Monogram Seal */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#E0D5BE] shadow-xs text-[#8EC5E5] mb-3">
          <span className="font-serif-luxury text-base font-semibold tracking-wider text-[#1B365D]">
            A & R
          </span>
        </div>

        {/* Section Pre-title */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-6 h-px bg-[#D9CFBF]" />
          <span className="font-outfit text-xs uppercase tracking-[0.25em] text-[#7A726A] font-semibold">
            Répondez S’il Vous Plaît
          </span>
          <span className="w-6 h-px bg-[#D9CFBF]" />
        </div>

        {/* Title in signature script font */}
        <h2 className="font-script text-5xl sm:text-6xl text-[#2B2724] tracking-wide mt-1">
          Confirm Your Attendance
        </h2>

        {/* Subtitle in Outfit font */}
        <p className="font-outfit text-sm sm:text-base text-[#524C46] mt-2 max-w-md mx-auto font-normal leading-relaxed">
          Kindly let us know if you will be celebrating with us on{' '}
          <strong className="text-[#1B365D] font-semibold">15 December</strong>.
        </p>

        {/* Quick event timeline summary pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-outfit text-[#59524A]">
          <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFC8]">
            <strong className="text-[#1B365D]">2:00 PM</strong> Mandap Ceremony
          </span>
          <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFC8]">
            <strong className="text-[#1B365D]">6:00 PM</strong> Dinner
          </span>
          <span className="px-3 py-1 rounded-full bg-white/80 border border-[#E8DFC8]">
            <strong className="text-[#1B365D]">9:00 PM</strong> Raas Garba
          </span>
        </div>

        {/* Exactly Three Clear & Beautiful Response Buttons */}
        <div className="w-full max-w-lg mx-auto mt-8 space-y-3.5">
          {/* Button 1: Yes, I Will Attend */}
          <button
            type="button"
            onClick={() => handleButtonClick('attending')}
            className={`w-full p-4.5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'attending'
                ? 'bg-[#EBF7F0] border-[#2D6A4F] text-[#1B4332] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#F6FBF8] border-[#D1E7DD] text-[#2D2A26] hover:border-[#2D6A4F]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  currentStatus === 'attending'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-[#EBF7F0] text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base sm:text-lg font-bold block leading-tight">
                  Yes, I Will Attend
                </span>
                <span className="font-outfit text-xs sm:text-sm text-[#524C46] mt-0.5 block">
                  Delighted to celebrate with you on 15 December
                </span>
              </div>
            </div>
            {currentStatus === 'attending' && (
              <span className="px-3 py-1.5 rounded-full bg-[#2D6A4F] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0 ml-2 shadow-xs">
                Selected ✓
              </span>
            )}
          </button>

          {/* Button 2: No, I Cannot Attend */}
          <button
            type="button"
            onClick={() => handleButtonClick('declining')}
            className={`w-full p-4.5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'declining'
                ? 'bg-[#FDF3F1] border-[#9C5B53] text-[#7A3626] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#FDF7F6] border-[#E8D4D1] text-[#2D2A26] hover:border-[#9C5B53]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  currentStatus === 'declining'
                    ? 'bg-[#9C5B53] text-white shadow-xs'
                    : 'bg-[#FDF3F1] text-[#9C5B53] group-hover:bg-[#9C5B53] group-hover:text-white'
                }`}
              >
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base sm:text-lg font-bold block leading-tight">
                  No, I Cannot Attend
                </span>
                <span className="font-outfit text-xs sm:text-sm text-[#524C46] mt-0.5 block">
                  Sending warm love & blessings from afar
                </span>
              </div>
            </div>
            {currentStatus === 'declining' && (
              <span className="px-3 py-1.5 rounded-full bg-[#9C5B53] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0 ml-2 shadow-xs">
                Selected ✓
              </span>
            )}
          </button>

          {/* Button 3: Not Sure Yet */}
          <button
            type="button"
            onClick={() => handleButtonClick('not_sure')}
            className={`w-full p-4.5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'not_sure'
                ? 'bg-[#EFF6FA] border-[#4A90B8] text-[#1B365D] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#F5F9FC] border-[#D4E5F0] text-[#2D2A26] hover:border-[#4A90B8]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  currentStatus === 'not_sure'
                    ? 'bg-[#4A90B8] text-white shadow-xs'
                    : 'bg-[#EFF6FA] text-[#4A90B8] group-hover:bg-[#4A90B8] group-hover:text-white'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base sm:text-lg font-bold block leading-tight">
                  Not Sure Yet
                </span>
                <span className="font-outfit text-xs sm:text-sm text-[#524C46] mt-0.5 block">
                  Will confirm closer to the celebration
                </span>
              </div>
            </div>
            {currentStatus === 'not_sure' && (
              <span className="px-3 py-1.5 rounded-full bg-[#4A90B8] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0 ml-2 shadow-xs">
                Selected ✓
              </span>
            )}
          </button>
        </div>

        {/* Confirmed State Notification & Details Card */}
        {currentStatus && (
          <div className="mt-8 w-full max-w-lg mx-auto bg-white rounded-2xl p-5 border border-[#E5DAC0] shadow-sm animate-fadeIn text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-outfit text-xs font-bold text-[#1B365D] uppercase tracking-wider">
                  Attendance Response Confirmed & Saved
                </span>
              </div>
              <span className="font-outfit text-[11px] text-[#7A7167]">
                {currentResponse?.updatedAt ? new Date(currentResponse.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Saved'}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 font-outfit text-xs text-[#524C46]">
              <p>
                <strong className="text-[#2B2724] font-semibold">Current Selection:</strong>{' '}
                <span className="font-bold text-[#1B365D]">
                  {currentStatus === 'attending'
                    ? 'Yes, I Will Attend'
                    : currentStatus === 'declining'
                    ? 'No, I Cannot Attend'
                    : 'Not Sure Yet'}
                </span>
              </p>
              {currentResponse?.guestName && (
                <p>
                  <strong className="text-[#2B2724] font-semibold">Guest Name:</strong>{' '}
                  {currentResponse.guestName}
                </p>
              )}
            </div>

            {/* Optional guest name inline input */}
            <form onSubmit={handleSaveName} className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center gap-2">
              <input
                type="text"
                placeholder="Add your name (optional)"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-outfit rounded-xl border border-[#D9D0C3] bg-[#FAF7F2] text-[#2B2724] focus:outline-none focus:border-[#4A90B8]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-outfit font-semibold rounded-xl bg-[#1B365D] hover:bg-[#12243F] text-white transition-colors cursor-pointer shrink-0"
              >
                {nameSaved ? 'Saved ✓' : 'Save Name'}
              </button>
            </form>

            {currentStatus === 'attending' && (
              <div className="mt-4 pt-3 border-t border-[#F0EBE1]">
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EBE1] text-[#1B365D] border border-[#DDD5C8] font-outfit text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#4A90B8]" />
                  <span>Add 15 Dec to Calendar</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
