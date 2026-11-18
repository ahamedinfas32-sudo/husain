import React, { useState, useEffect } from 'react';
import { Tag, Clock, Copy, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

interface SpecialOffersProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerProducts = products.filter((p) => p.isSpecialOffer);

  const copyCode = () => {
    navigator.clipboard.writeText('HIFAVIP10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="special-offers" className="py-16 sm:py-24 bg-gradient-to-b from-[#F3ECE2] to-[#FAF8F5] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="bg-[#0E626B] border border-[#DFBF77]/50 p-6 sm:p-10 lg:p-12 mb-12 text-white relative overflow-hidden shadow-xl">
          {/* Subtle Background Pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-[#DFBF77]/40 text-[#DFBF77] text-xs uppercase tracking-widest font-semibold mb-4">
                <Tag className="w-3.5 h-3.5 text-[#DFBF77]" />
                <span>Limited Seasonal Privileges</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-normal leading-tight mb-3">
                Exclusive Haute Couture Special Offers
              </h2>
              <p className="text-sm sm:text-base text-[#D3E0E2] font-light leading-relaxed max-w-xl">
                Enjoy preferential pricing on selected couture dresses and complimentary styling consultation for your upcoming wedding and banquet occasions.
              </p>

              {/* Promo code badge with copy button */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <span className="text-xs uppercase tracking-wider text-[#DFBF77]">Use Privilege Code:</span>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-dashed border-[#DFBF77] text-white">
                  <span className="font-mono font-bold tracking-widest text-sm text-[#DFBF77]">HIFAVIP10</span>
                  <button
                    onClick={copyCode}
                    className="p-1 hover:text-[#DFBF77] transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && <span className="text-xs text-emerald-300 font-medium">Copied to clipboard!</span>}
              </div>
            </div>

            {/* Countdown timer */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="text-xs uppercase tracking-widest text-[#DFBF77] mb-3 flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4" />
                <span>Offer Concludes In</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-black/30 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 min-w-[64px]">
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-white">{timeLeft.days}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#DFBF77]">Days</span>
                </div>
                <div className="bg-black/30 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 min-w-[64px]">
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#DFBF77]">Hours</span>
                </div>
                <div className="bg-black/30 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 min-w-[64px]">
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#DFBF77]">Mins</span>
                </div>
                <div className="bg-black/30 backdrop-blur-md border border-white/15 p-2.5 sm:p-3 min-w-[64px]">
                  <span className="block font-serif text-2xl sm:text-3xl font-bold text-white">{timeLeft.seconds}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#DFBF77]">Secs</span>
                </div>
              </div>

              <a
                href={createGeneralWhatsAppInquiryUrl('Special Offers Privilege')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Claim via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Featured Special Offer Dress Cards */}
        {offerProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl text-[#1A252C] mb-6">Featured Promotional Dresses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
