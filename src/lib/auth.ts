import { cookies } from 'next/headers';
import prisma from './prisma';

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('admin_session')?.value;

  if (!sessionId) {
    return null;
  }

  // In a real app, you'd verify the session in a sessions table
  // For simplicity, we'll just check if the cookie exists
  return sessionId === 'authenticated' ? { id: 'admin', name: 'Admin' } : null;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function verifyAdminCredentials(name: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { name },
    });

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
}
