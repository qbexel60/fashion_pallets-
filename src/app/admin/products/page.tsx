import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import Link from 'next/link';
import ProductsTable from '@/components/admin/ProductsTable';

export default async function AdminProductsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Product Management</h1>
            <p className="text-gray-300 text-sm sm:text-base">Manage all your products</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-center text-sm sm:text-base"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg transition-colors text-center text-sm sm:text-base"
            >
              Add New Product
            </Link>
          </div>
        </div>

        <ProductsTable />
      </div>
    </div>
  );
}
