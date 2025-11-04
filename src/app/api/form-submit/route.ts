import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { uploadFile } from "@/lib/supabaseClient";
import { prisma } from "@/lib/prisma";
import type { Attachment } from "nodemailer/lib/mailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
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

    const attachments: Attachment[] = [];

    const files = formData.getAll("files");
    for (const file of files) {
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();

        try {
          const result = await uploadFile(file, clientId);

          if (!result.success) {
            console.error("Upload failed:", result.error);
            throw new Error("Upload to storage failed");
          }
        } catch (error) {
          console.error("Failed to upload file:", error);
        }

        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
          contentType: file.type || "application/octet-stream",
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Formular Site" <NO REPLY><${process.env.SMTP_USER}>`,
      to: "ciobanca.andreisorin@gmail.com",
      subject: "Formular nou completat",
      text: `Nume: ${name}\nEmail: ${email}\nTelefon: ${phone}\nMesaj: ${message}`,
      attachments,
    });

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
