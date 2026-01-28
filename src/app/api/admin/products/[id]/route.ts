/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { invalidateProductsCache } from '@/lib/products';

// GET - Get single product
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// PUT - Update product
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;

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
      sortOrder,
    } = body;

    // Ensure variants values are arrays
    const processedVariants: Record<string, string[]> = {};
    if (variants) {
      Object.entries(variants).forEach(([key, values]) => {
        processedVariants[key] = Array.isArray(values) ? values : [values as string];
      });
    }

    const product = await (prisma.product as any).update({
      where: { id },
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
        active: typeof active === 'boolean' ? active : undefined,
        sortOrder:
          sortOrder === null
            ? 0
            : typeof sortOrder === 'number'
              ? sortOrder
              : parseInt(sortOrder) || undefined,
      },
    });

    // Invalidate cache and revalidate ISR pages
    await invalidateProductsCache();
    try {
      revalidatePath('/products/list');
      revalidatePath('/products');
    } catch {
      // In dev, revalidatePath can be a no-op; ignore errors
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    // Invalidate cache and revalidate ISR pages
    await invalidateProductsCache();
    try {
      revalidatePath('/products/list');
      revalidatePath('/products');
    } catch {
      // In dev, revalidatePath can be a no-op; ignore errors
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
