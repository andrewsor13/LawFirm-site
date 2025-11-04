import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedParam = searchParams.get("published");

    const where =
      publishedParam === "true"
        ? { isPublished: true }
        : publishedParam === "false"
        ? { isPublished: false }
        : {};

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("GET /api/faq error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { author, email, question, html, text, domainId } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(question, { lower: true, strict: true });

    const existingSlug = await prisma.faq.findUnique({
      where: { slug: baseSlug },
    });
    if (existingSlug) {
      return NextResponse.json(
        { error: "A FAQ with a similar question already exists" },
        { status: 400 }
      );
    }

    const existingQuestion = await prisma.faq.findFirst({
      where: { question },
    });
    if (existingQuestion) {
      return NextResponse.json(
        { error: "This question already exists" },
        { status: 400 }
      );
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        slug: baseSlug,
        html: html || null,
        text: text || "",
        author: author || null,
        email: email || null,
        ...(domainId ? { domain: { connect: { id: domainId } } } : {}),
        isPublished: Boolean(html?.trim() || text?.trim()),
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error: unknown) {
    console.error("POST /api/faq error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
