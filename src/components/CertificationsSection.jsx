import React, { useState, useEffect, useRef } from 'react';
import { Award, Calendar, CheckCircle2, Brain, Code2, TrendingUp, Terminal, Maximize2, X } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

// Map icon types to Lucide components
const iconMap = {
  Brain: Brain,
  Code2: Code2,
  TrendingUp: TrendingUp,
  Terminal: Terminal,
};

// Modal / Lightbox for full certificate preview
function CertificateLightbox({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#292522]/95 dark:bg-[#0E0C0B]/95 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} Certificate Full Preview`}
    >
      {/* Close Button */}
      <div
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/20 text-[#F7F3ED] border border-[#DED3C5]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A8875A] cursor-pointer"
          aria-label="Close Preview (Esc)"
          title="Close Preview (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Preview Container */}
      <div
        className="relative max-w-5xl max-h-[88vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#DED3C5] dark:border-[#38332E] shadow-2xl bg-[#FFFCF7] dark:bg-[#1C1917] max-h-[76vh]">
          <img
            src={cert.image}
            alt={`${cert.title} Certificate`}
            className="max-h-[74vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h4 className="text-base sm:text-lg font-bold text-[#F7F3ED] tracking-tight">
            {cert.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#DED3C5] font-normal mt-0.5">
            {cert.issuer} • Issued {cert.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Triggers when 15% of the section enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
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
      className="relative scroll-mt-20 sm:scroll-mt-24 py-28 sm:py-36 lg:py-44 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Verified Certifications"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE & CHAMPAGNE LIGHT SOURCES BEHIND SECTION
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

        {/* 4 Professional Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certificationsData.map((cert, idx) => {
            const staggerDelay = 120 + idx * 120;
            const IconComponent = iconMap[cert.icon] || Award;

            return (
              <div
                key={cert.title}
                className="p-7 sm:p-8 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 shadow-[0_6px_24px_-4px_rgba(41,37,34,0.06)] dark:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.35)] flex flex-col justify-between group"
                style={{
                  transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${staggerDelay}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1) translateY(0px)' : 'scale(0.94) translateY(24px)',
                }}
              >
                <div>
                  {/* Top Bar: Icon + Platform/Org + Completion Date Pill */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B] shadow-xs group-hover:scale-105 transition-transform duration-250">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-serif font-bold text-[#A8875A] dark:text-[#C4A67B] uppercase tracking-wider block">
                          {cert.issuer}
                        </span>
                        <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389] font-sans">
                          {cert.issuerType || 'Platform'}
                        </span>
                      </div>
                    </div>

                    {/* Completion Date Clearly Displayed */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDE4D8]/80 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif text-[#292522] dark:text-[#F5EFEB] shadow-xs whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                      <span className="font-semibold">{cert.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] tracking-tight leading-snug group-hover:text-[#A8875A] dark:group-hover:text-[#C4A67B] transition-colors duration-250">
                    {cert.title}
                  </h3>

                  {/* Certificate Photo Preview if available */}
                  {cert.image && (
                    <div
                      className="mt-5 relative group/img cursor-pointer rounded-xl overflow-hidden border border-[#DED3C5] dark:border-[#38332E] bg-[#EDE4D8]/30 dark:bg-[#1C1917]/60 aspect-[16/10] flex items-center justify-center transition-all duration-300 group-hover/img:border-[#A8875A] dark:group-hover/img:border-[#C4A67B] shadow-xs"
                      onClick={() => setActiveCertificate(cert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveCertificate(cert);
                        }
                      }}
                      aria-label={`View ${cert.title} Certificate`}
                    >
                      <img
                        src={cert.image}
                        alt={`${cert.title} Certificate`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.03]"
                        loading="lazy"
                      />
                      {/* Hover Overlay with View Certificate Pill */}
                      <div className="absolute inset-0 bg-[#292522]/30 dark:bg-[#141210]/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-250 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] dark:bg-[#24201D] text-[#292522] dark:text-[#F5EFEB] text-xs font-serif font-semibold shadow-lg border border-[#DED3C5] dark:border-[#38332E]">
                          <Maximize2 className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                          <span>View Certificate</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Details: Platform/Organization & Completion Status */}
                <div className="mt-8 pt-4 border-t border-[#DED3C5] dark:border-[#38332E] flex items-center justify-between text-xs font-serif">
                  <span className="text-[#7D736A] dark:text-[#9E9389]">
                    {cert.issuerType === 'Organization' ? 'Organization' : 'Platform'}: <strong className="font-semibold text-[#292522] dark:text-[#F5EFEB]">{cert.issuer}</strong>
                  </span>
                  
                  <div className="inline-flex items-center gap-1.5 text-[#A8875A] dark:text-[#C4A67B] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <CertificateLightbox
        cert={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </section>
  );
}
