import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Calendar, Check, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpStatus, RsvpResponse } from '../types';
import { romanticAudio } from '../utils/audioSynth';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentResponse: RsvpResponse | null;
  onSelectStatus: (status: RsvpStatus, guestName?: string) => void;
  onScrollToDetails?: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  currentResponse,
  onSelectStatus,
  onScrollToDetails,
}) => {
  const [nameInput, setNameInput] = useState(currentResponse?.guestName || '');
  const [nameSaved, setNameSaved] = useState(false);

  if (!isOpen) return null;

  const currentStatus = currentResponse?.status;

  const handleButtonClick = (status: RsvpStatus) => {
    onSelectStatus(status, nameInput.trim() || currentResponse?.guestName);

    if (status === 'attending') {
      romanticAudio.playChimeReveal();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
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
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#E7DFD0] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close RSVP modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#6E665E] hover:text-[#2B2724] border border-[#E5DAC0] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Monogram Seal & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#DDD4C0] shadow-xs text-[#8EC5E5] mb-2">
            <span className="font-serif-luxury text-sm font-semibold tracking-wider text-[#1B365D]">
              A & R
            </span>
          </div>
          <span className="block font-outfit text-[11px] tracking-[0.25em] uppercase text-[#736A62] font-semibold">
            Wedding of Alexa & Richard
          </span>
          <h2 className="font-script text-4xl sm:text-5xl text-[#2C2623] mt-1 tracking-wide">
            Confirm Your Attendance
          </h2>
          <p className="font-outfit text-xs sm:text-sm text-[#524C46] mt-1.5 max-w-sm mx-auto leading-relaxed">
            Please let us know if you will celebrate with us on{' '}
            <strong className="text-[#1B365D] font-semibold">15 December</strong>.
          </p>
        </div>

        {/* Exactly Three Response Buttons */}
        <div className="space-y-3">
          {/* Button 1: Yes, I Will Attend */}
          <button
            type="button"
            onClick={() => handleButtonClick('attending')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'attending'
                ? 'bg-[#EBF7F0] border-[#2D6A4F] text-[#1B4332] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#F6FBF8] border-[#D1E7DD] text-[#2D2A26] hover:border-[#2D6A4F]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentStatus === 'attending'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-[#EBF7F0] text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base font-bold block leading-tight">
                  Yes, I Will Attend
                </span>
                <span className="font-outfit text-xs text-[#524C46]">
                  Delighted to celebrate with you on 15 December
                </span>
              </div>
            </div>
            {currentStatus === 'attending' && (
              <span className="px-3 py-1 rounded-full bg-[#2D6A4F] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0">
                Selected ✓
              </span>
            )}
          </button>

          {/* Button 2: No, I Cannot Attend */}
          <button
            type="button"
            onClick={() => handleButtonClick('declining')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'declining'
                ? 'bg-[#FDF3F1] border-[#9C5B53] text-[#7A3626] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#FDF7F6] border-[#E8D4D1] text-[#2D2A26] hover:border-[#9C5B53]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentStatus === 'declining'
                    ? 'bg-[#9C5B53] text-white shadow-xs'
                    : 'bg-[#FDF3F1] text-[#9C5B53] group-hover:bg-[#9C5B53] group-hover:text-white'
                }`}
              >
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base font-bold block leading-tight">
                  No, I Cannot Attend
                </span>
                <span className="font-outfit text-xs text-[#524C46]">
                  Sending warm love & blessings from afar
                </span>
              </div>
            </div>
            {currentStatus === 'declining' && (
              <span className="px-3 py-1 rounded-full bg-[#9C5B53] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0">
                Selected ✓
              </span>
            )}
          </button>

          {/* Button 3: Not Sure Yet */}
          <button
            type="button"
            onClick={() => handleButtonClick('not_sure')}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer group shadow-xs ${
              currentStatus === 'not_sure'
                ? 'bg-[#EFF6FA] border-[#4A90B8] text-[#1B365D] shadow-md scale-[1.01]'
                : 'bg-white hover:bg-[#F5F9FC] border-[#D4E5F0] text-[#2D2A26] hover:border-[#4A90B8]'
            }`}
          >
            <div className="flex items-center gap-3.5 text-left">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentStatus === 'not_sure'
                    ? 'bg-[#4A90B8] text-white shadow-xs'
                    : 'bg-[#EFF6FA] text-[#4A90B8] group-hover:bg-[#4A90B8] group-hover:text-white'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-outfit text-base font-bold block leading-tight">
                  Not Sure Yet
                </span>
                <span className="font-outfit text-xs text-[#524C46]">
                  Will confirm closer to the celebration
                </span>
              </div>
            </div>
            {currentStatus === 'not_sure' && (
              <span className="px-3 py-1 rounded-full bg-[#4A90B8] text-white font-outfit text-[11px] font-bold uppercase tracking-wider shrink-0">
                Selected ✓
              </span>
            )}
          </button>
        </div>

        {/* Selected Response Status Banner */}
        {currentStatus && (
          <div className="mt-5 p-4 rounded-2xl bg-white border border-[#E5DAC0] shadow-xs text-left animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-outfit text-xs font-bold text-[#1B365D] uppercase tracking-wider">
                  Attendance Response Saved
                </span>
              </div>
              <span className="font-outfit text-[11px] text-[#7A7167]">
                {currentResponse?.updatedAt ? new Date(currentResponse.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Saved'}
              </span>
            </div>

            {/* Optional Guest Name Input (Non-blocking) */}
            <form onSubmit={handleSaveName} className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center gap-2">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs font-outfit rounded-xl border border-[#D9D0C3] bg-[#FAF7F2] text-[#2B2724] focus:outline-none focus:border-[#4A90B8]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-outfit font-semibold rounded-xl bg-[#1B365D] hover:bg-[#12243F] text-white transition-colors cursor-pointer"
              >
                {nameSaved ? 'Saved ✓' : 'Save Name'}
              </button>
            </form>

            {currentStatus === 'attending' && (
              <div className="mt-3 pt-2.5 border-t border-[#F0EBE1]">
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="w-full py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F0EBE1] text-[#1B365D] border border-[#DDD5C8] font-outfit text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#4A90B8]" />
                  <span>Add 15 Dec to Calendar</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-1/2 py-3 rounded-full bg-[#1B365D] hover:bg-[#12243F] text-white font-outfit text-xs uppercase tracking-widest font-bold transition-all shadow-sm cursor-pointer text-center"
          >
            {currentStatus ? 'Done' : 'Close'}
          </button>

          {onScrollToDetails && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToDetails();
              }}
              className="w-full sm:w-1/2 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#524C46] border border-[#DDD5C8] font-outfit text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8EC5E5]" />
              <span>View Full Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
