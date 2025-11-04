import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImageLawyer } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const lawyers = await prisma.about.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(lawyers);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;
    const photoName = formData.get("photoName") as string | null;

    if (!name || !description) {
      return NextResponse.json(
        { success: false, error: "Name and description are required" },
        { status: 400 }
      );
    }

    const lawyer = await prisma.about.create({
      data: {
        name,
        description,
        photo: "",
        photoName: photoName || null,
      },
    });

    if (file) {
      const result = await uploadImageLawyer(file, lawyer.id);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      await prisma.about.update({
        where: { id: lawyer.id },
        data: { photo: result.url },
      });

      lawyer.photo = result.url!;
    }

    return NextResponse.json({ success: true, lawyer }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to create lawyer" },
      { status: 500 }
    );
  }
}
