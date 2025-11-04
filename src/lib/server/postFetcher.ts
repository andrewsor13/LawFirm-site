import { prisma } from "@/lib/prisma";
import type { Posts, Comment } from "@/lib/types";
import type { posts, comments } from "@prisma/client";

type RawPost = posts & {
  comments?: comments[];
  _count?: { comments: number };
};

function normalizePost(rawPost: RawPost): Posts {
  const normalizedComments: Comment[] | undefined = rawPost.comments
    ? rawPost.comments.map((c) => ({
        id: c.id,
        name: c.name,
        content: c.content,
        isAccepted: c.isAccepted,
        postId: c.postId,
        createdAt:
          c.createdAt instanceof Date
            ? c.createdAt.toISOString()
            : (c.createdAt as string),
        replies: [],
      }))
    : undefined;

  return {
    id: rawPost.id,
    title: rawPost.title,
    slug: rawPost.slug,
    content: rawPost.content ?? "",
    imageUrl: rawPost.imageUrl ?? undefined,
    createdAt:
      rawPost.createdAt instanceof Date
        ? rawPost.createdAt.toISOString()
        : (rawPost.createdAt as string),
    _count: {
      comments:
        rawPost._count?.comments ??
        (normalizedComments
          ? normalizedComments.filter((c) => c.isAccepted).length
          : 0),
    },
  };
}

export async function getPostSSR(slug: string): Promise<Posts | null> {
  try {
    const rawPost = await prisma.posts.findUnique({
      where: { slug },
      include: {
        comments: {
          where: { isAccepted: true, parentId: null },
          include: { replies: true },
        },
      },
    });

    if (!rawPost) return null;

    return normalizePost(rawPost);
  } catch (err) {
    console.error("❌ Error fetching post:", err);
    return null;
  }
}

export async function getPostsSSR(
  fields: "basic" | "full" = "basic"
): Promise<Posts[]> {
  try {
    const rawPosts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        imageUrl: true,
        ...(fields === "full" && { content: true }),
        _count: {
          select: {
            comments: {
              where: { isAccepted: true, parentId: null },
            },
          },
        },
      },
    });

    return rawPosts.map((p) => normalizePost(p as RawPost));
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    return [];
  }
}
