"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "@/components/Loader";
import LawyerAddForm from "./LawyerAddForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Notiflix from "notiflix";

type Lawyer = {
  id: number;
  name: string;
  photo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function AboutList() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const fetchLawyers = async () => {
    try {
      const res = await fetch("/api/about");
      if (!res.ok) throw new Error("Eroare la fetch avocați");
      const data = await res.json();
      setLawyers(data);
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Eroare la încărcarea avocaților!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/about/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Eroare la ștergere");
      setLawyers((prev) => prev.filter((l) => l.id !== id));
      Notiflix.Notify.success("Avocat șters cu succes!");
    } catch {
      Notiflix.Notify.failure("A apărut o eroare la ștergere.");
    }
  };

  const handleEdit = (lawyer: Lawyer, index: number) => {
    setEditingLawyer(lawyer);
    setFormOpen(false);
    setHighlightIndex(index);

    setTimeout(() => {
      const el = document.getElementById(`lawyer-card-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    setTimeout(() => setHighlightIndex(null), 1200);
  };

  const handleFormSuccess = () => {
    fetchLawyers();
    setEditingLawyer(null);
    setFormOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader sizeClass="w-16 h-16" color="fill-[#9c6b56]" />
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] rounded-xl shadow-inner px-6 py-12 flex flex-col gap-10 text-[#2c1d16]"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Despre echipă</h1>
        <p className="text-sm text-[#6b5446]">
          Gestionează informațiile despre avocații firmei.
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col gap-12 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 lg:p-10 border border-[#d1b9a9]/60">
        {lawyers.map((lawyer, idx) => {
          const isEven = idx % 2 === 0;
          const isEditing = editingLawyer?.id === lawyer.id;

          return (
            <motion.div
              id={`lawyer-card-${idx}`}
              key={lawyer.id}
              layout
              className={`relative flex flex-col lg:flex-row ${
                !isEven && "lg:flex-row-reverse"
              } items-start gap-8 border-b border-[#d1b9a9]/40 pb-10`}
            >
              <AnimatePresence>
                {highlightIndex === idx && (
                  <motion.div
                    layoutId="highlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-2xl ring-2 ring-[#9c6b56]/40 animate-pulse pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {isEditing ? (
                <LawyerAddForm
                  editLawyer={editingLawyer}
                  onClose={() => setEditingLawyer(null)}
                  onSuccess={handleFormSuccess}
                  formIndex={idx}
                />
              ) : (
                <>
                  <div className="relative w-full lg:w-1/3">
                    <Image
                      src={lawyer.photo}
                      alt={lawyer.name}
                      width={400}
                      height={480}
                      className="rounded-2xl object-cover shadow-xl border border-[#d1b9a9]/40"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-4 text-[#2c1d16]">
                    <h2 className="text-2xl font-semibold">
                      Avocat {lawyer.name}
                    </h2>
                    <p className="text-base leading-relaxed whitespace-pre-line">
                      {lawyer.description}
                    </p>

                    <div className="flex gap-4 mt-4 flex-wrap">
                      <button
                        onClick={() => handleEdit(lawyer, idx)}
                        className="flex items-center gap-2 text-sm bg-[#9c6b56] text-white px-4 py-2 rounded-md hover:bg-[#835745] transition"
                      >
                        <FaEdit /> Editează
                      </button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex items-center gap-2 text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                            <FaTrash /> Șterge
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-xl">
                          <DialogHeader>
                            <DialogTitle>Confirmare ștergere</DialogTitle>
                            <DialogDescription>
                              Sigur vrei să ștergi avocatul{" "}
                              <strong>{lawyer.name}</strong>? Această acțiune
                              este permanentă.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex justify-end gap-2">
                            <button
                              onClick={() => handleDelete(lawyer.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition"
                            >
                              Confirmă
                            </button>
                            <DialogTrigger asChild>
                              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg cursor-pointer transition">
                                Anulează
                              </button>
                            </DialogTrigger>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}

        <div className="flex flex-col gap-5">
          <button
            className="bg-[#9c6b56] text-white font-semibold w-fit px-6 py-3 rounded-lg hover:bg-[#835745] transition active:scale-95"
            onClick={() => {
              setFormOpen(!formOpen);
              setEditingLawyer(null);
              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            + Adaugă avocat
          </button>

          {formOpen && (
            <LawyerAddForm
              onClose={() => setFormOpen(false)}
              onSuccess={handleFormSuccess}
              formIndex={lawyers.length}
            />
          )}
        </div>
      </div>
    </motion.section>
  );
}
