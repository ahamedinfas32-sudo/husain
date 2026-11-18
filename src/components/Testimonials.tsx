import React from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8F6F2C] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>High-Society Acclaim</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight mb-3">
            Words from Our Esteemed Clients
          </h2>
          <p className="text-sm text-[#64707D] font-light leading-relaxed">
            Read what our clients across Doha, The Pearl, Lusail, and Qatar share about their HIFA couture experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#E3DACB] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A059]/30 mb-4" />

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#3E4953] font-light leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDE5D8]">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#DFBF77]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1A252C] flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0E626B]" />
                    </h4>
                    <p className="text-[11px] text-[#788591]">{t.location}</p>
                    <p className="text-[10px] text-[#0E626B] font-medium tracking-wide mt-0.5">
                      Acquired: {t.dressPurchased}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
