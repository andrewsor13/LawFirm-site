"use client";
import { Faq } from "@/lib/types";
import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import Image from "next/image";

type Props = {
  faq: Faq;
};

export default function FaqItem({ faq }: Props) {
  const renderSafeHTML = (html?: string | null, text?: string | null) => {
    if (typeof window === "undefined") {
      return parse(text ?? "");
    }

    const DOMPurifyer = DOMPurify(window);
    const clean = DOMPurifyer.sanitize(html ?? text ?? "");
    return parse(clean);
  };

  return (
    <div className="py-2 bg-gray-50">
      <div className="p-6 md:px-20 mt-20 rounded-xl max-w-[100rem] mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {faq.question}
        </h3>

        <div className="relative after:content-[''] after:block after:clear-both">
          <Image
            src="/images/intrebareFaq.jpg"
            alt="Imagine..."
            width={384}
            height={320}
            className="rounded-md shadow-md float-right ml-6 mb-4 object-cover max-h-80 md:max-h-96 md:float-right md:ml-6 w-full md:w-auto"
          />

          <div className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
            {renderSafeHTML(faq.html, faq.text)}
          </div>
        </div>
      </div>
    </div>
  );
}
