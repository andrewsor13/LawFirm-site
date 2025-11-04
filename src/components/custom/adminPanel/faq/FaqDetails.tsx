"use client";

import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";
import { Faq } from "@/lib/types";

interface FaqDetailsProps {
  faq: Faq;
}

export default function FaqDetails({ faq }: FaqDetailsProps) {
  const hasContent = (faq: Faq) =>
    (faq.text && faq.text.trim() !== "") ||
    (faq.html && faq.html.trim() !== "");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center p-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition-all cursor-pointer"
          aria-label="Vezi detalii client"
        >
          <FiEye className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-[90vw] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] rounded-2xl border border-[#d1b9a9]/60 shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#2c1d16] border-b border-[#d1b9a9]/50 pb-2">
            Detalii întrebare
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-[#2c1d16] text-sm">
          <p>
            <strong>Autor:</strong> {faq.author || "Anonim"}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {faq.email || <i className="text-gray-400">—</i>}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {new Date(faq.createdAt).toLocaleDateString("ro-RO")}
          </p>
          <p>
            <strong>Întrebare:</strong> {faq.question}
          </p>
          <p>
            <strong>Publicare:</strong>{" "}
            {faq.isPublished ? (
              <span className="text-green-700 font-medium">Publicat</span>
            ) : (
              <span className="text-gray-700 font-medium">Nepublicat</span>
            )}
          </p>
          <p>
            <strong>Conținut:</strong>{" "}
            {hasContent(faq) ? (
              <span>{faq.text}</span>
            ) : (
              <i className="text-gray-400">Nerăspuns</i>
            )}
          </p>
          {hasContent(faq) && (
            <p>
              <strong>Link:</strong>{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/intrebari-frecvente/${faq.slug}`}
                target="_blank"
                className="text-[#9c6b56] underline hover:text-[#835745]"
              >
                {faq.slug}
              </Link>
            </p>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-center gap-3 flex-wrap">
          {!hasContent(faq) && (
            <Link
              href={`/admin/faq/edit/${faq.id}`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Răspunde
            </Link>
          )}

          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-[#cbb6a8]/70 bg-[#9c6b56] text-white hover:bg-[#e4d6cc] hover:text-[#2c1d16] transition"
            >
              Închide
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
