import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { description, amount, type } = body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount: parseFloat(amount),
        type,
      },
    });

    return new Response(JSON.stringify(newTransaction), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create transaction' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(transactions), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), {
      status: 500,
    });
  }
}
