import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RouteParams } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, context: RouteParams) {
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

    const comment = await prisma.comments.findUnique({
      where: { id: parsedId },
      include: {
        replies: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
  } catch (error: unknown) {
    console.error("GET /api/comments/[id] error:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("connect") ||
        error.message.includes("timeout")
      ) {
        return NextResponse.json(
          { error: "Database connection failed" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteParams) {
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

    const body = await req.json();
    const { isAccepted } = body;

    if (typeof isAccepted !== "boolean") {
      return NextResponse.json(
        { error: "`isAccepted` must be boolean" },
        { status: 400 }
      );
    }

    const updatedComment = await prisma.comments.update({
      where: { id: parsedId },
      data: { isAccepted },
    });

    return NextResponse.json(updatedComment);
  } catch (error: unknown) {
    console.error("PATCH /api/comments/[id] error:", error);

    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

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

    const existingComment = await prisma.comments.findUnique({
      where: { id: parsedId },
    });

    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    await prisma.comments.deleteMany({ where: { parentId: parsedId } });
    await prisma.comments.delete({ where: { id: parsedId } });

    return NextResponse.json({ message: "Comment deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/comments/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
