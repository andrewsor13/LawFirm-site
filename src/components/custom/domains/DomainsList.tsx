"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { FaGavel, FaBalanceScale, FaHandshake } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import Loader from "@/components/Loader";
import { useAppContext } from "@/context/AppContext";

const iconMap: Record<string, React.ElementType> = {
  FaGavel,
  FaBalanceScale,
  FaHandshake,
  HiOutlineClipboardDocumentList,
  GiPoliceOfficerHead,
  GiFamilyTree,
  MdOutlineWorkOutline,
  BsPeopleFill,
  RiBankLine,
};

type Props = {
  max?: number;
  iconSize?: number;
};

export default function DomainsList({ max, iconSize = 40 }: Props) {
  const { domains, siteSettings } = useAppContext();
  const isActive = siteSettings?.blogMode ?? false;

  const isLoading = !domains.length;

  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-50">
        <Image
          className="object-cover brightness-20"
          alt="Legal background"
          fill
          style={{ objectFit: "cover" }}
          src="/images/bg-hammer-table.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)]/95 via-[var(--color-background)]/90 to-[var(--color-container)]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-text)/5_1px,transparent_0)] bg-[length:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center items-center flex flex-col gap-12 relative">
        <div className="text-center space-y-6 max-w-4xl">
          <div className="relative inline-block">
            {isActive ? (
              <>
                <h2>Teme juridice abordate</h2>
                <h3>analizate din perspectivă practică și educativă</h3>
              </>
            ) : (
              <>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[var(--color-text)] mb-4 leading-tight">
                  Asistență juridică
                </h2>
                <h3 className="text-2xl lg:text-3xl font-serif font-light text-[var(--color-primary)] mb-6">
                  adaptată fiecărei situații
                </h3>
              </>
            )}
            <div className="flex justify-center mt-4">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent rounded-full" />
            </div>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {isActive
              ? "Pe blog sunt prezentate articole și resurse din mai multe ramuri ale dreptului. Scopul lor este să explice conceptele juridice esențiale și să ofere o perspectivă clară asupra modului în care legea se aplică în diverse situații de viață."
              : "Echipa noastră de experți oferă consiliere specializată în multiple domenii juridice, asigurând soluții personalizate pentru fiecare caz în parte."}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Loader sizeClass="w-16 h-16" color="fill-white" />
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {(max ? domains.slice(0, max) : domains).map((domain) => {
                const Icon = iconMap[domain.icon] || FaRegCheckCircle;
                return (
                  <Link
                    href={`/domenii-de-practica/${domain.slug}`}
                    key={domain.id}
                    className="group"
                  >
                    <div className="relative h-full bg-[var(--color-container)]/95 backdrop-blur-sm border border-[var(--color-secondary)]/30 hover:border-[var(--color-primary)]/60 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl p-6 cursor-pointer overflow-hidden group hover:-translate-y-1">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent rounded-bl-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-200" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-center w-16 h-16 bg-[var(--color-text)]/10 border border-[var(--color-text)]/20 rounded-xl mb-4 group-hover:bg-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/40 transition-all duration-200">
                          <Icon
                            size={iconSize}
                            className="text-white group-hover:text-[var(--color-primary)] transition-colors duration-200"
                          />
                        </div>
                        <h3 className="text-[var(--color-text)] text-xl font-serif font-bold mb-3 leading-tight group-hover:text-[var(--color-hover)] transition-colors duration-200">
                          {domain.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-4 flex-grow opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                          {isActive
                            ? domain.blogOnlyDescription
                            : domain.description}
                        </p>
                        <div className="flex items-center gap-2 text-[var(--color-primary)] text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
                          <span>Detalii</span>
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
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {max && max < domains.length && (
          <div>
            <Link
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-hover)] text-[var(--color-background)] font-serif font-semibold rounded-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              href="/domenii-de-practica"
            >
              <span>Vezi toate domeniile</span>
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
