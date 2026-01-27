'use client';

import { useCart } from './CartContext';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

export default function CartDrawer() {
  const { items, totalItems, isOpen, closeCart, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    if (!WHATSAPP_NUMBER) {
      alert('WhatsApp number is not configured. Set NEXT_PUBLIC_WHATSAPP_NUMBER in your .env file.');
      return;
    }

    const lines = items.map(
      (item) => `${item.quantity} pcs ${item.product.name}`,
    );

    const message = encodeURIComponent(
      `Hi, I want to order\n${lines.join(',\n')}`,
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const hasItems = items.length > 0;

  const totalUnique = items.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5500]">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeCart}
      />
      <aside className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-b from-gray-950 via-purple-950/80 to-gray-900 border-l border-white/15 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">Cart</h2>
            <p className="text-xs text-gray-300">
              {hasItems
                ? `${totalItems} pcs in ${totalUnique} product${totalUnique > 1 ? 's' : ''}`
                : 'No items added yet'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {!hasItems ? (
            <p className="text-sm text-gray-300">Add products from the list to see them here.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {item.product.name}
                  </p>
                  {item.product.type && (
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.product.type}</p>
                  )}
                  {item.product.price && (
                    <p className="text-xs text-gray-300 mt-1">
                      ৳{Math.round(
                        item.product.offerPrice && item.product.offerPrice < item.product.price
                          ? item.product.offerPrice
                          : item.product.price,
                      )}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                      }
                      className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value || '1', 10);
                        if (Number.isNaN(val)) return;
                        updateQuantity(item.product.id, Math.max(1, val));
                      }}
                      className="w-10 px-1 py-0.5 text-xs rounded bg-white/10 border border-white/20 text-center text-white"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[11px] text-red-300 hover:text-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 px-4 py-3 space-y-2">
          <button
            type="button"
            disabled={!hasItems}
            onClick={handlePlaceOrder}
            className="w-full px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5b] text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Place Order on WhatsApp
          </button>
          {hasItems && (
            <button
              type="button"
              onClick={clearCart}
              className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-200"
            >
              Clear Cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

