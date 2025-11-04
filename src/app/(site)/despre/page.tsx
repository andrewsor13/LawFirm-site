import React from "react";
import { getAboutAll } from "@/lib/server/aboutFetcher";
import AboutWrapper from "@/components/custom/about/AboutWrapper";

export default async function Despre() {
  const data = await getAboutAll();

  if (!data || data.length === 0)
    return <div>Pagina nu a fost găsită sau nu există date disponibile.</div>;

  return <AboutWrapper data={data} />;
}
