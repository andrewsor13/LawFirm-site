"use client";

import { useParams, redirect } from "next/navigation";
import ContactEditForm from "@/components/custom/adminPanel/pages/ContactEditForm";

export default function EditPage() {
  const { slug } = useParams<{ slug: string }>();

  if (slug === "despre") {
    redirect("/admin/pages/about");
  }

  if (slug === "contact") {
    return <ContactEditForm />;
  }

  return <p>Pagina {slug} nu are editor configurat.</p>;
}
