import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Faq } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getFaq(id: string): Promise<Faq | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/faq/id/${id}`,
    { cache: "no-store" }
  );
  return res.ok ? res.json() : null;
}

export async function getFaqBySlug(slug: string): Promise<Faq | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/faq/slug/${slug}`,
    { cache: "no-store" }
  );
  return res.ok ? res.json() : null;
}
