'use client';

import Link from 'next/link';

type Props = {
  activeTab: 'pre-order' | 'stock';
};

export default function ProductsTabs({ activeTab }: Props) {
  return (
    <div className="flex gap-4 border-b border-white/10 mb-6">
      <Link
        href="/products/list?tab=pre-order"
        className={`px-6 py-3 font-semibold transition-all ${
          activeTab === 'pre-order'
            ? 'text-white border-b-2 border-[#C94CF7]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Pre-Order
      </Link>
      <Link
        href="/products/list?tab=stock"
        className={`px-6 py-3 font-semibold transition-all ${
          activeTab === 'stock'
            ? 'text-white border-b-2 border-[#00ff85]'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        Stock
      </Link>
    </div>
  );
}
