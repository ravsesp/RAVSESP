import React, { useState } from 'react';
import officialLogoImg from '../assets/images/ravs_official_logo.png';

interface RavsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  className?: string;
  glow?: boolean;
  variant?: 'emblem' | 'full';
}

export const RavsLogo: React.FC<RavsLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  glow = true,
  variant = 'full',
}) => {
  const [imageError, setImageError] = useState(false);

  const dimensionMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-28 h-28 md:w-36 md:h-36',
    hero: 'w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80',
  };

  const textSizes = {
    sm: { main: 'text-base font-bold tracking-wider', sub: 'text-[9px] tracking-[0.25em]' },
    md: { main: 'text-xl font-extrabold tracking-wider', sub: 'text-[10px] tracking-[0.3em]' },
    lg: { main: 'text-3xl font-black tracking-widest', sub: 'text-xs tracking-[0.35em]' },
    hero: { main: 'text-4xl sm:text-5xl font-black tracking-widest', sub: 'text-xs sm:text-sm tracking-[0.4em]' },
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Logo Container */}
      <div className={`relative flex items-center justify-center shrink-0 ${dimensionMap[size]}`}>
        {/* Subtle Ambient Purple Glow */}
        {glow && (
          <div
            className="absolute inset-0 rounded-2xl bg-[#7A00FF]/25 blur-2xl pointer-events-none scale-110"
            aria-hidden="true"
          />
        )}

        {!imageError ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden p-0.5 bg-gradient-to-b from-[#7A00FF]/50 via-[#101010] to-[#A020F0]/40 shadow-[0_0_25px_rgba(122,0,255,0.35)] transition-all duration-300 group-hover:shadow-[0_0_35px_rgba(160,32,240,0.6)] group-hover:border-[#A020F0]/60">
            <img
              src={officialLogoImg}
              alt="RAVS ESPORTS Official Logo"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain rounded-[14px] bg-[#000000]"
            />
          </div>
        ) : (
          /* High-Fidelity SVG Fallback representing the official RAVS Raven crest */
          <div className="w-full h-full relative flex items-center justify-center rounded-2xl bg-[#050505] border border-[#7A00FF]/50 p-2 shadow-[0_0_20px_rgba(122,0,255,0.4)]">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <defs>
                <linearGradient id="svgPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#C040FF" />
                  <stop offset="100%" stop-color="#7A00FF" />
                </linearGradient>
                <linearGradient id="svgSilver" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FFFFFF" />
                  <stop offset="100%" stop-color="#888899" />
                </linearGradient>
              </defs>
              <polygon points="50,8 56,22 50,30 44,22" fill="url(#svgSilver)" />
              <polygon points="65,16 84,26 72,40 58,32" fill="url(#svgPurple)" />
              <polygon points="35,16 16,26 28,40 42,32" fill="url(#svgPurple)" />
              <polygon points="73,34 88,44 76,58 64,48" fill="url(#svgPurple)" />
              <polygon points="27,34 12,44 24,58 36,48" fill="url(#svgPurple)" />
              <polygon points="50,30 62,48 50,80 38,48" fill="#141418" stroke="#333340" strokeWidth="0.8" />
              <polygon points="50,42 54,65 50,78 46,65" fill="url(#svgSilver)" />
              <polygon points="44,43 38,45 42,47" fill="#E066FF" />
              <polygon points="56,43 62,45 58,47" fill="#E066FF" />
              <polygon points="50,78 58,66 50,88 42,66" fill="url(#svgPurple)" />
            </svg>
          </div>
        )}
      </div>

      {/* Brand Typography (when displayed alongside compact emblem) */}
      {showText && (
        <div className="flex flex-col text-left leading-none justify-center">
          <span className={`font-heading text-white ${textSizes[size].main} transition-colors group-hover:text-white`}>
            RAVS
          </span>
          <span className={`font-sub text-[#A020F0] font-semibold ${textSizes[size].sub} tracking-[0.28em]`}>
            ESPORTS
          </span>
        </div>
      )}
    </div>
  );
};
