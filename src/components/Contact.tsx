import React, { useState } from 'react';
import { Phone, Copy, Check, Headphones, ShieldAlert } from 'lucide-react';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '9618485312';

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-[#7A00FF]/15">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#101010] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-[0.25em] mb-4">
            <Headphones className="w-3.5 h-3.5" />
            <span>DIRECT INQUIRIES</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white uppercase mb-3">
            CONTACT <span className="text-metallic">RAVS ESPORTS</span>
          </h2>

          <p className="font-sub text-base sm:text-lg font-bold tracking-[0.25em] uppercase text-[#A020F0]">
            CONTACT US
          </p>
        </div>

        {/* Minimal Contact Box */}
        <div className="relative rounded-3xl bg-[#101010] p-8 sm:p-12 border border-[#7A00FF]/40 shadow-[0_0_40px_rgba(122,0,255,0.25)] text-center overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#7A00FF]/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
            {/* Phone Icon Badge */}
            <div className="w-20 h-20 rounded-2xl bg-[#161620] border border-[#7A00FF]/50 flex items-center justify-center text-[#A020F0] shadow-[0_0_20px_rgba(160,32,240,0.3)] mb-6">
              <Phone className="w-9 h-9" />
            </div>

            <p className="font-sub text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#A3A3A3] mb-2">
              OFFICIAL INQUIRY LINE
            </p>

            {/* Formatted Phone Display */}
            <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white mb-8 select-all">
              {phoneNumber}
            </div>

            {/* Action Buttons: CALL US and COPY NUMBER */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              {/* CALL US Button with tel: */}
              <a
                href={`tel:${phoneNumber}`}
                className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-3 px-8 py-4 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-xl shadow-[0_0_25px_rgba(122,0,255,0.45)] hover:shadow-[0_0_35px_rgba(160,32,240,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-4 h-4" />
                <span>CALL US</span>
              </a>

              {/* COPY NUMBER helper */}
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center gap-2.5 px-6 py-4 font-heading text-sm font-semibold tracking-wider text-[#E5E5E5] hover:text-white bg-[#16161d] hover:bg-[#20202a] border border-[#7A00FF]/40 hover:border-[#A020F0] rounded-xl transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#A020F0]" />
                    <span>COPY NUMBER</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-6 text-xs text-[#71717A] tracking-wider font-sub">
              Available for sponsorship, scrim arrangements, and organizational inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
