import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface ScratchCardProps {
  label: string;
  value: string;
  subValue?: string;
  isRevealed: boolean;
  onRevealed: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  label,
  value,
  subValue,
  isRevealed,
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [cleared, setCleared] = useState(false);

  // Initialize canvas with luxury sky-blue pearlescent foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Luxury pastel sky blue gradient matching the Dolce Vita palette
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#B3D8ED');
    gradient.addColorStop(0.5, '#CBE6F5');
    gradient.addColorStop(1, '#9CCBE5');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Decorative foil pattern / border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, rect.width - 12, rect.height - 12);

    // Subtle diamond monogram in center of unscratched foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', rect.width / 2, rect.height / 2);

    setCleared(false);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!cleared && !isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, cleared, isRevealed]);

  // When card is externally marked revealed
  useEffect(() => {
    if (isRevealed && !cleared) {
      setCleared(true);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [isRevealed, cleared]);

  // Handle scratching with pointer coordinates
  const scratch = (clientX: number, clientY: number) => {
    if (cleared || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    romanticAudio.playScratchSound();
    checkPercent(ctx, canvas);
  };

  const checkPercent = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalSampled = data.length / 16;

      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));

      if (percent >= 35 && !cleared) {
        setCleared(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onRevealed();
      }
    } catch {
      // Fallback
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScratching(true);
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore if unsupported
    }
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScratching(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if unsupported
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Scratch Box Card */}
      <div
        ref={containerRef}
        className="relative w-[90px] xs:w-24 sm:w-32 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-md border-2 border-[#D9EBF5] bg-gradient-to-b from-white to-[#F5FAFD] flex flex-col items-center justify-center select-none cursor-coin touch-none"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Revealed Content Behind Foil using Outfit font */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none select-none">
          <span className="font-outfit text-2xl xs:text-3xl sm:text-4xl font-bold text-[#1B365D] tracking-tight leading-none">
            {value}
          </span>
          {subValue && (
            <span className="font-outfit text-[10px] sm:text-[11px] tracking-widest text-[#5B82A6] uppercase mt-1 font-semibold">
              {subValue}
            </span>
          )}
          <span className="text-[10px] text-[#A5C1D8] mt-1">✦</span>
        </div>

        {/* Scratchable Canvas Layer */}
        {!cleared && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ touchAction: 'none' }}
          />
        )}

        {/* Small sparkle highlight when revealed */}
        {cleared && (
          <div className="absolute top-1.5 right-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#6DB4E4] animate-pulse" />
          </div>
        )}
      </div>

      {/* Card Label: DAY / MONTH / YEAR */}
      <span className="mt-2.5 font-outfit text-xs tracking-[0.2em] uppercase font-semibold text-[#7D766E]">
        {label}
      </span>
    </div>
  );
};

export const ScratchDate: React.FC = () => {
  const [revealedCards, setRevealedCards] = useState<{ day: boolean; month: boolean; year: boolean }>({
    day: false,
    month: false,
    year: false,
  });

  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Accurate Live Countdown to Wedding Date: 15 December, 2:00 PM
  useEffect(() => {
    const weddingDate = new Date('2026-12-15T14:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = useCallback(() => {
    romanticAudio.playChimeReveal();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#B9DEEF', '#FAD2C0', '#F8B1A5', '#FFF3D6', '#6DB4E4'],
    });
  }, []);

  const handleCardRevealed = (key: 'day' | 'month' | 'year') => {
    setRevealedCards((prev) => {
      const next = { ...prev, [key]: true };
      if (next.day && next.month && next.year && !hasCelebrated) {
        setHasCelebrated(true);
        triggerCelebration();
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    setRevealedCards({ day: true, month: true, year: true });
    if (!hasCelebrated) {
      setHasCelebrated(true);
      triggerCelebration();
    }
  };

  const handleResetScratch = () => {
    setRevealedCards({ day: false, month: false, year: false });
    setHasCelebrated(false);
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

  const allRevealed = revealedCards.day && revealedCards.month && revealedCards.year;

  return (
    <section id="the-date" className="w-full max-w-xl mx-auto py-12 px-4 flex flex-col items-center text-center scroll-mt-20">
      {/* Title in signature script */}
      <h2 className="font-script text-5xl sm:text-6xl text-[#383431] tracking-wide">
        The Date
      </h2>

      {/* Subtitle with diamond decor */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[#4A90B8]">
        <span className="text-xs">✦</span>
        <span className="font-outfit text-sm sm:text-base text-[#527794] tracking-wide font-semibold">
          15 December
        </span>
        <span className="text-xs">✦</span>
      </div>

      <p className="font-outfit text-xs text-[#8A8177] mt-1 max-w-xs leading-relaxed">
        Scratch the cards below to reveal our wedding date
      </p>

      {/* 3 Interactive Scratch Cards: DAY 15, MONTH DEC, YEAR 2026 */}
      <div className="flex items-center justify-center gap-2.5 xs:gap-4 sm:gap-6 mt-8">
        <ScratchCard
          label="DAY"
          value="15"
          subValue="DECEMBER"
          isRevealed={revealedCards.day}
          onRevealed={() => handleCardRevealed('day')}
        />
        <ScratchCard
          label="MONTH"
          value="DEC"
          subValue="WEDDING"
          isRevealed={revealedCards.month}
          onRevealed={() => handleCardRevealed('month')}
        />
        <ScratchCard
          label="YEAR"
          value="2026"
          subValue="CELEBRATION"
          isRevealed={revealedCards.year}
          onRevealed={() => handleCardRevealed('year')}
        />
      </div>

      {/* Scratch Controls */}
      <div className="mt-5 flex items-center gap-4">
        {!allRevealed ? (
          <button
            onClick={handleRevealAll}
            className="font-outfit text-xs tracking-wider uppercase text-[#4A90B8] hover:text-[#1B365D] underline underline-offset-4 transition-colors font-semibold cursor-pointer py-1 px-2"
          >
            Quick Reveal All
          </button>
        ) : (
          <button
            onClick={handleResetScratch}
            className="flex items-center gap-1.5 font-outfit text-xs tracking-wider uppercase text-[#8C8276] hover:text-[#383431] transition-colors cursor-pointer font-medium py-1 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scratch Again</span>
          </button>
        )}
      </div>

      {/* Real Live Countdown Timer to 15 December */}
      <div className="mt-10 w-full max-w-md bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#E8E1D5] shadow-xs">
        <div className="text-center mb-3">
          <span className="font-outfit text-xs tracking-[0.25em] uppercase text-[#4A90B8] font-bold">
            Countdown to 15 December
          </span>
          <p className="font-outfit text-xs text-[#8A8177] mt-0.5">
            Until the Mandap Ceremony begins at 2:00 PM
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center divide-x divide-[#EDE5D8] my-3">
          <div className="flex flex-col items-center px-1">
            <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] tabular-nums">
              {timeLeft.days}
            </span>
            <span className="font-outfit text-[11px] tracking-wider uppercase text-[#8C8276] mt-0.5 font-semibold">
              Days
            </span>
          </div>

          <div className="flex flex-col items-center px-1">
            <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] tabular-nums">
              {timeLeft.hours}
            </span>
            <span className="font-outfit text-[11px] tracking-wider uppercase text-[#8C8276] mt-0.5 font-semibold">
              Hours
            </span>
          </div>

          <div className="flex flex-col items-center px-1">
            <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] tabular-nums">
              {timeLeft.minutes}
            </span>
            <span className="font-outfit text-[11px] tracking-wider uppercase text-[#8C8276] mt-0.5 font-semibold">
              Mins
            </span>
          </div>

          <div className="flex flex-col items-center px-1">
            <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] tabular-nums">
              {timeLeft.seconds}
            </span>
            <span className="font-outfit text-[11px] tracking-wider uppercase text-[#8C8276] mt-0.5 font-semibold">
              Secs
            </span>
          </div>
        </div>

        {/* Save the Date Action */}
        <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex justify-center">
          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F0EBE1] text-[#2B2724] border border-[#E0D7C9] text-xs font-outfit font-semibold tracking-wide transition-all shadow-2xs cursor-pointer min-h-[40px]"
          >
            <Calendar className="w-4 h-4 text-[#4A90B8]" />
            <span>Add 15 Dec to Google Calendar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
