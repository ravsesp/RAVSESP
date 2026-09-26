import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Trophy,
  Calendar,
  Wifi,
  Ticket,
  Clock,
  QrCode as QrIcon,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

const REGISTRATION_URL = 'https://forms.gle/QtpSvuuu1D1hyF356';
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/Fr1sinawobW1hVO4LAMcYV?s=cl&p=a&mlu=4&ilr=4';
const TOURNAMENT_TARGET_DATE = new Date('2026-10-03T11:00:00+05:30'); // 03 October 2026, 11:00 AM IST

export const Tournament: React.FC = () => {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false });

  // QR Code Data URL state
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Generate dynamic QR Code for https://forms.gle/QtpSvuuu1D1hyF356
  useEffect(() => {
    QRCode.toDataURL(REGISTRATION_URL, {
      width: 320,
      margin: 2,
      color: {
        dark: '#050505',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Failed to generate QR Code:', err));
  }, []);

  // Live countdown timer calculation
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = TOURNAMENT_TARGET_DATE.getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="tournament"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-[#7A00FF]/25 bg-gradient-to-b from-[#050505] via-[#090710] to-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: RAVS ESPORTS PRESENTS BGMI TOURNAMENT 2026 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101010] border border-[#7A00FF]/50 text-[#A020F0] font-sub text-xs sm:text-sm uppercase tracking-[0.25em] mb-5 shadow-[0_0_15px_rgba(122,0,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#A020F0] animate-pulse" />
            <span>RAVS ESPORTS PRESENTS</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-white uppercase mb-4">
            BGMI <span className="text-metallic">TOURNAMENT</span>{' '}
            <span className="text-[#A020F0] drop-shadow-[0_0_20px_rgba(160,32,240,0.6)]">2026</span>
          </h2>

          <p className="font-heading text-lg sm:text-2xl font-bold tracking-[0.35em] uppercase text-white/90 mb-4">
            THE BATTLE BEGINS
          </p>

          <p className="font-body text-base sm:text-lg text-[#A3A3A3] max-w-xl mx-auto leading-relaxed">
            Assemble your 4-player squad and battle for glory in the official RAVS ESPORTS championship arena.
          </p>
        </div>

        {/* 5 Core Tournament Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
          {/* Card 1: PRIZE POOL */}
          <div className="group relative rounded-2xl bg-[#101010]/90 backdrop-blur-sm p-5 sm:p-6 border border-[#7A00FF]/40 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,255,0.35)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sub text-xs font-bold tracking-widest text-[#888899] uppercase">
                PRIZE POOL
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#181824] flex items-center justify-center text-[#A020F0]">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-black text-metallic">
              ₹2000
            </div>
            <div className="mt-2 text-[11px] font-sub text-[#A020F0] font-semibold tracking-wider">
              TOTAL REWARD
            </div>
          </div>

          {/* Card 2: DATE */}
          <div className="group relative rounded-2xl bg-[#101010]/90 backdrop-blur-sm p-5 sm:p-6 border border-[#7A00FF]/40 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,255,0.35)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sub text-xs font-bold tracking-widest text-[#888899] uppercase">
                DATE
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#181824] flex items-center justify-center text-[#A020F0]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-xl sm:text-2xl font-black text-white">
              03 OCT 2026
            </div>
            <div className="mt-2 text-[11px] font-sub text-[#A020F0] font-semibold tracking-wider">
              11:00 AM MATCHDAY
            </div>
          </div>

          {/* Card 3: MODE */}
          <div className="group relative rounded-2xl bg-[#101010]/90 backdrop-blur-sm p-5 sm:p-6 border border-[#7A00FF]/40 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,255,0.35)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sub text-xs font-bold tracking-widest text-[#888899] uppercase">
                MODE
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#181824] flex items-center justify-center text-[#A020F0]">
                <Wifi className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-black text-white">
              ONLINE
            </div>
            <div className="mt-2 text-[11px] font-sub text-[#A020F0] font-semibold tracking-wider">
              CUSTOM ROOMS
            </div>
          </div>

          {/* Card 4: REGISTRATION */}
          <div className="group relative rounded-2xl bg-[#101010]/90 backdrop-blur-sm p-5 sm:p-6 border border-[#7A00FF]/40 hover:border-[#A020F0] transition-all duration-300 hover:shadow-[0_0_25px_rgba(122,0,255,0.35)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sub text-xs font-bold tracking-widest text-[#888899] uppercase">
                ENTRY FEE
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#181824] flex items-center justify-center text-emerald-400">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-black text-emerald-400">
              FREE
            </div>
            <div className="mt-2 text-[11px] font-sub text-emerald-400/80 font-semibold tracking-wider">
              OPEN REGISTRATION
            </div>
          </div>

          {/* Card 5: STATUS */}
          <div className="col-span-2 lg:col-span-1 group relative rounded-2xl bg-[#120f1c] p-5 sm:p-6 border border-[#A020F0]/60 shadow-[0_0_25px_rgba(160,32,240,0.3)] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sub text-xs font-bold tracking-widest text-[#D0D0D8] uppercase">
                STATUS
              </span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              </span>
            </div>
            <div className="font-heading text-lg sm:text-xl font-black text-white tracking-wide">
              REGISTRATION LIVE
            </div>
            <div className="mt-2 text-[11px] font-sub text-emerald-400 font-bold tracking-widest uppercase">
              SLOTS FILLING FAST
            </div>
          </div>
        </div>

        {/* LIVE COUNTDOWN & REGISTRATION / QR CODE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT: Live Countdown Panel (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0d0d12]/90 border border-[#7A00FF]/45 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-[0_0_35px_rgba(122,0,255,0.25)]">
            <div
              className="absolute -top-24 -left-24 w-60 h-60 bg-[#7A00FF]/20 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Countdown Title */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#A020F0] animate-pulse" />
                  <h3 className="font-heading text-xl sm:text-2xl font-black tracking-wider text-white">
                    TOURNAMENT BEGINS IN
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-md bg-[#181824] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs font-bold tracking-widest">
                  03 OCT 2026, 11:00 AM
                </div>
              </div>

              {/* Countdown Digits */}
              {!timeLeft.isLive ? (
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-8">
                  {/* Days */}
                  <div className="relative rounded-2xl bg-[#14141e] border border-[#7A00FF]/50 p-4 sm:p-6 text-center shadow-[0_0_15px_rgba(122,0,255,0.2)]">
                    <div className="font-heading text-3xl sm:text-5xl font-black text-metallic">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="font-sub text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#A020F0] uppercase mt-2">
                      DAYS
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="relative rounded-2xl bg-[#14141e] border border-[#7A00FF]/50 p-4 sm:p-6 text-center shadow-[0_0_15px_rgba(122,0,255,0.2)]">
                    <div className="font-heading text-3xl sm:text-5xl font-black text-metallic">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="font-sub text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#A020F0] uppercase mt-2">
                      HOURS
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="relative rounded-2xl bg-[#14141e] border border-[#7A00FF]/50 p-4 sm:p-6 text-center shadow-[0_0_15px_rgba(122,0,255,0.2)]">
                    <div className="font-heading text-3xl sm:text-5xl font-black text-metallic">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="font-sub text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#A020F0] uppercase mt-2">
                      MINUTES
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="relative rounded-2xl bg-[#14141e] border border-[#A020F0] p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(160,32,240,0.35)]">
                    <div className="font-heading text-3xl sm:text-5xl font-black text-white">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="font-sub text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#A020F0] uppercase mt-2">
                      SECONDS
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-8 py-8 px-6 rounded-2xl bg-gradient-to-r from-[#7A00FF]/30 to-[#A020F0]/30 border border-[#A020F0] text-center shadow-[0_0_30px_rgba(160,32,240,0.5)]">
                  <div className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-widest animate-pulse">
                    TOURNAMENT IS LIVE
                  </div>
                  <p className="font-sub text-sm text-[#E5E5E5] mt-2 tracking-wider">
                    Matches are now underway in the battle arena!
                  </p>
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#888899] font-sub tracking-wider">
                Custom room IDs and passwords will be shared inside the Official WhatsApp Group prior to match start.
              </p>
            </div>

            {/* CTA in Countdown panel */}
            <div className="mt-8 pt-6 border-t border-[#1c1c28] flex flex-col sm:flex-row items-center gap-4">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-xl shadow-[0_0_25px_rgba(122,0,255,0.45)] hover:shadow-[0_0_35px_rgba(160,32,240,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>OPEN GOOGLE FORM</span>
                <ExternalLink className="w-4 h-4 text-white" />
              </a>

              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 font-heading text-xs font-bold tracking-wider text-emerald-400 hover:text-white bg-[#0f1f17] hover:bg-[#142e20] border border-emerald-500/40 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>JOIN WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Dynamic Scannable QR Code Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0d0d12]/90 border border-[#7A00FF]/45 p-8 relative overflow-hidden flex flex-col items-center justify-between text-center shadow-[0_0_35px_rgba(122,0,255,0.25)]">
            <div
              className="absolute -bottom-20 -right-20 w-52 h-52 bg-[#A020F0]/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161622] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-widest mb-3">
                <QrIcon className="w-3.5 h-3.5" />
                <span>MOBILE REGISTRATION</span>
              </div>

              {/* Above the QR Code */}
              <h4 className="font-heading text-2xl font-black text-white tracking-wider mb-1">
                SCAN TO REGISTER
              </h4>
            </div>

            {/* QR Code Container with crisp white quiet zone for reliable camera scanning */}
            <div className="my-6 p-4 rounded-2xl bg-white shadow-[0_0_30px_rgba(160,32,240,0.4)] border-4 border-[#7A00FF] transform hover:scale-105 transition-transform duration-300">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="Scan to Register - RAVS ESPORTS BGMI Tournament 2026 Google Form"
                  className="w-52 h-52 sm:w-56 sm:h-56 block object-contain"
                />
              ) : (
                <div className="w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center text-black font-sub font-bold">
                  Generating QR Code...
                </div>
              )}
            </div>

            {/* Below the QR Code */}
            <div className="w-full">
              <p className="font-sub text-xs font-bold tracking-[0.25em] uppercase text-emerald-400 mb-4">
                FREE REGISTRATION
              </p>

              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 font-heading text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-xl shadow-[0_0_20px_rgba(122,0,255,0.4)] hover:shadow-[0_0_30px_rgba(160,32,240,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <span>REGISTER NOW</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
