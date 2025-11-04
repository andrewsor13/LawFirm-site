import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  image?: string;
  description?: string;
  createdAt: string;
};

export default function CardBox({
  title,
  image,
  description,
  createdAt,
}: Props) {
  const getPreview = (htmlContent: string = "", maxLength: number = 100) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength).trim() + "..."
      : textContent;
  };

  return (
    <div className="group relative h-full bg-[var(--color-container)]/95 backdrop-blur-sm border border-[var(--color-secondary)]/30 hover:border-[var(--color-primary)]/60 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent rounded-bl-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-200" />

      <div className="relative flex flex-col h-full z-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover w-full h-full transition-transform duration-200 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-background)] text-[var(--color-text-secondary)]">
              <span className="text-sm font-medium">Fără imagine</span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-[var(--color-background)]/90 backdrop-blur-sm text-[var(--color-text)] px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--color-primary)]/30">
              {new Date(createdAt).toLocaleDateString("ro-RO", {
                day: "2-digit",
                month: "short",
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-[var(--color-text)] text-xl font-serif font-bold mb-3 leading-tight group-hover:text-[var(--color-hover)] transition-colors duration-200">
            {title}
          </h3>

          {description && (
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3 flex-grow opacity-90 group-hover:opacity-100 transition-opacity duration-200">
              {getPreview(description)}
            </p>
          )}

          <div className="flex items-center justify-between mt-6">
            <span className="text-[var(--color-text-secondary)] text-sm font-medium">
              {new Date(createdAt).toLocaleDateString("ro-RO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>

            <div className="flex items-center gap-2 text-[var(--color-primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
              <span>Citește</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}
