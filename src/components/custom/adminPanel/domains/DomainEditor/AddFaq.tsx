"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Notiflix from "notiflix";
import { Domain, Faq } from "@/lib/types";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";

type AddFaqProps = {
  domain: Domain;
  setEditableDomain: Dispatch<SetStateAction<Domain>>;
};

export default function AddFaq({ domain, setEditableDomain }: AddFaqProps) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faq", { method: "GET" });
      if (!res.ok) throw new Error("Eroare la preluarea FAQ-urilor");
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Nu s-au putut încărca FAQ-urile!");
    } finally {
      setLoading(false);
    }
  };

  const addFaqToDomain = async (newFaq: Faq) => {
    try {
      const res = await fetch(`/api/faq/id/${newFaq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId: domain.id }),
      });
      if (!res.ok) throw new Error("Eroare la actualizare FAQ");
      Notiflix.Notify.success("Întrebare adăugată domeniului cu succes!");
    } catch {
      Notiflix.Notify.failure("A apărut o eroare la adăugare!");
    }

    setEditableDomain((prev) => ({
      ...prev,
      faqs: [...(prev.faqs ?? []), newFaq],
    }));
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-start">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={fetchFaqs}
            className="bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg px-5 py-2 shadow-md transition active:scale-95"
          >
            + Adaugă FAQ existent
          </Button>
        </DialogTrigger>
        <DialogContent
          className="
    w-[90vw]            /* ocupă 90% din viewport pe mobile */
    max-w-[600px]       /* maxim 600px pe desktop */
    max-h-[80vh]        /* nu trece de 80% din înălțimea ecranului */
    overflow-y-auto 
    bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4]
    rounded-xl border border-[#d6ccc2]/60 
    shadow-2xl
  "
        >
          <DialogHeader>
            <DialogTitle className="text-[#3a2d28] text-xl font-bold">
              Selectează un FAQ
            </DialogTitle>
            <DialogDescription className="text-[#8c6f60]">
              Alege o întrebare existentă pentru a o atașa domeniului curent.
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader sizeClass="w-10 h-10" color="fill-[#a48374]" />
            </div>
          ) : (
            <ul className="flex flex-col gap-3 mt-4">
              {faqs
                .filter(
                  (faq) =>
                    !domain.faqs?.some((f) => f.id === faq.id) && !faq.domainId
                )
                .map((faq, i) => (
                  <motion.li
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => addFaqToDomain(faq)}
                    className="p-4 border border-[#d6ccc2]/60 rounded-lg bg-white/70 backdrop-blur-sm cursor-pointer hover:bg-[#fff9eb] hover:shadow-md transition-all duration-200"
                  >
                    <p className="font-semibold text-[#3a2d28]">
                      {faq.question}
                    </p>
                    <p className="text-sm text-[#8c6f60] mt-1">
                      {faq.text?.slice(0, 90)}...
                    </p>
                  </motion.li>
                ))}
            </ul>
          )}

          <DialogFooter className="flex justify-end mt-4">
            <DialogTrigger asChild>
              <button className="bg-gray-200 hover:bg-gray-300 text-[#3a2d28] px-4 py-2 rounded-lg transition">
                Închide
              </button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
