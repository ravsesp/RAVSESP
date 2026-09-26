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
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  MessageCircle,
  UserCheck,
} from 'lucide-react';

interface PlayerFormData {
  name: string;
  uid: string;
  email: string;
  phone: string;
}

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

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // Registration Form State
  const [teamName, setTeamName] = useState<string>('');
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>('');
  const [sameAsLeaderPhone, setSameAsLeaderPhone] = useState<boolean>(true);
  const [players, setPlayers] = useState<PlayerFormData[]>([
    { name: '', uid: '', email: '', phone: '' },
    { name: '', uid: '', email: '', phone: '' },
    { name: '', uid: '', email: '', phone: '' },
    { name: '', uid: '', email: '', phone: '' },
  ]);
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [confirmedTeamName, setConfirmedTeamName] = useState<string>('');
  const [confirmedSlot, setConfirmedSlot] = useState<number>(1);

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

  // Handle player form changes
  const handlePlayerChange = (index: number, field: keyof PlayerFormData, value: string) => {
    setPlayers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // If changing leader phone and "same as leader" is checked, keep WhatsApp in sync
    if (index === 0 && field === 'phone' && sameAsLeaderPhone) {
      setWhatsAppNumber(value);
    }
  };

  // Handle registration submission
  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!teamName.trim()) {
      setFormError('Team Name is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    const uidRegex = /^[0-9]{5,15}$/;

    for (let i = 0; i < 4; i++) {
      const p = players[i];
      const pNum = i + 1;
      if (!p.name.trim()) {
        setFormError(`Player ${pNum} name cannot be empty.`);
        return;
      }
      if (!uidRegex.test(p.uid.trim())) {
        setFormError(`Player ${pNum} BGMI UID must contain only digits (5-15 numbers).`);
        return;
      }
      if (!emailRegex.test(p.email.trim())) {
        setFormError(`Player ${pNum} must have a valid Email address.`);
        return;
      }
      if (!phoneRegex.test(p.phone.trim())) {
        setFormError(`Player ${pNum} must have a valid phone number (10+ digits).`);
        return;
      }
    }

    const activeWhatsApp = sameAsLeaderPhone ? players[0].phone.trim() : whatsAppNumber.trim();
    if (!phoneRegex.test(activeWhatsApp)) {
      setFormError('Please provide a valid 10-digit WhatsApp number.');
      return;
    }

    // Check duplicate UID inside the 4 squad players
    const uids = players.map((p) => p.uid.trim());
    if (new Set(uids).size !== 4) {
      setFormError('All 4 players must have distinct BGMI UIDs.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tournament/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: teamName.trim(),
          players,
          whatsAppNumber: activeWhatsApp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error || 'Failed to submit registration. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedTeamName(teamName.trim());
      setConfirmedSlot(result.team?.slot || 1);
      setRegistrationSuccess(true);
    } catch (err) {
      console.error('Registration error:', err);
      setFormError('Network error while registering. You can also use the Google Form directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTeamName('');
    setWhatsAppNumber('');
    setSameAsLeaderPhone(true);
    setPlayers([
      { name: '', uid: '', email: '', phone: '' },
      { name: '', uid: '', email: '', phone: '' },
      { name: '', uid: '', email: '', phone: '' },
      { name: '', uid: '', email: '', phone: '' },
    ]);
    setFormError('');
    setRegistrationSuccess(false);
  };

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

            {/* CTAs in Countdown panel */}
            <div className="mt-8 pt-6 border-t border-[#1c1c28] flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-xl shadow-[0_0_25px_rgba(122,0,255,0.45)] hover:shadow-[0_0_35px_rgba(160,32,240,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 font-heading text-xs font-bold tracking-wider text-[#E5E5E5] hover:text-white bg-[#14141e] hover:bg-[#1e1e2c] border border-[#7A00FF]/40 rounded-xl transition-all"
              >
                <span>OPEN GOOGLE FORM</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A020F0]" />
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
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 font-heading text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] rounded-xl shadow-[0_0_20px_rgba(122,0,255,0.4)] hover:shadow-[0_0_30px_rgba(160,32,240,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <span>REGISTER NOW</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: SQUAD REGISTRATION MODAL                            */}
      {/* ============================================================ */}
      {isRegisterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0c12] border border-[#7A00FF]/60 p-6 sm:p-8 shadow-[0_0_50px_rgba(122,0,255,0.4)] my-8">
            
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setIsRegisterModalOpen(false);
                if (registrationSuccess) resetForm();
              }}
              className="absolute top-6 right-6 p-2 rounded-xl bg-[#161622] text-[#888899] hover:text-white hover:bg-[#7A00FF]/40 transition-colors"
              aria-label="Close registration dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {!registrationSuccess ? (
              <form onSubmit={handleSubmitRegistration}>
                {/* Modal Title */}
                <div className="mb-6 pr-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#161622] border border-[#7A00FF]/40 text-[#A020F0] font-sub text-xs uppercase tracking-widest mb-2">
                    <span>SQUAD ENTRY</span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
                    REGISTER YOUR SQUAD
                  </h3>
                  <p className="font-sub text-xs sm:text-sm text-[#A0A0B0] mt-1">
                    Fill in your 4-player team details below. All fields are required.
                  </p>
                </div>

                {formError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs sm:text-sm font-sub">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Team Name */}
                <div className="mb-5 p-4 rounded-2xl bg-[#12121a] border border-[#7A00FF]/40">
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-white mb-2">
                    TEAM NAME <span className="text-[#A020F0]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. RAVS WARRIORS"
                    className="w-full px-4 py-3 rounded-xl bg-[#09090e] border border-[#7A00FF]/30 focus:border-[#A020F0] text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-[#A020F0]"
                  />
                </div>

                {/* 4 Players Fields */}
                <div className="space-y-4 mb-5">
                  {players.map((player, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#12121a] border border-[#7A00FF]/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-heading text-xs font-bold tracking-wider text-[#A020F0] uppercase flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>PLAYER {idx + 1} {idx === 0 ? '(CAPTAIN / IGL)' : ''}</span>
                        </span>
                        <span className="font-sub text-[10px] text-[#71717A] uppercase tracking-widest">
                          SQUAD MEMBER
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-sub text-[#A3A3A3] mb-1">
                            Player Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={player.name}
                            onChange={(e) => handlePlayerChange(idx, 'name', e.target.value)}
                            placeholder="Full Name / In-Game Name"
                            className="w-full px-3 py-2 rounded-lg bg-[#09090e] border border-[#7A00FF]/30 text-white text-xs focus:outline-none focus:border-[#A020F0]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sub text-[#A3A3A3] mb-1">
                            BGMI UID (Digits only) *
                          </label>
                          <input
                            type="text"
                            required
                            value={player.uid}
                            onChange={(e) => handlePlayerChange(idx, 'uid', e.target.value)}
                            placeholder="e.g. 5512498210"
                            className="w-full px-3 py-2 rounded-lg bg-[#09090e] border border-[#7A00FF]/30 text-white text-xs focus:outline-none focus:border-[#A020F0]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sub text-[#A3A3A3] mb-1">
                            Email ID *
                          </label>
                          <input
                            type="email"
                            required
                            value={player.email}
                            onChange={(e) => handlePlayerChange(idx, 'email', e.target.value)}
                            placeholder="player@gmail.com"
                            className="w-full px-3 py-2 rounded-lg bg-[#09090e] border border-[#7A00FF]/30 text-white text-xs focus:outline-none focus:border-[#A020F0]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-sub text-[#A3A3A3] mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={player.phone}
                            onChange={(e) => handlePlayerChange(idx, 'phone', e.target.value)}
                            placeholder="10-digit mobile number"
                            className="w-full px-3 py-2 rounded-lg bg-[#09090e] border border-[#7A00FF]/30 text-white text-xs focus:outline-none focus:border-[#A020F0]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Number Field */}
                <div className="mb-6 p-4 rounded-2xl bg-[#12121a] border border-[#7A00FF]/40">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-white">
                      OFFICIAL WHATSAPP NUMBER <span className="text-[#A020F0]">*</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#A020F0] font-sub cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsLeaderPhone}
                        onChange={(e) => {
                          setSameAsLeaderPhone(e.target.checked);
                          if (e.target.checked) setWhatsAppNumber(players[0].phone);
                        }}
                        className="rounded accent-[#A020F0]"
                      />
                      <span>Same as Captain's Mobile</span>
                    </label>
                  </div>
                  {!sameAsLeaderPhone ? (
                    <input
                      type="tel"
                      required
                      value={whatsAppNumber}
                      onChange={(e) => setWhatsAppNumber(e.target.value)}
                      placeholder="10-digit WhatsApp number for room ID & announcements"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#09090e] border border-[#7A00FF]/30 focus:border-[#A020F0] text-white text-xs focus:outline-none"
                    />
                  ) : (
                    <div className="text-xs text-[#888899] font-sub">
                      Will use: <span className="text-white font-mono">{players[0].phone || '(Captain Phone Number)'}</span>
                    </div>
                  )}
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl font-heading text-sm font-bold tracking-widest text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] shadow-[0_0_20px_rgba(122,0,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'RECORDING REAL REGISTRATION...' : 'CONFIRM REGISTRATION'}
                  </button>

                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-4 px-6 rounded-xl font-heading text-xs font-bold tracking-wider text-[#C0C0D0] hover:text-white bg-[#14141e] border border-[#7A00FF]/40 text-center"
                  >
                    OPEN GOOGLE FORM
                  </a>
                </div>
              </form>
            ) : (
              /* REGISTRATION SUCCESS VIEW */
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_25px_rgba(160,185,129,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2 uppercase">
                  REGISTRATION SUBMITTED SUCCESSFULLY
                </h3>

                <p className="font-sub text-base text-[#D0D0E0] max-w-md mx-auto mb-3">
                  Your RAVS ESPORTS BGMI Tournament 2026 registration has been recorded for team{' '}
                  <span className="text-[#A020F0] font-bold">"{confirmedTeamName}"</span>.
                </p>

                <div className="inline-block px-4 py-1.5 rounded-full bg-[#181428] border border-[#A020F0] text-[#A020F0] font-heading text-xs font-bold mb-6">
                  OFFICIAL SLOT #{confirmedSlot}
                </div>

                <div className="p-4 rounded-xl bg-[#12121c] border border-[#7A00FF]/40 max-w-md mx-auto mb-8 text-xs text-[#A0A0B0] font-sub">
                  Match room IDs, schedule slot timings, and tournament rules will be officially shared inside the WhatsApp group.
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-heading text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f776a] shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>JOIN OFFICIAL WHATSAPP GROUP</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterModalOpen(false);
                    resetForm();
                  }}
                  className="mt-6 text-xs font-sub text-[#888899] hover:text-white tracking-widest uppercase"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
