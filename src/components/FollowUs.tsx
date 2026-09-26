import React from 'react';
import { ExternalLink, Radio, MessageCircle } from 'lucide-react';

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
          
          {/* OFFICIAL WHATSAPP GROUP CARD */}
          <div className="group relative rounded-2xl bg-[#101010] p-8 sm:p-10 border border-[#7A00FF]/35 hover:border-[#25D366] transition-all duration-300 hover:shadow-[0_0_35px_rgba(37,211,102,0.3)] flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 bg-[#25D366]/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#7A00FF]/15 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Card Header with WhatsApp Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#111e16] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white group-hover:shadow-[0_0_20px_#25D366] transition-all duration-300">
                  <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-sub text-xs uppercase tracking-widest text-[#25D366] bg-[#111e16] px-3 py-1 rounded-md border border-[#25D366]/30">
                  OFFICIAL GROUP
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
                OFFICIAL WHATSAPP GROUP
              </h3>

              <p className="font-body text-sm sm:text-base text-[#A3A3A3] mb-8 leading-relaxed">
                Join the official RAVS ESPORTS WhatsApp group for tournament updates, announcements and important information.
              </p>
            </div>

            {/* JOIN WHATSAPP GROUP Button */}
            <a
              href="https://chat.whatsapp.com/Fr1sinawobW1hVO4LAMcYV?s=cl&p=a&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f776a] rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>JOIN WHATSAPP GROUP</span>
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
