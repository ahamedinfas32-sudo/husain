import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';

const LOOKBOOK_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    tag: '#HifaEmeraldGown',
    likes: 842,
    comments: 39,
    caption: 'Evening gala entrance in West Bay with our emerald silk gown.'
  },
  {
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    tag: '#AlRayyanKaftan',
    likes: 1205,
    comments: 64,
    caption: 'Pure gold Zari threadwork tailored in Madina Khalifa South.'
  },
  {
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    tag: '#HifaBridalCouture',
    likes: 934,
    comments: 48,
    caption: 'Private fitting moment before the Lusail wedding celebration.'
  },
  {
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    tag: '#MadinaKhalifaMermaid',
    likes: 760,
    comments: 29,
    caption: 'Architectural silk silhouette catching the Arabian golden hour.'
  },
  {
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
    tag: '#HifaSoireeCollection',
    likes: 1120,
    comments: 52,
    caption: 'Tiered organza layers floating through a Katara evening.'
  },
  {
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    tag: '#ChantillyLaceQatar',
    likes: 890,
    comments: 41,
    caption: 'Intricate French lace meets modern modest elegance.'
  }
];

export const InstagramLookbook: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#0E626B] font-semibold text-xs uppercase tracking-[0.2em] mb-2">
            <Instagram className="w-4 h-4" />
            <span>@HifaFashion.qa</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A252C] font-normal tracking-tight mb-3">
            Follow the Atelier on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-[#64707D] font-light leading-relaxed">
            Tag <strong>#HifaQatar</strong> and <strong>#HifaCouture</strong> to be featured on our official lookbook and receive styling perks.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {LOOKBOOK_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden bg-[#ECE4D8] border border-[#E3DACB]"
            >
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0E626B]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram className="w-5 h-5 text-[#DFBF77] mb-2" />
                <span className="text-[11px] font-semibold text-[#DFBF77] tracking-wider mb-2">
                  {item.tag}
                </span>
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Follow Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF8F5] border border-[#0E626B] text-[#0E626B] hover:bg-[#0E626B] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @HifaFashion.qa</span>
          </a>

          <a
            href={`https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent('Salam HIFA! I saw your Instagram dress lookbook and would like to inquire about current pieces.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E626B] text-white hover:bg-[#093E44] text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-[#DFBF77]" />
            <span>WhatsApp Lookbook Stylist</span>
          </a>
        </div>
      </div>
    </section>
  );
};
