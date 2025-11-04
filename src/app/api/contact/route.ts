import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: 1 },
    });

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });
  }
  try {
    const body = await req.json();

    const { phone, email, address, mapEmbed } =
      body as Partial<Prisma.ContactUpdateInput>;

    const updatedContact = await prisma.contact.update({
      where: { id: 1 },
      data: {
        ...(phone && { phone }),
        ...(email && { email }),
        ...(address && { address }),
        ...(mapEmbed !== undefined && { mapEmbed }),
      },
    });

    return NextResponse.json({ success: true, contact: updatedContact });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
