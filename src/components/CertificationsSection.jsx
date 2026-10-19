import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export default function CertificationsSection() {
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
      id="certifications"
      ref={sectionRef}
      className="relative py-32 sm:py-40 lg:py-48 text-[#F2FDF7] overflow-hidden"
      role="region"
      aria-label="Verified Certifications"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC EMERALD LIGHT SOURCES BEHIND CERTIFICATIONS SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(17, 28, 24, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.22em] uppercase text-[#34D399] font-bold">
              CREDENTIALS & VALIDATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#F2FDF7]">
            CERTIFICATIONS.
          </h2>
          <p className="mt-4 text-[#93A79E] text-base sm:text-lg font-normal max-w-xl leading-relaxed text-center">
            Completed technical programs and practical job simulations through recognized institutions.
          </p>
        </div>

        {/* 4 Authentic Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certificationsData.map((cert, idx) => {
            const staggerDelay = 150 + idx * 140;

            return (
              <div
                key={idx}
                className="p-8 rounded-[20px] bg-[rgba(17,28,24,0.65)] border border-white/[0.08] hover:border-[#10B981]/45 card-hover-subtle transition-all duration-300 shadow-xl flex flex-col justify-between group"
                style={{
                  transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${staggerDelay}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1) translateY(0px)' : 'scale(0.92) translateY(25px)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#111C18] border border-white/[0.08] flex items-center justify-center text-[#10B981]">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-serif font-bold text-[#10B981] uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-serif text-[#34D399]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#F2FDF7] tracking-tight leading-snug group-hover:text-[#34D399] transition-colors duration-250">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-serif">
                  <span className="text-[#647870]">Issuing Organization</span>
                  <span className="font-bold text-[#CFDDD6]">{cert.issuer}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
