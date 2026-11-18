import React from 'react';
import { Sparkles, Scissors, Truck, HeartHandshake, MapPin } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';

export const ValuePillars: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Bespoke Atelier Alterations',
      desc: 'Expert couturiers at our Madina Khalifa South atelier tailor every hemlength and sleeve to your silhouette.'
    },
    {
      icon: Sparkles,
      title: 'Haute Couture Fabrics',
      desc: 'Imported Mulberry silk, French Chantilly lace, and hand-embroidered metallic Zari threads designed to endure.'
    },
    {
      icon: Truck,
      title: 'White-Glove Qatar Delivery',
      desc: 'Complimentary expedited 24-hour delivery on orders over 500 QAR across Doha, Lusail, The Pearl, and all Qatar.'
    },
    {
      icon: HeartHandshake,
      title: 'VIP WhatsApp Styling',
      desc: `Personal fashion advice, custom sizing checks, and instant ordering directly on WhatsApp (+974 7001 5100).`
    }
  ];

  return (
    <section className="bg-[#F4EFE9] border-y border-[#E8DEC8] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#FAF8F5] p-6 lg:p-7 border border-[#E8DEC8] hover:border-[#0E626B]/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-none bg-[#0E626B]/10 group-hover:bg-[#0E626B] text-[#0E626B] group-hover:text-[#FAF8F5] flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1A252C] mb-2 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A646E] font-light leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="w-8 h-[2px] bg-[#C5A059] mt-4 opacity-40 group-hover:opacity-100 group-hover:w-14 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
