/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { invalidateProductsCache } from '@/lib/products';

// GET - List all products
export async function GET() {
  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const {
      name,
      description,
      variants,
      imglink,
      moreImages,
      quantity,
      price,
      offerPrice,
      type,
      deliveryTime,
      active,
    } = body;

    if (!name || !description || !imglink || quantity === undefined || !price || !type || !deliveryTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure variants values are arrays
    const processedVariants: Record<string, string[]> = {};
    if (variants) {
      Object.entries(variants).forEach(([key, values]) => {
        processedVariants[key] = Array.isArray(values) ? values : [values as string];
      });
    }

    const product = await (prisma.product as any).create({
      data: {
        name,
        description,
        variants: processedVariants,
        imglink,
        moreImages: moreImages && Array.isArray(moreImages) ? moreImages : null,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        offerPrice: offerPrice ? parseFloat(offerPrice) : null,
        type,
        deliveryTime,
        active: typeof active === 'boolean' ? active : true,
      },
    });

    // Invalidate cache and revalidate ISR pages
    await invalidateProductsCache();
    try {
      revalidatePath('/products/list');
      revalidatePath('/products');
    } catch (_e) {
      // In dev, revalidatePath can be a no-op; ignore errors
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
