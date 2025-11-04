import React from "react";
import { FiShield, FiBriefcase, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const listOfOptions = [
  {
    icon: <FiShield className="text-4xl text-white mb-4" />,
    title: "Integritate",
    text: "Fiecare caz este tratat cu maximă seriozitate și respect față de lege și client.",
  },
  {
    icon: <FiBriefcase className="text-4xl text-white mb-4" />,
    title: "Profesionalism",
    text: "Calitatea muncii mele se reflectă în atenția la detalii și soluțiile clare pe care le ofer.",
  },
  {
    icon: <FiUsers className="text-4xl text-white mb-4" />,
    title: "Accesibilitate",
    text: "Îți explic pașii juridici pe înțelesul tău, pentru ca tu să iei decizii informate.",
  },
];

const listOfOptionsBlogMode = [
  {
    icon: <FiShield className="text-4xl text-white mb-4" />,
    title: "Transparență",
    text: "Explic conceptele juridice pe înțelesul tuturor, fără termeni complicați sau ambiguități.",
  },
  {
    icon: <FiBriefcase className="text-4xl text-white mb-4" />,
    title: "Cunoaștere Practică",
    text: "Articolele oferă soluții reale și exemple utile, inspirate din situații juridice concrete.",
  },
  {
    icon: <FiUsers className="text-4xl text-white mb-4" />,
    title: "Educație Juridică",
    text: "Scopul blogului este să aducă dreptul mai aproape de oameni, prin informații clare și aplicabile.",
  },
];

export default function MainValues() {
  const { isActive } = useSiteSettings();

  const valuesToShow = isActive ? listOfOptionsBlogMode : listOfOptions;

  return (
    <motion.div
      className="absolute w-full flex flex-col items-center justify-center lg:-bottom-25 -bottom-130 z-30 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ul className="flex flex-col sm:flex-row gap-2">
        {valuesToShow.map((item, i) => (
          <li
            key={i}
            className="flex flex-col items-center
              [background-image:linear-gradient(to_bottom_right,#8c6f60,rgba(85,82,81,0.95))]
              bg-[length:200%_200%] bg-[position:0%_50%]
              hover:bg-[position:100%_50%] active:bg-[position:100%_50%]
              transition-[background-position] duration-300 ease-in-out
              shadow-[0px_15px_6px_-3px_rgba(0,0,0,0.3)]
              rounded-2xl p-6 w-64 cursor-pointer select-none"
          >
            {item.icon}
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-white text-center mt-2">{item.text}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
