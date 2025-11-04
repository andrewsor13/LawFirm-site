import { prisma } from "@/lib/prisma";
import type { Lawyer } from "@/lib/types";

export async function getAboutAll(): Promise<Lawyer[]> {
  try {
    const lawyers = await prisma.about.findMany({
      orderBy: { id: "asc" },
    });

    return lawyers.map((lawyer) => ({
      ...lawyer,
      photo: lawyer.photo ?? null,
      photoName: lawyer.photoName ?? null,
      createdAt: lawyer.createdAt,
      updatedAt: lawyer.updatedAt,
    }));
  } catch (err) {
    console.error("❌ Eroare la getAboutAll:", err);
    return [];
  }
}

export async function getAboutById(id: number): Promise<Lawyer | null> {
  try {
    const lawyer = await prisma.about.findUnique({ where: { id } });
    if (!lawyer) return null;

    return {
      ...lawyer,
      photo: lawyer.photo ?? null,
      photoName: lawyer.photoName ?? null,
      createdAt: lawyer.createdAt,
      updatedAt: lawyer.updatedAt,
    };
  } catch (err) {
    console.error("❌ Eroare la getAboutById:", err);
    return null;
  }
}
