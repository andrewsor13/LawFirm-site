import { createClient } from "@supabase/supabase-js";
import { prisma } from "./prisma";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function sanitizeFileName(name: string) {
  return name
    .normalize("NFD") // separă diacriticele
    .replace(/[\u0300-\u036f]/g, "") // elimină diacriticele
    .replace(/\s+/g, "_") // spații -> _
    .replace(/[^a-zA-Z0-9._-]/g, ""); // elimină caractere interzise
}

export async function uploadFile(file: File, id: number) {
  const safeName = sanitizeFileName(file.name);
  const filePath = `clients/${id}/${safeName}`;

  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, blob, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return { success: false, error };
  }

  const publicUrl = supabase.storage.from("documents").getPublicUrl(filePath)
    .data.publicUrl;

  await prisma.documents.create({
    data: {
      fileName: file.name,
      fileLink: publicUrl,
      clientId: id,
    },
  });

  return { success: true, data };
}

export async function uploadImageLawyer(file: File, lawyerId: number) {
  const safeName = file.name.replace(/\s+/g, "_");
  const filePath = `lawyers/${lawyerId}/${safeName}`;

  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(filePath, blob, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return { success: false, error };
  }

  const { data } = supabaseAdmin.storage.from("images").getPublicUrl(filePath);

  return { success: true, url: data.publicUrl, fileName: safeName };
}

export async function deleteImageLawyer(filePath: string) {
  if (!filePath) return;

  try {
    console.log("Șterg din bucket:", filePath);

    const { error } = await supabaseAdmin.storage
      .from("images")
      .remove([filePath]);

    if (error) {
      console.error("Eroare la ștergere imagine:", error.message);
    } else {
      console.log("✅ Imagine ștearsă cu succes!");
    }
  } catch (err) {
    console.error("Eroare la deleteImageLawyer:", err);
  }
}

export async function uploadSiteImage(file: File, folderName: string) {
  const safeName = file.name.replace(/\s+/g, "_");
  const filePath = `siteImages/${folderName}/${safeName}`;

  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(filePath, blob, { upsert: true });

  if (error) {
    console.error("Upload error:", error);
    return { success: false, error };
  }

  const { data } = supabaseAdmin.storage.from("images").getPublicUrl(filePath);

  return { success: true, url: data.publicUrl };
}
