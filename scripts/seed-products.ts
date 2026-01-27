import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function seedProducts() {
  try {
    console.log('🌱 Seeding products...');

    // Pre-Order Products
    const preOrderProducts = [
      {
        name: 'Designer Handbag - Pre-Order',
        description: 'Luxurious designer handbag with premium leather. Available for pre-order.',
        variants: { color: ['Black', 'Brown', 'Red'], size: 'One Size' },
        imglink: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500',
        quantity: 50,
        price: 299.99,
        offerPrice: 249.99,
        type: 'pre-order',
        deliveryTime: '2-3 weeks',
      },
      {
        name: 'Fashion Watch - Pre-Order',
        description: 'Elegant fashion watch with stainless steel band. Pre-order now!',
        variants: { color: ['Silver', 'Gold', 'Rose Gold'], material: 'Stainless Steel' },
        imglink: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        quantity: 30,
        price: 199.99,
        offerPrice: 179.99,
        type: 'pre-order',
        deliveryTime: '3-4 weeks',
      },
      {
        name: 'Designer Shoes - Pre-Order',
        description: 'Comfortable and stylish designer shoes. Pre-order available.',
        variants: { color: ['Black', 'White', 'Beige'], size: ['36', '37', '38', '39', '40'] },
        imglink: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
        quantity: 40,
        price: 149.99,
        type: 'pre-order',
        deliveryTime: '2-3 weeks',
      },
    ];

    // Stock Products
    const stockProducts = [
      {
        name: 'Trendy Tote Bag - In Stock',
        description: 'Stylish tote bag perfect for everyday use. Available now!',
        variants: { color: ['Black', 'Navy', 'Gray'], material: 'Canvas' },
        imglink: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
        quantity: 25,
        price: 79.99,
        offerPrice: 69.99,
        type: 'stock',
        deliveryTime: '3-5 days',
      },
      {
        name: 'Classic Leather Watch - In Stock',
        description: 'Classic leather watch with modern design. Ready to ship!',
        variants: { color: ['Brown', 'Black'], strap: 'Leather' },
        imglink: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
        quantity: 15,
        price: 129.99,
        type: 'stock',
        deliveryTime: '2-3 days',
      },
      {
        name: 'Comfortable Sneakers - In Stock',
        description: 'Comfortable sneakers for daily wear. Available in multiple sizes.',
        variants: { color: ['White', 'Black', 'Gray'], size: ['36', '37', '38', '39', '40', '41'] },
        imglink: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        quantity: 35,
        price: 89.99,
        offerPrice: 79.99,
        type: 'stock',
        deliveryTime: '3-5 days',
      },
      {
        name: 'Elegant Clutch Bag - In Stock',
        description: 'Elegant clutch bag perfect for evening events. In stock now!',
        variants: { color: ['Gold', 'Silver', 'Black'], material: 'Synthetic Leather' },
        imglink: 'https://images.unsplash.com/photo-1564422170191-4bd349a83b77?w=500',
        quantity: 20,
        price: 59.99,
        type: 'stock',
        deliveryTime: '2-3 days',
      },
    ];

    // Create Pre-Order Products
    console.log('\n📦 Creating pre-order products...');
    for (const product of preOrderProducts) {
      const created = await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created pre-order product: ${created.name} (ID: ${created.id})`);
    }

    // Create Stock Products
    console.log('\n📦 Creating stock products...');
    for (const product of stockProducts) {
      const created = await prisma.product.create({
        data: product,
      });
      console.log(`✅ Created stock product: ${created.name} (ID: ${created.id})`);
    }

    console.log('\n🎉 All products seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Pre-Order Products: ${preOrderProducts.length}`);
    console.log(`   - Stock Products: ${stockProducts.length}`);
    console.log(`   - Total Products: ${preOrderProducts.length + stockProducts.length}`);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
