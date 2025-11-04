import FaqEdit from "@/components/custom/adminPanel/faq/FaqEdit";
import { getFaq } from "@/lib/utils";

export default async function FaqEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await getFaq(id);

  if (!faq) {
    return (
      <div className="p-10 text-center text-gray-400">
        Întrebarea nu a fost găsită.
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-h-screen p-6">
      <FaqEdit faq={faq} />
    </div>
  );
}
