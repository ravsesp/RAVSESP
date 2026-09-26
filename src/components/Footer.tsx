import React from 'react';
import { RavsLogo } from './RavsLogo';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Tournament', href: '#tournament' },
    { label: 'Follow Us', href: '#follow-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#E5E5E5] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#7A00FF]/30 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#181820]">
          {/* Logo & Brand Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <RavsLogo size="md" showText={false} />
            <div>
              <h3 className="font-heading text-2xl font-black tracking-wider text-white">
                RAVS ESPORTS
              </h3>
              <p className="font-sub text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#A020F0]">
                RISE. COMPETE. CONQUER.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sub text-sm sm:text-base font-semibold tracking-wider text-[#A3A3A3] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-[#101010] border border-[#7A00FF]/40 text-[#A020F0] hover:text-white hover:bg-[#7A00FF] hover:border-[#A020F0] flex items-center justify-center transition-all duration-300 shadow-sm"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] tracking-wider font-sub gap-4">
          <p>© 2026 RAVS ESPORTS. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A020F0]" />
            <span>BUILT FOR PLAYERS & CREATORS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
