"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import MainValues from "./custom/values/MainValues";
import Button from "./Button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import FaqButton from "./FaqButton";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const secondTitle = {
  hidden: { opacity: 0, x: 200 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function HeroSection() {
  const { isActive } = useSiteSettings();

  return (
    <section className="relative ">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="static h-screen mx-auto flex items-center justify-center flex-col gap-5"
      >
        <Image
          className="object-cover -z-50 absolute brightness-20 blur-xs"
          alt="main image"
          fill={true}
          style={{ objectFit: "cover" }}
          src="/images/background.webp"
        />
        <div className="px-3 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-[80rem]">
          <div className="flex flex-col justify-start items-start gap-5">
            <motion.h1
              variants={secondTitle}
              className="text-[var(--color-text)] items-start text-2xl  text-start  font-bold sm:text-3xl lg:text-6xl 2xl:text-8xl flex flex-col  gap-3"
            >
              <motion.span className="text-2xl font-bold text-[var(--color-primary)] text-start sm:text-3xl self-start lg:text-6xl 2xl:text-8xl">
                Baroul București
              </motion.span>{" "}
              <motion.span className="">Nume Avocat</motion.span>
            </motion.h1>
            <div className="self-start w-fit">
              {isActive ? <FaqButton /> : <Button />}
            </div>
            <div className="lg:w-2xl 2xl:w-4xl 2xl:text-xl text-start text-sm/6 lg:text-base/8">
              {isActive ? (
                <p>
                  Te confrunți cu o problemă juridică și ți se pare dificil să
                  înțelegi procedurile sau limbajul legii? Pe acest blog vei
                  găsi explicații clare, articole detaliate și ghiduri practice
                  care te ajută să înțelegi mai bine dreptul și modul în care
                  acesta îți influențează viața de zi cu zi. Scopul meu este să
                  fac informația juridică accesibilă, clară și utilă pentru
                  oricine dorește să înțeleagă mai bine cum funcționează
                  sistemul de drept.
                </p>
              ) : (
                <p>
                  Ai parte de un litigiu, iar procesele juridice ți se par
                  complicate și greu de înțeles? Eu sunt aici să îți fac viața
                  mai ușoară! Îți ofer consultanță juridică personalizată,
                  analizând în detaliu situația ta și găsind cele mai potrivite
                  soluții pentru ca viața să revină pe făgașul normal.
                  Serviciile mele se bazează pe rapiditate, claritate și
                  sinceritate, astfel încât să ai mereu încrederea că ești pe
                  mâini bune.{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <MainValues />
    </section>
  );
}
