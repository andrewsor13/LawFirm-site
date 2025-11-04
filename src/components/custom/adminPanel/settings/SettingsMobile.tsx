"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomSession } from "@/components/CustomSessionContext";
import Account from "./Account";
import AdminAccounts from "./AdminAccounts";
import SiteSettings from "./SiteSettings";
import { FaUserCog, FaUsersCog, FaCogs } from "react-icons/fa";
import Loader from "@/components/Loader";

const allOptions = [
  {
    label: "Profilul meu",
    icon: <FaUserCog />,
    component: <Account />,
    adminOnly: false,
  },
  {
    label: "Conturi Admin",
    icon: <FaUsersCog />,
    component: <AdminAccounts />,
    adminOnly: true,
  },
  {
    label: "Setări Site",
    icon: <FaCogs />,
    component: <SiteSettings />,
    adminOnly: true,
  },
];

export default function SettingsMobile() {
  const { session } = useCustomSession();
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!session) return [];
    return allOptions.filter(
      (opt) => !opt.adminOnly || session.user.role === "admin"
    );
  }, [session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full text-[#8c6f60] font-medium animate-pulse">
        <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />;
      </div>
    );
  }

  return (
    <div className="lg:hidden flex flex-col h-full w-full bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-[#d6ccc2]/50 bg-white/70 backdrop-blur-sm flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#3a2d28]">Setări</h3>
        <p className="text-sm text-[#8c6f60]">{session?.user?.email}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={filteredOptions[activeIndex]?.label}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="min-h-[70vh]"
          >
            {filteredOptions[activeIndex]?.component}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 flex justify-around items-center bg-[#3a2d28] text-white border-t border-[#d6ccc2]/40 py-3 shadow-inner">
        {filteredOptions.map((option, index) => (
          <button
            key={option.label}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              activeIndex === index
                ? "text-[#cbad8d] scale-110"
                : "text-white/80 hover:text-[#cbad8d]/80"
            }`}
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
              className="text-lg"
            >
              {option.icon}
            </motion.span>
            <span className="text-[10px] font-semibold tracking-wide">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
