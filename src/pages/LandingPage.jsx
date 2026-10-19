import React from 'react';
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
  const handleEnterClick = (targetSection = 'home') => {
    const target = document.getElementById(targetSection);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] dark:bg-[#141210] text-[#5F5750] dark:text-[#D1C8C0] selection:bg-[#A8875A]/25 dark:selection:bg-[#C4A67B]/30 selection:text-[#292522] dark:selection:text-[#F5EFEB] relative overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* Global Cinematic Atmospheric Background System */}
      <CinematicBackground />

      {/* Sticky Editorial Header */}
      <Header />

      <main className="relative z-10">
        {/* Stage 1: Full-screen Cinematic Welcome Section */}
        <CinematicIntro onStartEnter={handleEnterClick} />

        {/* Stage 2: Home / Personal Intro */}
        <FirstScreenHero />

        {/* Stage 3: About Section (Upward Masked Reveal) */}
        <AboutSection />

        {/* Stage 4: Selected Work (Horizontal Reveal) */}
        <ProjectsSection />

        {/* Stage 5: Capabilities */}
        <SkillsSection />

        {/* Stage 6: Professional Experience (Timeline Growth) */}
        <ExperienceSection />

        {/* Stage 7: Education (Alternating Slide) */}
        <EducationSection />

        {/* Stage 8: Certifications (Staggered Scale) */}
        <CertificationsSection />

        {/* Stage 9: Contact Final Scene (Cinematic Scale) */}
        <ContactSection />
      </main>

    </div>
  );
}
