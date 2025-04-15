import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const reminders = await prisma.reminder.findMany({
      orderBy: { dueDate: 'asc' },
    });
    return new Response(JSON.stringify(reminders), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch reminders' }), { status: 500 });
  }
}

export async function POST(req) {
    const body = await req.json();
    const { text, dueDate } = body;
  
    try {
      const newReminder = await prisma.reminder.create({
        data: {
          text,
          dueDate: new Date(dueDate),
        },
      });
      return new Response(JSON.stringify(newReminder), { status: 201 });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to create reminder' }), { status: 500 });
    }
  }
  

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing reminder ID' }), { status: 400 });
  }

  try {
    await prisma.reminder.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete reminder' }), { status: 500 });
  }
}

export async function PATCH(req) {
  const body = await req.json();
  const { id, completed } = body;

  try {
    const updated = await prisma.reminder.update({
      where: { id },
      data: { completed },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update reminder' }), { status: 500 });
  }
}
