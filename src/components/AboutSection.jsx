import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Cpu, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Triggers when 20% of section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const whatIBuild = [
    { icon: Terminal, title: 'Python Applications', desc: 'Backend systems & automation workflows' },
    { icon: Database, title: 'Data Pipelines', desc: 'ETL, preprocessing, & clean dataset architecture' },
    { icon: Cpu, title: 'Practical AI Models', desc: 'Classification, deepfake detection & NLP search' },
  ];

  const howIWork = [
    { title: 'Clean data', desc: 'Preprocessed & verified datasets' },
    { title: 'Practical AI', desc: 'Production-oriented models' },
    { title: 'Reliable software', desc: 'Structured & tested codebases' },
    { title: 'Continuous learning', desc: 'DSA & algorithmic mastery' },
  ];

  const personalDetails = [
    { label: 'BASED IN', value: 'Bengaluru, India' },
    { label: 'STUDYING', value: 'Information Science Engineering' },
    { label: 'UNIVERSITY', value: 'Garden City University' },
    { label: 'GPA', value: '9.17 / 10' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 lg:py-44 bg-[#EDE4D8] dark:bg-[#1A1815] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="About Krupa B T"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          CINEMATIC BACKGROUND ATMOSPHERE (Warm Champagne & Bronze)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/6 left-1/4 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[160px] pointer-events-none dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(222, 211, 197, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.5) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* ─────────────────────────────────────────────────────────────
            HEADER & MAIN STATEMENT (MASKED UPWARD LINE-BY-LINE REVEAL)
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-16 sm:mb-20 relative">
          
          {/* Eyebrow: ABOUT ME */}
          <div
            className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm"
            style={{
              transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(25px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.24em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              ABOUT ME
            </span>
          </div>

          {/* Main Statement */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold tracking-[-0.03em] leading-[1.15] text-[#292522] dark:text-[#F5EFEB] mb-6">
            <div className="overflow-hidden py-1">
              <span
                className="block text-[#292522] dark:text-[#F5EFEB]"
                style={{
                  transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1), filter 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(70px)',
                  filter: isVisible || isReducedMotion ? 'blur(0px)' : 'blur(8px)',
                }}
              >
                I LIKE TURNING
              </span>
            </div>

            <div className="overflow-hidden py-1">
              <span
                className="block text-[#292522] dark:text-[#F5EFEB]"
                style={{
                  transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms, transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms, filter 850ms cubic-bezier(0.22, 1, 0.36, 1) 140ms',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(70px)',
                  filter: isVisible || isReducedMotion ? 'blur(0px)' : 'blur(8px)',
                }}
              >
                IDEAS INTO THINGS
              </span>
            </div>

            <div className="overflow-hidden py-1">
              <span
                className="block text-[#A8875A] dark:text-[#C4A67B]"
                style={{
                  transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1) 280ms, transform 850ms cubic-bezier(0.22, 1, 0.36, 1) 280ms, filter 850ms cubic-bezier(0.22, 1, 0.36, 1) 280ms',
                  opacity: isVisible || isReducedMotion ? 1 : 0,
                  transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(70px)',
                  filter: isVisible || isReducedMotion ? 'blur(0px)' : 'blur(8px)',
                }}
              >
                THAT ACTUALLY WORK.
              </span>
            </div>
          </h2>

          {/* Intro statement */}
          <p
            className="text-base sm:text-lg text-[#5F5750] dark:text-[#D1C8C0] font-normal leading-relaxed"
            style={{
              transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 420ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 420ms',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(30px)',
            }}
          >
            For me, programming is more than syntax. It is the craft of taking a concept that begins on paper or in thought, and giving it logic, data, and structure until it runs in the real world.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EDITORIAL ABSTRACT VISUAL: CODE → DATA → AI → SOFTWARE
        ───────────────────────────────────────────────────────────── */}
        <div
          className="mb-16 sm:mb-20 p-6 sm:p-8 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)]"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 300ms',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(35px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="text-xs font-serif tracking-[0.22em] text-[#7D736A] dark:text-[#9E9389] uppercase font-bold">
              ENGINEERING PIPELINE
            </div>

            {/* Flow line connecting CODE → DATA → AI → SOFTWARE */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-serif font-medium text-[#292522] dark:text-[#F5EFEB]">
              
              {/* CODE */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] pill-hover-effect">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />
                <span className="tracking-wide text-[#292522] dark:text-[#F5EFEB]">CODE</span>
              </div>

              <span className="text-[#A8875A] dark:text-[#C4A67B] text-xs">→</span>

              {/* DATA */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] pill-hover-effect">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4A67B]" />
                <span className="tracking-wide text-[#292522] dark:text-[#F5EFEB]">DATA</span>
              </div>

              <span className="text-[#A8875A] dark:text-[#C4A67B] text-xs">→</span>

              {/* AI */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A8875A]/15 dark:bg-[#C4A67B]/20 border border-[#A8875A]/40 dark:border-[#C4A67B]/40 text-[#292522] dark:text-[#F5EFEB] pill-hover-effect">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
                <span className="tracking-wide font-semibold text-[#A8875A] dark:text-[#C4A67B]">AI</span>
              </div>

              <span className="text-[#A8875A] dark:text-[#C4A67B] text-xs">→</span>

              {/* SOFTWARE */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] pill-hover-effect">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />
                <span className="tracking-wide text-[#292522] dark:text-[#F5EFEB]">SOFTWARE</span>
              </div>

            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            STRUCTURED THREE-PART GRID: WHO I AM | WHAT I BUILD | HOW I WORK
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16 sm:mb-20">
          
          {/* 1. WHO I AM */}
          <div
            className="p-7 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 ease-out shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)]"
            style={{
              transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 320ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 320ms',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(40px)',
            }}
          >
            <div className="text-xs font-serif tracking-[0.18em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />
              WHO I AM
            </div>

            <p className="text-sm sm:text-base text-[#5F5750] dark:text-[#D1C8C0] font-normal leading-relaxed">
              I am Krupa, an Information Science Engineering student at Garden City University in Bengaluru with a 9.17 GPA. My focus centers on Python development, artificial intelligence, and full-stack systems, taking ideas from concept to production.
            </p>
          </div>

          {/* 2. WHAT I BUILD */}
          <div
            className="p-7 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 ease-out shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)]"
            style={{
              transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 440ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 440ms',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(40px)',
            }}
          >
            <div className="text-xs font-serif tracking-[0.18em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />
              WHAT I BUILD
            </div>

            <div className="space-y-3">
              {whatIBuild.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm sm:text-base text-[#292522] dark:text-[#F5EFEB]"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center flex-shrink-0 text-[#A8875A] dark:text-[#C4A67B]">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. HOW I WORK */}
          <div
            className="p-7 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 ease-out shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)]"
            style={{
              transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1) 560ms, transform 750ms cubic-bezier(0.22, 1, 0.36, 1) 560ms',
              opacity: isVisible || isReducedMotion ? 1 : 0,
              transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(40px)',
            }}
          >
            <div className="text-xs font-serif tracking-[0.18em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B]" />
              HOW I WORK
            </div>

            <div className="space-y-3">
              {howIWork.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-sm sm:text-base"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#292522] dark:text-[#F5EFEB] font-medium">{item.title}</span>
                    <span className="text-xs text-[#7D736A] dark:text-[#9E9389] block mt-0.5">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            SUPPORTING PERSONAL PARAGRAPH
        ───────────────────────────────────────────────────────────── */}
        <div
          className="p-8 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)] mb-16 sm:mb-20"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 600ms',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <p className="text-sm sm:text-base md:text-lg text-[#5F5750] dark:text-[#D1C8C0] font-normal leading-relaxed max-w-4xl">
            From engineering conversational customer support powered by RAG and e-commerce revenue intelligence using association rule mining, to facial deepfake media detection across video frame sequences and NLP candidate matching, my focus is straightforward: pairing clean data with practical machine learning to solve real user challenges, while continuously improving my Data Structures & Algorithms, problem-solving, and software development skills.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HORIZONTAL METRIC BAR (AT A GLANCE)
        ───────────────────────────────────────────────────────────── */}
        <div
          className="pt-8 border-t border-[#DED3C5] dark:border-[#38332E]"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 700ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 700ms',
            opacity: isVisible || isReducedMotion ? 1 : 0,
            transform: isVisible || isReducedMotion ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          <div className="text-xs font-serif tracking-[0.25em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold mb-6 sm:mb-8">
            AT A GLANCE
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {personalDetails.map((detail) => (
              <div key={detail.label} className="space-y-1">
                <div className="text-[11px] font-serif tracking-[0.16em] uppercase text-[#7D736A] dark:text-[#9E9389] font-medium">
                  {detail.label}
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#292522] dark:text-[#F5EFEB] tracking-tight">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
