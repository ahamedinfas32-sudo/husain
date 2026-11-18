import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, MapPin, Send } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    const url = `https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(quickMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setQuickMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white border border-[#DFBF77]/40 shadow-2xl rounded-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Card Header in Brand Teal */}
          <div className="bg-[#0E626B] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-[#DFBF77]">
                  <MessageCircle className="w-5 h-5 text-[#DFBF77] fill-[#DFBF77]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide">HIFA VIP Concierge</h4>
                <p className="text-[11px] text-[#DFBF77]">Madina Khalifa South, Qatar</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
              aria-label="Close concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="p-3 bg-white border border-[#E3DACB] text-xs text-gray-700 leading-relaxed shadow-xs">
              <p className="font-medium text-[#0E626B] mb-1">Salam & Welcome to HIFA 🌸</p>
              <p className="text-gray-600 font-light">
                How may our Doha stylists assist you today? We can confirm dress sizes, arrange Madina Khalifa fittings, or take orders.
              </p>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5">
              <a
                href={BRAND_CONTACT.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-xs"
              >
                <span>📢 Follow Haifa Shoppy Channel</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Updates</span>
              </a>

              <a
                href={createGeneralWhatsAppInquiryUrl('Dresses Availability')}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xs bg-white hover:bg-[#F3ECE2] border border-[#DDD4C7] text-[#142129] font-medium transition-colors"
              >
                ✨ Inquire on Dress Sizes & Stock
              </a>
              <a
                href={createGeneralWhatsAppInquiryUrl('Fitting Appointment in Madina Khalifa')}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xs bg-white hover:bg-[#F3ECE2] border border-[#DDD4C7] text-[#142129] font-medium transition-colors"
              >
                👗 Book Atelier Fitting in Doha
              </a>
              <a
                href={createGeneralWhatsAppInquiryUrl('White-Glove Qatar Delivery')}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 text-xs bg-white hover:bg-[#F3ECE2] border border-[#DDD4C7] text-[#142129] font-medium transition-colors"
              >
                🚚 Ask about Qatar Delivery Speeds
              </a>
            </div>

            {/* Quick direct text input */}
            <form onSubmit={handleSendCustom} className="flex gap-2 pt-1">
              <input
                type="text"
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-white border border-[#DDD4C7] px-3 py-2 text-xs focus:outline-hidden focus:border-[#0E626B]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#0E626B] text-white hover:bg-[#093E44] transition-colors"
                title="Send to WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-500 text-center">
            Replies within minutes via {BRAND_CONTACT.formattedWhatsApp}
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] shadow-2xl transition-all duration-300 hover:scale-105 border border-[#DFBF77]/40"
        aria-label="WhatsApp Stylist Chat"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-[#DFBF77] text-transparent" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="block text-[10px] uppercase tracking-widest text-[#DFBF77] font-semibold">WhatsApp Stylist</span>
          <span className="block text-xs font-medium">{BRAND_CONTACT.formattedWhatsApp}</span>
        </div>
      </button>
    </div>
  );
};
