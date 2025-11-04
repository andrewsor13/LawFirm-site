import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostSSR } from "@/lib/server/postFetcher";
import Article from "@/components/custom/article/Article";
import { RouteSlugParams } from "@/lib/types";

export async function generateMetadata({
  params,
}: RouteSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostSSR(slug);

  if (!article) {
    return {
      title: "Articol inexistent",
      description: "Acest articol nu a fost găsit.",
    };
  }

  const plainText = article.content
    ? article.content.replace(/<[^>]+>/g, "").slice(0, 160)
    : "";

  return {
    title: article.title,
    description: plainText || "Citește articolul complet pe site-ul nostru.",
    openGraph: {
      title: article.title,
      description: plainText,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
      images: [
        {
          url: article.imageUrl || "/images/intrebareFaq.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticleDetails({ params }: RouteSlugParams) {
  const { slug } = await params;
  const article = await getPostSSR(slug);

  if (!article) notFound();

  return <Article article={article} />;
}
