import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");

  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        imageUrl: true,
        ...(fields !== "basic" && { content: true }),
        _count: {
          select: {
            comments: {
              where: {
                isAccepted: true,
                parentId: null,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(posts);
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
  const body = await req.json();
  const { title, content, imageUrl } = body;

  if (!title || !content) {
    return new NextResponse(
      JSON.stringify({ error: "Titlul și conținutul sunt obligatorii." }),
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

  try {
    const newPost = await prisma.posts.create({
      data: {
        title,
        slug,
        content,
        imageUrl: imageUrl || null,
      },
    });

    return new NextResponse(JSON.stringify(newPost), { status: 201 });
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
