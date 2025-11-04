"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lawyer } from "@/lib/types";

interface AboutProps {
  data: Lawyer[];
}

export default function AboutDesktop({ data }: AboutProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6"
    >
      <Image
        src="/images/background.webp"
        alt="Background imagine avocat"
        fill
        className="absolute object-cover brightness-20 blur-[2px] -z-10"
      />

      <div className="relative text-center mb-16">
        <h1 className="text-6xl lg:text-7xl font-serif font-bold text-[var(--color-text)] drop-shadow-2xl tracking-tight mb-4">
          Despre
        </h1>
        <div className="flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent rounded-full" />
        </div>
      </div>

      <div className="relative max-w-7xl w-full flex flex-col gap-30 bg-gradient-to-tr from-[var(--color-container)]/85 to-black/70 backdrop-blur-md rounded-3xl shadow-xl p-12 ">
        {data.map((lawyer, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={lawyer.id}>
              <div className="relative">
                <div
                  className={`${
                    isEven
                      ? "float-left mr-6 lg:mr-10"
                      : "float-right ml-6 lg:ml-10"
                  } mb-4`}
                >
                  {lawyer.photo && (
                    <Image
                      src={lawyer.photo}
                      alt={lawyer.name}
                      width={300}
                      height={380}
                      className="rounded-2xl object-cover shadow-2xl border border-white/10"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-text)] leading-tight">
                    Avocat {lawyer.name}
                  </h2>
                </div>

                <div className="text-[var(--color-text)] text-base leading-relaxed whitespace-pre-line break-words">
                  {lawyer.description}
                </div>

                <div className="clear-both"></div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
