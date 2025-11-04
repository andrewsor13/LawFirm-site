"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { FiUserPlus } from "react-icons/fi";
import AddClientForm from "@/components/AddClientForm";

export default function ModalClient() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#a48374] hover:bg-[#8c6f60] cursor-pointer text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition-all"
        >
          <div className="flex items-center gap-2">
            <FiUserPlus className="w-4 h-4" />
            <span>Adaugă client</span>
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent
        className="
    w-[95vw] sm:max-w-xl max-h-[85vh]
    overflow-y-auto rounded-2xl border border-[#e8ddd4]/60
    bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] shadow-2xl
    scrollbar-thin scrollbar-thumb-[#d6ccc2] scrollbar-track-transparent
  "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col"
        >
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-[#d6ccc2]/60 bg-white/60 backdrop-blur-sm">
            <DialogTitle className="text-xl font-bold text-[#3a2d28] flex items-center gap-2">
              <FiUserPlus className="text-[#a48374]" />
              Adaugă client
            </DialogTitle>
            <DialogDescription className="text-[#8c6f60] text-sm">
              Completează formularul pentru a adăuga un client nou.
            </DialogDescription>
          </DialogHeader>

          <div className="px-5 py-4 bg-transparent overflow-y-auto ">
            <AddClientForm className="w-full" />
          </div>

          <DialogFooter className="px-6 pb-5 flex justify-end border-t border-[#d6ccc2]/40">
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-[#a48374] hover:bg-[#8c6f60] text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all"
              >
                Închide
              </motion.button>
            </DialogClose>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
