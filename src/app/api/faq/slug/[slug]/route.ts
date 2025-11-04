import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.pathname.split("/").pop();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const faq = await prisma.faq.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });

    if (!faq) {
      return NextResponse.json(
        { error: "FAQ-ul nu a fost găsit sau nu este publicat" },
        { status: 404 }
      );
    }

    return NextResponse.json(faq);
  } catch (error) {
    console.error("Error in GET /api/faq/[slug]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
