import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Ruler, 
  Truck, 
  ShieldCheck, 
  Check, 
  Share2, 
  Sparkles,
  Scissors
} from 'lucide-react';
import { Product } from '../types';
import { createDressWhatsAppUrl } from '../utils/whatsapp';
import { BRAND_CONTACT } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
  onBookFitting: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
  onBookFitting
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'alterations' | 'delivery'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleWhatsAppOrder = () => {
    const url = createDressWhatsAppUrl(product, selectedColor, selectedSize);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddBag = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | HIFA Qatar`,
        text: `Check out ${product.name} at HIFA luxury fashion Qatar: ${product.price} QAR`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="min-h-full flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="relative w-full max-w-5xl bg-[#FAF8F5] shadow-2xl border border-[#DFBF77]/40 overflow-hidden my-6">
          {/* Top Close Bar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Left: Image Gallery (5 cols) */}
            <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 bg-[#F5EFEB]/50 border-b lg:border-b-0 lg:border-r border-[#E8DEC8]">
              {/* Main Active Image with Zoom effect */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE4D8] border border-[#E0D8CB]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  {product.isNew && (
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold bg-[#0E626B] text-white">
                      New In
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold bg-[#C5A059] text-black">
                      Best Seller
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#0E626B] scale-[1.02] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Atelier Note */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E0D8CB] flex items-center gap-3 text-xs text-[#525D66]">
                <Scissors className="w-4 h-4 text-[#0E626B] shrink-0" />
                <span>
                  Complimentary bespoke tailoring available at our Madina Khalifa South atelier.
                </span>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Brand & Category header */}
                <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#0E626B] font-medium mb-2">
                  <span>HIFA HAUTE COUTURE</span>
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                    <span className="font-semibold text-black">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1A252C] font-normal leading-tight mb-1">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#74808C] font-light mb-4">
                  {product.subtitle}
                </p>

                {/* Pricing in QAR */}
                <div className="flex items-baseline gap-3 pb-5 mb-5 border-b border-[#E8DEC8]">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#142129] tracking-tight">
                    {product.price.toLocaleString()} QAR
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} QAR
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-[#8B2635] text-white tracking-wider">
                      SAVE {product.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#2E3840] tracking-wider uppercase">
                      Color:{' '}
                      <span className="font-semibold text-[#0E626B]">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs tracking-wider transition-all ${
                          selectedColor === color.name
                            ? 'border-[#0E626B] bg-[#0E626B]/5 font-semibold text-[#0E626B]'
                            : 'border-[#DDD4C7] text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions badge if available */}
                {product.dimensions && (
                  <div className="mb-4 p-2.5 bg-[#F5EFEB] border border-[#DFBF77]/40 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800 uppercase tracking-wider">Product Dimensions:</span>
                    <span className="font-mono font-bold text-[#0E626B] bg-white px-2 py-0.5 border border-[#DDD4C7]">
                      {product.dimensions}
                    </span>
                  </div>
                )}

                {/* Size Selector + Size Guide Modal Link */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-[#2E3840] tracking-wider uppercase">
                      Select Size:{' '}
                      <span className="font-semibold text-[#0E626B]">{selectedSize}</span>
                    </span>
                    {!product.category.includes('Handbag') && (
                      <button
                        onClick={onOpenSizeGuide}
                        className="inline-flex items-center gap-1 text-[#0E626B] hover:text-[#094248] font-medium transition-colors underline underline-offset-4"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Qatar & UK Size Guide</span>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-11 px-3 flex items-center justify-center text-xs tracking-widest uppercase transition-all font-medium ${
                          selectedSize === size
                            ? 'bg-[#0E626B] text-white shadow-xs'
                            : 'bg-white border border-[#DDD4C7] text-[#333E48] hover:border-[#0E626B]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#5A6570] font-medium">Quantity:</span>
                  <div className="flex items-center border border-[#DDD4C7] bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-[#F3ECE2] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-[#F3ECE2] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  {/* Primary WhatsApp Order Button */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-4 px-6 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-xs sm:text-sm tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 fill-[#DFBF77] text-[#0E626B]" />
                    <span>Order via WhatsApp (+974 7001 5100)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Add to Bag */}
                    <button
                      onClick={handleAddBag}
                      className="py-3 px-4 bg-white hover:bg-[#F4EFE9] border border-[#0E626B] text-[#0E626B] text-xs tracking-[0.14em] uppercase font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`py-3 px-4 border text-xs tracking-[0.14em] uppercase font-medium flex items-center justify-center gap-2 transition-colors ${
                        isWishlisted
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#9B7A35]'
                          : 'border-[#DDD4C7] bg-white text-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
                      <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Service Reassurance */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-[#E8DEC8] text-[11px] text-[#55616D] mb-6">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0E626B] shrink-0" />
                    <span>Free Qatar Delivery over 500 QAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0E626B] shrink-0" />
                    <span>100% Authentic Haute Couture</span>
                  </div>
                </div>
              </div>

              {/* Informative Accordion / Tabs */}
              <div className="border-t border-[#E8DEC8] pt-4">
                <div className="flex items-center border-b border-[#E8DEC8] gap-4 text-xs uppercase tracking-wider font-medium text-gray-500 mb-3 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'details' ? 'border-b-2 border-[#0E626B] text-[#0E626B] font-semibold' : 'hover:text-black'
                    }`}
                  >
                    Description & Fit
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'fabric' ? 'border-b-2 border-[#0E626B] text-[#0E626B] font-semibold' : 'hover:text-black'
                    }`}
                  >
                    Fabric & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('alterations')}
                    className={`pb-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'alterations' ? 'border-b-2 border-[#0E626B] text-[#0E626B] font-semibold' : 'hover:text-black'
                    }`}
                  >
                    Madina Khalifa Atelier
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-1.5 transition-colors whitespace-nowrap ${
                      activeTab === 'delivery' ? 'border-b-2 border-[#0E626B] text-[#0E626B] font-semibold' : 'hover:text-black'
                    }`}
                  >
                    Qatar Shipping
                  </button>
                </div>

                <div className="text-xs text-[#525E6A] leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 pl-1 mt-2">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'fabric' && (
                    <div className="space-y-2">
                      <p>
                        <strong className="text-gray-800">Composition:</strong> {product.fabric}
                      </p>
                      <p>
                        <strong className="text-gray-800">Care Instructions:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 pl-1">
                        {product.care.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'alterations' && (
                    <div className="space-y-2">
                      <p>
                        Need this piece tailored for an upcoming gala or wedding in Doha? Visit our flagship boutique in Madina Khalifa South for complimentary hemline, waist, and sleeve adjustments with our master tailors.
                      </p>
                      <button
                        onClick={() => {
                          onClose();
                          onBookFitting();
                        }}
                        className="inline-flex items-center gap-1.5 text-[#0E626B] font-semibold underline underline-offset-4 mt-2"
                      >
                        <Scissors className="w-3.5 h-3.5" />
                        <span>Book an in-person fitting at Madina Khalifa South</span>
                      </button>
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-1.5">
                      <p>• <strong>Doha & Lusail:</strong> Same-day or next-day hand delivery in luxury garment box.</p>
                      <p>• <strong>Al Rayyan, Al Wakrah, Al Khor:</strong> 24-48 hours delivery.</p>
                      <p>• <strong>Payment Methods:</strong> Cash on Delivery, Apple Pay, QPay, Credit Card, or WhatsApp Bank Transfer.</p>
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E8DEC8]">
                  <span className="text-[11px] text-gray-400">SKU: {product.id.toUpperCase()}</span>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#0E626B] transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Link Copied!' : 'Share Dress'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
