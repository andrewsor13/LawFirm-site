import { Domain } from "@/lib/types";

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  isAccepted: boolean;
  name: string;
  content: string;
  postId: number;
  createdAt: string;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export async function getPost(slug: string): Promise<PostWithComments | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/slug/${slug}`,
    { cache: "no-store" }
  );
  return res.ok ? res.json() : null;
}

export async function getDomain(slug: string): Promise<Domain | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/domains/domain/slug/${slug}`,
    { cache: "no-store" }
  );
  return res.ok ? res.json() : null;
}
