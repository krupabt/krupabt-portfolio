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
      className="relative py-32 sm:py-40 lg:py-48 text-[#F8FAFC] overflow-hidden"
      role="region"
      aria-label="Academic Education"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BLUE LIGHT SOURCES BEHIND EDUCATION SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(91, 140, 255, 0.14) 0%, rgba(17, 24, 39, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(122, 162, 255, 0.08) 0%, rgba(13, 17, 24, 0.45) 50%, transparent 75%)',
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
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B8CFF] animate-pulse" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7AA2FF] font-semibold">
              ACADEMIC FOUNDATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#F5F7FA]">
            EDUCATION.
          </h2>
          <p className="mt-4 text-[#9AA4B2] text-base sm:text-lg font-normal max-w-xl leading-relaxed text-center">
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
                className="p-8 sm:p-10 rounded-[20px] bg-[rgba(17,24,39,0.55)] border border-white/[0.08] hover:border-[#5B8CFF]/35 card-hover-subtle transition-all duration-500 shadow-xl space-y-4"
                style={{
                  transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${staggerDelay}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0px)' : `translateX(${initialTranslate})`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[#5B8CFF] uppercase tracking-wider font-semibold">
                      {edu.period}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-[#9AA4B2] font-normal flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#5B8CFF] flex-shrink-0" />
                      <span>{edu.institution}</span>
                      <span className="text-white/20">·</span>
                      <MapPin className="w-3.5 h-3.5 text-[#6F7A89] flex-shrink-0" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {edu.score && (
                    <div className="self-start px-3.5 py-1.5 rounded-full bg-[#5B8CFF]/10 border border-[#5B8CFF]/25 text-[#7AA2FF] text-xs font-mono font-bold whitespace-nowrap shadow-sm">
                      {edu.score}
                    </div>
                  )}
                </div>

                {edu.highlights && (
                  <p className="text-sm sm:text-base text-[#D7DCE5] leading-relaxed font-normal pt-3 border-t border-white/[0.08]">
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
