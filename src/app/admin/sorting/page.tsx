import SortProducts from '@/components/admin/SortProducts';

export default function SortingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Product Sorting</h1>
      <p className="text-gray-300 text-sm sm:text-base mb-6">
        Drag the order using the controls (Up/Down/Top), then click <span className="font-semibold">Save Order</span> to
        update how products appear on the website.
      </p>
      <SortProducts />
    </div>
  );
}

