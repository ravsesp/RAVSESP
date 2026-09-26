import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { RavsLogo } from './RavsLogo';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home', highlight: false },
    { label: 'About', href: '#about', id: 'about', highlight: false },
    { label: 'Tournament', href: '#tournament', id: 'tournament', highlight: true },
    { label: 'Follow Us', href: '#follow-us', id: 'follow-us', highlight: false },
    { label: 'Contact', href: '#contact', id: 'contact', highlight: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#7A00FF]/35 shadow-[0_4px_30px_rgba(5,5,5,0.85)]'
          : 'bg-[#050505]/70 backdrop-blur-sm border-b border-[#7A00FF]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: RAVS ESPORTS Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A00FF]"
          aria-label="RAVS ESPORTS Home"
        >
          <RavsLogo size="sm" showText={true} />
        </a>

        {/* Center / Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative font-sub text-base font-semibold tracking-wider transition-all duration-200 py-1 flex items-center gap-1.5 ${
                  item.highlight
                    ? isActive
                      ? 'text-white'
                      : 'text-[#A020F0] hover:text-white font-bold'
                    : isActive
                      ? 'text-white'
                      : 'text-[#B3B3B3] hover:text-white'
                }`}
              >
                <span>{item.label.toUpperCase()}</span>
                {item.highlight && (
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A020F0] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A020F0] shadow-[0_0_6px_#A020F0]" />
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7A00FF] to-[#A020F0] shadow-[0_0_8px_#A020F0]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Register Now CTA button linking to #tournament */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#tournament"
            onClick={(e) => handleNavClick(e, '#tournament')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] hover:from-[#8B1FFF] hover:to-[#B43DF5] rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(122,0,255,0.4)] hover:shadow-[0_0_25px_rgba(160,32,240,0.6)] transform hover:-translate-y-0.5"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#101010] border border-[#7A00FF]/40 text-[#E5E5E5] hover:text-white hover:border-[#A020F0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A00FF] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#A020F0]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden border-b border-[#7A00FF]/30 bg-[#07070a]/98 backdrop-blur-xl ${
          mobileMenuOpen ? 'max-h-[420px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <div className="px-6 space-y-2.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg font-sub text-lg font-bold tracking-wider transition-colors ${
                  item.highlight
                    ? isActive
                      ? 'bg-[#7A00FF]/25 text-white border-l-4 border-[#A020F0]'
                      : 'text-[#A020F0] bg-[#14101e] border-l-2 border-[#A020F0]'
                    : isActive
                      ? 'bg-[#7A00FF]/20 text-white border-l-4 border-[#A020F0]'
                      : 'text-[#B3B3B3] hover:text-white hover:bg-[#101010]'
                }`}
              >
                <span>{item.label.toUpperCase()}</span>
                {item.highlight && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-heading font-black bg-[#A020F0] text-white">
                    LIVE
                  </span>
                )}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#tournament"
              onClick={(e) => handleNavClick(e, '#tournament')}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 text-xs font-heading font-bold text-white bg-gradient-to-r from-[#7A00FF] to-[#A020F0] rounded-xl shadow-[0_0_20px_rgba(122,0,255,0.5)]"
            >
              <span>REGISTER FOR BGMI TOURNAMENT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
