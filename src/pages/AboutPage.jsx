import React from 'react';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import DynamicBackground from '../components/DynamicBackground';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080A0F] text-[#D7DCE5] relative overflow-x-hidden font-sans">
      <DynamicBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          <AboutSection />
        </main>
      </div>
    </div>
  );
}
