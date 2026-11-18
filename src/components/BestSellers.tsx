import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Crown, ArrowRight } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAllClick: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAllClick
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section id="best-sellers" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8F6F2C] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Most Coveted in Qatar</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight">
              Best Sellers
            </h2>
            <p className="text-sm text-[#64707D] font-light mt-2 max-w-xl">
              HIFA’s signature silhouettes that have captivated galas and high-profile events across Doha, The Pearl, and the Gulf.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0E626B] hover:text-[#093E44] group transition-colors self-start md:self-end"
          >
            <span>Explore All Best Sellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
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
    </section>
  );
};
