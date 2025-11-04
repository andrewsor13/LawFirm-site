"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import AccountForm from "./AccountForm";

export default function AddAccountModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-cyan-500 w-fit self-end hover:bg-cyan-700 cursor-pointer text-white rounded-md px-4 py-2"
            name="password"
          >
            Adaugă cont +
          </button>
        </DialogTrigger>

        <DialogContent
          className="
    sm:max-w-[425px] lg:max-w-[600px]
    max-h-[80vh] md:max-h-[90vh] overflow-hidden p-0
    bg-transparent border-none shadow-none

  overflow-y-scroll
  "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="rounded-lg shadow-xl"
          >
            <DialogTitle className="sr-only">Formular contact</DialogTitle>
            <DialogDescription className="sr-only">
              Completează formularul pentru a ne trimite un mesaj.
            </DialogDescription>

            <div className="bg-[var(--color-container)] px-6 pt-8 pb-10 rounded-xl shadow-lg">
              <h2 className="text-center">Adaugă cont</h2>
              <AccountForm />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
