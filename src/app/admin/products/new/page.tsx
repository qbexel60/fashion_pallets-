import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import ProductForm from '@/components/admin/ProductForm';

export default async function NewProductPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Add New Product</h1>
        <ProductForm />
      </div>
    </div>
  );
}
