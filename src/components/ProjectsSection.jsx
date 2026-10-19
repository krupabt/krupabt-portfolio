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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#292522]/95 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
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
          className="p-3 rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/20 text-[#F7F3ED] border border-[#DED3C5]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A8875A]"
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
        <div className="relative rounded-2xl overflow-hidden border border-[#DED3C5] shadow-2xl bg-[#FFFCF7]">
          <img
            src={activeImage.src}
            alt={`${activeImage.title} Screenshot Preview`}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h4 className="text-base sm:text-lg font-bold text-[#F7F3ED] tracking-tight">
            {activeImage.title}
          </h4>
          {activeImage.subtitle && (
            <p className="text-xs sm:text-sm text-[#DED3C5] font-normal mt-0.5">
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
    <div className="relative w-full aspect-[16/10] rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-[0_12px_36px_-6px_rgba(41,37,34,0.08)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.4)] overflow-hidden group hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#292522]/80 dark:from-[#141210]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-end justify-center pb-6 pointer-events-none">
              <span className="px-4 py-2 rounded-xl bg-[#292522]/90 dark:bg-[#24201D]/90 border border-[#DED3C5]/30 dark:border-[#38332E] text-xs font-serif text-[#F7F3ED] dark:text-[#F5EFEB] tracking-wider flex items-center gap-2 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                EXPAND PREVIEW
              </span>
            </div>
          )}

          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#EDE4D8] dark:bg-[#1C1917] animate-pulse">
              <ImageIcon className="w-10 h-10 text-[#A8875A]/40 dark:text-[#C4A67B]/40" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8 text-center bg-[#EDE4D8] dark:bg-[#1C1917]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-semibold text-[#292522] dark:text-[#F5EFEB] block font-serif">
              {project.title}
            </span>
            <span className="text-xs text-[#7D736A] dark:text-[#9E9389] mt-1 block">
              Architectural implementation active
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Single Project Scene Row
function ProjectSceneItem({ project, idx, onOpenLightbox }) {
  const isEven = idx % 2 === 0;
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' }
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
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.10) 0%, transparent 70%)',
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
            <div className="relative w-full aspect-[16/10] rounded-[22px] bg-[#292522] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] shadow-[0_12px_36px_-6px_rgba(41,37,34,0.08)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.4)] p-2 overflow-hidden group hover:border-[#A8875A] dark:hover:border-[#C4A67B] transition-all duration-500">
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
            <span className="text-3xl sm:text-4xl font-bold font-serif text-[#A8875A] dark:text-[#C4A67B] tracking-tight">
              {project.number}
            </span>
            <div className="w-8 h-[1px] bg-[#DED3C5] dark:bg-[#38332E]" />
            <span className="text-xs font-serif tracking-[0.2em] uppercase text-[#7D736A] dark:text-[#9E9389] font-medium">
              {project.subtitle}
            </span>
          </div>

          {/* Project Title */}
          <h3
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB] leading-[1.18] transition-all duration-300 ${
              isHovered ? 'text-[#A8875A] dark:text-[#C4A67B] translate-x-1' : ''
            }`}
          >
            {project.title}
          </h3>

          {/* Highlight Badge if available */}
          {project.stat && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif text-[#A8875A] dark:text-[#C4A67B] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
              <span>{project.stat}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-base sm:text-lg text-[#5F5750] dark:text-[#D1C8C0] font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Detailed Highlights */}
          <div className="space-y-3 pt-2 w-full">
            {project.details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-start gap-3 text-sm font-normal text-[#5F5750] dark:text-[#D1C8C0] leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] mt-2 flex-shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          {/* Technologies Pills */}
          <div className="pt-2">
            <div className="text-xs font-serif tracking-widest text-[#7D736A] dark:text-[#9E9389] uppercase mb-2.5 font-medium">
              TECH STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs font-serif text-[#292522] dark:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] rounded-lg pill-hover-effect hover:border-[#A8875A] dark:hover:border-[#C4A67B] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links: GITHUB, LIVE DEMO, WATCH DEMO */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* GITHUB */}
            {(project.githubUrl || project.github) && (
              <a
                href={project.githubUrl || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              >
                <GithubIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            )}

            {/* LIVE DEMO: Primary Button */}
            {project.demoUrl && !project.demoUrl.includes('localhost') && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#F7F3ED] dark:text-[#141210] bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] hover:text-[#292522] dark:hover:text-[#141210] border border-[#292522] dark:border-[#C4A67B] hover:border-[#A8875A] btn-hover-effect shadow-[0_4px_20px_rgba(41,37,34,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              >
                <span>LIVE DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F3ED] dark:text-[#141210] transition-transform duration-250 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            )}

            {/* WATCH DEMO */}
            {project.demoVideo && (
              <a
                href={`#media-${project.id}`}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] btn-hover-effect shadow-sm hover:-translate-y-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
              >
                <Play className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] fill-current" />
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
      className="relative py-32 sm:py-40 lg:py-48 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] overflow-hidden transition-colors duration-300"
      role="region"
      aria-label="Selected Engineering Work"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERIC BRONZE LIGHT SOURCES BEHIND WORK SECTION
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-1/4 right-0 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[170px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(237, 228, 216, 0.4) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 left-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.5) 50%, transparent 75%)',
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
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              SELECTED WORK
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] dark:text-[#F5EFEB] max-w-3xl">
            PRACTICAL SYSTEMS & APPLICATIONS.
          </h2>

          <p className="mt-4 text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
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
