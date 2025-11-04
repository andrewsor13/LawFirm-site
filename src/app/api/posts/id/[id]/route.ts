import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RouteParams } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
    const { content, imageUrl, title } = body;

    const updatedPost = await prisma.posts.update({
      where: { id: parsedId },
      data: { content, imageUrl, title },
    });

    return NextResponse.json(updatedPost);
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

    const existingPost = await prisma.posts.findUnique({
      where: { id: parsedId },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.posts.delete({ where: { id: parsedId } });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/posts/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
