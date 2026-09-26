import React from 'react';
import { ChevronDown, Users, Share2, Trophy, ArrowRight } from 'lucide-react';
import { RavsLogo } from './RavsLogo';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Centered Atmospheric Glow behind the Logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] md:w-[600px] h-80 sm:h-[480px] md:h-[600px] rounded-full bg-gradient-to-tr from-[#7A00FF]/25 to-[#A020F0]/15 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Cyber Grid Lines Accent */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center z-10">
        
        {/* Animated Lead-in Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101010]/80 border border-[#7A00FF]/40 text-[#E5E5E5] mb-4 shadow-[0_0_15px_rgba(122,0,255,0.2)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#A020F0] shadow-[0_0_8px_#A020F0]" />
          <span className="font-sub text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#E5E5E5]">
            WELCOME TO THE BATTLEFIELD
          </span>
        </div>

        {/* Live BGMI Tournament Announcement Ribbon */}
        <button
          type="button"
          onClick={() => onNavigate('tournament')}
          className="mb-8 inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#14101e] via-[#1c1228] to-[#14101e] border border-[#A020F0]/80 text-white hover:border-[#A020F0] transition-all duration-300 shadow-[0_0_20px_rgba(160,32,240,0.35)] hover:shadow-[0_0_30px_rgba(160,32,240,0.6)] group transform hover:-translate-y-0.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#34D399]" />
          </span>
          <span className="font-heading text-[11px] sm:text-xs font-bold tracking-wider text-white">
            BGMI TOURNAMENT 2026 — 03 OCT, 11:00 AM — REGISTRATION LIVE (₹2000 PRIZE POOL)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#A020F0] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Large Prominently Centered RAVS ESPORTS Logo */}
        <div className="mb-8 transform transition-transform duration-500 hover:scale-105">
          <RavsLogo size="hero" showText={false} glow={true} />
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase mb-4">
          <span className="text-metallic">RAVS</span>{' '}
          <span className="text-[#A020F0] drop-shadow-[0_0_25px_rgba(160,32,240,0.6)]">ESPORTS</span>
        </h1>

        {/* Subheading */}
        <p className="font-heading text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/90 mb-6 drop-shadow-sm">
          RISE. COMPETE. CONQUER.
        </p>

        {/* Supporting text */}
        <p className="font-body text-base sm:text-lg md:text-xl text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
          Welcome to <span className="text-white font-semibold">RAVS ESPORTS</span> — a competitive gaming community built for players, creators and esports enthusiasts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg">
          {/* TOURNAMENT CTA Button */}
          <button
            type="button"
            onClick={() => onNavigate('tournament')}
            className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2.5 px-8 py-4 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-xl shadow-[0_0_25px_rgba(122,0,255,0.45)] hover:shadow-[0_0_35px_rgba(160,32,240,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Trophy className="w-4 h-4" />
            <span>BGMI TOURNAMENT</span>
          </button>

          {/* EXPLORE TEAM Button */}
          <button
            type="button"
            onClick={() => onNavigate('team')}
            className="w-full sm:w-auto min-w-[170px] inline-flex items-center justify-center gap-2.5 px-6 py-4 font-heading text-sm font-bold tracking-widest text-[#E5E5E5] hover:text-white bg-[#101010]/90 hover:bg-[#18181f] border border-[#7A00FF]/50 hover:border-[#A020F0] rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(122,0,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A00FF]"
          >
            <Users className="w-4 h-4" />
            <span>EXPLORE TEAM</span>
          </button>

          {/* FOLLOW US Button */}
          <button
            type="button"
            onClick={() => onNavigate('follow-us')}
            className="w-full sm:w-auto min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-4 font-heading text-sm font-bold tracking-widest text-[#B3B3B3] hover:text-white bg-[#0e0e14] hover:bg-[#161620] border border-[#7A00FF]/30 hover:border-[#A020F0] rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Share2 className="w-4 h-4 text-[#A020F0]" />
            <span>FOLLOW US</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        type="button"
        onClick={() => onNavigate('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#71717A] hover:text-[#A020F0] transition-colors focus:outline-none"
        aria-label="Scroll to About section"
      >
        <span className="font-sub text-[11px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
