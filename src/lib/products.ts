/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from './prisma';
import { redis } from './redis';

const CACHE_KEY = 'all_products';

export async function getProducts() {
  try {
    // Try Redis first
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      // Upstash can return either a JSON string or a parsed value.
      if (typeof cached === 'string') {
        try {
          const parsed = JSON.parse(cached);
          console.log('✅ Products fetched from Redis cache (parsed from string)');
          return parsed;
        } catch (_e) {
          // If the string is somehow not valid JSON, clear it and fall back to DB
          console.warn('⚠️ Invalid JSON string in Redis cache, clearing and fetching from DB');
          await redis.del(CACHE_KEY);
        }
      } else {
        // Already a parsed object/array – just return it
        console.log('✅ Products fetched from Redis cache (already parsed)');
        return cached;
      }
    }

    // If not in cache or cache is invalid, fetch from MongoDB
    console.log('📦 Fetching products from database...');
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Store in Redis with NO TTL (permanent cache)
    try {
      await redis.set(CACHE_KEY, JSON.stringify(products));
      console.log('💾 Products cached in Redis (no TTL)');
    } catch (cacheError) {
      console.warn('⚠️ Failed to cache products in Redis:', cacheError);
      // Continue even if caching fails
    }

    return products;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    // Fallback to database if Redis fails
    try {
      const products = await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return products;
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      throw new Error('Failed to fetch products');
    }
  }
}

// Function to invalidate cache (useful when products are updated)
export async function invalidateProductsCache() {
  try {
    await redis.del(CACHE_KEY);
    console.log('🗑️ Products cache invalidated');
  } catch (error) {
    console.error('❌ Error invalidating cache:', error);
  }
}
