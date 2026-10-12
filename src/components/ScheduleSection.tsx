import React, { useState } from 'react';
import { ScheduleEvent } from '../types';

const weddingEvents: ScheduleEvent[] = [
  {
    id: 'mandap',
    time: '2:00 PM',
    title: 'Mandap Ceremony',
    description: 'Sacred wedding rituals, exchange of vows, and auspicious blessings as we tie the knot.',
  },
  {
    id: 'dinner',
    time: '6:00 PM',
    title: 'Dinner',
    description: 'Sumptuous multi-course celebratory feast with our beloved family and friends.',
  },
  {
    id: 'garba',
    time: '9:00 PM',
    title: 'Raas Garba',
    description: 'Joyous music, rhythmic traditional dancing, and vibrant celebrations under the stars.',
  },
];

export const ScheduleSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  return (
    <section id="schedule" className="relative w-full max-w-4xl mx-auto py-16 px-4 overflow-hidden scroll-mt-20">
      {/* Real Fluffy Clouds flanking the timeline */}
      <div className="absolute top-8 -left-20 sm:-left-8 w-52 sm:w-80 pointer-events-none opacity-90 animate-cloud-left select-none">
        <img
          src="/assets/clouds_left.png"
          alt="Clouds floating above timeline"
          className="w-full h-auto object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute bottom-6 -right-20 sm:-right-8 w-52 sm:w-84 pointer-events-none opacity-90 animate-cloud-right select-none">
        <img
          src="/assets/clouds_right.png"
          alt="Clouds floating below timeline"
          className="w-full h-auto object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Title in signature script */}
      <div className="text-center relative z-10 mb-12">
        <h2 className="font-script text-5xl sm:text-6xl text-[#332F2C] tracking-wide">
          Schedule of Events
        </h2>
        <p className="font-outfit text-sm text-[#736A62] mt-1 tracking-wider uppercase font-medium">
          Sunday, 15 December
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-[#7BB8DB]">
          <span className="w-8 h-px bg-[#D9CFBF]" />
          <span className="text-xs">✦</span>
          <span className="w-8 h-px bg-[#D9CFBF]" />
        </div>
      </div>

      {/* Alternating Vertical Timeline */}
      <div className="relative max-w-lg mx-auto z-10">
        {/* Central Vertical connecting line with soft sky-blue glow */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#8EC5E5] via-[#4A90B8] to-[#8EC5E5] opacity-75" />

        <div className="space-y-10 sm:space-y-12">
          {weddingEvents.map((evt, idx) => {
            const isEven = idx % 2 === 0;
            const isSelected = activeEvent === evt.id;

            return (
              <div
                key={evt.id}
                className="relative flex items-center group cursor-pointer"
                onClick={() => setActiveEvent(isSelected ? null : evt.id)}
              >
                {/* Left Side Content */}
                <div
                  className={`w-1/2 pr-6 sm:pr-8 text-right transition-transform duration-300 ${
                    isEven ? 'block' : 'hidden sm:block sm:invisible'
                  }`}
                >
                  {isEven && (
                    <div>
                      {/* Numbers & Times in Outfit font */}
                      <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] block tabular-nums tracking-tight">
                        {evt.time}
                      </span>
                      {/* Event Title in Outfit font */}
                      <span className="font-outfit text-base sm:text-lg text-[#2D2A26] font-semibold leading-snug block mt-0.5">
                        {evt.title}
                      </span>
                      {/* Event Description in Outfit font */}
                      <p className="mt-1 font-outfit text-xs text-[#6B635A] leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center Diamond Marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                  <div
                    className={`w-4 h-4 rotate-45 border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#1B365D] border-[#B9DEEF] scale-125 shadow-md'
                        : 'bg-[#5B9BBF] border-white group-hover:bg-[#1B365D] group-hover:scale-110 shadow-xs'
                    }`}
                  />
                </div>

                {/* Right Side Content */}
                <div
                  className={`w-1/2 pl-6 sm:pl-8 text-left transition-transform duration-300 ${
                    !isEven ? 'block' : 'hidden sm:block sm:invisible'
                  }`}
                >
                  {!isEven && (
                    <div>
                      {/* Numbers & Times in Outfit font */}
                      <span className="font-outfit text-2xl sm:text-3xl font-bold text-[#1B365D] block tabular-nums tracking-tight">
                        {evt.time}
                      </span>
                      {/* Event Title in Outfit font */}
                      <span className="font-outfit text-base sm:text-lg text-[#2D2A26] font-semibold leading-snug block mt-0.5">
                        {evt.title}
                      </span>
                      {/* Event Description in Outfit font */}
                      <p className="mt-1 font-outfit text-xs text-[#6B635A] leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-[#E8E1D5] text-xs font-outfit text-[#7D756C] shadow-2xs">
          All events take place on 15 December
        </span>
      </div>
    </section>
  );
};
