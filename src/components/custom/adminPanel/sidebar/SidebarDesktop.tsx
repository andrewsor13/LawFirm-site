"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  FaAngleDoubleLeft,
  FaCog,
  FaHome,
  FaUsers,
  FaFileAlt,
  FaComments,
  FaGlobe,
  FaQuestionCircle,
  FaFile,
} from "react-icons/fa";
import { PiKeyReturn } from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";
const pathList = [
  { title: "Dashboard", path: "/admin/dashboard", icon: FaHome },
  { title: "Clienți", path: "/admin/clients", icon: FaUsers },
  { title: "Articole", path: "/admin/posts", icon: FaFileAlt },
  { title: "Comentarii", path: "/admin/comments", icon: FaComments },
  { title: "Domenii", path: "/admin/domains", icon: FaGlobe },
  { title: "Întrebări", path: "/admin/faq", icon: FaQuestionCircle },
  { title: "Pagini", path: "/admin/pages", icon: FaFile },
  { title: "Înapoi la site", path: "/", icon: PiKeyReturn },
];

export default function SidebarDesktop() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const handleSidebarChange = () => setIsOpen(!isOpen);

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backgroundColor: "#3a2d28",
        borderRight: "1px solid rgba(95, 133, 166, 0.2)",
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)",
      }}
      className="text-white h-screen relative overflow-hidden"
    >
      <motion.div
        onClick={handleSidebarChange}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "#cbad8d",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
        className="absolute top-6 -right-4 p-2 rounded-full cursor-pointer z-10"
      >
        <FaAngleDoubleLeft size={16} fill="#3a2d28" />
      </motion.div>

      <div className="h-full flex flex-col p-6">
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="header-open"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2
                  style={{ color: "#cbad8d" }}
                  className="text-2xl font-bold tracking-wide"
                >
                  Admin Panel
                </h2>
                <div
                  style={{ backgroundColor: "#5f85a6" }}
                  className="h-1 w-16 mt-2 rounded-full"
                />
              </motion.div>
            ) : (
              <motion.div
                key="header-closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div
                  style={{ backgroundColor: "#cbad8d" }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                >
                  A
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 flex flex-col space-y-2">
          {pathList.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));

            return (
              <Link key={item.path} href={item.path} passHref>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: isActive ? "#8c6f60" : "transparent",
                    color: isActive ? "#f5f0eb" : "#d6ccc2",
                    borderLeft: isActive
                      ? "3px solid #cbad8d"
                      : "3px solid transparent",
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    style={{ backgroundColor: "#e7d9ca" }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"
                  />

                  <Icon
                    size={20}
                    style={{ color: isActive ? "#cbad8d" : "#a48374" }}
                    className="group-hover:scale-110 transition-transform flex-shrink-0"
                  />

                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-6 pt-6 border-t"
          style={{ borderColor: "rgba(95, 133, 166, 0.2)" }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="footer-open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <Link href="/admin/settings" passHref>
                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{ color: "#d6ccc2" }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#8c6f60] transition-all duration-200 group"
                  >
                    <FaCog
                      size={18}
                      style={{ color: "#a48374" }}
                      className="group-hover:rotate-90 transition-transform duration-300"
                    />
                    <span className="text-sm font-medium">Setări</span>
                  </motion.div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: "#ef4444" }}
                  className="w-full py-3 rounded-lg font-semibold text-sm text-white hover:bg-red-500 transition-colors shadow-lg cursor-pointer"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Log out
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="footer-closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <Link href="/admin/settings" passHref>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    style={{ backgroundColor: "#8c6f60" }}
                    className="p-3 rounded-lg"
                  >
                    <FaCog size={20} style={{ color: "#cbad8d" }} />
                  </motion.div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: "#ef4444" }}
                  className="p-3 rounded-lg text-white cursor-pointer"
                  onClick={() => {}}
                >
                  <PiKeyReturn size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
