import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteImageLawyer, uploadImageLawyer } from "@/lib/supabaseClient";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const lawyer = await prisma.about.findUnique({
    where: { id: Number(id) },
  });

  if (!lawyer) {
    return NextResponse.json(
      { success: false, error: "Lawyer not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(lawyer);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  if (session.user.role !== "admin")
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });

  try {
    const { id } = await params;
    const existingLawyer = await prisma.about.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLawyer) {
      return NextResponse.json(
        { success: false, error: "Avocatul nu a fost găsit" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("file") as File | null;
    const deleteImage = formData.get("deleteImage") as string | null;

    const updateData: Prisma.AboutUpdateInput = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    if (file?.name) {
      if (existingLawyer.photoName) {
        await deleteImageLawyer(
          `lawyers/${existingLawyer.id}/${existingLawyer.photoName}`
        );
      }

      const result = await uploadImageLawyer(file, existingLawyer.id);
      if (!result.success) {
        return NextResponse.json(result, { status: 500 });
      }

      updateData.photo = result.url;
      updateData.photoName = result.fileName;
    } else if (deleteImage === "true") {
      if (existingLawyer.photo && existingLawyer.photoName) {
        await deleteImageLawyer(
          `lawyers/${existingLawyer.id}/${existingLawyer.photoName}`
        );
      }
      updateData.photo = null;
      updateData.photoName = null;
    }

    const lawyer = await prisma.about.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json({ success: true, lawyer });
  } catch (err) {
    console.error("PATCH /api/about/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update lawyer" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  if (session.user.role !== "admin")
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });

  try {
    const { id } = await params;

    await prisma.about.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/about/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete lawyer" },
      { status: 500 }
    );
  }
}
