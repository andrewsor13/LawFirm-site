"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { Faq } from "@/lib/types";
import { useCustomSession } from "@/components/CustomSessionContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type FaqItemProps = {
  faq: Faq;
  onDelete: (id: number) => void;
};

export default function FaqItem({ faq, onDelete }: FaqItemProps) {
  const { session } = useCustomSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <motion.div
        layout
        className={`flex items-center justify-between border rounded-xl px-4 py-3 bg-white/70 backdrop-blur-sm shadow-sm border-[#d6ccc2]/70 transition-all duration-200 ${
          isOpen ? "border-[#a48374] shadow-md" : "hover:bg-[#fff9eb]"
        }`}
      >
        <CollapsibleTrigger className="flex-1 text-left cursor-pointer flex items-center justify-between text-[#3a2d28]">
          <p className="font-medium text-base">{faq.question}</p>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#8c6f60]"
          >
            <IoMdArrowDropdown size={22} />
          </motion.div>
        </CollapsibleTrigger>

        {session?.user?.role === "admin" && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                title="Șterge întrebarea"
                className="text-red-600 hover:text-red-800 cursor-pointer ml-3 transition"
              >
                <FaTrashCan size={18} />
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-sm bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl border border-[#d6ccc2]/60 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-[#3a2d28] font-semibold">
                  Confirmare ștergere
                </DialogTitle>
                <DialogDescription className="text-[#8c6f60]">
                  Ești sigur că vrei să ștergi întrebarea{" "}
                  <span className="font-semibold">{faq.question}</span>?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => onDelete(faq.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Confirmă
                </button>

                <DialogTrigger asChild>
                  <button className="bg-gray-200 hover:bg-gray-300 text-[#3a2d28] px-4 py-2 rounded-lg transition">
                    Anulează
                  </button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>

      <CollapsibleContent asChild>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="faq-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-4 bg-[#fff9eb] rounded-xl border-l-4 border-[#a48374] shadow-inner text-[#3a2d28] leading-relaxed">
                {faq.text}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}
