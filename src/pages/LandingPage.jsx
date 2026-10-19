import React, { useState } from 'react';
import CinematicIntro from '../components/CinematicIntro';
import CinematicBackground from '../components/CinematicBackground';
import Header from '../components/Header';
import FirstScreenHero from '../components/FirstScreenHero';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';

export default function LandingPage() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnterClick = (targetSection = 'home') => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (targetSection && targetSection !== 'home') {
      setTimeout(() => {
        const target = document.getElementById(targetSection);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] dark:bg-[#141210] text-[#5F5750] dark:text-[#D1C8C0] selection:bg-[#A8875A]/25 dark:selection:bg-[#C4A67B]/30 selection:text-[#292522] dark:selection:text-[#F5EFEB] relative overflow-x-hidden font-sans transition-colors duration-300">
      {!hasEntered ? (
        /* Dedicated First Screen (Intro Page) */
        <CinematicIntro onStartEnter={handleEnterClick} />
      ) : (
        /* Main Portfolio Website (Revealed upon clicking Enter My Portfolio) */
        <div className="animate-main-reveal">
          {/* Global Cinematic Atmospheric Background System */}
          <CinematicBackground />

          {/* Sticky Editorial Header */}
          <Header />

          <main className="relative z-10">
            {/* Stage 1: Home / Personal Intro */}
            <FirstScreenHero />

            {/* Stage 2: About Section */}
            <AboutSection />

            {/* Stage 3: Selected Work */}
            <ProjectsSection />

            {/* Stage 4: Capabilities */}
            <SkillsSection />

            {/* Stage 5: Professional Experience */}
            <ExperienceSection />

            {/* Stage 6: Education */}
            <EducationSection />

            {/* Stage 7: Certifications */}
            <CertificationsSection />

            {/* Stage 8: Contact Final Scene */}
            <ContactSection />
          </main>
        </div>
      )}
    </div>
  );
}
