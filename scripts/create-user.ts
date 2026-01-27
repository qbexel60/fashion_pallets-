import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function createUser() {
  // Get name and password from command line arguments or use defaults
  const name = process.argv[2] || 'alvy';
  const password = process.argv[3] || 'alvy357911';

  try {
    console.log('Creating user...');
    
    const user = await prisma.user.create({
      data: {
        name,
        password, // In production, hash this password before storing
      },
    });

    console.log('✅ User created successfully!');
    console.log('User ID:', user.id);
    console.log('Name:', user.name);
    console.log('Password:', user.password);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
