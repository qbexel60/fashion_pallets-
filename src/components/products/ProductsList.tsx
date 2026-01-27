'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../cart/CartContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

type Product = {
  id: string;
  name: string;
  description: string;
  imglink: string;
  price: number;
  offerPrice?: number | null;
  quantity: number;
  type: string;
  deliveryTime: string;
  moreImages?: string[] | null;
  variants?: Record<string, string[]>;
  active?: boolean;
};

type Props = {
  preOrderProducts: Product[];
  stockProducts: Product[];
  initialTab?: 'pre-order' | 'stock';
};

export default function ProductsList({ preOrderProducts, stockProducts, initialTab = 'pre-order' }: Props) {
  const [activeTab, setActiveTab] = useState<'pre-order' | 'stock'>(initialTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageFullscreen, setImageFullscreen] = useState(false);
  const [dialogQuantity, setDialogQuantity] = useState(1);
  const { addToCart } = useCart();

  const currentProducts = activeTab === 'stock' ? stockProducts : preOrderProducts;
  // Only show products where active is not explicitly false
  const visibleProducts = currentProducts.filter((product) => product.active !== false);
  const productCount = visibleProducts.length;

  const handleOrderNow = (product: Product, quantity: number) => {
    if (!WHATSAPP_NUMBER) {
      alert('WhatsApp number is not configured. Set NEXT_PUBLIC_WHATSAPP_NUMBER in your .env file.');
      return;
    }
    const safeQty = Math.max(1, quantity);
    const line = `${safeQty} pcs ${product.name}`;
    const message = encodeURIComponent(`Hi, I want to order\n${line}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <div>
      <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
        {activeTab === 'stock'
          ? 'Browse our in-stock items. These products are available now and ready to ship.'
          : 'Browse our pre-order collection. These items are coming soon and can be reserved now.'}
      </p>

      <div className="flex gap-2 sm:gap-4 border-b border-white/10 mb-4 sm:mb-6">
        <button
          onClick={() => setActiveTab('pre-order')}
          className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-sm sm:text-base ${
            activeTab === 'pre-order'
              ? 'text-white border-b-2 border-[#C94CF7]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Pre-Order
        </button>
        <button
          onClick={() => setActiveTab('stock')}
          className={`px-3 sm:px-6 py-2 sm:py-3 font-semibold transition-all text-sm sm:text-base ${
            activeTab === 'stock'
              ? 'text-white border-b-2 border-[#00ff85]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Stock
        </button>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 mt-4 sm:mt-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {activeTab === 'stock' ? 'Stock' : 'Pre-Order'} Products
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            No {activeTab === 'stock' ? 'stock' : 'pre-order'} products available at the moment. Check back soon!
          </p>
          <div className="mt-4 sm:mt-6">
            <Link href="/products" className="text-white underline underline-offset-4 text-sm sm:text-base">
              Back to Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6 mt-4 sm:mt-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {activeTab === 'stock' ? 'Stock' : 'Pre-Order'} Products ({productCount})
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {visibleProducts.map((product: Product) => (
              <div
                key={product.id}
                className="group rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-3 md:p-4 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                    setDialogQuantity(1);
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative w-full h-32 sm:h-40 md:h-48 mb-2 sm:mb-3 md:mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.imglink}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-white mb-1 sm:mb-2 line-clamp-2 text-xs sm:text-sm md:text-base">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-1 sm:mb-2 hidden sm:block h-10 sm:h-12 overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                    {product.offerPrice && product.offerPrice < product.price ? (
                      <>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-white">
                          ৳{Math.round(product.offerPrice)}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          ৳{Math.round(product.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg font-bold text-white">
                        ৳{Math.round(product.price)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                    <span>Qty: {product.quantity}</span>
                    <span className="truncate ml-1">{product.deliveryTime}</span>
                  </div>
                </button>

                {/* Card actions */}
                <div className="mt-2 flex gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          offerPrice: product.offerPrice,
                          image: product.imglink,
                          type: product.type,
                        },
                        1,
                      )
                    }
                    className="flex-1 px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-[10px] sm:text-xs font-semibold text-white text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderNow(product, 1)}
                    className="flex-1 px-2 sm:px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-[10px] sm:text-xs font-semibold text-white text-center"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Product Details Dialog */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 sm:px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900 via-purple-900/90 to-gray-900 border border-white/20 p-4 sm:p-6 "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white/20 text-black w-8 h-8 flex items-center justify-center text-sm z-40"
            >
              ✕
            </button>

            {/* Images */}
            <div>
              {(() => {
                const images = [
                  selectedProduct.imglink,
                  ...(Array.isArray(selectedProduct.moreImages) ? selectedProduct.moreImages : []),
                ].filter(Boolean);

                const mainImage = images[selectedImageIndex] || images[0];

                return (
                  <>
                    <button
                      type="button"
                      onClick={() => setImageFullscreen(true)}
                      className="relative w-full h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden mb-3 sm:mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <Image
                        src={mainImage}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </button>

                    {images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1 mb-3 sm:mb-4">
                        {images.map((img, index) => (
                          <button
                            key={img + index.toString()}
                            type="button"
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border ${
                              index === selectedImageIndex
                                ? 'border-purple-400'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <Image src={img} alt={`${selectedProduct.name} ${index + 1}`} fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Content */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedProduct.name}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{selectedProduct.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {selectedProduct.offerPrice && selectedProduct.offerPrice < selectedProduct.price ? (
                  <>
                    <span className="text-lg sm:text-2xl font-bold text-white">
                      ৳{Math.round(selectedProduct.offerPrice)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      ৳{Math.round(selectedProduct.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg sm:text-2xl font-bold text-white">
                    ৳{Math.round(selectedProduct.price)}
                  </span>
                )}
                <span
                  className={`inline-block px-2 py-1 rounded text-[10px] sm:text-xs font-semibold ${
                    selectedProduct.type.toLowerCase().includes('pre-order')
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-green-500/20 text-green-300'
                  }`}
                >
                  {selectedProduct.type}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2">
                <span>
                  Qty: <span className="font-semibold text-white">{selectedProduct.quantity}</span>
                </span>
                <span className="truncate max-w-[60%] text-right">
                  Delivery: <span className="font-semibold text-white">{selectedProduct.deliveryTime}</span>
                </span>
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-300">Order Qty:</span>
                  <input
                    type="number"
                    min={1}
                    max={selectedProduct.quantity || undefined}
                    value={dialogQuantity}
                    onChange={(e) =>
                      setDialogQuantity(() => {
                        const val = parseInt(e.target.value || '1', 10);
                        if (Number.isNaN(val)) return 1;
                        return Math.max(1, Math.min(val, selectedProduct.quantity || val));
                      })
                    }
                    className="w-16 px-2 py-1 rounded-md bg-white/10 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex flex-1 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart(
                        {
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          offerPrice: selectedProduct.offerPrice,
                          image: selectedProduct.imglink,
                          type: selectedProduct.type,
                        },
                        dialogQuantity,
                      )
                    }
                    className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm font-semibold text-white text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOrderNow(selectedProduct, dialogQuantity)}
                    className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-xs sm:text-sm font-semibold text-white text-center"
                  >
                    Order Now
                  </button>
                </div>
              </div>

              {/* Variants */}
              {selectedProduct.variants &&
                typeof selectedProduct.variants === 'object' &&
                !Array.isArray(selectedProduct.variants) &&
                Object.keys(selectedProduct.variants).length > 0 && (
                <div className="space-y-2 text-xs sm:text-sm text-gray-200">
                  <h4 className="font-semibold text-white">Variants</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedProduct.variants as Record<string, unknown>).map(([key, rawValues]) => {
                      const values = Array.isArray(rawValues)
                        ? (rawValues as string[])
                        : [String(rawValues)];
                      return (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-medium text-gray-200 min-w-[80px]">{key}:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {values.map((val) => (
                            <span
                              key={val}
                              className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs text-gray-100"
                            >
                              {val}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 sm:px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm sm:text-base text-white border border-white/20"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen image viewer */}
      {selectedProduct && imageFullscreen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          onClick={() => setImageFullscreen(false)}
        >
          <button
            type="button"
            onClick={() => setImageFullscreen(false)}
            className="absolute top-4 left-4 rounded-full bg-white/15 hover:bg-white/25 text-white w-12 h-12 flex items-center justify-center text-lg font-semibold shadow-lg border border-white/30"
          >
            ✕
          </button>
          {(() => {
            const images = [
              selectedProduct.imglink,
              ...(Array.isArray(selectedProduct.moreImages) ? selectedProduct.moreImages : []),
            ].filter(Boolean);

            const mainImage = images[selectedImageIndex] || images[0];

            return (
              <div
                className="relative w-full h-full max-w-5xl max-h-[90vh] px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={mainImage}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Global cart UI handled by CartDrawer */}
    </div>
  );
}
