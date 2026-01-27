import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Get stats
  const [totalProducts, preOrderCount, stockCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { type: { contains: 'pre-order', mode: 'insensitive' } } }),
    prisma.product.count({ where: { type: { contains: 'stock', mode: 'insensitive' } } }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300 text-sm sm:text-base">Welcome back, {session.name}!</p>
          </div>
          <LogoutButton />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-gray-300 text-sm mb-2">Total Products</h3>
            <p className="text-4xl font-bold text-white">{totalProducts}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-gray-300 text-sm mb-2">Pre-Order Products</h3>
            <p className="text-4xl font-bold text-purple-400">{preOrderCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-gray-300 text-sm mb-2">Stock Products</h3>
            <p className="text-4xl font-bold text-green-400">{stockCount}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all text-center"
            >
              Add New Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
