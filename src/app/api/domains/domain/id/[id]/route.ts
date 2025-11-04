import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RouteParams } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

    const {
      title,
      description,
      detailedDescription,
      blogOnlyDescription,
      blogOnlyDetailedDescription,
      services,
      imagePath,
      icon,
    } = body;

    const updatedDomain = await prisma.legal_domain.update({
      where: { id: parsedId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(detailedDescription !== undefined && { detailedDescription }),
        ...(blogOnlyDescription !== undefined && { blogOnlyDescription }),
        ...(blogOnlyDetailedDescription !== undefined && {
          blogOnlyDetailedDescription,
        }),
        ...(services !== undefined && { services }),
        ...(imagePath !== undefined && { imagePath }),
        ...(icon !== undefined && { icon }),
      },
    });

    return NextResponse.json(updatedDomain);
  } catch (error: unknown) {
    console.error("PATCH /api/domains/id/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: RouteParams) {
  try {
    const { id } = await context.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.legal_domain.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ message: "Domain deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/domains/id/[id] error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
