import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { invalidateProductsCache } from '@/lib/products';

type ReorderItem = {
  id: string;
  sortOrder: number;
};

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = (await request.json()) as { items?: ReorderItem[] };
    const items = body.items ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 },
      );
    }

    // Basic validation
    for (const item of items) {
      if (!item.id || typeof item.sortOrder !== 'number') {
        return NextResponse.json(
          { error: 'Invalid item format' },
          { status: 400 },
        );
      }
    }

    // Update all sort orders
    await Promise.all(
      items.map((item) =>
        prisma.product.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    );

    await invalidateProductsCache();
    try {
      revalidatePath('/products/list');
      revalidatePath('/products');
    } catch {
      // ignore in dev
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder products error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder products' },
      { status: 500 },
    );
  }
}

