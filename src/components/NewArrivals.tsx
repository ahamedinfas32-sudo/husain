import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAllClick: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAllClick
}) => {
  const newItems = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section id="new-arrivals" className="py-16 sm:py-20 bg-[#F5EFEB]/60 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E626B]/10 text-[#0E626B] text-xs uppercase tracking-[0.2em] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Just Arrived at HIFA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight">
              New Arrivals Collection
            </h2>
            <p className="text-sm text-[#64707D] font-light mt-2 max-w-xl">
              Freshly tailored in our Doha atelier for this season’s weddings, galas, and festive celebrations.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0E626B] hover:text-[#093E44] group transition-colors self-start md:self-end"
          >
            <span>View All New Pieces</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newItems.map((product) => (
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
