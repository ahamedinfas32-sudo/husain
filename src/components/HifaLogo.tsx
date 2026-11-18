import React, { useState } from 'react';

interface HifaLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'gigantic';
  showSubtitle?: boolean;
  showBrandName?: boolean;
  className?: string;
  horizontal?: boolean;
}

export const HifaLogo: React.FC<HifaLogoProps> = ({
  variant = 'dark',
  size = 'lg',
  showSubtitle = true,
  showBrandName = true,
  className = '',
  horizontal = false
}) => {
  const isLight = variant === 'light';
  const [imgError, setImgError] = useState(false);

  // Responsive sizing configurations
  const sizeConfig = {
    sm: {
      imgHeight: 'h-10 sm:h-12',
      brandText: 'text-xs sm:text-sm tracking-[0.25em]',
      sub: 'text-[9px] tracking-[0.2em]'
    },
    md: {
      imgHeight: 'h-14 sm:h-16',
      brandText: 'text-sm sm:text-base tracking-[0.28em]',
      sub: 'text-[10px] tracking-[0.24em]'
    },
    lg: {
      imgHeight: 'h-20 sm:h-24 md:h-28',
      brandText: 'text-lg sm:text-xl md:text-2xl tracking-[0.32em]',
      sub: 'text-[11px] sm:text-xs tracking-[0.28em]'
    },
    xl: {
      imgHeight: 'h-28 sm:h-36 md:h-40',
      brandText: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.36em]',
      sub: 'text-xs sm:text-sm tracking-[0.32em]'
    },
    gigantic: {
      imgHeight: 'h-36 sm:h-48 md:h-56',
      brandText: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.4em]',
      sub: 'text-sm sm:text-base tracking-[0.35em]'
    }
  }[size];

  // Official logo image path provided by the user
  const logoSrc = imgError
    ? '/hifa-logo.jpeg'
    : '/assets/aistudio/WhatsApp_Image_2026-11-08_at_11.47.50_AM_6b19a536.jpeg';

  return (
    <div
      className={`inline-flex ${
        horizontal ? 'flex-row items-center gap-3 sm:gap-4' : 'flex-col items-center justify-center'
      } select-none group transition-all duration-300 ${className}`}
    >
      {/* Official Uploaded Logo Image */}
      <div
        className={`relative ${sizeConfig.imgHeight} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
          isLight
            ? 'bg-white/95 p-2 sm:p-2.5 rounded shadow-lg border border-[#DFBF77]/60'
            : 'bg-white/90 p-1.5 sm:p-2 rounded shadow-xs border border-[#E8DEC8]'
        }`}
      >
        <img
          src={logoSrc}
          alt="HIFA FASHION Official Brand Logo"
          className="h-full w-auto max-w-full object-contain"
          loading="eager"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Prominent Brand Name & Location Label ("GIG SIZE NAME") */}
      {(showBrandName || showSubtitle) && (
        <div
          className={`flex flex-col ${
            horizontal ? 'items-start text-left' : 'items-center text-center mt-2'
          }`}
        >
          {showBrandName && (
            <div
              className={`font-serif font-semibold uppercase leading-none ${sizeConfig.brandText} ${
                isLight ? 'text-[#FAF8F5]' : 'text-[#0E626B]'
              }`}
            >
              H I F A <span className={isLight ? 'text-[#DFBF77]' : 'text-[#C5A059]'}>FASHION</span>
            </div>
          )}

          {showSubtitle && (
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-3.5 sm:w-5 h-[1px] ${isLight ? 'bg-[#DFBF77]' : 'bg-[#0E626B]'}`} />
              <span
                className={`${sizeConfig.sub} uppercase font-medium tracking-[0.24em] ${
                  isLight ? 'text-[#E2E8F0]' : 'text-[#5A646E]'
                }`}
              >
                MADINA KHALIFA SOUTH • QATAR
              </span>
              <span className={`w-3.5 sm:w-5 h-[1px] ${isLight ? 'bg-[#DFBF77]' : 'bg-[#0E626B]'}`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
