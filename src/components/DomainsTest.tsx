"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { FaHandshake, FaBalanceScale, FaGavel } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";

export default function Domains() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const iconSize = 50;

  const domains = [
    {
      title: "Întocmire contracte civile",
      icon: <HiOutlineClipboardDocumentList size={iconSize} />,
      description: "Litigii, contracte și obligații civile.",
    },
    {
      title: "Drept Penal",
      icon: <GiPoliceOfficerHead size={iconSize} />,
      description: "Asistență în cauze penale.",
    },
    {
      title: "Dreptul Muncii",
      icon: <MdOutlineWorkOutline size={iconSize} />,
      description: "Conflicte de muncă, concedieri, drepturi salariați.",
    },
    {
      title: "Consultanță Generală",
      icon: <BsPeopleFill size={iconSize} />,
      description: "Răspunsuri juridice generale, ghidare și strategie.",
    },
    {
      title: "Drept funciar, retrocedări, exproprieri",
      icon: <FaGavel size={iconSize} />,
      description: "Litigii privind proprietăți, exproprieri și revendicări.",
    },
    {
      title: "Drept Bancar",
      icon: <RiBankLine size={iconSize} />,
      description:
        "Credite, recuperări, executări silite, relații bancă-client.",
    },
    {
      title: "Dreptul Familiei și Succesiuni",
      icon: <GiFamilyTree size={iconSize} />,
      description: "Divorț, custodie, partaj, moșteniri.",
    },
    {
      title: "Drept Civil",
      icon: <FaBalanceScale size={iconSize} />,
      description:
        "Obligații, răspundere civilă, protecția drepturilor civile.",
    },
    {
      title: "Dreptul Asigurărilor",
      icon: <FaHandshake size={iconSize} />,
      description:
        "Despăgubiri, accidente, răspunderi contractuale și delictuale.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="relative py-16  px-4 sm:px-8 " ref={ref}>
        <Image
          className="object-cover -z-50 absolute brightness-50 blur-xs"
          alt="main image"
          fill={true}
          style={{ objectFit: "cover" }}
          src="/bg-hammer-table.jpg"
        />

        <div className="max-w-4xl mx-auto text-center items-center  flex flex-col gap-5 ">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-4">
            Asistență juridică adaptată fiecărei situații
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-full max-w-xs bg-gradient-to-br from-[var(--color-container)]/90 to-slate-900/80 backdrop-blur-md shadow-md hover:shadow-[0_0_12px_var(--color-accent)] transition-all rounded-2xl p-4 flex items-start gap-4"
              >
                {/* Icon */}
                <div className="text-[var(--color-accent)] shrink-0">
                  {domain.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[var(--color-text)] text-lg font-semibold mb-1">
                    {domain.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text)] leading-relaxed line-clamp-3">
                    {domain.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
