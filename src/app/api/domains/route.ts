import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Domain } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");

  try {
    const domain = await prisma.legal_domain.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        icon: true,
        description: true,
        blogOnlyDescription: true,
        createdAt: true,
        updatedAt: true,
        ...(fields !== "basic" && { content: true }),
        detailedDescription: true,
        imagePath: true,
        services: true,
      },
    });

    return NextResponse.json(domain);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });
  }
  const body: Domain = await req.json();
  const {
    title,
    description,
    icon,
    detailedDescription,
    imagePath,

    services,
  } = body;

  if (!title?.trim() || !description?.trim() || !icon?.trim()) {
    return NextResponse.json(
      { error: "Titlul, descrierea și icon sunt obligatorii." },
      { status: 400 }
    );
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-") // spații -> cratime
      .replace(/[^\w\-]+/g, "") // elimină caractere nepermise
      .replace(/\-\-+/g, "-") // cratime multiple -> una singură
      .replace(/^-+/, "") // elimină cratime de la început
      .replace(/-+$/, ""); // elimină cratime de la sfârșit
  }

  const slug = generateSlug(title);

  const optional = <T>(val: T | undefined): T | null => val ?? null;

  try {
    const newDomain = await prisma.legal_domain.create({
      data: {
        title,
        slug,
        description,
        icon,
        detailedDescription: optional(detailedDescription),
        imagePath: optional(imagePath),
        services: services ?? [],
      },
    });

    return new NextResponse(JSON.stringify(newDomain), { status: 201 });
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
