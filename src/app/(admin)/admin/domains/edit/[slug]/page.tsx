import { getDomain } from "@/app/(site)/blog/[slug]/utils";
import DomainEditorWrapper from "@/components/custom/adminPanel/domains/DomainEditor/DomainEditorWrapper";
import { RouteSlugParams } from "@/lib/types";

export default async function DomainEditPage({ params }: RouteSlugParams) {
  const { slug } = await params;
  const domain = await getDomain(slug);

  if (!domain) {
    return (
      <div className="p-10 text-center text-gray-400">
        Domeniul nu a fost găsit.
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-h-screen p-6">
      <DomainEditorWrapper domain={domain} iconSize={80} />
    </div>
  );
}
