import Image from "next/image";
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { child } from "@/animations/values";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ValuesMobile() {
  const { isActive } = useSiteSettings();
  return (
    <div className="p-5 flex flex-col gap-10">
      {isActive ? (
        <motion.p variants={child} className="text-xl/10">
          Numele meu este{" "}
          <span className="font-bold">Nume Avocat</span>. Sunt
          avocat în Baroul București și împărtășesc prin acest blog experiența
          și cunoștințele mele din domeniul juridic. Cred că legea devine cu
          adevărat utilă atunci când este înțeleasă, iar scopul meu este să ofer
          explicații clare și accesibile despre diferite ramuri ale dreptului,
          pentru oricine dorește să se informeze corect.
        </motion.p>
      ) : (
        <motion.p variants={child} className="text-xl/10">
          Numele meu este{" "}
          <span className="font-bold">Nume Avocat</span>. Sunt
          avocat în Baroul București și cred că fiecare caz merită implicare
          reală și o soluție clară, adaptată nevoilor clientului. Lucrez cu
          atenție și seriozitate în toate domeniile dreptului și pun accent pe
          comunicare și încredere. Fiecare speță e o responsabilitate pe care
          mi-o asum cu toată determinarea.
        </motion.p>
      )}

      <motion.div className="relative p-5 pt-10 pb-10" variants={child}>
        <h4 className="text-xl/10 font-extrabold">
          Nu există caz mic atunci când în joc e liniștea unui om.
        </h4>
        <FaQuoteLeft className="absolute bottom-0 left-2" />
        <FaQuoteRight className="absolute top-0 right-2" />
      </motion.div>

      <motion.div className="relative flex flex-row" variants={child}>
        <div className="absolute border-b-2 border-amber-100 left-4 top-1/2 h-fit w-10"></div>
        <h3 className="pl-20">Friedrich Schiller</h3>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl aspect-video mx-auto relative rounded-md overflow-hidden shadow-[0px_30px_6px_-3px_rgba(0,_0,_0,_0.3)]"
        variants={child}
      >
        <Image
          src="/images/bg-lawyer-contract.jpg"
          alt="Imagine avocat"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
        />
      </motion.div>
    </div>
  );
}
