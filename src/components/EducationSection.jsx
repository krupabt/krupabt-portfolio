import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Triggers when 20% of the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 bg-[#EDE4D8] dark:bg-[#1A1815] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Academic Education"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE & CHAMPAGNE LIGHT SOURCES
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(222, 211, 197, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.5) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          className="mb-16 sm:mb-20 text-center flex flex-col items-center"
          style={{
            transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.22em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              ACADEMIC FOUNDATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] dark:text-[#F5EFEB]">
            EDUCATION.
          </h2>
          <p className="mt-4 text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal max-w-xl leading-relaxed text-center">
            Formal university engineering training and foundational computational coursework.
          </p>
        </div>

        {/* Alternating Slide Items */}
        <div className="space-y-8">
          {educationData.map((edu, idx) => {
            const initialTranslate = idx % 2 === 0 ? '-70px' : '70px';
            const staggerDelay = 180 + idx * 180;

            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)] space-y-4"
                style={{
                  transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${staggerDelay}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0px)' : `translateX(${initialTranslate})`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-xs font-serif text-[#A8875A] dark:text-[#C4A67B] uppercase tracking-wider font-bold">
                      {edu.period}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-[#5F5750] dark:text-[#D1C8C0] font-normal flex items-center gap-2 font-serif">
                      <GraduationCap className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] flex-shrink-0" />
                      <span>{edu.institution}</span>
                      <span className="text-[#DED3C5] dark:text-[#38332E]">·</span>
                      <MapPin className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] flex-shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {edu.score && (
                    <div className="self-start px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-[#A8875A] dark:text-[#C4A67B] text-xs font-serif font-bold whitespace-nowrap shadow-sm">
                      {edu.score}
                    </div>
                  )}
                </div>

                {edu.highlights && (
                  <p className="text-sm sm:text-base text-[#5F5750] dark:text-[#D1C8C0] leading-relaxed font-normal pt-3 border-t border-[#DED3C5] dark:border-[#38332E]">
                    {edu.highlights}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
