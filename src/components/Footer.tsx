import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  MessageCircle, 
  Instagram, 
  ShieldCheck, 
  Send, 
  Check, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { HifaLogo } from './HifaLogo';
import { BRAND_CONTACT } from '../data/products';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#072428] text-[#EFE7D8] border-t border-[#0E626B]">
      {/* Top Banner: Direct WhatsApp VIP Order Help */}
      <div className="bg-[#09353B] py-6 px-4 border-b border-[#0E626B]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-[#DFBF77]/20 flex items-center justify-center text-[#DFBF77] shrink-0">
              <MessageCircle className="w-5 h-5 fill-[#DFBF77]" />
            </div>
            <div>
              <p className="font-serif text-lg text-white">Need personal styling or custom dress inquiries?</p>
              <p className="text-xs text-[#C8D6D8] font-light">
                Our Doha boutique stylists are ready to assist you instantly on WhatsApp: <strong className="text-[#DFBF77]">{BRAND_CONTACT.formattedWhatsApp}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BRAND_CONTACT.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Follow Haifa Shoppy Channel</span>
            </a>

            <a
              href={createGeneralWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat with Stylist</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Mission Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <HifaLogo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-[#C8D6D8] font-light leading-relaxed pr-4">
              HIFA is an exclusive women's fashion house and haute couture atelier rooted in Madina Khalifa South, Qatar. We craft breathtaking evening gowns, royal kaftans, and bridal party silhouettes that honor modern poise and timeless Arabian elegance.
            </p>

            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-widest text-[#DFBF77] font-semibold mb-2">
                Currencies & Deliveries
              </p>
              <p className="text-xs text-white/80">
                Prices displayed in <strong className="text-white">QAR (Qatari Riyals)</strong>. White-Glove delivery to Doha, Lusail, The Pearl, Al Rayyan, Al Wakrah, and across Qatar.
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base text-[#DFBF77] uppercase tracking-wider font-medium">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C8D6D8]">
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dresses')}
                  className="hover:text-white transition-colors"
                >
                  Evening Gowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dresses')}
                  className="hover:text-white transition-colors"
                >
                  Royal Kaftans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('best-sellers')}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('special-offers')}
                  className="hover:text-white transition-colors"
                >
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier & Client Care (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-[#DFBF77] uppercase tracking-wider font-medium">
              Atelier & Boutique
            </h4>
            <ul className="space-y-3 text-xs text-[#C8D6D8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFBF77] shrink-0 mt-0.5" />
                <span>
                  Street 810, Building 42, Zone 34<br />
                  Madina Khalifa South, Doha, Qatar
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFBF77] shrink-0" />
                <a href={`tel:${BRAND_CONTACT.whatsapp}`} className="hover:text-white font-medium">
                  {BRAND_CONTACT.formattedWhatsApp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#DFBF77] shrink-0" />
                <span>Sat–Thu: 10AM–10PM | Fri: 2PM–10PM</span>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs text-[#DFBF77] hover:underline flex items-center gap-1 font-medium mt-1"
                >
                  <span>Qatar & International Size Guide</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-[#DFBF77] uppercase tracking-wider font-medium">
              VIP Atelier Gazette
            </h4>
            <p className="text-xs text-[#C8D6D8] font-light leading-relaxed">
              Subscribe to receive private salon invitations, capsule release dates, and exclusive Qatar private promotions.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 border border-[#DFBF77] text-xs text-[#DFBF77] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you. Welcome to the HIFA VIP circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-[#0E626B] px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:border-[#DFBF77]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C5A059] text-black hover:bg-[#D4AF37] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 block mb-2 font-medium">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={BRAND_CONTACT.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                  title="Follow Haifa Shoppy on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-300 text-transparent" />
                  <span>Haifa Shoppy Channel</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0E626B] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${BRAND_CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0E626B] text-[#DFBF77] flex items-center justify-center transition-colors"
                  aria-label="WhatsApp Direct Chat"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#95A5A6]">
          <p>© {new Date().getFullYear()} HIFA Haute Couture. All rights reserved. Madina Khalifa South, Doha, Qatar.</p>

          {/* Payment Badges in Qatar */}
          <div className="flex items-center gap-3 text-[11px] text-gray-300">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs">QPay</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs">Apple Pay</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs">Visa / Mastercard</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-xs">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
