"use client";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import FaqDetails from "./FaqDetails";
import { useDashboardContext } from "../dashboard/DashboardContext";
import { Faq } from "@/lib/types";

export default function FaqMobile() {
  const { faqs, loading, refreshFaqs } = useDashboardContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "new" | "published" | "unpublished"
  >("new");

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Eroare la ștergere");
      await refreshFaqs();
      Notiflix.Notify.success("Întrebare ștearsă cu succes!");
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Eroare la ștergere!");
    }
  };

  const truncateText = (text: string, max = 120) =>
    text && text.length > max ? text.slice(0, max) + "..." : text;

  const hasContent = (faq: Faq) =>
    (faq.text && faq.text.trim() !== "") ||
    (faq.html && faq.html.trim() !== "");

  const searchedFaqs =
    faqs?.filter((faq) => {
      const searchLower = search.toLowerCase();
      return (
        faq.question.toLowerCase().includes(searchLower) ||
        faq.text?.toLowerCase().includes(searchLower)
      );
    }) ?? [];

  const filteredFaqs = (() => {
    switch (filter) {
      case "new":
        return searchedFaqs.filter((faq) => !hasContent(faq));
      case "published":
        return searchedFaqs.filter((faq) => faq.isPublished);
      case "unpublished":
        return searchedFaqs.filter((faq) => !faq.isPublished);
      default:
        return searchedFaqs;
    }
  })();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader sizeClass="w-10 h-10" color="fill-[#9c6b56]" />
      </div>
    );

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] rounded-xl shadow-inner flex flex-col gap-5 text-[#2c1d16]">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-[#2c1d16]">
          Întrebări Frecvente
        </h2>

        <Input
          placeholder="Caută întrebare..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[#d1b9a9]/70 bg-white text-[#2c1d16]"
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button
            className={`p-2 rounded-lg text-sm font-medium transition-all ${
              filter === "new"
                ? "bg-[#9c6b56] text-white shadow-sm"
                : "bg-white border border-[#d1b9a9]/70 text-[#2c1d16]"
            }`}
            onClick={() => setFilter("new")}
          >
            FAQ Noi
          </button>

          <button
            className={`p-2 rounded-lg text-sm font-medium transition-all ${
              filter === "published"
                ? "bg-green-700 text-white shadow-sm"
                : "bg-white border border-[#d1b9a9]/70 text-[#2c1d16]"
            }`}
            onClick={() => setFilter("published")}
          >
            Publicate
          </button>

          <button
            className={`p-2 rounded-lg text-sm font-medium transition-all ${
              filter === "unpublished"
                ? "bg-gray-600 text-white shadow-sm"
                : "bg-white border border-[#d1b9a9]/70 text-[#2c1d16]"
            }`}
            onClick={() => setFilter("unpublished")}
          >
            Nepublicate
          </button>

          <button
            className={`p-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-[#9c6b56] text-white shadow-sm"
                : "bg-white border border-[#d1b9a9]/70 text-[#2c1d16]"
            }`}
            onClick={() => setFilter("all")}
          >
            Toate
          </button>
        </div>

        <Link href="/admin/faq/add-faq" className="w-full">
          <Button className="w-full bg-[#9c6b56] hover:bg-[#835745] text-white font-medium rounded-lg shadow-md transition active:scale-95">
            + Adaugă Întrebare
          </Button>
        </Link>
      </div>

      {filteredFaqs.length === 0 ? (
        <p className="text-center text-[#7c6355] font-medium">
          Nicio întrebare găsită pentru filtrul selectat
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filteredFaqs.map((faq) => (
            <li
              key={faq.id}
              className="bg-white border border-[#e0d2c7]/70 rounded-lg p-4 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg leading-snug break-words text-[#2c1d16]">
                  {faq.question}
                </p>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      hasContent(faq)
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hasContent(faq) ? "Răspuns" : "Fără răspuns"}
                  </span>

                  <span
                    className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                      faq.isPublished
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {faq.isPublished ? "Publicat" : "Nepublicat"}
                  </span>
                </div>
              </div>
              <p
                className="text-sm text-[#4b3b34] truncate"
                title={faq.text || "Fără conținut"}
              >
                {truncateText(faq.text || "Fără conținut")}
              </p>
              <div className="flex flex-row gap-2">
                <p>Link:</p>
                {hasContent(faq) ? (
                  <Link
                    href={`/intrebari-frecvente/${faq.slug}`}
                    target="_blank"
                    className="text-[#9c6b56] hover:text-[#835745] text-sm underline transition w-fit"
                  >
                    {faq.slug}
                  </Link>
                ) : (
                  <i className="text-gray-400 text-sm">—</i>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <FaqDetails faq={faq} />

                {hasContent(faq) && (
                  <Link
                    href={`/admin/faq/edit/${faq.id}`}
                    className="flex items-center gap-1 text-[#9c6b56] hover:text-[#835745] transition"
                  >
                    <FaEdit size={18} /> Edit
                  </Link>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                      <FaTrashCan size={18} /> Șterge
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] rounded-xl bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] border border-[#d1b9a9]/60 shadow-xl">
                    <DialogHeader>
                      <DialogTitle className="text-[#2c1d16] font-bold">
                        Confirmă ștergerea
                      </DialogTitle>
                      <DialogDescription className="text-[#7c6355] mt-1">
                        Ești sigur că vrei să ștergi întrebarea{" "}
                        <span className="font-semibold text-[#9c6b56]">
                          {faq.question}
                        </span>
                        ? Această acțiune este ireversibilă.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
                      >
                        Confirmă
                      </button>

                      <DialogTrigger asChild>
                        <button className="bg-gray-200 hover:bg-gray-300 text-[#2c1d16] px-4 py-2 rounded-lg transition">
                          Anulează
                        </button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
