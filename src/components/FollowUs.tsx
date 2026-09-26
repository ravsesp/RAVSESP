import React from 'react';
import { ExternalLink, Radio, Instagram } from 'lucide-react';

export const FollowUs: React.FC = () => {
  return (
    <section id="follow-us" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-[#7A00FF]/15">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#101010] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-[0.25em] mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>COMMUNITY BROADCASTS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase mb-3">
            FOLLOW <span className="text-metallic">RAVS ESPORTS</span>
          </h2>

          <p className="font-sub text-base sm:text-xl font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B3B3B3]">
            STAY CONNECTED. STAY IN THE GAME.
          </p>
        </div>

        {/* Large Interactive Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* OFFICIAL INSTAGRAM CARD */}
          <div className="group relative rounded-2xl bg-[#101010] p-8 sm:p-10 border border-[#7A00FF]/35 hover:border-[#E1306C] transition-all duration-300 hover:shadow-[0_0_35px_rgba(225,48,108,0.35)] flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 bg-[#E1306C]/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#833AB4]/15 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Card Header with Instagram Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#1a0f18] border border-[#E1306C]/40 flex items-center justify-center text-[#E1306C] group-hover:bg-gradient-to-tr group-hover:from-[#f09433] group-hover:via-[#dc2743] group-hover:to-[#bc1888] group-hover:text-white group-hover:shadow-[0_0_20px_#E1306C] transition-all duration-300">
                  <Instagram className="w-9 h-9" />
                </div>
                <span className="font-sub text-xs uppercase tracking-widest text-[#E1306C] bg-[#1a0f18] px-3 py-1 rounded-md border border-[#E1306C]/30">
                  OFFICIAL SOCIAL
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
                INSTAGRAM
              </h3>

              <p className="font-body text-sm sm:text-base text-[#A3A3A3] mb-8 leading-relaxed">
                Follow @ravs_esports on Instagram for tournament highlights, match reels, announcements, and exclusive esports content.
              </p>
            </div>

            {/* FOLLOW ON INSTAGRAM Button */}
            <a
              href="https://www.instagram.com/ravs_esports?stkn=NnpxbTk4ZG9vMzMx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#9b42d6] hover:via-[#ff3838] hover:to-[#ff8d54] rounded-xl shadow-[0_0_20px_rgba(225,48,108,0.35)] hover:shadow-[0_0_30px_rgba(225,48,108,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* DISCORD CARD */}
          <div className="group relative rounded-2xl bg-[#101010] p-8 sm:p-10 border border-[#7A00FF]/35 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_35px_rgba(122,0,255,0.4)] flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 bg-[#5865F2]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#7A00FF]/15 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Card Header with Discord Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#161622] border border-[#7A00FF]/40 flex items-center justify-center text-[#5865F2] group-hover:bg-[#5865F2] group-hover:text-white group-hover:shadow-[0_0_20px_#5865F2] transition-all duration-300">
                  <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <span className="font-sub text-xs uppercase tracking-widest text-[#71717A] bg-[#14141c] px-3 py-1 rounded-md border border-[#7A00FF]/25">
                  COMMUNITY HUB
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
                DISCORD
              </h3>

              <p className="font-body text-sm sm:text-base text-[#A3A3A3] mb-8 leading-relaxed">
                Join our official Discord server to connect with players, participate in community scrims, catch team announcements, and talk tactics.
              </p>
            </div>

            {/* JOIN DISCORD Button */}
            <a
              href="https://dsc.gg/ravsesp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#5865F2] to-[#7A00FF] hover:from-[#4752C4] hover:to-[#6800DB] rounded-xl shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.65)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>JOIN DISCORD</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
