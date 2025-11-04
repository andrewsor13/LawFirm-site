import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: NextRequest, context: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });
  }
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }
    await prisma.clients.delete({ where: { id: parsedId } });
    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/clients/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { isReviewed } = body;

    if (typeof isReviewed !== "boolean") {
      return NextResponse.json(
        { error: "`isAccepted` must be boolean" },
        { status: 400 }
      );
    }

    const updateClient = await prisma.clients.update({
      where: { id: parsedId },
      data: { isReviewed },
    });

    return NextResponse.json(updateClient);
  } catch (error) {
    console.error("PATCH /api/clients/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
