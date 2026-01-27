import React from 'react';
import { getProducts } from '@/lib/products';
import ProductsList from '@/components/products/ProductsList';

// ISR: Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

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
};

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function ProductsListPage({ searchParams }: Props) {
  // Fetch products ONCE on server
  const allProducts = await getProducts({ useCache: false });
  const params = await searchParams;
  const initialTab = params.tab === 'stock' ? 'stock' : 'pre-order';

  // Filter products by type ONCE
  const preOrderProducts = allProducts.filter(
    (product: Product) =>
      product.type?.toLowerCase().includes('pre-order') ||
      product.type?.toLowerCase().includes('preorder') ||
      product.type?.toLowerCase() === 'pre-order'
  );

  const stockProducts = allProducts.filter(
    (product: Product) =>
      product.type?.toLowerCase().includes('stock') ||
      product.type?.toLowerCase() === 'stock' ||
      (!product.type?.toLowerCase().includes('pre-order') &&
        !product.type?.toLowerCase().includes('preorder'))
  );

  return (
    <div className="font-sans">
      <div className="container mx-auto px-4 py-10 md:py-14">

        {/* Client component handles tab switching without refetching */}
        <ProductsList preOrderProducts={preOrderProducts} stockProducts={stockProducts} initialTab={initialTab} />
      </div>
    </div>
  );
}
