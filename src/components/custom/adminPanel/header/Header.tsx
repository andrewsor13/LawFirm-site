"use client";

import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useCustomSession } from "@/components/CustomSessionContext";
import AdminMenu from "./AdminMenu";
import { motion } from "framer-motion";

export default function Header() {
  const { session } = useCustomSession();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        lg:hidden 
        sticky top-0 z-40 
        flex items-center justify-between 
        px-4 py-3
        text-white
        bg-gradient-to-br from-[#cbad8d] via-[#a48374] to-[#8c6f60]
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]
      "
    >
      <div className="flex items-center gap-3">
        <AdminMenu />
        <div>
          <h1 className="text-lg font-bold tracking-wide">Admin Panel</h1>
          <p className="text-xs opacity-80">Cabinet Avocat</p>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold truncate max-w-[140px]">
            {session?.user?.name || "Admin"}
          </p>
          <p className="text-xs opacity-80 truncate max-w-[140px]">
            {session?.user?.role || "Administrator"}
          </p>
        </div>

        <div
          className="
            relative rounded-full p-2 shadow-lg border-2 border-white/30
            bg-white/15 backdrop-blur-md
          "
        >
          <RxAvatar size={28} className="text-white" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
        </div>
      </motion.div>
    </motion.header>
  );
}
