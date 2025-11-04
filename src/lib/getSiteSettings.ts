import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return settings || { blogMode: false };
  } catch (error) {
    console.error("Eroare la getSiteSettings:", error);
    return { blogMode: false };
  }
}
