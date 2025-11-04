import FaqWrapper from "@/components/custom/faqs/FaqWrapper";
import { RouteSlugParams } from "@/lib/types";
import { getFaqBySlug } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: RouteSlugParams): Promise<Metadata> {
  const { slug } = await params;
  const faq = await getFaqBySlug(slug);

  if (!faq || !faq.isPublished) {
    return {
      title: "FAQ negăsit",
      description:
        "Întrebarea pe care o cauți nu există sau nu este publicată.",
    };
  }

  return {
    title: `${faq.question} | Întrebări frecvente`,
    description: faq.text?.slice(0, 150) ?? "Răspuns la o întrebare frecventă.",
    openGraph: {
      title: faq.question,
      description: faq.text ?? "",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/intrebari-frecvente/${faq.slug}`,
      images: [
        {
          url: "/images/intrebareFaq.jpg",
          width: 800,
          height: 600,
          alt: faq.question,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: faq.question,
      description: faq.text ?? "",
      images: ["/images/intrebareFaq.jpg"],
    },
  };
}

export default async function Page({ params }: RouteSlugParams) {
  const { slug } = await params;
  const faq = await getFaqBySlug(slug);

  if (!faq || !faq.isPublished) redirect("/");

  return <FaqWrapper faq={faq} />;
}
