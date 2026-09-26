/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Tournament } from './components/Tournament';
import { FollowUs } from './components/FollowUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'tournament', 'follow-us', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E5E5E5] flex flex-col selection:bg-[#7A00FF] selection:text-white">
      {/* Background Ambience & Particles */}
      <BackgroundParticles />

      {/* Sticky Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. About RAVS ESPORTS */}
        <About />

        {/* 3. BGMI TOURNAMENT 2026 */}
        <Tournament />

        {/* 4. Follow Us (Instagram + Discord) */}
        <FollowUs />

        {/* 5. Contact RAVS ESPORTS */}
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
