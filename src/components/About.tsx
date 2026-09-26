import React from 'react';
import { Trophy, Users, Clapperboard, Crosshair, ShieldCheck, Flame } from 'lucide-react';

export const About: React.FC = () => {
  const cards = [
    {
      title: 'COMPETITIVE',
      description: 'Focused on competitive gaming and esports.',
      icon: Crosshair,
      tagline: 'Precision & Excellence',
      accentGlow: 'from-[#7A00FF]/20 to-[#A020F0]/10',
    },
    {
      title: 'COMMUNITY',
      description: 'Building a strong and connected gaming community.',
      icon: Users,
      tagline: 'Unity & Brotherhood',
      accentGlow: 'from-[#A020F0]/20 to-[#7A00FF]/10',
    },
    {
      title: 'CONTENT',
      description: 'Supporting gaming content, creators and esports entertainment.',
      icon: Clapperboard,
      tagline: 'Media & Entertainment',
      accentGlow: 'from-[#7A00FF]/20 to-[#A020F0]/10',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#101010] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-[0.25em] mb-4">
            <span>ORGANIZATION PHILOSOPHY</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase mb-6">
            ABOUT <span className="text-metallic">RAVS ESPORTS</span>
          </h2>

          <p className="font-body text-base sm:text-lg md:text-xl text-[#B3B3B3] leading-relaxed text-balance">
            RAVS ESPORTS is a gaming and esports organization focused on building a strong competitive gaming community. We aim to bring together passionate players, creators and gaming enthusiasts under one identity.
          </p>
        </div>

        {/* 3 Minimal Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative rounded-2xl bg-[#101010] p-8 border border-[#7A00FF]/35 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,0,255,0.3)] hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Ambient Corner Glow */}
                <div
                  className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${card.accentGlow} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                  aria-hidden="true"
                />

                {/* Top: Icon & Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-[#18181f] border border-[#7A00FF]/40 flex items-center justify-center text-[#A020F0] group-hover:text-white group-hover:bg-[#7A00FF] group-hover:shadow-[0_0_15px_#7A00FF] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-sub text-xs font-bold text-[#71717A] tracking-widest group-hover:text-[#A020F0] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-white mb-3 group-hover:text-metallic transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="font-body text-sm sm:text-base text-[#999999] leading-relaxed group-hover:text-[#CCCCCC] transition-colors">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Accent line */}
                <div className="mt-8 pt-4 border-t border-[#1f1f26] flex items-center justify-between">
                  <span className="font-sub text-xs uppercase tracking-widest text-[#71717A] group-hover:text-[#A020F0] transition-colors">
                    {card.tagline}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#7A00FF]/40 group-hover:bg-[#A020F0] group-hover:shadow-[0_0_6px_#A020F0] transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
