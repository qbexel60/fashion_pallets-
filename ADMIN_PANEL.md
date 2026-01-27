# Admin Panel Guide

## 🎯 Features

✅ **Authentication System**
- Secure login with username/password
- Session management with cookies
- Protected routes

✅ **Dashboard**
- Overview statistics (Total, Pre-Order, Stock products)
- Quick action buttons

✅ **Product Management**
- View all products in a table
- Create new products
- Edit existing products
- Delete products
- Automatic cache invalidation

## 🚀 Access Admin Panel

1. **Navigate to:** `/admin/login`
2. **Login with credentials** from your User table in database
3. **Default credentials** (if you ran `npm run create-user`):
   - Username: `alvy`
   - Password: `alvy357911`

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── dashboard/page.tsx      # Dashboard with stats
│   │   └── products/
│   │       ├── page.tsx            # Products list
│   │       ├── new/page.tsx         # Create product
│   │       └── [id]/edit/page.tsx  # Edit product
│   └── api/
│       └── admin/
│           ├── login/route.ts      # Login API
│           ├── logout/route.ts      # Logout API
│           └── products/
│               ├── route.ts        # List & Create
│               └── [id]/route.ts   # Get, Update, Delete
├── components/
│   └── admin/
│       ├── ProductsTable.tsx       # Products table component
│       ├── ProductForm.tsx         # Create/Edit form
│       └── LogoutButton.tsx        # Logout button
└── lib/
    └── auth.ts                     # Authentication utilities
```

## 🔐 Authentication

**How it works:**
- Login creates a session cookie (`admin_session`)
- Protected pages check for valid session
- If no session, redirects to `/admin/login`
- Logout clears the session cookie

**Session Duration:** 7 days

## 📦 Product Management

### Create Product
1. Go to `/admin/products`
2. Click "Add New Product"
3. Fill in the form:
   - **Name** (required)
   - **Type**: Pre-Order or Stock
   - **Description** (required)
   - **Image URL** (required)
   - **Price** (required)
   - **Offer Price** (optional)
   - **Quantity** (required)
   - **Delivery Time** (required)
   - **Variants** (JSON format, optional)

### Edit Product
1. Go to `/admin/products`
2. Click "Edit" on any product
3. Modify fields and save

### Delete Product
1. Go to `/admin/products`
2. Click "Delete" on any product
3. Confirm deletion

**Note:** All product changes automatically invalidate the Redis cache, so the public site will show fresh data on next ISR revalidation.

## 🎨 UI Features

- **Modern Design**: Glassmorphism with gradient backgrounds
- **Responsive**: Works on mobile and desktop
- **Real-time Updates**: Changes reflect immediately
- **Error Handling**: User-friendly error messages

## 🔒 Security Notes

⚠️ **Current Implementation:**
- Passwords are stored in plain text (for development)
- Session uses simple cookie check

**For Production:**
- Hash passwords with bcrypt
- Use JWT tokens or proper session management
- Add rate limiting
- Add CSRF protection
- Use environment variables for secrets

## 🛠️ API Endpoints

### Authentication
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get single product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

All product endpoints require authentication.

## 📝 Example Variants JSON

```json
{
  "color": ["Black", "Red", "Blue"],
  "size": ["S", "M", "L", "XL"],
  "material": "Leather"
}
```

## 🚨 Troubleshooting

**Can't login?**
- Check if user exists in database
- Verify username and password match
- Check browser console for errors

**Products not showing?**
- Check if products exist in database
- Verify product type matches filter (pre-order/stock)
- Check Redis connection

**Cache not updating?**
- Products API automatically invalidates cache
- Wait for ISR revalidation (24 hours) or manually clear Redis
