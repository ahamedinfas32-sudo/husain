import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { HifaLogo } from './HifaLogo';
import { BRAND_CONTACT } from '../data/products';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  currentSection: string;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigate,
  currentSection,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'Dresses Collection', id: 'dresses' },
    { label: 'Best Sellers', id: 'best-sellers' },
    { label: 'Special Offers', id: 'special-offers' },
    { label: 'About HIFA', id: 'about' },
    { label: 'Boutique & Map', id: 'boutique-map' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top VIP Announcement Bar */}
      <div className="bg-[#093E44] text-[#EFE7D8] text-[11px] sm:text-xs py-2 px-4 border-b border-[#0E626B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-light tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 text-[#DFBF77] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              HIFA COUTURE
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden sm:inline">Complimentary White-Glove Qatar Delivery on Orders Over 500 QAR</span>
            <span className="sm:hidden">Qatar Delivery Over 500 QAR FREE</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 font-medium text-[11px] shrink-0">
            <a
              href={`tel:${BRAND_CONTACT.whatsapp}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-[#DFBF77] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#DFBF77]" />
              <span>{BRAND_CONTACT.formattedWhatsApp}</span>
            </a>

            <a
              href={BRAND_CONTACT.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white text-[10px] font-semibold tracking-wide transition-all shadow-xs hover:scale-105"
              title="Follow Haifa Shoppy on WhatsApp for new arrivals and exclusive deals"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>Follow Haifa Shoppy Channel</span>
            </a>

            <a
              href={createGeneralWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[#DFBF77] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#DFBF77]" />
              <span className="tracking-wide">VIP WhatsApp</span>
            </a>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs bg-[#DFBF77]/25 hover:bg-[#DFBF77]/40 text-[#DFBF77] hover:text-white text-[10px] font-semibold tracking-wider transition-colors border border-[#DFBF77]/50"
                title="Manage product catalog & change prices in QAR anytime"
              >
                <span>Edit Prices (QAR)</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1 border-l border-white/20 pl-4 text-[#DFBF77] font-semibold tracking-wider">
              <span>QAR</span>
              <span className="text-[10px] text-white/60 font-normal">(ر.ق)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E8DEC8]'
            : 'bg-[#FAF8F5] py-4 border-b border-[#EDE6DC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#0E626B] hover:text-[#093E44] focus:outline-hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4A5568] hover:text-[#0E626B]"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] tracking-[0.14em] uppercase font-medium">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors hover:text-[#0E626B] ${
                  currentSection === item.id
                    ? 'text-[#0E626B] font-semibold'
                    : 'text-[#3E454C]'
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                )}
              </button>
            ))}
          </div>

          {/* Center Brand Identity Logo */}
          <div className="flex justify-center">
            <button
              onClick={() => handleNavClick('home')}
              className="focus:outline-hidden text-left py-1"
              aria-label="HIFA Home"
            >
              <HifaLogo size="lg" variant="dark" />
            </button>
          </div>

          {/* Desktop Right Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] tracking-[0.14em] uppercase font-medium">
            {navItems.slice(4).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 transition-colors hover:text-[#0E626B] ${
                  currentSection === item.id
                    ? 'text-[#0E626B] font-semibold'
                    : 'text-[#3E454C]'
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Icons: Search, Wishlist, Bag, WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-1.5 p-2 text-[#4A5568] hover:text-[#0E626B] transition-colors"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#3E454C] hover:text-[#0E626B] transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#C5A059] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#0E626B] hover:text-[#093E44] transition-colors flex items-center gap-2 group"
              title="View Shopping Bag"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#0E626B] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-semibold tracking-wider uppercase text-[#142129]">
                Bag ({cartCount})
              </span>
            </button>

            {/* WhatsApp Quick Order button */}
            <a
              href={createGeneralWhatsAppInquiryUrl('Ordering')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-xs font-medium tracking-wide transition-all shadow-xs hover:shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
                <HifaLogo size="sm" variant="dark" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#4A5568] hover:bg-[#F3ECE2]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between w-full py-3 px-3 rounded-lg text-left text-sm tracking-wider uppercase font-medium transition-colors ${
                      currentSection === item.id
                        ? 'bg-[#0E626B] text-white font-semibold'
                        : 'text-[#2D3748] hover:bg-[#F3ECE2]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${currentSection === item.id ? 'text-[#DFBF77]' : 'text-gray-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Business Info in Mobile Menu */}
            <div className="pt-6 mt-6 border-t border-[#E8DEC8] space-y-4 text-xs text-[#4A5568]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0E626B] shrink-0 mt-0.5" />
                <span>{BRAND_CONTACT.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0E626B] shrink-0" />
                <a href={`tel:${BRAND_CONTACT.whatsapp}`} className="hover:text-[#0E626B] font-medium">
                  {BRAND_CONTACT.formattedWhatsApp}
                </a>
              </div>

              <a
                href={BRAND_CONTACT.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-700 text-white font-medium text-xs tracking-wider uppercase shadow-xs hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Follow Haifa Shoppy on WhatsApp</span>
              </a>

              <a
                href={createGeneralWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0E626B] text-white font-medium text-xs tracking-wider uppercase shadow-xs hover:bg-[#093E44] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+974 7001 5100)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
