import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), {
      status: 400,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: { email, password },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
}
