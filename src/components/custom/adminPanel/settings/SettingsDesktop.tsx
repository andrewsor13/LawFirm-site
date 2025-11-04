"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

export default function SettingsDesktop() {
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
        <Loader sizeClass="w-1/3 h-1/3" color="fill-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-[#d6ccc2]/60 flex items-center justify-between bg-white/70 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-[#3a2d28]">Setări</h3>
        <p className="text-sm text-[#8c6f60] font-medium">
          {session?.user?.email}
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ul className="w-1/4 bg-[#f5f0eb]/70 border-r border-[#d6ccc2]/60 p-4 flex flex-col gap-2">
          {filteredOptions.map((option, index) => (
            <motion.li
              key={option.label}
              onClick={() => setActiveIndex(index)}
              whileHover={{ x: 5 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                ${
                  activeIndex === index
                    ? "bg-[#a48374] text-white shadow-md"
                    : "text-[#3a2d28] hover:bg-[#d6ccc2]/50"
                }
              `}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-semibold">{option.label}</span>
            </motion.li>
          ))}
        </ul>

        <div className="w-3/4 p-6 overflow-y-auto bg-white rounded-r-xl custom-scrollbar">
          {filteredOptions[activeIndex]?.component}
        </div>
      </div>
    </div>
  );
}
