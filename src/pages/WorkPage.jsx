import React from 'react';
import Header from '../components/Header';
import ProjectsSection from '../components/ProjectsSection';
import DynamicBackground from '../components/DynamicBackground';

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] dark:bg-[#141210] text-[#5F5750] dark:text-[#D1C8C0] selection:bg-[#A8875A]/25 dark:selection:bg-[#C4A67B]/30 selection:text-[#292522] dark:selection:text-[#F5EFEB] relative overflow-x-hidden font-sans transition-colors duration-300">
      <DynamicBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          <ProjectsSection />
        </main>
      </div>
    </div>
  );
}
