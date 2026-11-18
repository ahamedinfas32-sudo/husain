import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBrowseCollection: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
  onBrowseCollection
}) => {
  if (!isOpen) return null;

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#DFBF77]/30">
          <div className="p-6 border-b border-[#E8DEC8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
              <h2 className="font-serif text-xl text-[#1A252C] font-normal">
                Saved Wishlist ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-[#F3ECE2] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Heart className="w-12 h-12 text-[#DFBF77] mx-auto stroke-1" />
                <h3 className="font-serif text-xl text-gray-800">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                  Save your favorite evening dresses and royal kaftans to review later or order directly.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseCollection();
                  }}
                  className="px-6 py-3 bg-[#0E626B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#093E44] transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white border border-[#E3DACB] shadow-xs"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover shrink-0 bg-[#ECE4D8]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-medium text-gray-900 leading-snug">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-gray-400 hover:text-[#8B2635] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-[#142129] mt-1">
                        {product.price.toLocaleString()} QAR
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="w-full mt-2 py-2 px-3 bg-[#0E626B] hover:bg-[#093E44] text-white text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
