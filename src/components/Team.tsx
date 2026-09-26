import React from 'react';
import { Crown, Sparkles, Shield, UserCheck } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  badge?: string;
}

export const Team: React.FC = () => {
  const coFounders: TeamMember[] = [
    { name: 'M SAKETH', role: 'CO-FOUNDER', initials: 'MS' },
    { name: 'M VISHAL', role: 'CO-FOUNDER', initials: 'MV' },
    { name: 'MD ALTAF ALAM', role: 'CO-FOUNDER', initials: 'AA' },
    { name: 'G ADITYA VARMA', role: 'CO-FOUNDER', initials: 'AV' },
  ];

  const leadership: TeamMember[] = [
    { name: 'M RAM', role: 'MANAGING DIRECTOR', initials: 'MR' },
    { name: 'C AKKSHITH', role: 'MARKETING CHIEF', initials: 'CA' },
    { name: 'M ROHIT SAI KALYAN', role: 'CHIEF EDITOR', initials: 'RK' },
    { name: 'B VAMSHI', role: 'TREASURER', initials: 'BV' },
  ];

  const renderCard = (member: TeamMember, isFounder = false) => (
    <div
      key={member.name}
      className="group relative rounded-2xl bg-[#101010]/90 backdrop-blur-sm p-6 sm:p-7 border border-[#7A00FF]/30 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,255,0.35)] hover:-translate-y-1 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Top ambient hover glow */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#7A00FF]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Abstract Purple/Silver Avatar Placeholder */}
      <div className="relative mb-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#181820] to-[#0a0a0e] border border-[#7A00FF]/40 group-hover:border-[#A020F0] flex items-center justify-center p-1 shadow-inner transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(160,32,240,0.4)]">
          {/* Cyber crest inner layer */}
          <div className="w-full h-full rounded-[14px] bg-[#0c0c10] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Geometric watermark lines */}
            <div className="absolute inset-0 bg-gaming-grid-dense opacity-40" />
            <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-[#7A00FF]/20 rounded-full blur-lg" />
            
            {/* Initials in metallic typography */}
            <span className="font-heading text-xl sm:text-2xl font-black text-metallic tracking-wider z-10">
              {member.initials}
            </span>

            {/* Subtle bottom indicator */}
            <div className="absolute bottom-1 w-6 h-0.5 bg-gradient-to-r from-transparent via-[#A020F0] to-transparent" />
          </div>
        </div>

        {/* Founder subtle crown indicator */}
        {isFounder && (
          <div
            className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-[#14141a] border border-[#A020F0]/60 flex items-center justify-center shadow-[0_0_8px_#A020F0]"
            title="Co-Founder"
          >
            <Crown className="w-3.5 h-3.5 text-[#A020F0]" />
          </div>
        )}
      </div>

      {/* Member Name in Silver / Metallic */}
      <h4 className="font-heading text-lg sm:text-xl font-bold tracking-wider text-metallic mb-1.5 transition-colors group-hover:text-white">
        {member.name}
      </h4>

      {/* Role in Electric Purple */}
      <p className="font-sub text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#A020F0] uppercase">
        {member.role}
      </p>

      {/* Bottom subtle accent line */}
      <div className="w-10 h-0.5 bg-[#7A00FF]/30 group-hover:w-20 group-hover:bg-[#A020F0] transition-all duration-300 mt-5 rounded-full" />
    </div>
  );

  return (
    <section id="team" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-[#7A00FF]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#101010] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-[0.25em] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>ORGANIZATION LEADERSHIP</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase mb-3">
            RAVS ESPORTS <span className="text-metallic">TEAM</span>
          </h2>

          <p className="font-sub text-base sm:text-xl font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#B3B3B3]">
            THE PEOPLE BEHIND THE ORGANIZATION
          </p>
        </div>

        {/* GROUP 1: CO-FOUNDERS */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent to-[#7A00FF]/60 flex-1" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#14141c] border border-[#7A00FF]/40">
              <Crown className="w-4 h-4 text-[#A020F0]" />
              <span className="font-heading text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase">
                CO-FOUNDERS
              </span>
            </div>
            <div className="h-px bg-gradient-to-l from-transparent to-[#7A00FF]/60 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coFounders.map((member) => renderCard(member, true))}
          </div>
        </div>

        {/* GROUP 2: LEADERSHIP & MANAGEMENT */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent to-[#7A00FF]/60 flex-1" />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#14141c] border border-[#7A00FF]/40">
              <UserCheck className="w-4 h-4 text-[#A020F0]" />
              <span className="font-heading text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase">
                LEADERSHIP & MANAGEMENT
              </span>
            </div>
            <div className="h-px bg-gradient-to-l from-transparent to-[#7A00FF]/60 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => renderCard(member, false))}
          </div>
        </div>
      </div>
    </section>
  );
};
