"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ValuesMobile from "./ValuesMobile";
import ValuesDesktop from "./ValuesDesktop";
import { container } from "@/animations/values";
import Image from "next/image";

export default function Values() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="relative text-black pt-10 pb-10 flex justify-center"
    >
      <Image
        src="/images/background_courtroom.jpg"
        alt="Background Courtroom"
        fill
        className="object-cover -z-20"
      />

      <div className="absolute inset-0 bg-white/95 -z-10"></div>

      <motion.div
        className="mt-130 sm:mt-20 relative z-0"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <div className="lg:hidden">
          <ValuesMobile />
        </div>
        <div className="hidden lg:flex">
          <ValuesDesktop />
        </div>
      </motion.div>
    </div>
  );
}
