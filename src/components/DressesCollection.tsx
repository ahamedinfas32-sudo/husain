import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles, MessageCircle, X, Plus, Edit3 } from 'lucide-react';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

interface DressesCollectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenAdmin?: () => void;
  onEditProduct?: (product: Product) => void;
}

export const DressesCollection: React.FC<DressesCollectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenAdmin,
  onEditProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const categories = useMemo(() => {
    const defaultList = ['All', 'Luxury Handbags', 'Evening Gowns', 'Kaftans & Abayas', 'Cocktail Dresses', 'Modest Luxury', 'Bridal & Gala'];
    products.forEach((p) => {
      if (p.category && !defaultList.includes(p.category)) {
        defaultList.push(p.category);
      }
    });
    return defaultList;
  }, [products]);

  const silhouettes = ['All', 'Boston Handbag', 'Flap Shoulder Bag', 'Flowing A-Line', 'Sculpted Mermaid', 'Flowing Maxi', 'Sheath Column', 'Flared Tiered'];
  const sizes = ['All', 'One Size', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedSilhouette !== 'All' && p.silhouette !== selectedSilhouette) return false;
        if (selectedSize !== 'All' && !p.sizes.includes(selectedSize as any)) return false;
        if (priceRange === 'under-1500' && p.price >= 1500) return false;
        if (priceRange === '1500-2500' && (p.price < 1500 || p.price > 2500)) return false;
        if (priceRange === 'over-2500' && p.price <= 2500) return false;
        if (searchTerm) {
          const query = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchFabric = p.fabric.toLowerCase().includes(query);
          const matchOccasion = p.occasion.toLowerCase().includes(query);
          if (!matchName && !matchFabric && !matchOccasion) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured
      });
  }, [products, selectedCategory, selectedSilhouette, selectedSize, priceRange, sortBy, searchTerm]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSilhouette('All');
    setSelectedSize('All');
    setPriceRange('All');
    setSearchTerm('');
    setSortBy('featured');
  };

  return (
    <section id="dresses" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E626B]/10 text-[#0E626B] text-xs uppercase tracking-[0.2em] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Signature Wardrobe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight mb-4">
            Dresses Collection
          </h2>
          <p className="text-sm sm:text-base text-[#64707D] font-light leading-relaxed">
            Discover our curated ensemble of haute couture evening gowns, royal kaftans, and modest luxury pieces handcrafted for Qatar’s grandest celebrations.
          </p>
        </div>

        {/* Category Pills Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#0E626B] text-white shadow-sm'
                  : 'bg-white border border-[#E3DACB] text-[#4A5568] hover:border-[#0E626B] hover:text-[#0E626B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white border border-[#E3DACB] p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Quick filters / search */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 bg-[#F3ECE2] text-xs font-medium uppercase tracking-wider text-[#142129]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0E626B]" />
              <span>Filters</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Silhouette filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#55606B]">
                <span className="font-medium uppercase tracking-wider">Silhouette:</span>
                <select
                  value={selectedSilhouette}
                  onChange={(e) => setSelectedSilhouette(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#DDD4C7] px-2.5 py-1.5 text-xs text-[#142129] focus:outline-hidden focus:border-[#0E626B]"
                >
                  {silhouettes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Size filter */}
              <div className="flex items-center gap-1.5 text-xs text-[#55606B]">
                <span className="font-medium uppercase tracking-wider">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#DDD4C7] px-2.5 py-1.5 text-xs text-[#142129] focus:outline-hidden focus:border-[#0E626B]"
                >
                  {sizes.map((sz) => (
                    <option key={sz} value={sz}>{sz}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter in QAR */}
              <div className="flex items-center gap-1.5 text-xs text-[#55606B]">
                <span className="font-medium uppercase tracking-wider">Price (QAR):</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#DDD4C7] px-2.5 py-1.5 text-xs text-[#142129] focus:outline-hidden focus:border-[#0E626B]"
                >
                  <option value="All">All Prices</option>
                  <option value="under-1500">Under 1,500 QAR</option>
                  <option value="1500-2500">1,500 – 2,500 QAR</option>
                  <option value="over-2500">2,500+ QAR</option>
                </select>
              </div>
            </div>

            {/* Active search tag or reset */}
            {(selectedCategory !== 'All' || selectedSilhouette !== 'All' || selectedSize !== 'All' || priceRange !== 'All' || searchTerm) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#8B2635] hover:underline font-medium ml-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

            {/* Right: Results Count & Sort Dropdown & Admin Manager */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
              <span className="text-xs text-[#7A8590]">
                Showing <strong className="text-[#142129]">{filteredProducts.length}</strong> creations
              </span>

              <div className="flex items-center gap-1.5 text-xs text-[#55606B]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#0E626B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#DDD4C7] px-2.5 py-1.5 text-xs text-[#142129] focus:outline-hidden focus:border-[#0E626B]"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High (QAR)</option>
                  <option value="price-high">Price: High to Low (QAR)</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E626B] hover:bg-[#093E44] text-white text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs"
                  title="Add new dress or edit prices in QAR"
                >
                  <Plus className="w-3.5 h-3.5 text-[#DFBF77]" />
                  <span>+ Add Dress / Edit Prices</span>
                </button>
              )}
            </div>
          </div>

        {/* Mobile Filter Drawer / Collapsible */}
        {showMobileFilters && (
          <div className="lg:hidden bg-white border border-[#DDD4C7] p-5 mb-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DEC8]">
              <span className="font-semibold text-xs tracking-wider uppercase text-gray-800">Refine Collection</span>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-gray-600 mb-1">Silhouette</label>
              <select
                value={selectedSilhouette}
                onChange={(e) => setSelectedSilhouette(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2 text-xs"
              >
                {silhouettes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-gray-600 mb-1">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2 text-xs"
              >
                {sizes.map((sz) => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-gray-600 mb-1">Price Range in QAR</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2 text-xs"
              >
                <option value="All">All Prices</option>
                <option value="under-1500">Under 1,500 QAR</option>
                <option value="1500-2500">1,500 – 2,500 QAR</option>
                <option value="over-2500">2,500+ QAR</option>
              </select>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-2.5 bg-[#0E626B] text-white text-xs uppercase font-medium tracking-wider"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onEditProduct={onEditProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#E8DEC8] p-8">
            <p className="font-serif text-xl text-gray-700 mb-2">No matching gowns found</p>
            <p className="text-xs text-gray-500 mb-4">Try adjusting your filters or search keywords.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#0E626B] text-white text-xs uppercase tracking-wider font-medium"
            >
              View All Dresses
            </button>
          </div>
        )}

        {/* Bespoke Custom Dress Banner */}
        <div className="mt-16 bg-[#0B3A3F] border border-[#DFBF77]/40 p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs text-[#DFBF77] tracking-[0.2em] uppercase font-semibold">
              Bespoke Haute Couture Service
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal mt-2 mb-4 text-[#FAF8F5]">
              Looking for a One-of-a-Kind Custom Gown in Qatar?
            </h3>
            <p className="text-xs sm:text-sm text-[#D7DFDF] leading-relaxed mb-6 font-light">
              Our master couturiers in Madina Khalifa South create bespoke custom designs from your fabric of choice, personalized sketch, or specific occasion theme.
            </p>
            <a
              href={createGeneralWhatsAppInquiryUrl('Custom Bespoke Dress Inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#142129] text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire for Custom Dress on WhatsApp (+974 7001 5100)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
