import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: NextRequest, context: RouteParams) {
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

    if (!prisma) {
      return NextResponse.json(
        { error: "Database not available" },
        { status: 503 }
      );
    }
    await prisma.admin_users.delete({ where: { id: parsedId } });
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE /api/admin-account error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteParams) {
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
    const { name, oldPassword, newPassword } = body;

    const dataToUpdate: { name?: string; password?: string } = {};

    if (name) {
      if (typeof name !== "string" || name.length < 3) {
        return NextResponse.json({ error: "Nume invalid" }, { status: 400 });
      }
      dataToUpdate.name = name;
    }

    if (oldPassword && newPassword) {
      const user = await prisma.admin_users.findUnique({
        where: { id: parsedId },
      });
      if (!user) {
        return NextResponse.json(
          { error: "Utilizator inexistent" },
          { status: 404 }
        );
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Parola veche incorectă" },
          { status: 401 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      dataToUpdate.password = hashedPassword;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "Nimic de actualizat" },
        { status: 400 }
      );
    }

    const updatedAccount = await prisma.admin_users.update({
      where: { id: parsedId },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error("PATCH /api/admin-accounts/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
