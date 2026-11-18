import React from 'react';
import { Sparkles, Scissors, Gem, Award, CheckCircle2 } from 'lucide-react';
import { HifaLogo } from './HifaLogo';
import { BRAND_CONTACT } from '../data/products';

interface AboutHifaProps {
  onBookFittingClick: () => void;
}

export const AboutHifa: React.FC<AboutHifaProps> = ({ onBookFittingClick }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#E8DEC8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with editorial images */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Large Image */}
              <div className="aspect-[4/5] overflow-hidden border border-[#DFBF77]/40 shadow-xl bg-[#EDE4D8]">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80"
                  alt="HIFA Atelier Craftsmanship"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping Smaller Detail Image */}
              <div className="absolute -bottom-8 -right-6 sm:-bottom-10 sm:-right-8 w-1/2 aspect-square border-4 border-[#FAF8F5] shadow-2xl overflow-hidden hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
                  alt="Hand embroidery in Qatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Atelier Badge */}
              <div className="absolute top-6 left-6 bg-[#0E626B] text-white p-4 shadow-lg border border-[#DFBF77]/40 max-w-[190px]">
                <p className="text-[10px] tracking-widest uppercase text-[#DFBF77] font-semibold">Flagship Atelier</p>
                <p className="font-serif text-base font-normal mt-0.5">Madina Khalifa South</p>
                <p className="text-[10px] text-white/80 mt-1">Doha, State of Qatar</p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Craftsmanship Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-start pb-2">
              <HifaLogo size="xl" variant="dark" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E626B]/10 text-[#0E626B] text-xs uppercase tracking-[0.2em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Official Brand Identity</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight leading-tight">
              Where Arabian Grandeur Meets Haute Couture Mastery
            </h2>

            <p className="text-sm sm:text-base text-[#56626E] font-light leading-relaxed">
              Founded in <strong>Madina Khalifa South, Qatar</strong>, <strong>HIFA</strong> was born out of a passionate dedication to redefining luxury women's fashion in the Gulf. We craft dresses for women who celebrate confidence, poise, and cultural reverence.
            </p>

            <p className="text-sm sm:text-base text-[#56626E] font-light leading-relaxed">
              Every gown, royal kaftan, and evening silhouette in our collection reflects meticulous attention to detail. From the finest imported Italian Duchesse silks and French Chantilly lace to hand-embellished metallic Zari threads, our couturiers blend Parisian tailoring standards with Arabian modesty and regal presence.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white border border-[#E8DEC8]">
                <div className="flex items-center gap-2.5 text-[#0E626B] font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Scissors className="w-4 h-4 text-[#C5A059]" />
                  <span>Bespoke Tailoring</span>
                </div>
                <p className="text-xs text-[#6B7782] font-light">
                  Complimentary fitting and hem adjustments at our Madina Khalifa South boutique for every client.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E8DEC8]">
                <div className="flex items-center gap-2.5 text-[#0E626B] font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Gem className="w-4 h-4 text-[#C5A059]" />
                  <span>Rare Textiles</span>
                </div>
                <p className="text-xs text-[#6B7782] font-light">
                  Hypoallergenic natural silks, breathable georgettes, and Swarovski crystal embellishments.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#333E48]">
                <CheckCircle2 className="w-4 h-4 text-[#0E626B] shrink-0" />
                <span>Dedicated private boutique appointments in Madina Khalifa South, Doha</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#333E48]">
                <CheckCircle2 className="w-4 h-4 text-[#0E626B] shrink-0" />
                <span>Expedited same-day or next-day delivery throughout Qatar in luxury keepsake boxes</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#333E48]">
                <CheckCircle2 className="w-4 h-4 text-[#0E626B] shrink-0" />
                <span>VIP WhatsApp concierge styling service available 7 days a week: +974 7001 5100</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookFittingClick}
                className="px-7 py-3.5 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.16em] transition-all shadow-md"
              >
                Schedule Atelier Fitting in Doha
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
