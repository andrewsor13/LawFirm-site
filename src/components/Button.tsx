"use client";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const buttonVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Button(props: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/contact/#contactForm");
  };
  return (
    <motion.button
      {...props}
      variants={buttonVariants}
      type="button"
      onClick={handleClick}
      className={`group relative
        w-32 sm:w-44 
        h-14 sm:h-16 lg:h-20
        px-3 sm:px-5
        bg-[var(--color-primary)] text-[var(--color-background)]
        hover:bg-[var(--color-hover)] hover:-translate-y-0.5 active:bg-[var(--color-hover)]
        hover:cursor-pointer transition duration-200 ease-in-out
        rounded-2xl flex flex-row gap-2 sm:gap-4 lg:gap-0 items-center
        ${props.className ?? ""}
      `}
    >
      <p className="text-lg sm:text-xl lg:text-2xl font-semibold">Contact</p>

      <Image
        alt="Judge hammer"
        src="/hammer.svg"
        width={32}
        height={32}
        className="sm:hidden absolute right-2 -rotate-20 group-hover:rotate-20 group-active:rotate-20 transition-all ease-in-out duration-300"
      />

      <Image
        alt="Judge hammer"
        src="/hammer.svg"
        width={48}
        height={48}
        className="hidden sm:block absolute right-3 -rotate-20 group-hover:rotate-20 group-active:rotate-20 transition-all ease-in-out duration-300"
      />

      <Image
        alt="Gavel pad"
        src="/gavelPad.svg"
        width={40}
        height={40}
        className="absolute -right-1 top-4 sm:hidden"
      />

      <Image
        alt="Gavel pad"
        src="/gavelPad.svg"
        width={60}
        height={60}
        className="hidden sm:block lg:hidden absolute -right-1 top-4"
      />

      <Image
        alt="Gavel pad"
        src="/gavelPad.svg"
        width={60}
        height={60}
        className="hidden lg:block absolute -right-1 top-6"
      />
    </motion.button>
  );
}
