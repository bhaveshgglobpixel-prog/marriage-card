import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface VenuePhoto {
  id: string;
  label: string;
  src: string;
  alt: string;
}

const venuePhotos: VenuePhoto[] = [
  {
    id: 'palace',
    label: 'Palace Entrance',
    src: '/assets/bapa_sitaram_palace.jpg',
    alt: 'Bapa Sitaram Palace Party Plot Grand Entrance',
  },
  {
    id: 'lawn',
    label: 'Celebration Lawn',
    src: '/assets/bapa_sitaram_lawn.jpg',
    alt: 'Bapa Sitaram Palace Party Plot Expansive Lawn',
  },
  {
    id: 'decor',
    label: 'Evening View',
    src: '/assets/bapa_sitaram_lawn1.jpg',
    alt: 'Bapa Sitaram Palace Party Plot Evening Setting',
  },
];

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const venueName = 'Bapa Sitaram Palace Party Plot';
  const shortAddress = 'Sarthana, Surat, Gujarat';
  const fullAddressText = 'Bapa Sitaram Palace Party Plot, Sarthana - Kosmada Road, Surat, Gujarat 395006';

  const googleMapsUrl =
    'https://www.google.com/maps/place/Bapa+Sitaram+Palace+Party+Plot/@21.2139181,72.9186267,17z/data=!3m1!4b1!4m6!3m5!1s0x3be04569fa306223:0x11723511c5607f10!8m2!3d21.2139181!4d72.9186267!16s%2Fg%2F11ylpm5z8v?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D';

  const embedMapUrl =
    'https://maps.google.com/maps?q=21.2139181,72.9186267+(Bapa+Sitaram+Palace+Party+Plot)&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentPhoto = venuePhotos[selectedPhotoIndex];

  return (
    <section id="venue" className="w-full max-w-xl mx-auto py-14 px-4 flex flex-col items-center text-center scroll-mt-20">
      {/* Title in signature script */}
      <h2 className="font-script text-5xl sm:text-6xl text-[#332F2C] tracking-wide">
        Wedding Venue
      </h2>

      {/* Venue Header Badge */}
      <div className="mt-4 w-full flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xs px-5 py-3.5 rounded-2xl border border-[#E8E1D5] shadow-xs text-left">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3EA0CA] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="font-outfit text-lg sm:text-xl font-bold text-[#25221F] leading-tight">
              {venueName}
            </h3>
            <p className="font-outfit text-xs tracking-wider text-[#6B645D] font-medium mt-0.5">
              {shortAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Real Venue Photos Showcase */}
      <div className="mt-6 w-full rounded-3xl overflow-hidden border-4 border-[#F2ECE1] shadow-xl bg-white relative">
        <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="w-full h-full object-cover object-center transition-all duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Scrim Overlay & Venue Highlight Badge */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#1F1C1A]/95 via-[#1F1C1A]/40 to-transparent text-white text-left flex items-end justify-between gap-3">
            <div>
              <p className="font-outfit text-[11px] text-[#F7D8CE] uppercase tracking-widest font-semibold">
                Grand Celebration Lawn
              </p>
              <h4 className="font-outfit text-xl sm:text-2xl font-bold tracking-wide mt-0.5 text-white">
                {venueName}
              </h4>
              <p className="font-outfit text-[11px] text-white/90 uppercase tracking-widest mt-0.5">
                Mandap Ceremony • Dinner • Raas Garba
              </p>
            </div>

            <button
              onClick={() => setShowMap(!showMap)}
              className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-outfit tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer border border-white/30 font-medium shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B9DEEF]" />
              <span>{showMap ? 'Hide Map' : 'View Map'}</span>
            </button>
          </div>
        </div>

        {/* Photo Switcher Tabs */}
        <div className="bg-[#FAF7F2] border-t border-[#EAE3D6] px-3 py-2 flex items-center justify-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-outfit uppercase tracking-wider text-[#736A62] font-semibold flex items-center gap-1 mr-1">
            <ImageIcon className="w-3.5 h-3.5 text-[#4A90B8]" /> Photos:
          </span>
          {venuePhotos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`px-3 py-1 rounded-full text-xs font-outfit transition-all cursor-pointer whitespace-nowrap ${
                selectedPhotoIndex === idx
                  ? 'bg-[#1B365D] text-white font-semibold shadow-xs'
                  : 'bg-white text-[#59524A] hover:bg-[#F2ECE1] border border-[#DDD5C8]'
              }`}
            >
              {photo.label}
            </button>
          ))}
        </div>

        {/* Embedded Interactive Google Map */}
        {showMap && (
          <div className="w-full h-72 sm:h-80 border-t-2 border-[#E8E1D5] relative animate-fadeIn">
            <iframe
              title="Google Map - Bapa Sitaram Palace Party Plot"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={embedMapUrl}
            />
          </div>
        )}
      </div>

      {/* Action Buttons: Open Google Maps & Copy Address */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B365D] hover:bg-[#12243F] text-white text-xs font-outfit uppercase tracking-widest transition-all shadow-md group font-semibold"
        >
          <Navigation className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#4A453F] border border-[#D9D0C3] text-xs font-outfit uppercase tracking-widest transition-all shadow-2xs cursor-pointer font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Address Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#7E7468]" />
              <span>Copy Address</span>
            </>
          )}
        </button>
      </div>

      {/* Travel & Venue Details in Outfit font */}
      <div className="mt-5 text-xs text-[#7A7167] font-outfit leading-relaxed max-w-md bg-white/60 p-3.5 rounded-xl border border-[#EBE4D8]">
        <p className="font-medium text-[#38332E]">
          📍 {fullAddressText}
        </p>
        <p className="mt-1 text-[#665E56]">
          Spacious parking and valet facilities available for all guests at Bapa Sitaram Palace Party Plot.
        </p>
      </div>
    </section>
  );
};
