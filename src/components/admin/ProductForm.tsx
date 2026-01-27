'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from './ImageUpload';
import MultipleImageUpload from './MultipleImageUpload';
import VariantsInput from './VariantsInput';

type Product = {
  id: string;
  name: string;
  description: string;
  variants: Record<string, string[]>;
  imglink: string;
  moreImages?: string[] | null;
  price: number;
  offerPrice?: number | null;
  quantity: number;
  type: string;
  deliveryTime: string;
  active: boolean;
};

type Props = {
  productId?: string;
};

export default function ProductForm({ productId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imglink: '',
    moreImages: [] as string[],
    quantity: '',
    price: '',
    offerPrice: '',
    type: 'stock',
    deliveryTime: '',
    active: true,
  });
  const [variants, setVariants] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        const product: Product = data.data;
        setFormData({
          name: product.name,
          description: product.description,
          imglink: product.imglink,
          moreImages: Array.isArray(product.moreImages) ? product.moreImages : [],
          quantity: product.quantity.toString(),
          price: product.price.toString(),
          offerPrice: product.offerPrice?.toString() || '',
          type: product.type,
          deliveryTime: product.deliveryTime,
          active: product.active,
        });
        
        // Ensure variants are in the correct format
        const processedVariants: Record<string, string[]> = {};
        if (product.variants) {
          Object.entries(product.variants).forEach(([key, values]) => {
            processedVariants[key] = Array.isArray(values) ? values : [values as string];
          });
        }
        setVariants(processedVariants);
      }
    } catch {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products';
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          variants,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          offerPrice: formData.offerPrice ? parseFloat(formData.offerPrice) : null,
          moreImages: formData.moreImages.length > 0 ? formData.moreImages : null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(data.error || 'Failed to save product');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center text-white">
        Loading product...
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 max-w-4xl w-full">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-600 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="pre-order">Pre-Order</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <ImageUpload
            value={formData.imglink}
            onChange={(url) => setFormData({ ...formData, imglink: url })}
            label="Main Image"
            required
          />

          <MultipleImageUpload
            value={formData.moreImages}
            onChange={(urls) => setFormData({ ...formData, moreImages: urls })}
            label="Additional Images"
          />
        </div>

        {/* Pricing & Quantity / Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Price *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Offer Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.offerPrice}
              onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Quantity *</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center md:items-start gap-3 pt-2 md:pt-0">
            <div className="flex items-center">
              <input
                id="active"
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 text-purple-500 border-white/30 bg-white/10 rounded focus:ring-purple-500"
              />
              <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-300">
                Active
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Time *</label>
          <input
            type="text"
            value={formData.deliveryTime}
            onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
            required
            placeholder="e.g., 3-5 days, 2-3 weeks"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Variants */}
        <VariantsInput value={variants} onChange={setVariants} />

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            {saving ? 'Saving...' : productId ? 'Update Product' : 'Create Product'}
          </button>
          <Link
            href="/admin/products"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-center text-sm sm:text-base"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
