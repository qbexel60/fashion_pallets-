# ISR (Incremental Static Regeneration) Setup ✅

## What's Configured

Both product pages now use **ISR with 1-hour revalidation**:

1. **`/products/pre-order`** - Pre-order products page
2. **`/products/stock`** - Stock products page

## How It Works

### ISR Configuration
```tsx
export const revalidate = 3600; // Revalidate every 1 hour (3600 seconds)
```

### Caching Strategy (3 Layers)

1. **CDN/Edge Cache** (ISR)
   - Pages are statically generated
   - Revalidated every 1 hour
   - Served instantly from CDN

2. **Redis Cache** (Application Level)
   - Products cached in Redis (no TTL)
   - Instant retrieval on cache hit
   - Falls back to MongoDB on cache miss

3. **MongoDB** (Source of Truth)
   - Only queried when Redis cache is empty
   - Results stored in Redis for future requests

## Performance Flow

```
User Request
    ↓
CDN/Edge (ISR) → Instant (if within 1 hour)
    ↓ (if stale)
Next.js Server
    ↓
Redis Cache → Instant (if cached)
    ↓ (if miss)
MongoDB → Fetch & Cache
    ↓
Return to User + Cache in Redis
```

## Product Filtering

**Pre-Order Page:**
- Filters products where `type` contains "pre-order" or "preorder"

**Stock Page:**
- Filters products where `type` contains "stock" OR excludes pre-order types

**Adjust the filter logic in:**
- `src/app/products/pre-order/page.tsx` (line ~18-21)
- `src/app/products/stock/page.tsx` (line ~18-22)

## Customization

### Change Revalidation Time
```tsx
export const revalidate = 7200; // 2 hours
export const revalidate = 1800; // 30 minutes
```

### Force Revalidation
- Delete Redis cache: Use `invalidateProductsCache()` function
- Or manually delete the `all_products` key in Redis

### Product Display
- Grid layout: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Image size: `h-48` (192px)
- Hover effects: Scale and image zoom

## Benefits

✅ **Fast**: Pages served from CDN edge locations  
✅ **Fresh**: Auto-updates every hour  
✅ **Scalable**: Handles 500k+ visitors/month  
✅ **Cost-effective**: Minimal database queries  
✅ **Resilient**: Falls back to DB if Redis fails

## Next Steps

1. **Test the pages**: Visit `/products/pre-order` and `/products/stock`
2. **Adjust filters**: Update the `type` filtering logic to match your data
3. **Customize UI**: Modify the product card design as needed
4. **Monitor**: Check Redis cache hits/misses in your Upstash dashboard
