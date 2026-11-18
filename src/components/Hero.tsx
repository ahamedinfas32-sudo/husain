import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Clock, Scissors } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';
import { HifaLogo } from './HifaLogo';

interface HeroProps {
  onExploreClick: () => void;
  onBookFittingClick: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=85',
    tag: 'Haute Couture • Doha Atelier',
    title: 'Graceful Silhouettes for the Modern Woman',
    subtitle: 'Exquisite evening gowns and couture dresses crafted with hand-embroidery, lustrous silks, and timeless Arabian elegance in Madina Khalifa South, Qatar.',
    highlight: '2026 Evening Capsule',
    ctaText: 'Explore Dresses Collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=2000&q=85',
    tag: 'Royal Kaftans & Celebrations',
    title: 'Gold Zari Embroidery & Flowing Chiffon',
    subtitle: 'From private banquets to Ramadan soirées and wedding receptions, HIFA designs dresses that make every entrance unforgettable.',
    highlight: 'Bespoke Qatar Craftsmanship',
    ctaText: 'Shop New Arrivals'
  },
  {
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=2000&q=85',
    tag: 'Private Atelier Experience',
    title: 'Tailored to Your Exact Measurements',
    subtitle: 'Visit our boutique in Madina Khalifa South or request VIP at-home styling anywhere in Doha, Lusail, and The Pearl.',
    highlight: 'White-Glove Service',
    ctaText: 'Book Private Fitting'
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onBookFittingClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#092B30]">
      {/* Background Images with smooth crossfade */}
      {HERO_SLIDES.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center lg:object-[center_30%]"
          />
          {/* Multi-layered luxury gradients: deep teal + warm champagne shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#072428]/95 via-[#0A3D44]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-transparent to-black/30" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
        <div className="max-w-2xl lg:max-w-3xl text-left">
          {/* Official Big Size Brand Emblem */}
          <div className="mb-6 inline-block p-3 sm:p-4 bg-black/35 backdrop-blur-md border border-[#DFBF77]/40 shadow-xl">
            <HifaLogo size="xl" variant="light" />
          </div>

          {/* Editorial Tag */}
          <div className="block sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#DFBF77]/40 text-[#DFBF77] text-xs tracking-[0.2em] uppercase font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#DFBF77]" />
            <span>{slide.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#FAF8F5] leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#E2D8C6] font-light leading-relaxed max-w-xl mb-10">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none bg-[#C5A059] hover:bg-[#D4AF37] text-[#142129] font-medium text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-lg hover:shadow-[#C5A059]/30 hover:-translate-y-0.5 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Direct WhatsApp Ordering / VIP Stylist Button */}
            <a
              href={createGeneralWhatsAppInquiryUrl('Exclusive Dress Collection')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-none bg-[#0E626B]/80 hover:bg-[#0E626B] backdrop-blur-md text-[#FAF8F5] border border-[#DFBF77]/50 font-medium text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>WhatsApp: +974 7001 5100</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-white/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DFBF77]/20 flex items-center justify-center text-[#DFBF77] shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#DFBF77] tracking-wider uppercase">Bespoke Fit</p>
                <p className="text-[11px] text-white/70">Custom tailoring in Doha</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DFBF77]/20 flex items-center justify-center text-[#DFBF77] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#DFBF77] tracking-wider uppercase">24h Delivery</p>
                <p className="text-[11px] text-white/70">Across all Qatar</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DFBF77]/20 flex items-center justify-center text-[#DFBF77] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#DFBF77] tracking-wider uppercase">Madina Khalifa</p>
                <p className="text-[11px] text-white/70">Flagship Atelier & Shop</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-2 bg-[#DFBF77]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
