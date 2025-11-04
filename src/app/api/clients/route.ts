import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const accounts = await prisma.clients.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      documents: true,
    },
  });

  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    const client = await prisma.clients.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        message: message,
      },
    });
    const clientId = client.id;

    const files = formData.getAll("files");
    for (const file of files) {
      if (file instanceof File) {
        try {
          const result = await uploadFile(file, clientId);

          if (!result.success) {
            console.error("Upload failed:", result.error);
            throw new Error("Upload to storage failed");
          }
        } catch (error) {
          console.error("Failed to upload file:", error);
        }
      }
    }

    return NextResponse.json({ success: true });
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
