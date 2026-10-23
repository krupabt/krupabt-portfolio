import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Triggers when 20-30% of the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative scroll-mt-20 sm:scroll-mt-24 py-32 sm:py-40 lg:py-48 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Professional Experience"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE LIGHT SOURCES BEHIND EXPERIENCE SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 left-10 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(237, 228, 216, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-8 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          className="mb-20 sm:mb-24"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              EXPERIENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] dark:text-[#F5EFEB] max-w-2xl">
            PRACTICAL ENGINEERING.
          </h2>
          <p className="mt-4 text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal max-w-xl leading-relaxed">
            Applied software development, hands-on application logic, database architecture, and quality testing.
          </p>
        </div>

        {/* Vertical Timeline Container with Visible Growing Line */}
        <div className="relative pl-6 sm:pl-10 space-y-16">
          
          {/* Base Track */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#DED3C5] dark:bg-[#38332E] overflow-hidden rounded-full">
            <div
              className="w-full bg-gradient-to-b from-[#A8875A] via-[#C4A67B] to-[#DED3C5] dark:to-[#38332E] rounded-full"
              style={{
                transition: 'height 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
                height: isVisible ? '100%' : '0%',
                boxShadow: isVisible ? '0 0 12px rgba(168, 135, 90, 0.3)' : 'none',
              }}
            />
          </div>

          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="relative group"
              style={{
                transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${400 + idx * 250}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0px)' : 'translateX(40px)',
              }}
            >
              
              {/* Pulsing Timeline Node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] border-2 border-[#A8875A] dark:border-[#C4A67B] flex items-center justify-center shadow-[0_0_10px_rgba(168,135,90,0.35)]"
                style={{
                  transition: 'opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${450 + idx * 250}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-ping" />
              </div>

              {/* Experience Card */}
              <div className="p-8 sm:p-10 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 shadow-[0_10px_30px_-6px_rgba(41,37,34,0.06)] dark:shadow-[0_10px_30px_-6px_rgba(0,0,0,0.3)] space-y-6">
                
                {/* Meta Row: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED3C5] dark:border-[#38332E] pb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-base font-bold text-[#A8875A] dark:text-[#C4A67B] mt-1 font-serif">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-serif text-[#7D736A] dark:text-[#9E9389]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Resume Bullets */}
                <div className="space-y-3.5 pt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3.5 text-sm sm:text-base font-normal text-[#5F5750] dark:text-[#D1C8C0] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] mt-1 flex-shrink-0" />
                      <span>
                        {typeof bullet === 'string' && bullet.includes('**')
                          ? bullet.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                              part.startsWith('**') && part.endsWith('**') ? (
                                <strong key={i} className="font-bold text-[#292522] dark:text-[#F5EFEB]">
                                  {part.slice(2, -2)}
                                </strong>
                              ) : (
                                part
                              )
                            )
                          : bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#DED3C5] dark:border-[#38332E]">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-serif text-[#292522] dark:text-[#F5EFEB] bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] rounded-lg pill-hover-effect hover:border-[#A8875A] dark:hover:border-[#C4A67B] hover:bg-[#FFFCF7] dark:hover:bg-[#2D2824]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
