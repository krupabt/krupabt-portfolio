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
      className="relative py-32 sm:py-40 lg:py-48 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Verified Certifications"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE LIGHT SOURCES BEHIND CERTIFICATIONS SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[170px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(237, 228, 216, 0.40) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.45) 50%, transparent 75%)',
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
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.22em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              CREDENTIALS & VALIDATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] dark:text-[#F5EFEB]">
            CERTIFICATIONS.
          </h2>
          <p className="mt-4 text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal max-w-xl leading-relaxed text-center">
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
                className="p-8 rounded-[20px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.3)] flex flex-col justify-between group"
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
                      <div className="w-8 h-8 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-serif font-bold text-[#A8875A] dark:text-[#C4A67B] uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif text-[#A8875A] dark:text-[#C4A67B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] tracking-tight leading-snug group-hover:text-[#A8875A] dark:group-hover:text-[#C4A67B] transition-colors duration-250">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-8 pt-4 border-t border-[#DED3C5] dark:border-[#38332E] flex items-center justify-between text-xs font-serif">
                  <span className="text-[#7D736A] dark:text-[#9E9389]">Issuing Organization</span>
                  <span className="font-bold text-[#292522] dark:text-[#F5EFEB]">{cert.issuer}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
