"use client";

import React from "react";
import { Comment } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FiEye } from "react-icons/fi";
import { Button } from "@/components/ui/button";

type Props = {
  comment: Comment;
  postSlug?: string;
  onApprove: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function CommentDetails({
  comment,
  postSlug,
  onApprove,
  onDelete,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-sm bg-[#a48374] text-white hover:bg-[#8c6f60] rounded-lg shadow-md px-3 py-2 transition"
        >
          <FiEye className="w-4 h-4" />
          Detalii
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-full max-w-[95vw] sm:max-w-xl 
          max-h-[85vh] overflow-y-auto
          bg-gradient-to-br from-[#3a2d28] to-[#5a473f]
          text-white rounded-2xl shadow-2xl border border-[#d6ccc2]/40 p-6
          scrollbar-thin scrollbar-thumb-[#a48374]/70 scrollbar-track-[#f5f0eb]/20
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#f5f0eb] border-b border-[#d6ccc2]/30 pb-2">
            Detalii comentariu
          </DialogTitle>
          <DialogDescription className="text-sm text-[#d6ccc2]/80 mt-2">
            Vizualizează conținutul complet al comentariului, autorul și
            articolul de proveniență. Poți aproba sau șterge dacă este necesar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-5">
          <div className="bg-black/20 p-4 rounded-xl border border-[#d6ccc2]/20">
            <p>
              <span className="font-semibold text-amber-300">Autor:</span>{" "}
              {comment.name}
            </p>
          </div>

          {comment.createdAt && (
            <div className="bg-black/20 p-4 rounded-xl border border-[#d6ccc2]/20">
              <p>
                <span className="font-semibold text-amber-300">Data:</span>{" "}
                {new Date(comment.createdAt).toLocaleString("ro-RO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}

          <div className="bg-black/20 p-4 rounded-xl border border-[#d6ccc2]/20">
            <p className="font-semibold text-amber-300 mb-2">Conținut:</p>
            <div className="whitespace-pre-line break-words leading-relaxed bg-black/30 p-3 rounded-lg border border-[#d6ccc2]/30">
              {comment.content}
            </div>
          </div>

          {postSlug && (
            <div className="bg-black/20 p-4 rounded-xl border border-[#d6ccc2]/20">
              <p>
                <span className="font-semibold text-amber-300">Articol:</span>{" "}
                <a
                  href={`/blog/${postSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400 hover:text-blue-300 transition"
                >
                  {postSlug}
                </a>
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex flex-wrap gap-3 justify-end">
          <Button
            onClick={() => onApprove(comment.id)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition shadow-md active:scale-95"
          >
            ✅ Aproba
          </Button>

          <Button
            onClick={() => onDelete(comment.id)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition shadow-md active:scale-95"
          >
            🗑️ Șterge
          </Button>

          <DialogClose asChild>
            <Button className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition shadow-md active:scale-95">
              Închide
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
