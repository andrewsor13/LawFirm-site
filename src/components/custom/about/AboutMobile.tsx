"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lawyer } from "@/lib/types";

interface AboutProps {
  data: Lawyer[];
}

export default function AboutMobile({ data }: AboutProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center py-16 px-4"
    >
      <Image
        src="/images/background.webp"
        alt="Background imagine avocat"
        fill
        className="absolute object-cover brightness-20 blur-[2px] -z-10"
      />

      <div className="relative text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-text)] drop-shadow-2xl tracking-tight">
          Despre
        </h1>
        <div className="flex justify-center mt-3">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-10 w-full max-w-md bg-gradient-to-tr from-[var(--color-container)]/90 to-black/70 backdrop-blur-md rounded-2xl shadow-xl">
        {data.map((lawyer) => (
          <div key={lawyer.id} className=" p-5 text-center">
            {lawyer.photo && (
              <Image
                src={lawyer.photo}
                alt={lawyer.name}
                width={260}
                height={340}
                className="mx-auto rounded-xl object-cover shadow-lg"
              />
            )}

            <h2 className="text-xl font-bold text-[var(--color-text)] mt-4">
              Avocat {lawyer.name}
            </h2>

            <p className="text-[var(--color-text)] text-sm leading-relaxed mt-2 whitespace-pre-line break-words">
              {lawyer.description}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
