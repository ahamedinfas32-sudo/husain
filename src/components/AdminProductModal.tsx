import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, RefreshCw, DollarSign, Image as ImageIcon, Sparkles, Tag, Layers } from 'lucide-react';
import { Product } from '../types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetDefaults: () => void;
  initialEditingProduct?: Product | null;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProducts,
  onResetDefaults,
  initialEditingProduct
}) => {
  const [activeTab, setActiveTab] = useState<'edit-prices' | 'add-new'>('edit-prices');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Quick price editing state: map of productId -> current price in QAR
  const [priceMap, setPriceMap] = useState<Record<string, { price: number; originalPrice?: number }>>({});

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    subtitle: '',
    price: 1500,
    originalPrice: 1800,
    category: 'Luxury Handbags',
    occasion: 'Special Occasions & Daily Elegance',
    silhouette: 'Boston Handbag',
    fabric: 'Genuine Leather / Silk',
    dimensions: '25cm * 16cm * 11cm',
    colors: [
      { name: 'Teal Emerald', hex: '#0E626B' },
      { name: 'Classic Black', hex: '#1C1C1C' }
    ],
    sizes: ['One Size', 'Custom'],
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'],
    description: '',
    details: ['Handcrafted luxury finish', 'Official HIFA presentation packaging'],
    care: ['Store in provided dustbag', 'Avoid direct moisture'],
    rating: 5.0,
    reviewCount: 12,
    inStock: true
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  // Sync priceMap when modal opens or products change
  useEffect(() => {
    const map: Record<string, { price: number; originalPrice?: number }> = {};
    products.forEach((p) => {
      map[p.id] = { price: p.price, originalPrice: p.originalPrice };
    });
    setPriceMap(map);
  }, [products, isOpen]);

  // If opened specifically for one product
  useEffect(() => {
    if (initialEditingProduct) {
      setActiveTab('edit-prices');
      setSearchTerm(initialEditingProduct.name);
    }
  }, [initialEditingProduct]);

  if (!isOpen) return null;

  const handlePriceChange = (id: string, newPrice: number) => {
    setPriceMap((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        price: Number(newPrice) || 0
      }
    }));
  };

  const handleOriginalPriceChange = (id: string, newOrig: number) => {
    setPriceMap((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        originalPrice: Number(newOrig) || undefined
      }
    }));
  };

  const handleSaveAllPrices = () => {
    const updated = products.map((p) => {
      if (priceMap[p.id]) {
        return {
          ...p,
          price: priceMap[p.id].price,
          originalPrice: priceMap[p.id].originalPrice
        };
      }
      return p;
    });

    onSaveProducts(updated);
    setSavedSuccessMsg('All product prices updated successfully in QAR!');
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleSaveSinglePrice = (productId: string) => {
    const pData = priceMap[productId];
    if (!pData) return;

    const updated = products.map((p) => {
      if (p.id === productId) {
        return {
          ...p,
          price: pData.price,
          originalPrice: pData.originalPrice
        };
      }
      return p;
    });

    onSaveProducts(updated);
    setSavedSuccessMsg(`Price updated for ${products.find((p) => p.id === productId)?.name}!`);
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    if (products.length <= 1) {
      alert('You must have at least one product in your boutique collection.');
      return;
    }
    const updated = products.filter((p) => p.id !== id);
    onSaveProducts(updated);
    setSavedSuccessMsg('Product removed from catalog.');
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Please enter a product name and price.');
      return;
    }

    const created: Product = {
      id: `hifa-${Date.now()}`,
      name: newProduct.name || 'HIFA Creation',
      subtitle: newProduct.subtitle || 'Handcrafted Luxury in Madina Khalifa South',
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
      category: newProduct.category || 'Luxury Handbags',
      occasion: newProduct.occasion || 'Special Occasions',
      silhouette: newProduct.silhouette || 'Boston Handbag',
      fabric: newProduct.fabric || 'Luxury Leather / Silk',
      dimensions: newProduct.dimensions || '25cm * 16cm * 11cm',
      colors: newProduct.colors || [{ name: 'Signature Teal', hex: '#0E626B' }],
      sizes: newProduct.sizes || ['One Size'],
      images: newProduct.images?.length
        ? newProduct.images
        : ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'],
      description:
        newProduct.description ||
        'Exquisite luxury piece handcrafted and available at HIFA boutique in Madina Khalifa South, Qatar.',
      details: newProduct.details || ['Boutique signature piece', 'White-glove delivery across Qatar'],
      care: newProduct.care || ['Store safely in dustbag', 'Avoid direct moisture'],
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      isNew: true
    };

    onSaveProducts([created, ...products]);
    setSavedSuccessMsg(`New product "${created.name}" added to the top of your catalog!`);
    setActiveTab('edit-prices');
    setTimeout(() => setSavedSuccessMsg(null), 3500);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF8F5] border border-[#C5A059] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#093E44] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#0E626B]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0E626B] rounded-xs text-[#DFBF77]">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-white">
                HIFA Product & Price Manager
              </h2>
              <p className="text-xs text-[#DFBF77] font-light">
                Add your products and change prices in QAR anytime • Saves automatically
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E8DEC8] bg-[#F4EDE2] px-6">
          <button
            onClick={() => setActiveTab('edit-prices')}
            className={`py-3 px-5 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'edit-prices'
                ? 'border-[#0E626B] text-[#0E626B] bg-white'
                : 'border-transparent text-[#626C75] hover:text-[#0E626B]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#C5A059]" />
            <span>Edit Product Prices ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add-new')}
            className={`py-3 px-5 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'add-new'
                ? 'border-[#0E626B] text-[#0E626B] bg-white'
                : 'border-transparent text-[#626C75] hover:text-[#0E626B]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#0E626B]" />
            <span>+ Add New Product</span>
          </button>
        </div>

        {/* Toast feedback */}
        {savedSuccessMsg && (
          <div className="bg-emerald-800 text-white text-xs px-6 py-2.5 flex items-center gap-2 shadow-xs transition-all">
            <Check className="w-4 h-4 text-emerald-300" />
            <span className="font-medium">{savedSuccessMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'edit-prices' ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <input
                  type="text"
                  placeholder="Filter products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#DDD4C7] text-xs text-[#142129] focus:outline-hidden focus:border-[#0E626B] flex-1 max-w-md"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAllPrices}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E626B] hover:bg-[#093E44] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Check className="w-4 h-4 text-[#DFBF77]" />
                    <span>Save All Prices</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset all products and prices to official HIFA boutique defaults?')) {
                        onResetDefaults();
                        setSavedSuccessMsg('Restored official boutique default products.');
                        setTimeout(() => setSavedSuccessMsg(null), 3000);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-[#F0E6D8] hover:bg-[#E4D5C2] text-[#4A5568] text-xs font-medium transition-colors"
                    title="Reset to default items"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore Defaults</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="border border-[#E8DEC8] bg-white divide-y divide-[#EFE7D8]">
                {filteredProducts.map((p) => {
                  const pData = priceMap[p.id] || { price: p.price, originalPrice: p.originalPrice };

                  return (
                    <div
                      key={p.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-16 object-cover bg-[#ECE5DA] border border-[#DDD4C7] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-semibold text-[#0E626B] tracking-wider block">
                            {p.category}
                          </span>
                          <h4 className="font-serif text-sm font-medium text-[#1A252C] truncate">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-[#7A8590] truncate max-w-sm">
                            {p.subtitle || p.dimensions || p.fabric}
                          </p>
                        </div>
                      </div>

                      {/* Price Inputs */}
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <div className="flex flex-col items-start">
                          <label className="text-[9px] uppercase tracking-wider text-[#7A8590] font-semibold mb-0.5">
                            Sale Price (QAR)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={pData.price}
                              onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                              className="w-28 px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD4C7] text-xs font-semibold text-[#142129] focus:outline-hidden focus:border-[#0E626B]"
                            />
                            <span className="absolute right-2 top-1.5 text-[10px] text-gray-400 font-medium pointer-events-none">
                              QAR
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-start">
                          <label className="text-[9px] uppercase tracking-wider text-[#7A8590] font-semibold mb-0.5">
                            Original / Compare
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              step="50"
                              value={pData.originalPrice || ''}
                              placeholder="None"
                              onChange={(e) => handleOriginalPriceChange(p.id, Number(e.target.value))}
                              className="w-24 px-2.5 py-1.5 bg-[#FAF8F5] border border-[#DDD4C7] text-xs text-[#7A8590] focus:outline-hidden focus:border-[#0E626B]"
                            />
                            <span className="absolute right-2 top-1.5 text-[10px] text-gray-400 font-medium pointer-events-none">
                              QAR
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSaveSinglePrice(p.id)}
                          className="mt-3.5 p-2 bg-[#0E626B] hover:bg-[#093E44] text-white transition-colors"
                          title="Save this product price"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="mt-3.5 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div className="p-8 text-center text-xs text-[#7A8590]">
                    No products matched your search term "{searchTerm}".
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Add New Product Form */
            <form onSubmit={handleCreateNewProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fendi Roma Boston Handbag in Pastel Teal"
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.category || 'Luxury Handbags'}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  >
                    <option value="Luxury Handbags">Luxury Handbags</option>
                    <option value="Evening Gowns">Evening Gowns</option>
                    <option value="Kaftans & Abayas">Kaftans & Abayas</option>
                    <option value="Cocktail Dresses">Cocktail Dresses</option>
                    <option value="Modest Luxury">Modest Luxury</option>
                    <option value="Bridal & Gala">Bridal & Gala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Price in QAR (ر.ق) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="50"
                    placeholder="e.g. 1650"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs font-semibold focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Original / Compare Price in QAR
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    placeholder="e.g. 1950"
                    value={newProduct.originalPrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Dimensions (e.g. 25cm * 16cm * 11cm)
                  </label>
                  <input
                    type="text"
                    placeholder="25cm * 16cm * 11cm"
                    value={newProduct.dimensions || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Fabric / Material & Trim
                  </label>
                  <input
                    type="text"
                    placeholder="Smooth Calfskin Leather & Gold Studs"
                    value={newProduct.fabric || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Product Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (imageUrlInput.trim()) {
                          setNewProduct({
                            ...newProduct,
                            images: [imageUrlInput.trim(), ...(newProduct.images || [])]
                          });
                          setImageUrlInput('');
                        }
                      }}
                      className="px-4 py-2 bg-[#0E626B] text-white text-xs font-semibold uppercase"
                    >
                      Add Image
                    </button>
                  </div>
                  {newProduct.images && newProduct.images.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      {newProduct.images.map((img, idx) => (
                        <div key={idx} className="relative w-14 h-14 border border-[#DDD4C7]">
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#142129] mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Bespoke luxury piece tailored for Doha high society..."
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD4C7] text-xs focus:outline-hidden focus:border-[#0E626B]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8DEC8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit-prices')}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 text-xs uppercase font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0E626B] hover:bg-[#093E44] text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-colors"
                >
                  Publish Product to HIFA Boutique
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
