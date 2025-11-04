"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
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
import { Input } from "@/components/ui/input";
import { useDashboardContext } from "../dashboard/DashboardContext";
import FaqDetails from "./FaqDetails";
import { Faq } from "@/lib/types";

export default function FaqDesktop() {
  const { faqs, loading, refreshFaqs } = useDashboardContext();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<
    "all" | "new" | "published" | "unpublished"
  >("new");

  const itemsPerPage = 10;

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/faq/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Eroare la ștergere");
      await refreshFaqs();
      Notiflix.Notify.success("Întrebare ștearsă cu succes!");
    } catch {
      Notiflix.Notify.failure("Eroare la ștergere!");
    }
  };

  const truncateText = (text: string, maxLength = 100) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const hasContent = (faq: Faq) =>
    (faq.text && faq.text.trim() !== "") ||
    (faq.html && faq.html.trim() !== "");

  const searchedFaqs =
    faqs?.filter((faq) => {
      const s = search.toLowerCase();
      return (
        faq.question.toLowerCase().includes(s) ||
        faq.text?.toLowerCase().includes(s)
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

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader sizeClass="w-16 h-16" color="fill-[#9c6b56]" />
      </div>
    );

  return (
    <div className="h-screen bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] p-8 rounded-lg shadow-inner flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-[#2c1d16]">
          Întrebări Frecvente
        </h2>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <Input
            placeholder="Caută întrebare..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm bg-white border border-[#cbb6a8]/70 text-[#2c1d16] shadow-sm"
          />

          <Link href="/admin/faq/add-faq">
            <Button className="bg-[#9c6b56] hover:bg-[#835745] text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95 cursor-pointer">
              + Adaugă Întrebare
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            className={`py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
              filter === "new"
                ? "bg-[#9c6b56] text-white"
                : "bg-white border border-[#d1b9a9] text-[#2c1d16]"
            }`}
            onClick={() => {
              setFilter("new");
              setCurrentPage(1);
            }}
          >
            FAQ Noi
          </button>

          <button
            className={`py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
              filter === "published"
                ? "bg-green-700 text-white"
                : "bg-white border border-[#d1b9a9] text-[#2c1d16]"
            }`}
            onClick={() => {
              setFilter("published");
              setCurrentPage(1);
            }}
          >
            Publicate
          </button>

          <button
            className={`py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
              filter === "unpublished"
                ? "bg-gray-600 text-white"
                : "bg-white border border-[#d1b9a9] text-[#2c1d16]"
            }`}
            onClick={() => {
              setFilter("unpublished");
              setCurrentPage(1);
            }}
          >
            Nepublicate
          </button>

          <button
            className={`py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
              filter === "all"
                ? "bg-[#9c6b56] text-white"
                : "bg-white border border-[#d1b9a9] text-[#2c1d16]"
            }`}
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
          >
            Toate FAQ
          </button>
        </div>
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="flex justify-center items-center text-gray-600 italic py-10">
          Nu există întrebări pentru acest filtru.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#d1b9a9]/60 bg-white shadow-md">
          <Table className="w-full text-sm">
            <TableHeader className="bg-[#e0d2c7] text-[#2c1d16]">
              <TableRow className="border-b border-[#d1b9a9]/70">
                <TableHead className="text-center w-12">#</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Întrebare</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publicare</TableHead>
                <TableHead>Conținut</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-center">Detalii</TableHead>
                <TableHead className="text-center">Editare</TableHead>
                <TableHead className="text-center">Ștergere</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[#2c1d16]">
              {paginatedFaqs.map((faq, index) => (
                <TableRow
                  key={faq.id}
                  className="border-b border-[#e4d6cc]/60 hover:bg-[#fff9f3] transition-colors"
                >
                  <TableCell className="text-center font-semibold">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>

                  <TableCell className="text-[#a48374] font-bold">
                    {faq.author || <i>Anonim</i>}
                  </TableCell>

                  <TableCell>
                    {new Date(faq.createdAt).toLocaleDateString("ro-RO")}
                  </TableCell>

                  <TableCell className="font-medium truncate">
                    {faq.question}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        hasContent(faq)
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {hasContent(faq) ? "Răspuns" : "Fără răspuns"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        faq.isPublished
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {faq.isPublished ? "Publicat" : "Nepublicat"}
                    </span>
                  </TableCell>

                  <TableCell className="truncate">
                    {truncateText(faq.text || "") || (
                      <i className="text-[#8c6f60]">Fără conținut</i>
                    )}
                  </TableCell>

                  <TableCell className="truncate">
                    {hasContent(faq) ? (
                      <Link
                        href={`/intrebari-frecvente/${faq.slug}`}
                        target="_blank"
                        className="text-[#9c6b56] hover:text-[#835745] underline transition"
                      >
                        {faq.slug}
                      </Link>
                    ) : (
                      <i className="text-gray-400">—</i>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <FaqDetails faq={faq} />
                  </TableCell>

                  <TableCell className="text-center">
                    {hasContent(faq) ? (
                      <Link
                        href={`/admin/faq/edit/${faq.id}`}
                        className="inline-flex justify-center items-center text-[#9c6b56] hover:text-[#835745] transition"
                      >
                        <FaEdit size={18} />
                      </Link>
                    ) : (
                      <i className="text-gray-400 text-sm">—</i>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-red-600 hover:text-red-800 transition cursor-pointer">
                          <FaTrashCan size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-[500px] bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] border border-[#d1b9a9]/70 rounded-xl shadow-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-bold text-[#2c1d16]">
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

                        <DialogFooter className="flex justify-end gap-3 mt-6">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 text-[#2c1d16]">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Înapoi
          </Button>
          <span className="font-medium">
            Pagina {currentPage} din {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Înainte →
          </Button>
        </div>
      )}
    </div>
  );
}
