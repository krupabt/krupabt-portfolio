import React, { useState } from 'react';
import { User, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ProfilePhoto({ parallaxOffset = { x: 0, y: 0 } }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto group transition-transform duration-500 ease-out"
      style={{
        transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
      }}
    >
      {/* Dreamy ambient violet halo behind portrait */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-cinematic-deepPurple/40 via-cinematic-purple/25 to-cinematic-lavender/20 rounded-[36px] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-cinematic-violet/20 rounded-full blur-3xl pointer-events-none" />

      {/* Cinematic Frame Container */}
      <div className="relative aspect-[4/5] w-full rounded-[28px] bg-cinematic-900/90 border border-white/[0.12] shadow-dreamy overflow-hidden flex items-center justify-center backdrop-blur-md transition-all duration-700 group-hover:border-cinematic-lavender/40">
        
        {!imageError ? (
          <>
            <img
              src={personalInfo.profilePhoto}
              alt="Portrait of Krupa B T"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Cinematic lighting and vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-cinematic-950/85 via-transparent to-cinematic-950/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cinematic-deepPurple/20 via-transparent to-cinematic-lavender/10 pointer-events-none mix-blend-overlay" />
          </>
        ) : (
          /* Clean, Tasteful Editorial Placeholder when /profile.jpg is not yet provided */
          <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-cinematic-850 via-cinematic-900 to-cinematic-950 w-full h-full relative z-10">
            {/* Subtle background glow */}
            <div className="absolute w-32 h-32 bg-cinematic-purple/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative w-24 h-24 rounded-full bg-cinematic-800 border border-white/[0.12] flex items-center justify-center text-cinematic-lavender mb-5 shadow-inner group-hover:scale-105 transition-transform duration-500">
              <span className="text-2xl font-bold font-sans text-cinematic-warmWhite tracking-tight">
                KB
              </span>
            </div>

            <h4 className="text-lg font-bold text-cinematic-warmWhite tracking-tight mb-1">
              {personalInfo.name}
            </h4>
            <p className="text-xs text-cinematic-softGray font-light tracking-wide mb-6">
              Information Science Engineering
            </p>

            {/* Instruction badge for the user */}
            <div className="px-4 py-2 rounded-xl bg-cinematic-800/80 border border-white/[0.08] text-[11px] font-sans text-cinematic-softGray leading-snug max-w-[220px]">
              Add your portrait photo to: <br />
              <span className="font-semibold text-cinematic-lavender">/public/profile.jpg</span>
            </div>
          </div>
        )}

        {/* Minimal Understated Portrait Card Footer */}
        <div className="absolute bottom-4 left-4 right-4 bg-cinematic-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/[0.1] shadow-lg flex items-center justify-between z-20">
          <div>
            <div className="text-xs font-semibold text-cinematic-warmWhite tracking-tight">
              {personalInfo.name}
            </div>
            <div className="text-[10px] text-cinematic-softGray font-light">
              {personalInfo.location}
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-cinematic-lavender">
            <span className="w-1.5 h-1.5 rounded-full bg-cinematic-lavender animate-pulse" />
            <span>Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
