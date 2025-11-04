"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AboutProps {
  title: string;
  content: string;
}

const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01] as [number, number, number, number],
};

export default function About({ title, content }: AboutProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section className="relative min-h-screen flex items-center justify-center pt-25 pb-10">
      <Image
        src="/images/background.webp"
        alt="Background imagine avocat"
        fill
        className="object-cover brightness-20 blur-xs absolute -z-10"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80 }}
        animate={
          inView ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : {}
        }
        transition={transition}
        className="relative mx-4 p-6 md:p-10 max-w-4xl bg-gradient-to-tr from-[var(--color-container)]/85 to-slate-800/70 backdrop-blur-md rounded-3xl shadow-xl"
      >
        <div className="mb-4">
          <Image
            src="/images/ImgAvAlexandra.jpg"
            alt="Avocat Alexandra Gogoloș"
            width={250}
            height={350}
            className="float-left mr-6 mb-4 rounded-2xl object-cover shadow-lg"
          />

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-text)]">
            {title}
          </h2>

          <div
            className="text-[var(--color-text)] text-base md:text-lg/9"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
