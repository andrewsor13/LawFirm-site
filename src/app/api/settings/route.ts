import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });

    return NextResponse.json(settings ?? { blogMode: false }, { status: 200 });
  } catch (error) {
    console.error("GET /api/settings failed:", error);
    return NextResponse.json({ blogMode: false }, { status: 200 });
  }
}

export async function PATCH(req: Request) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  if (session.user.role !== "admin")
    return NextResponse.json({ error: "Acces restricționat" }, { status: 403 });

  try {
    const { blogMode } = await req.json();

    if (typeof blogMode !== "boolean") {
      return NextResponse.json(
        { error: "`blogMode` trebuie să fie boolean" },
        { status: 400 }
      );
    }

    const updated = await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: { blogMode },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json(
      { error: "Eroare internă la actualizare setări" },
      { status: 500 }
    );
  }
}
