import { prisma } from "@/lib/prisma";
import type { Domain, Faq } from "@/lib/types";

export async function getDomainSSR(slug: string): Promise<Domain | null> {
  try {
    const rawDomain = await prisma.legal_domain.findUnique({
      where: { slug },
      include: { faqs: true },
    });

    if (!rawDomain) return null;

    const cleanedFaqs: Faq[] = rawDomain.faqs.map(
      (faq): Faq => ({
        ...faq,
        slug: faq.slug ?? undefined,
        author: faq.author ?? undefined,
        email: faq.email ?? undefined,
        html: faq.html ?? undefined,
        text: faq.text ?? undefined,
        domainId: faq.domainId ?? undefined,
        createdAt: faq.createdAt.toISOString(),
        updatedAt: faq.updatedAt.toISOString(),
      })
    );

    const domain: Domain = {
      ...rawDomain,
      faqs: cleanedFaqs,
      services: rawDomain.services ?? [],
      blogOnlyDescription: rawDomain.blogOnlyDescription ?? undefined,
      blogOnlyDetailedDescription:
        rawDomain.blogOnlyDetailedDescription ?? undefined,
      imagePath: rawDomain.imagePath ?? undefined,
      faqImage: rawDomain.faqImage ?? undefined,
      detailedDescription: rawDomain.detailedDescription ?? undefined,
    };

    return domain;
  } catch (err) {
    console.error("❌ Error fetching domain SSR:", err);
    return null;
  }
}
