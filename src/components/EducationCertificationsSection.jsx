import React, { useState, useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import { educationData, certificationsData } from '../data/portfolioData';

export default function EducationCertificationsSection() {
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
      id="education"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 text-[#F8F7FF] overflow-hidden"
      role="region"
      aria-label="Education and Certifications"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Atmospheric Background Ambient Light */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[190px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(117, 98, 122, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* LEFT: EDUCATION (Alternating Directional Slide: -70px vs +70px) */}
          <div className="lg:col-span-6 space-y-12">
            <div
              style={{
                transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8B6FF] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#CEC8C2] font-semibold">
                  ACADEMIC FOUNDATION
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-[#FFFFFF]">
                EDUCATION.
              </h2>
            </div>

            <div className="space-y-8">
              {educationData.map((edu, idx) => {
                // Item 1: translateX(-70px) -> 0
                // Item 2: translateX(70px) -> 0
                const initialTranslate = idx % 2 === 0 ? '-70px' : '70px';
                const staggerDelay = 200 + idx * 220; // Distinct stagger timing

                return (
                  <div
                    key={idx}
                    className="p-8 rounded-[24px] bg-gradient-to-br from-white/[0.04] via-white/[0.015] to-transparent border border-white/[0.08] hover:border-[#C8B6FF]/35 space-y-3"
                    style={{
                      transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${staggerDelay}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0px)' : `translateX(${initialTranslate})`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="text-xs font-mono text-[#C8B6FF] uppercase tracking-wider font-semibold">
                          {edu.period}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] tracking-tight">
                          {edu.degree}
                        </h3>
                        <div className="text-sm text-[#CEC8C2] font-normal">
                          {edu.institution} · {edu.location}
                        </div>
                      </div>

                      <div className="px-4 py-1.5 rounded-full bg-[#38202D]/40 border border-[#C8B6FF]/30 text-xs font-mono font-semibold text-[#C8B6FF] flex-shrink-0">
                        {edu.score}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#CEC8C2] font-normal leading-relaxed pt-3 border-t border-white/[0.06]">
                      {edu.highlights}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: CERTIFICATIONS (Staggered scale: scale(0.94) + opacity 0 -> scale(1) + opacity 1) */}
          <div className="lg:col-span-6 space-y-12 relative">
            <div id="certifications" className="absolute -top-32 left-0" />

            <div
              style={{
                transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8B6FF] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#CEC8C2] font-semibold">
                  VERIFIED CREDENTIALS
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-[#FFFFFF]">
                CERTIFICATIONS.
              </h2>
            </div>

            <div className="space-y-4">
              {certificationsData.map((cert, idx) => {
                // Delay each certificate by ~120ms
                const certDelay = 250 + idx * 120;

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-[22px] bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.08] hover:border-[#C8B6FF]/35 flex items-center justify-between gap-4 group hover:translate-x-1.5"
                    style={{
                      transition: 'opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), transform 750ms cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${certDelay}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0.94)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#C8B6FF] flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#FFFFFF] tracking-tight">
                          {cert.title}
                        </h4>
                        <div className="text-xs text-[#A9A29D] font-normal mt-0.5">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8B6FF] px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] flex-shrink-0 font-medium">
                      {cert.credentialTag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
