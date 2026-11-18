import React, { useState } from 'react';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { NewArrivals } from './components/NewArrivals';
import { DressesCollection } from './components/DressesCollection';
import { BestSellers } from './components/BestSellers';
import { SpecialOffers } from './components/SpecialOffers';
import { AboutHifa } from './components/AboutHifa';
import { LocationAndBoutique } from './components/LocationAndBoutique';
import { Testimonials } from './components/Testimonials';
import { InstagramLookbook } from './components/InstagramLookbook';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminProductModal } from './components/AdminProductModal';
import { getStoredProducts, saveStoredProducts, resetToDefaultProducts } from './utils/productStorage';
import { ShoppingBag, Heart, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Admin / Product & Price Manager modal state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const initialProd = products[0] || null;
    if (!initialProd) return [];
    return [
      {
        product: initialProd,
        selectedSize: initialProd.sizes[0] || 'One Size',
        selectedColor: initialProd.colors[0]?.name || 'Default',
        quantity: 1
      }
    ];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    return products[1] ? [products[1].id] : [];
  });

  // Drawers and Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: 'bag' | 'heart' | 'check' } | null>(null);

  const showToast = (text: string, icon: 'bag' | 'heart' | 'check' = 'bag') => {
    setToastMessage({ text, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add to Bag handler
  const handleAddToCart = (product: Product, size?: string, color?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'One Size';
    const chosenColor = color || product.colors[0]?.name || 'Default';

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} to your bag.`, 'bag');
  };

  // Wishlist toggle handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed from your wishlist.`, 'heart');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to your wishlist.`, 'heart');
        return [...prev, product.id];
      }
    });
  };

  // Cart quantity controls by index
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], quantity: newQty };
      }
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Save products from admin editor
  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
    showToast('Catalog updated successfully!', 'check');
  };

  // Reset products to default
  const handleResetDefaults = () => {
    const defaults = resetToDefaultProducts();
    setProducts(defaults);
    showToast('Reset to official boutique defaults.', 'check');
  };

  // Section navigation
  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const headerOffset = 90;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#142129] flex flex-col font-sans selection:bg-[#0E626B]/20 selection:text-[#0E626B]">
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0E626B] text-white px-5 py-3.5 shadow-2xl border border-[#C5A059] transition-all transform animate-bounce">
          {toastMessage.icon === 'bag' && <ShoppingBag className="w-4 h-4 text-[#DFBF77]" />}
          {toastMessage.icon === 'heart' && <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />}
          {toastMessage.icon === 'check' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          <span className="text-xs font-medium tracking-wide">{toastMessage.text}</span>
        </div>
      )}

      {/* 1. Header with Big Logo, Navigation, QAR currency, Cart & Haifa Shoppy Channel */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={scrollToSection}
        currentSection={currentSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Luxury Hero Banner */}
        <Hero
          onExploreClick={() => scrollToSection('dresses')}
          onBookFittingClick={() => scrollToSection('boutique-map')}
        />

        {/* 3. Luxury Brand Pillars */}
        <ValuePillars />

        {/* 4. New Arrivals Showcase */}
        <NewArrivals
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onViewAllClick={() => scrollToSection('dresses')}
        />

        {/* 5. Complete Dresses & Bags Collection with Filters, Sorting, and In-App Price Editing */}
        <DressesCollection
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenAdmin={() => {
            setEditingProduct(null);
            setIsAdminOpen(true);
          }}
          onEditProduct={(p) => {
            setEditingProduct(p);
            setIsAdminOpen(true);
          }}
        />

        {/* 6. Best Sellers */}
        <BestSellers
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onViewAllClick={() => scrollToSection('dresses')}
        />

        {/* 7. Special Offers with Countdown & VIP Promo */}
        <SpecialOffers
          products={products}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 8. About HIFA (Story & Craftsmanship in Madina Khalifa South, Qatar) */}
        <AboutHifa
          onBookFittingClick={() => scrollToSection('boutique-map')}
        />

        {/* 9. Boutique Location & Interactive Google Maps Section */}
        <LocationAndBoutique />

        {/* 10. Customer Testimonials & VIP Client Acclaim */}
        <Testimonials />

        {/* 11. Instagram Lookbook & Social Community */}
        <InstagramLookbook />
      </main>

      {/* 12. Professional Footer with Haifa Shoppy channel and Qatar details */}
      <Footer
        onNavigate={scrollToSection}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Floating WhatsApp VIP Concierge Widget */}
      <WhatsAppWidget />

      {/* In-App Product & Price Manager Modal (Edit prices anytime in QAR) */}
      <AdminProductModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          setEditingProduct(null);
        }}
        products={products}
        onSaveProducts={handleSaveProducts}
        onResetDefaults={handleResetDefaults}
        initialEditingProduct={editingProduct}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onBookFitting={() => {
          setSelectedProduct(null);
          scrollToSection('boutique-map');
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onBrowseCollection={() => scrollToSection('dresses')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onBrowseCollection={() => scrollToSection('dresses')}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
