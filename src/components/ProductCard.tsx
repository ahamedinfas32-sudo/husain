import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Star, Sparkles, Edit3 } from 'lucide-react';
import { Product } from '../types';
import { createDressWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onEditProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onEditProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');

  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createDressWhatsAppUrl(product, selectedColor, selectedSize);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="group relative flex flex-col bg-[#FAF8F5] border border-[#EBE4D8] hover:border-[#0E626B]/40 transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE5DA]">
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase font-semibold bg-[#0E626B] text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-[#DFBF77]" />
              New In
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase font-semibold bg-[#C5A059] text-[#142129] shadow-xs">
              Best Seller
            </span>
          )}
          {product.isSpecialOffer && product.discountPercentage && (
            <span className="px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase font-semibold bg-[#8B2635] text-white shadow-xs">
              -{product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons: Edit & Wishlist */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onEditProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
              className="p-2 rounded-full bg-white/90 text-[#0E626B] hover:bg-[#0E626B] hover:text-white shadow-md transition-all duration-200"
              title="Edit Dress / Change Price (QAR)"
              aria-label="Edit product"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isWishlisted
                ? 'bg-white text-[#C5A059] shadow-md'
                : 'bg-white/80 text-[#4A5568] hover:bg-white hover:text-[#0E626B]'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A059]' : ''}`} />
          </button>
        </div>

        {/* Quick View Floating Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-[#142129] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#0E626B]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white/50">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#7E8890] mb-1.5">
            <span className="uppercase tracking-[0.14em] text-[#0E626B] font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              <span className="font-medium text-[#1A252C]">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg text-[#1A252C] font-normal leading-snug line-clamp-1 group-hover:text-[#0E626B] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#7A848F] line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>

          {/* Color swatches preview */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-[#0E626B] ring-offset-1 scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-gray-400 ml-1">
              {product.colors.length} {product.colors.length > 1 ? 'tones' : 'tone'}
            </span>
          </div>

          {/* Size Pills */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1.5 py-0.5 text-[9px] uppercase border tracking-wider transition-colors ${
                  selectedSize === size
                    ? 'border-[#0E626B] bg-[#0E626B] text-white font-medium'
                    : 'border-[#E0D8CE] text-[#55606A] hover:border-[#0E626B]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-4 mt-4 border-t border-[#EDE6DC]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold text-[#142129] tracking-tight">
                {product.price.toLocaleString()} QAR
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()} QAR
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wider uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-xs font-medium">
              In Stock
            </span>
          </div>

          {/* Action Row: Bag & WhatsApp Direct Buy */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 px-2 bg-[#FAF8F5] hover:bg-[#0E626B] text-[#0E626B] hover:text-white border border-[#0E626B] text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleWhatsAppBuy}
              className="w-full py-2.5 px-2 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              title="Order on WhatsApp with +974 7001 5100"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#DFBF77]" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
