'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  createdAt: string;
  active?: boolean;
  sortOrder?: number;
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'pre-order' | 'stock'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch {
      alert('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center text-white">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-8 text-center text-red-200">
        {error}
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const isActive = product.active !== false;

    if (statusFilter === 'active' && !isActive) return false;
    if (statusFilter === 'inactive' && isActive) return false;

    const typeLower = product.type.toLowerCase();
    if (typeFilter === 'pre-order') {
      return typeLower.includes('pre-order') || typeLower.includes('preorder');
    }
    if (typeFilter === 'stock') {
      return !typeLower.includes('pre-order') && !typeLower.includes('preorder');
    }

    return true;
  });

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between px-4 lg:px-6 pt-4 pb-2 border-b border-white/10">
        <div className="text-sm text-gray-300">
          Showing <span className="font-semibold text-white">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-white">{products.length}</span> products
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-3 py-2 bg-gray-600 border border-white/20 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'pre-order' | 'stock')}
            className="px-3 py-2 bg-gray-600 border border-white/20 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="pre-order">Pre-Order</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Image</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Sort</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Price</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Quantity</th>
              <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-300">
                  No products found.{' '}
                  <Link href="/admin/products/new" className="text-purple-400 hover:underline">
                    Create one
                  </Link>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={product.imglink} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="text-white font-medium">{product.name}</div>
                    <div className="text-gray-400 text-sm line-clamp-1">{product.description}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.type.toLowerCase().includes('pre-order')
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}
                    >
                      {product.type}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-white">
                    {typeof product.sortOrder === 'number' ? product.sortOrder : 0}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-white">
                    {product.offerPrice && product.offerPrice < product.price ? (
                      <>
                        <span>৳{Math.round(product.offerPrice)}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">
                          ৳{Math.round(product.price)}
                        </span>
                      </>
                    ) : (
                      <span>৳{Math.round(product.price)}</span>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-white">{product.quantity}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-300 py-8">
            No products found.{' '}
            <Link href="/admin/products/new" className="text-purple-400 hover:underline">
              Create one
            </Link>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex gap-4 mb-3">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={product.imglink} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium mb-1 truncate">{product.name}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        product.type.toLowerCase().includes('pre-order')
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}
                    >
                      {product.type}
                    </span>
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-white/10 text-gray-200">
                      Sort: {typeof product.sortOrder === 'number' ? product.sortOrder : 0}
                    </span>
                  </div>
                </div>
              </div>
              
                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-gray-400">Price:</span>
                  {product.offerPrice && product.offerPrice < product.price ? (
                    <>
                      <span className="text-white ml-2 font-medium">
                        ৳{Math.round(product.offerPrice)}
                      </span>
                      <span className="text-gray-500 text-xs line-through ml-1">
                        ৳{Math.round(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white ml-2 font-medium">
                      ৳{Math.round(product.price)}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">Qty:</span>
                  <span className="text-white ml-2 font-medium">{product.quantity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
