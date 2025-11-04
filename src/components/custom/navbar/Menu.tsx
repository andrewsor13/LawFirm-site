"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerIcon from "./HamburgerIcon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import { ReactNode } from "react";

type MenuItem = {
  label: string;
  path: string;
  icon?: ReactNode;
};

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const handleMenuStateChange = () => {
    setOpen(false);
  };

  let listOfOptions: MenuItem[] = [
    { label: "Acasa", path: "/" },
    { label: "Despre", path: "/despre" },
    { label: "Domenii de practică", path: "/domenii-de-practica" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  if (session) {
    listOfOptions = [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <RxAvatar size={20} />,
      },
      ...listOfOptions,
    ];
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        className="z-[60] p-1 h-[40px] w-[45px] flex items-center justify-center"
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              key="sheet-content"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-[300px] backdrop-blur-md bg-[var(--color-background)]/80 shadow-lg z-50 flex flex-col h-screen"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {listOfOptions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full border-b border-gray-300  bg-[var(--color-background)]/95 text-end pr-5 pt-4 pb-4"
                >
                  <Link
                    href={item.path}
                    onClick={handleMenuStateChange}
                    className={`flex flex-row gap-2 justify-end items-center ${
                      item.icon ? "font-bold" : ""
                    }`}
                  >
                    {item.icon && item.icon}
                    <p className="first-letter:capitalize font-bold">
                      {item.label}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Sheet>
  );
}
