import AddFaqForm from "@/components/custom/faqs/AddFaqForm";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen  flex items-center justify-center bg-[#f8f5f2] p-6">
      <div className="mt-24 lg:mt-30">
        <AddFaqForm />
      </div>
    </main>
  );
}
