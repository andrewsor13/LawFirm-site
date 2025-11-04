import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  const isAccepted = req.nextUrl.searchParams.get("isAccepted");

  try {
    const whereClause: Prisma.commentsWhereInput = {
      parentId: null,
    };

    if (postId) {
      whereClause.postId = parseInt(postId);
    }

    if (isAccepted != null) {
      whereClause.isAccepted = isAccepted === "true";
    }

    const comments = await prisma.comments.findMany({
      where: whereClause,
      include: {
        replies: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, content, postId, parentId, isAccepted } = body;

  if (!name || !content || !postId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const newComment = await prisma.comments.create({
      data: {
        name,
        content,
        postId: parseInt(postId),
        isAccepted: isAccepted,
        parentId: parentId ? parseInt(parentId) : null,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
