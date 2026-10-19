import React from 'react';
import Header from '../components/Header';
import ContactSection from '../components/ContactSection';
import DynamicBackground from '../components/DynamicBackground';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#060A08] text-[#CFDDD6] selection:bg-[#10B981]/30 selection:text-[#F2FDF7] relative overflow-x-hidden font-sans">
      <DynamicBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
