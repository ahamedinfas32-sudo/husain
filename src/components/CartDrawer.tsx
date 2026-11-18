import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { createCartWhatsAppUrl } from '../utils/whatsapp';
import { BRAND_CONTACT } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onBrowseCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCollection
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [clientName, setClientName] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('Doha / Madina Khalifa');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const isFreeDelivery = discountedSubtotal >= 500;
  const deliveryFee = isFreeDelivery || items.length === 0 ? 0 : 30;
  const grandTotal = discountedSubtotal + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HIFAVIP10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "HIFAVIP10" for 10% off.');
    }
  };

  const handleWhatsAppCheckout = () => {
    const url = createCartWhatsAppUrl(
      items,
      clientName || 'VIP Client',
      deliveryZone,
      specialNotes + (discountPercent > 0 ? ` [Applied promo HIFAVIP10: -${discountAmount} QAR]` : '')
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#DFBF77]/30">
          {/* Header */}
          <div className="p-6 border-b border-[#E8DEC8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0E626B]" />
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A252C] font-normal">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-[#F3ECE2] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Delivery threshold bar */}
          <div className="bg-[#F5EFEB] px-6 py-3 border-b border-[#E8DEC8] text-xs">
            {subtotal >= 500 ? (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Complimentary White-Glove Qatar Delivery unlocked!</span>
              </p>
            ) : (
              <div>
                <p className="text-gray-600 mb-1">
                  Add <strong className="text-[#0E626B]">{500 - subtotal} QAR</strong> more for <strong>FREE Qatar Delivery</strong>
                </p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0E626B] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#DFBF77] mx-auto stroke-1" />
                <h3 className="font-serif text-xl text-gray-800">Your bag is currently empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto font-light leading-relaxed">
                  Explore our collection of luxury evening gowns, royal kaftans, and bespoke dresses.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseCollection();
                  }}
                  className="px-6 py-3 bg-[#0E626B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#093E44] transition-colors"
                >
                  Explore Dresses Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="flex gap-4 p-3 bg-white border border-[#E3DACB] shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover shrink-0 bg-[#ECE4D8]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-gray-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-gray-400 hover:text-[#8B2635] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#606D78] mt-0.5">
                        Size: <strong className="text-black">{item.selectedSize}</strong> | Tone:{' '}
                        <strong className="text-black">{item.selectedColor}</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD4C7] bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#142129]">
                        {(item.product.price * item.quantity).toLocaleString()} QAR
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout & Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8DEC8] space-y-4 shadow-lg">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Privilege Code (HIFAVIP10)"
                  className="flex-1 bg-[#FAF8F5] border border-[#DDD4C7] px-3 py-2 text-xs uppercase tracking-wider focus:outline-hidden focus:border-[#0E626B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF8F5] border border-[#0E626B] text-[#0E626B] hover:bg-[#0E626B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>
              {discountPercent > 0 && (
                <p className="text-xs text-emerald-700 font-medium">VIP Code Applied: 10% Off (-{discountAmount} QAR)</p>
              )}
              {promoError && <p className="text-xs text-[#8B2635]">{promoError}</p>}

              {/* Delivery Zone Selector */}
              <div>
                <label className="block text-[11px] uppercase font-semibold text-gray-600 mb-1">
                  Delivery Destination in Qatar
                </label>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2 text-xs"
                >
                  <option value="Madina Khalifa South / North">Madina Khalifa South / North</option>
                  <option value="West Bay & Diplomatic Area">West Bay & Diplomatic Area</option>
                  <option value="The Pearl Qatar & Porto Arabia">The Pearl Qatar & Porto Arabia</option>
                  <option value="Lusail Marina & Fox Hills">Lusail Marina & Fox Hills</option>
                  <option value="Al Rayyan / Education City">Al Rayyan / Education City</option>
                  <option value="Al Wakrah & Wukair">Al Wakrah & Wukair</option>
                  <option value="Al Khor & Northern Qatar">Al Khor & Northern Qatar</option>
                  <option value="Atelier Pick-up in Madina Khalifa South">Pick-up at Madina Khalifa Boutique</option>
                </select>
              </div>

              {/* Calculations Breakdown */}
              <div className="space-y-1.5 text-xs text-[#525E6A] pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-black">{subtotal.toLocaleString()} QAR</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VIP Privilege (10%):</span>
                    <span>-{discountAmount.toLocaleString()} QAR</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Qatar Express Delivery:</span>
                  <span className="font-medium text-black">
                    {deliveryFee === 0 ? 'FREE' : `${deliveryFee} QAR`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#142129] pt-2 border-t border-gray-200">
                  <span>Total (QAR):</span>
                  <span>{grandTotal.toLocaleString()} QAR</span>
                </div>
              </div>

              {/* Primary WhatsApp Order Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 px-6 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-xs sm:text-sm tracking-[0.16em] uppercase font-semibold flex items-center justify-center gap-2.5 shadow-md hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-[#DFBF77]" />
                <span>Place Order via WhatsApp (+974 7001 5100)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E626B]" />
                <span>Cash on Delivery / Card Link / Bank Transfer supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
