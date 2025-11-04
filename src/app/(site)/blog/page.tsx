"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/custom/article/CardBox";
import Link from "next/link";
import Loader from "@/components/Loader";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

export default function Blog() {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          console.error("Fetch error", await res.text());
          return;
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center w-screen h-screen bg-[var(--body-background)]">
          <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />
        </div>
      ) : (
        <section className="py-35 w-full flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--body-background)] via-[#2c2c2c] to-[var(--color-accent)]/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--color-primary)/5_0%,_transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-text)/3_1px,transparent_0)] bg-[length:32px_32px]" />
          </div>

          <div className="text-center flex flex-col gap-8 items-center w-[calc(90%)] mb-16 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />

            <div className="relative">
              <h1 className="text-6xl lg:text-7xl font-serif font-bold text-[var(--color-text)] drop-shadow-2xl tracking-tight mb-4">
                Blog Juridic
              </h1>
              <div className="flex justify-center">
                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent rounded-full" />
              </div>
            </div>

            <p className="max-w-3xl text-xl text-[var(--color-text-secondary)] leading-relaxed font-light">
              Explorează articole juridice, sfaturi practice și noutăți din
              domeniu.{" "}
              <span className="text-[var(--color-primary)] font-medium">
                Informația corectă
              </span>{" "}
              te ajută să iei decizii mai bune.
            </p>
          </div>

          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-[var(--color-background)]/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/40 border border-[var(--color-container)]/30 p-8 sm:p-10 lg:p-12">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-8 w-1 bg-[var(--color-accent)] rounded-full" />
                  <h2 className="text-2xl font-serif font-bold text-[var(--color-text)]">
                    Articole
                  </h2>
                </div>
                <div className="text-[var(--color-text-secondary)] font-light">
                  {data.length}{" "}
                  {data.length === 1
                    ? "articol disponibil"
                    : "articole disponibile"}
                </div>
              </div>

              {data.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data?.map((article) => (
                    <Link
                      href={`/blog/${article.slug}`}
                      key={article.id}
                      className="w-full group"
                    >
                      <Card
                        title={article.title}
                        image={article.imageUrl}
                        description={article.content}
                        createdAt={article.createdAt}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-[var(--color-post-background)] backdrop-blur-sm rounded-2xl p-8 border border-[var(--color-container)]/40">
                    <div className="w-16 h-16 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-[var(--color-accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[var(--color-text)] mb-2">
                      Niciun articol disponibil
                    </h3>
                    <p className="text-[var(--color-text-secondary)]">
                      Articolele vor fi afișate aici când vor fi publicate.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
