'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  imglink: string;
  type: string;
  sortOrder?: number;
  active?: boolean;
};

export default function SortProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    void fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/products');
      const data = await res.json();

      if (!data.success) {
        setError('Failed to load products');
        return;
      }

      setProducts(data.data);
    } catch {
      setError('An error occurred while loading products');
    } finally {
      setLoading(false);
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= products.length) return;
    setProducts((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const moveToTop = (index: number) => {
    moveItem(index, 0);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const payload = products.map((p, index) => ({
        id: p.id,
        sortOrder: index,
      }));

      const res = await fetch('/api/admin/products/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: payload }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Failed to save order');
        return;
      }

      setSuccess('Order saved successfully');
      void fetchProducts();
    } catch {
      setError('An error occurred while saving');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white text-center">
        Loading products for sorting...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-red-200 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4">
        <div className="text-sm text-gray-200">
          Total products:{' '}
          <span className="font-semibold text-white">
            {products.length}
          </span>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Order'}
        </button>
      </div>

      {success && (
        <div className="mb-4 text-sm text-green-200 bg-green-500/20 border border-green-500 rounded-lg px-3 py-2">
          {success}
        </div>
      )}

      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
          >
            <div className="w-6 text-xs text-gray-300 flex-shrink-0 text-center">
              {index + 1}
            </div>
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image src={product.imglink} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-white text-sm font-medium truncate">{product.name}</p>
                {product.active === false && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-200">
                    Inactive
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-300">
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    product.type.toLowerCase().includes('pre-order')
                      ? 'bg-purple-500/20 text-purple-200'
                      : 'bg-green-500/20 text-green-200'
                  }`}
                >
                  {product.type}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-200">
                  Sort: {typeof product.sortOrder === 'number' ? product.sortOrder : 0}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => moveToTop(index)}
                className="px-2 py-1 rounded bg-white/10 text-[10px] text-gray-100 hover:bg-white/20"
              >
                Top
              </button>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, index - 1)}
                  className="px-2 py-1 rounded bg-white/10 text-[10px] text-gray-100 hover:bg-white/20"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, index + 1)}
                  className="px-2 py-1 rounded bg-white/10 text-[10px] text-gray-100 hover:bg-white/20"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

