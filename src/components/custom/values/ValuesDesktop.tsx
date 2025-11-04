import Image from "next/image";
import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { child } from "@/animations/values";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function ValuesDesktop() {
  const { isActive } = useSiteSettings();
  return (
    <div className="p-10 flex flex-col gap-10 max-w-6xl">
      {isActive ? (
        <motion.p variants={child} custom={0} className="text-xl/10">
          Numele meu este <span className="font-bold">Nume Avocat</span>. Sunt
          avocat și împărtășesc prin acest blog experiența și cunoștințele mele
          din domeniul juridic. Cred că legea devine cu adevărat utilă atunci
          când este înțeleasă, iar scopul meu este să ofer explicații clare și
          accesibile despre diferite ramuri ale dreptului, pentru oricine
          dorește să se informeze corect.
        </motion.p>
      ) : (
        <motion.p variants={child} custom={0} className="text-xl/10">
          Numele meu este <span className="font-bold">Nume Avocat</span>. Sunt
          avocat și cred că fiecare caz merită implicare reală și o soluție
          clară, adaptată nevoilor clientului. Lucrez cu atenție și seriozitate
          în toate domeniile dreptului și pun accent pe comunicare și încredere.
          Fiecare speță e o responsabilitate pe care mi-o asum cu toată
          determinarea.
        </motion.p>
      )}

      <div className="flex flex-row items-center gap-10">
        <div className="flex flex-col gap-10 max-w-xl">
          <motion.div
            className="relative p-5 pt-10 pb-10"
            variants={child}
            custom={2}
          >
            <h4 className="text-xl/10 font-extrabold italic text-gray-600">
              Un avocat este o persoană care ajută oamenii să obțină ceea ce
              legea le promite.
            </h4>
            <div className="absolute border-r-2 border-gray-400 -left-4 top-8 h-2/3 w-fit"></div>
            <FaQuoteLeft className="absolute bottom-0 left-2" />
            <FaQuoteRight className="absolute top-0 right-2" />
          </motion.div>

          <motion.div
            className="relative flex flex-row"
            variants={child}
            custom={3}
          >
            <div className="absolute border-b-2 border-gray-400 left-4 top-1/2 h-fit w-10"></div>
            <h3 className="pl-20">Friedrich Schiller</h3>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 aspect-video relative rounded-md overflow-hidden min-w-[400px] max-w-[600px] shadow-[28px_30px_6px_-3px_rgba(0,_0,_0,_0.3)]"
          variants={child}
          custom={4}
        >
          <Image
            src="/images/bg-lawyer-contract.jpg"
            alt="Imagine avocat"
            fill
            className="object-cover "
            sizes="(min-width: 1024px) 600px, 100vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
