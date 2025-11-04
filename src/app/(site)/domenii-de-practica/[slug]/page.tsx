import { Metadata } from "next";
import DomainWrapper from "@/components/custom/domains/DomainWrapper";
import { getDomainSSR } from "@/lib/server/domainFetcher";
import { RouteSlugParams } from "@/lib/types";

export async function generateMetadata({
  params,
}: RouteSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const domain = await getDomainSSR(slug);

  if (!domain) {
    return {
      title: "Domeniu inexistent",
      description: "Domeniul nu a fost găsit.",
    };
  }

  const plainText =
    domain.detailedDescription?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    domain.description?.slice(0, 160) ||
    "Află mai multe despre acest domeniu de practică.";

  return {
    title: domain.title,
    description: plainText,
    openGraph: {
      title: domain.title,
      description: plainText,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/domenii-de-practica/${domain.slug}`,
      images: domain.imagePath
        ? [
            {
              url: domain.imagePath,
              width: 1200,
              height: 630,
              alt: domain.title,
            },
          ]
        : [
            {
              url: "/images/intrebareFaq.jpg",
              width: 1200,
              height: 630,
              alt: "Default domain image",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: domain.title,
      description: plainText,
      images: [domain.imagePath || "/images/intrebareFaq.jpg"],
    },
  };
}

export default async function DomainPage({ params }: RouteSlugParams) {
  const { slug } = await params;
  const domain = await getDomainSSR(slug);

  if (!domain) {
    return (
      <div className="text-center mt-20 text-lg text-gray-300">
        Domeniul nu a fost găsit.
      </div>
    );
  }

  return <DomainWrapper domain={domain} />;
}
