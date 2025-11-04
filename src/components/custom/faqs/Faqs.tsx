"use client";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Faq } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Faqs() {
  const [faqsData, setFaqsData] = useState<Faq[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDomains = async () => {
      try {
        const res = await fetch("/api/faq?published=true", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Fetch error", await res.text());
          return;
        }
        const data = await res.json();
        setFaqsData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDomains();
  }, []);

  const filteredFaqs =
    faqsData?.filter((faq) => {
      const searchLower = search.toLowerCase();
      return (
        faq.question.toLowerCase().includes(searchLower) ||
        faq.text?.toLowerCase().includes(searchLower)
      );
    }) ?? [];

  return (
    <div className="flex flex-col gap-10 justify-center p-4 items-center">
      <h1>Întrebări frecvente</h1>
      <Input
        placeholder="Caută..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="max-w-sm"
      />
      {isLoading ? (
        <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:max-w-5xl items-stretch">
          {filteredFaqs?.map((faq) => {
            return (
              <Link key={faq.id} href={`/intrebari-frecvente/${faq.slug}`}>
                <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col gap-5 h-full hover:cursor-pointer hover:shadow-white hover:-translate-y-0.5 ease-in-out transition-all duration-200">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed prose prose-sm max-w-none">
                    {faq.text?.substring(0, 250)}...
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
