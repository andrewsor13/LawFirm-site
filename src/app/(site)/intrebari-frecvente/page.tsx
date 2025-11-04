import Faqs from "@/components/custom/faqs/Faqs";
import React from "react";

export default async function page() {
  return (
    <div className="py-25 bg-gradient-to-br from-[var(--body-background)] via-[#2c2c2c] to-[var(--color-accent)]/20">
      <Faqs />
    </div>
  );
}
