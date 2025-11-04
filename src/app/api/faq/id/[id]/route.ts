import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RouteParams } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: RouteParams) {
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const faq = await prisma.faq.findUnique({
      where: { id: parsedId },
    });

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: RouteParams) {
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

    const body = await req.json();

    const { author, email, question, text, html, domainId, isPublished } = body;

    const hasContent = Boolean(text?.trim() || html?.trim());

    const updatedFaq = await prisma.faq.update({
      where: { id: parsedId },
      data: {
        ...(author && { author }),
        ...(email && { email }),
        ...(question && { question }),
        ...(text && { text }),
        ...(html && { html }),
        ...(domainId !== undefined && { domainId }),
        isPublished: isPublished ?? hasContent,
      },
    });

    return NextResponse.json(updatedFaq);
  } catch (error: unknown) {
    console.error("PATCH /api/faq/id/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: RouteParams) {
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

    await prisma.faq.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/faq/id/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
