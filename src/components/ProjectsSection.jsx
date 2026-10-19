import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Play, Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';

// Cinematic Modal / Lightbox for full screenshot preview
function ProjectImageLightbox({ activeImage, onClose }) {
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeImage, onClose]);

  if (!activeImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#040806]/95 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeImage.title} Preview`}
    >
      {/* Close Button */}
      <div
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 flex items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-[#F2FDF7] hover:text-white border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
          aria-label="Close Preview (Esc)"
          title="Close Preview (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Preview Container */}
      <div
        className="relative max-w-6xl max-h-[88vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden border border-emerald-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-[#07100C]">
          <img
            src={activeImage.src}
            alt={`${activeImage.title} Screenshot Preview`}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h4 className="text-base sm:text-lg font-bold text-[#F2FDF7] tracking-tight">
            {activeImage.title}
          </h4>
          {activeImage.subtitle && (
            <p className="text-xs sm:text-sm text-[#93A79E] font-normal mt-0.5">
              {activeImage.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Project Image Card with Fallback Placeholder and Hover Scale
function ProjectImageCard({ project, onOpenLightbox }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImages = project.images && project.images.length > 0;
  const primaryImage = hasImages ? project.images[0] : null;

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [primaryImage]);

  return (
    <div className="relative w-full aspect-[16/10] rounded-[22px] bg-[#0B1310] border border-white/[0.08] shadow-2xl overflow-hidden group hover:border-[#10B981]/45 card-hover-subtle transition-all duration-300">
      {hasImages && !imgError ? (
        <div
          className="relative w-full h-full cursor-pointer overflow-hidden"
          onClick={() => {
            if (imgLoaded && !imgError) {
              onOpenLightbox({
                src: primaryImage,
                title: project.title,
                subtitle: project.subtitle,
              });
            }
          }}
        >
          <img
            src={primaryImage}
            alt={`${project.title} Interface`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              imgLoaded ? 'opacity-100 filter-none' : 'opacity-0'
            }`}
          />

          {/* Hover Overlay Hint & Lighting Accent */}
          {imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-end justify-center pb-6 pointer-events-none">
              <span className="px-4 py-2 rounded-xl bg-[#060A08]/95 border border-white/[0.1] text-xs font-serif text-[#CFDDD6] tracking-wider flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-[#10B981]" />
                EXPAND PREVIEW
              </span>
            </div>
          )}
        </div>
      ) : null}

      {/* Clean Fallback Placeholder when image doesn't exist yet */}
      {(!hasImages || imgError || !imgLoaded) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0B1310] via-[#080E0C] to-[#060A08] ${hasImages && !imgError && imgLoaded ? 'hidden' : 'flex'}`}>
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3 text-[#10B981]">
            <ImageIcon className="w-6 h-6 opacity-80" />
          </div>
          <span className="text-xs font-serif font-bold tracking-[0.22em] text-[#F2FDF7] uppercase">
            PROJECT PREVIEW
          </span>
          <span className="text-[14px] font-serif text-[#CFDDD6] mt-1.5 max-w-xs font-medium">
            {project.title}
          </span>
          <span className="text-xs font-serif text-[#647870] mt-3 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            Place screenshot in public{project.images?.[0] || `/projects/${project.id}/home.png`}
          </span>
        </div>
      )}
    </div>
  );
}

// Custom Project Item Component with Alternating Layout & Staggered Viewport Animation
function ProjectSceneItem({ project, idx, onOpenLightbox }) {
  const isEven = idx % 2 === 0;
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    // Triggers when 20-30% of the project item enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const imageInitialTranslate = isEven ? '-80px' : '80px';
  const textInitialTranslate = isEven ? '60px' : '-60px';

  return (
    <div
      ref={itemRef}
      key={project.id}
      className="relative scroll-mt-28 font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Atmospheric Glow specific to project */}
      <div
        className={`absolute -top-24 ${isEven ? 'left-0' : 'right-0'} w-[520px] h-[520px] rounded-full blur-[180px] pointer-events-none opacity-20`}
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* VISUAL MEDIA COLUMN */}
        <div
          className={`lg:col-span-6 w-full ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
          style={{
            transition: 'opacity 1050ms cubic-bezier(0.22, 1, 0.36, 1), transform 1050ms cubic-bezier(0.22, 1, 0.36, 1), filter 1050ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? (isHovered ? 'translateY(-3px) scale(1.008)' : 'translate(0px, 0px) scale(1)')
              : `translateX(${imageInitialTranslate}) scale(1.08)`,
            filter: isVisible ? 'blur(0px)' : 'blur(8px)',
          }}
          id={`media-${project.id}`}
        >
          {project.demoVideo ? (
            <div className="relative w-full aspect-[16/10] rounded-[22px] bg-black/90 border border-white/[0.08] shadow-2xl p-2 overflow-hidden group hover:border-[#10B981]/35 transition-all duration-500">
              <video
                src={project.demoVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>
          ) : (
            <ProjectImageCard project={project} onOpenLightbox={onOpenLightbox} />
          )}
        </div>

        {/* TEXT & DETAILS COLUMN */}
        <div
          className={`lg:col-span-6 flex flex-col items-start space-y-6 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
          style={{
            transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0px)' : `translateX(${textInitialTranslate})`,
          }}
        >
          {/* Project Number & Subtitle */}
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl font-bold font-serif text-[#10B981] tracking-tight">
              {project.number}
            </span>
            <div className="w-8 h-[1px] bg-white/[0.12]" />
            <span className="text-xs font-serif tracking-[0.2em] uppercase text-[#93A79E] font-medium">
              {project.subtitle}
            </span>
          </div>

          {/* Project Title (shifts slightly on hover) */}
          <h3
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F2FDF7] leading-[1.18] transition-all duration-300 ${
              isHovered ? 'text-[#34D399] translate-x-1' : ''
            }`}
          >
            {project.title}
          </h3>

          {/* Highlight Badge if available */}
          {project.stat && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-xs font-serif text-[#34D399] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{project.stat}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-base sm:text-lg text-[#93A79E] font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Detailed Highlights */}
          <div className="space-y-3 pt-2 w-full">
            {project.details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-start gap-3 text-sm font-normal text-[#CFDDD6] leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          {/* Technologies Pills */}
          <div className="pt-2">
            <div className="text-xs font-serif tracking-widest text-[#647870] uppercase mb-2.5 font-medium">
              TECH STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-serif text-[#CFDDD6] bg-[#111C18] border border-white/[0.08] rounded-lg pill-hover-effect hover:border-[#10B981]/50 hover:text-[#F2FDF7]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links: GITHUB, LIVE DEMO, WATCH DEMO with 200-300ms hover lift */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* GITHUB */}
            {(project.githubUrl || project.github) && (
              <a
                href={project.githubUrl || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <GithubIcon className="w-4 h-4 text-[#10B981]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#10B981] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            )}

            {/* LIVE DEMO */}
            {project.demoUrl && !project.demoUrl.includes('localhost') && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-white bg-[#10B981] hover:bg-[#059669] btn-hover-effect shadow-[0_4px_20px_rgba(16,185,129,0.30)] hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            )}

            {/* WATCH DEMO */}
            {project.demoVideo && (
              <a
                href={`#media-${project.id}`}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#CFDDD6] hover:text-[#F2FDF7] bg-[#0B1310]/85 hover:bg-[#111C18] border border-white/[0.12] hover:border-[#10B981]/50 btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <Play className="w-3.5 h-3.5 text-[#10B981] fill-current" />
                <span>WATCH DEMO</span>
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      className="relative py-32 sm:py-40 lg:py-48 text-[#F2FDF7] overflow-hidden"
      role="region"
      aria-label="Selected Engineering Work"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC EMERALD LIGHT SOURCES BEHIND WORK SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-0 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[170px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(17, 28, 24, 0.45) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 left-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(11, 19, 16, 0.45) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Lightbox Preview Modal */}
      <ProjectImageLightbox
        activeImage={activeLightboxImage}
        onClose={() => setActiveLightboxImage(null)}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-24 sm:mb-32"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0px)' : 'translateY(30px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#34D399] font-bold">
              SELECTED WORK
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#F2FDF7] max-w-3xl">
            PRACTICAL SYSTEMS & APPLICATIONS.
          </h2>

          <p className="mt-4 text-[#93A79E] text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
            Production-oriented architectures spanning AI retrieval-augmented generation, media forensics, e-commerce intelligence, and full-stack web applications.
          </p>
        </div>

        {/* Alternating Project Scenes */}
        <div className="space-y-32 sm:space-y-40 lg:space-y-48">
          {projectsData.map((project, idx) => (
            <ProjectSceneItem
              key={project.id}
              project={project}
              idx={idx}
              onOpenLightbox={(imgData) => setActiveLightboxImage(imgData)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
