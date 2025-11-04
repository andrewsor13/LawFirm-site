"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaComments,
  FaGlobe,
  FaQuestionCircle,
  FaFile,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { PiKeyReturn } from "react-icons/pi";
import HamburgerIcon from "../../navbar/HamburgerIcon";

type MenuItem = {
  label: string;
  path: string;
  icon?: ReactNode;
};

export default function AdminMenu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const handleClose = () => setOpen(false);

  const listOfOptions: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome size={18} />,
    },
    { label: "Clienți", path: "/admin/clients", icon: <FaUsers size={18} /> },
    { label: "Articole", path: "/admin/posts", icon: <FaFileAlt size={18} /> },
    {
      label: "Comentarii",
      path: "/admin/comments",
      icon: <FaComments size={18} />,
    },
    { label: "Domenii", path: "/admin/domains", icon: <FaGlobe size={18} /> },
    {
      label: "Întrebări",
      path: "/admin/faq",
      icon: <FaQuestionCircle size={18} />,
    },
    { label: "Pagini", path: "/admin/pages", icon: <FaFile size={18} /> },
    { label: "Înapoi la site", path: "/", icon: <PiKeyReturn size={20} /> },
  ];

  return (
    <>
      <Button
        className="
          z-30 p-2 w-10 h-10 flex items-center justify-center
          text-white rounded-xl border border-white/20
          bg-white/15 backdrop-blur-md
          hover:bg-white/25 shadow-lg
          transition-all duration-200
        "
        onClick={() => setOpen(!open)}
      >
        <HamburgerIcon open={open} />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            />

            <motion.div
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="
                fixed right-0 top-0 h-screen w-[280px] z-40 flex flex-col
                bg-[#3a2d28] shadow-2xl
              "
            >
              <div
                className="
                  px-6 py-6 border-b border-white/10 
                  bg-gradient-to-br from-[#cbad8d] to-[#a48374]
                "
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-[#f5f0eb] flex items-center justify-center shadow-lg">
                    <RxAvatar size={32} className="text-[#8c6f60]" />
                  </div>
                  <div className="flex-1 min-w-0 text-white">
                    <p className="font-bold text-sm truncate">
                      {session?.user?.name || "Admin"}
                    </p>
                    <p className="text-white/80 text-xs truncate">
                      {session?.user?.email}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20">
                      {session?.user?.role || "Administrator"}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold text-white/90">Meniu Admin</p>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {listOfOptions.map((item, i) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/" && pathname.startsWith(item.path));

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        onClick={handleClose}
                        className={`
                          flex items-center gap-3 px-6 py-4 border-b border-white/10 transition-all duration-200 group
                          ${
                            isActive
                              ? "bg-[#8c6f60]/60 text-[#f5f0eb]"
                              : "text-[#d6ccc2] hover:bg-[#8c6f60]/30"
                          }
                        `}
                      >
                        <div
                          className={`transition-transform group-hover:scale-110 ${
                            isActive
                              ? "text-[#cbad8d]"
                              : "text-[#a48374] group-hover:text-[#cbad8d]"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`font-medium transition-colors ${
                            isActive
                              ? "text-[#f5f0eb]"
                              : "group-hover:text-[#f5f0eb]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-4 py-4 border-t border-white/10 bg-[#8c6f60]/20 space-y-2">
                <Link
                  href="/admin/settings"
                  onClick={handleClose}
                  className="
                    flex items-center justify-center gap-2 w-full py-3
                    rounded-lg font-semibold text-sm
                    text-[#f5f0eb] bg-[#8c6f60]
                    hover:bg-[#a48374]
                    shadow-md transition-colors
                  "
                >
                  <FaCog size={16} className="animate-spin-slow" />
                  Setări
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="
                    flex items-center justify-center gap-2 w-full py-3
                    rounded-lg font-semibold text-sm
                    text-white bg-red-500 hover:bg-red-600
                    shadow-md transition-colors
                  "
                >
                  <FaSignOutAlt size={16} />
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
