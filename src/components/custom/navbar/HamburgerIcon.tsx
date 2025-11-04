"use client";
import { motion } from "framer-motion";

export default function HamburgerIcon({ open }: { open: boolean }) {
  const commonStyles =
    "absolute left-0 h-[6px] w-full bg-white rounded-full origin-center";

  return (
    <div className="w-[30px] h-[40px] relative z-[60] flex">
      <motion.span
        className={commonStyles}
        initial={false}
        animate={{
          top: open ? "18px" : "7px",
          width: open ? "0%" : "100%",
          left: open ? "50%" : "0%",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.span
        className={commonStyles}
        initial={false}
        animate={{
          top: "18px",
          rotate: open ? 45 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.span
        className={commonStyles}
        initial={false}
        animate={{
          top: open ? "18px" : "29px",
          rotate: open ? -45 : 0,
          width: open ? "100%" : "100%",
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
