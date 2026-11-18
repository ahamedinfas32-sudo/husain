import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.silhouette.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="min-h-full flex items-start justify-center pt-20 p-4">
        <div className="relative w-full max-w-2xl bg-[#FAF8F5] shadow-2xl border border-[#DFBF77]/40 p-6">
          {/* Top Search Input */}
          <div className="relative flex items-center border-b-2 border-[#0E626B] pb-3 mb-6">
            <Search className="w-5 h-5 text-[#0E626B] mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gowns, silk kaftans, fabrics, silhouettes..."
              className="w-full bg-transparent text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-hidden font-serif"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-black mr-2">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-500 hover:text-black"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#0E626B] font-semibold">
                Popular Collections in Qatar:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Emerald Gown', 'Silk Kaftan', 'Mermaid Gown', 'French Lace', 'Velvet', 'Organza', 'White Bridal'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white border border-[#DDD4C7] text-xs text-gray-700 hover:border-[#0E626B] hover:text-[#0E626B] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">
                Found {searchResults.length} {searchResults.length === 1 ? 'dress' : 'dresses'} for "{query}"
              </p>

              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-2.5 bg-white border border-[#E3DACB] hover:border-[#0E626B] cursor-pointer transition-colors group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-18 object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-[#0E626B] font-medium">
                        {product.category}
                      </p>
                      <h4 className="font-serif text-sm font-medium text-gray-900 group-hover:text-[#0E626B]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">{product.fabric}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-sm text-[#142129]">
                        {product.price.toLocaleString()} QAR
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0E626B] group-hover:translate-x-1 transition-all ml-auto mt-1" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-xs">
                  No dress designs matched your search. Try "Emerald", "Silk", or "Kaftan".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
