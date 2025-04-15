import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { name, amount } = body;

  try {
    const newGoal = await prisma.goal.create({
      data: {
        name,
        amount,
        current: 0, // initialize progress
      },
    });

    return new Response(JSON.stringify(newGoal), {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE GOAL ERROR:", error);
    return new Response(JSON.stringify({ error: 'Failed to create goal' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(goals), {
      status: 200,
    });
  } catch (error) {
    console.error("FETCH GOALS ERROR:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch goals' }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing ID' }), {
      status: 400,
    });
  }

  try {
    await prisma.goal.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("DELETE GOAL ERROR:", error);
    return new Response(JSON.stringify({ error: 'Failed to delete goal' }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  const { id, progress } = await req.json();

  try {
    const updated = await prisma.goal.update({
      where: { id: parseInt(id) },
      data: {
        current: {
          increment: parseFloat(progress),
        },
      },
    });

    return new Response(JSON.stringify(updated), {
      status: 200,
    });
  } catch (error) {
    console.error("PATCH GOAL ERROR:", error);
    return new Response(JSON.stringify({ error: 'Failed to update goal' }), {
      status: 500,
    });
  }
}
