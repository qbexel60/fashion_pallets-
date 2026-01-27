# Products Setup Guide

## ✅ Files Created

1. **`src/lib/redis.ts`** - Upstash Redis client
2. **`src/lib/products.ts`** - `getProducts()` function with Redis caching
3. **`src/app/products/actions.ts`** - Server action `fetchProducts()`

## 🚀 Setup Steps

### 1. Generate Prisma Client
```bash
npx prisma generate
```

### 2. Add Environment Variables
Add to your `.env` file:
```env
DATABASE_URL="your_mongodb_connection_string"
UPSTASH_REDIS_REST_URL="your_upstash_redis_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
```

### 3. How It Works

**`getProducts()` function:**
- ✅ First tries to get products from Redis cache
- ✅ If not found, fetches from MongoDB
- ✅ Stores in Redis with **NO TTL** (permanent cache)
- ✅ Falls back to database if Redis fails

**Cache Invalidation:**
- Use `invalidateProductsCache()` when products are updated/added/deleted
- This clears the Redis cache so next fetch gets fresh data

## 📝 Usage Examples

### Option 1: Server Component (Recommended for ISR)
```tsx
import { getProducts } from '@/lib/products';

export const revalidate = 3600; // ISR: rebuild every 1 hour

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Option 2: Server Action (Client Component)
```tsx
'use client';
import { fetchProducts } from '@/app/products/actions';
import { useEffect, useState } from 'react';

export default function ProductsClient() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then((result) => {
      if (result.success) {
        setProducts(result.data);
      }
    });
  }, []);
  
  return <div>...</div>;
}
```

## 🔄 Cache Management

**To invalidate cache (when products change):**
```ts
import { invalidateProductsCache } from '@/lib/products';

// After creating/updating/deleting a product
await invalidateProductsCache();
```

## 🎯 Performance

- **First load**: Fetches from MongoDB, caches in Redis
- **Subsequent loads**: Instant from Redis (no DB query)
- **Cache**: Permanent (no TTL) - manually invalidate when needed
- **ISR**: Use `revalidate` in page for CDN caching

## 📦 Product Model Fields

Based on your schema:
- `id` - String (ObjectId)
- `name` - String
- `description` - String
- `variants` - Json
- `imglink` - String
- `quantity` - Int
- `price` - Float
- `offerPrice` - Float? (optional)
- `type` - String
- `deliveryTime` - String
- `createdAt` - DateTime
- `updatedAt` - DateTime
