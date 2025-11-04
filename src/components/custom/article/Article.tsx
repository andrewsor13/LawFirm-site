"use client";
import React from "react";
import Image from "next/image";
import CommentsWrapperClient from "./CommentsWrapperClient";

type Props = {
  article: {
    id?: number;
    title: string;
    content?: string;
    imageUrl?: string;
  };
};

export default function Article({ article }: Props) {
  return (
    <div className="pt-30 pb-20 pl-2 pr-2 w-full flex justify-center bg-gradient-to-b from-[var(--body-background)] via-[#2c2c2c] to-[var(--color-accent)]/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none" />

      <div className="relative lg:max-w-4xl w-full flex flex-col gap-10">
        <article className="p-8 sm:p-12 md:p-16 bg-[var(--color-container)]/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-black/30 border border-[var(--color-container)]/20">
          <header className="flex flex-col gap-8 justify-center items-center w-full mb-12">
            {article.imageUrl && (
              <div className="relative h-[32rem] w-full rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 rounded-2xl" />
              </div>
            )}

            <div className="text-center max-w-4xl">
              <div className="inline-block">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[var(--color-text)] dark:text-white leading-tight mb-4 tracking-tight">
                  {article.title}
                </h1>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent rounded-full opacity-60" />
                </div>
              </div>
            </div>
          </header>

          <main className="mb-12">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/10 dark:border-white/5">
              <div
                className="prose prose-xl prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
              />
            </div>
          </main>

          {article.id && (
            <section className="border-t border-white/20 pt-12">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">
                    Comentarii
                  </h2>
                  <div className="h-px w-16 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
                </div>
                <CommentsWrapperClient postId={article.id} />
              </div>
            </section>
          )}
        </article>

        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-container)] hover:bg-[var(--color-container)]/80 text-white font-serif font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--color-container)]/20 hover:-translate-y-1 border border-white/20"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span className="tracking-wide">Înapoi sus</span>
          </button>
        </div>
      </div>
    </div>
  );
}
