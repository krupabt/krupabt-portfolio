import React, { useState, useEffect, useRef } from 'react';
import { GitPullRequest, GitMerge, ArrowUpRight, CheckCircle2, GitFork } from 'lucide-react';
import { GithubIcon } from './Icons';
import { openSourceData } from '../data/portfolioData';

export default function OpenSourceSection() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="open-source"
      ref={sectionRef}
      className="relative scroll-mt-20 sm:scroll-mt-24 pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-36 lg:pb-40 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] transition-colors duration-300"
      role="region"
      aria-label="Open Source Contributions"
    >
      {/* Subtle Top Section Transition Divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Atmospheric bronze and champagne glows contained so no horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 right-1/4 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[170px] pointer-events-none dark:opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(168, 135, 90, 0.08) 0%, rgba(237, 228, 216, 0.40) 50%, transparent 80%)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none dark:opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(196, 166, 123, 0.06) 0%, rgba(247, 243, 237, 0.45) 50%, transparent 75%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 font-sans">
        
        {/* Section Header */}
        <div
          className="mb-14 sm:mb-20"
          style={{
            transition: 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8875A] dark:bg-[#C4A67B] animate-pulse" />
            <span className="text-xs font-serif tracking-[0.25em] uppercase text-[#A8875A] dark:text-[#C4A67B] font-bold">
              OPEN SOURCE CONTRIBUTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#292522] dark:text-[#F5EFEB] max-w-3xl">
            COLLABORATIVE DEVELOPMENT.
          </h2>

          <p className="mt-4 text-[#5F5750] dark:text-[#D1C8C0] text-base sm:text-lg font-normal max-w-2xl leading-relaxed">
            Public open-source engineering, merged upstream contributions, and community tool enhancements.
          </p>
        </div>

        {/* Contributions Cards List */}
        <div className="space-y-8">
          {openSourceData.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 lg:p-12 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] card-hover-subtle transition-all duration-300 shadow-[0_10px_35px_-6px_rgba(41,37,34,0.06)] dark:shadow-[0_10px_35px_-6px_rgba(0,0,0,0.35)] space-y-7 group"
              style={{
                transition: 'opacity 850ms cubic-bezier(0.22, 1, 0.36, 1), transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(25px)',
              }}
            >
              {/* Top Meta Row: Type Badge + Repo + Merged Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED3C5] dark:border-[#38332E] pb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE4D8]/80 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif text-[#A8875A] dark:text-[#C4A67B] font-bold uppercase tracking-wider shadow-2xs">
                    <GitFork className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                    <span>{item.type}</span>
                  </div>

                  <span className="text-xs font-mono text-[#7D736A] dark:text-[#9E9389]">
                    {item.repoName}
                  </span>
                </div>

                {/* Clear Merged Status Badge */}
                <div className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#A8875A]/40 dark:border-[#C4A67B]/40 text-[#292522] dark:text-[#F5EFEB] text-xs font-serif font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  <GitMerge className="w-3.5 h-3.5 text-[#8957E5] dark:text-[#A371F7]" />
                  <span>Merged Pull Request</span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#292522] dark:text-[#F5EFEB] tracking-tight group-hover:text-[#A8875A] dark:group-hover:text-[#C4A67B] transition-colors duration-250">
                  {item.project}
                </h3>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#5F5750] dark:text-[#D1C8C0] font-normal leading-relaxed">
                {item.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-3 pt-1">
                {item.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3.5 text-sm sm:text-base font-normal text-[#5F5750] dark:text-[#D1C8C0] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] mt-1 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Pills */}
              <div className="pt-2">
                <div className="text-xs font-serif tracking-widest text-[#7D736A] dark:text-[#9E9389] uppercase mb-2.5 font-medium">
                  TECHNOLOGIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 text-xs font-serif text-[#292522] dark:text-[#F5EFEB] bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] rounded-lg pill-hover-effect hover:border-[#A8875A] dark:hover:border-[#C4A67B] hover:bg-[#FFFCF7] dark:hover:bg-[#2D2824]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#DED3C5] dark:border-[#38332E] flex flex-wrap items-center gap-3.5">
                {/* View Merged PR — Primary Button */}
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hover-effect group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.16em] uppercase text-[#F7F3ED] dark:text-[#141210] bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] hover:text-[#292522] dark:hover:text-[#141210] border border-[#292522] dark:border-[#C4A67B] hover:border-[#A8875A] dark:hover:border-[#D8BC93] shadow-[0_4px_20px_rgba(41,37,34,0.18)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                  aria-label="View Merged Pull Request on GitHub"
                >
                  <GitMerge className="w-4 h-4 text-[#F7F3ED] dark:text-[#141210]" />
                  <span>VIEW MERGED PR</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F3ED] dark:text-[#141210] transition-transform duration-250 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>

                {/* View Repository — Secondary Button */}
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hover-effect group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                  aria-label="View Original Repository on GitHub"
                >
                  <GithubIcon className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                  <span>VIEW REPOSITORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>

                {/* View Contribution Branch — Button */}
                {item.branchUrl && (
                  <a
                    href={item.branchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hover-effect group/btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold tracking-[0.14em] uppercase text-[#292522] dark:text-[#F5EFEB] hover:text-[#292522] dark:hover:text-[#F5EFEB] bg-[#FFFCF7] dark:bg-[#24201D] hover:bg-[#EDE4D8] dark:hover:bg-[#2D2824] border border-[#DED3C5] dark:border-[#38332E] hover:border-[#A8875A] dark:hover:border-[#C4A67B] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8875A] dark:focus-visible:ring-[#C4A67B]"
                    title="View My Contribution Branch on GitHub"
                    aria-label="View My Contribution Branch on GitHub"
                  >
                    <GitPullRequest className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                    <span>VIEW CONTRIBUTION BRANCH</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B] transition-transform duration-250 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
