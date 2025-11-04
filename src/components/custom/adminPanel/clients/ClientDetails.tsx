"use client";

import React from "react";
import { Client } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FiEye,
  FiMail,
  FiPhone,
  FiFileText,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  client: Client;
  onToggleReviewed?: (id: number, value: boolean, name: string) => void;
};

export default function ClientDetails({ client, onToggleReviewed }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center p-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition-all cursor-pointer"
          aria-label="Vezi detalii client"
        >
          <FiEye className="w-4 h-4" />
        </motion.button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl z-[70] bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] text-[#3a2d28] rounded-2xl shadow-2xl border border-[#e8ddd4]/60 p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4 border-b border-[#d6ccc2]/60 pb-3">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-[#3a2d28]">
            <FiUser className="text-[#a48374]" />
            Detalii client
          </DialogTitle>
          <DialogDescription className="text-[#8c6f60]">
            Toate informațiile legate de acest client.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm border border-[#d6ccc2]/50">
            <FiCalendar className="text-[#a48374]" />
            <p className="text-sm">
              <span className="font-semibold">Data înregistrării:</span>{" "}
              {new Date(client.createdAt).toLocaleString("ro-RO")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex items-center gap-2">
              <FiUser className="text-[#a48374]" />
              <span className="font-semibold">{client.name}</span>
            </div>

            <Link
              href={`mailto:${client.email}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex items-center gap-2 text-[#3a2d28] hover:bg-[#f5f0eb]/70 transition"
            >
              <FiMail className="text-[#a48374]" />
              <span>{client.email}</span>
            </Link>

            <Link
              href={`tel:${client.phone}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex items-center gap-2 text-[#3a2d28] hover:bg-[#f5f0eb]/70 transition"
            >
              <FiPhone className="text-[#a48374]" />
              <span>{client.phone}</span>
            </Link>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex items-center gap-2">
              <FiFileText className="text-[#a48374]" />
              <span>
                Documente: <strong>{client.documents?.length || 0}</strong>
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50">
            <p className="font-semibold text-[#3a2d28] mb-2">Mesaj:</p>
            <div className="whitespace-pre-line break-words text-sm leading-relaxed bg-[#f9f6f3] border border-[#d6ccc2]/50 rounded-xl p-3 max-h-48 overflow-y-auto">
              {client.message || "— Fără mesaj —"}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50">
            <p className="font-semibold text-[#3a2d28] mb-2">
              Fișiere încărcate:
            </p>
            {client.documents?.length ? (
              <div className="flex flex-wrap gap-2">
                {client.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.fileLink}
                    download={doc.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-[#a48374]/20 hover:bg-[#a48374]/30 text-[#3a2d28] text-sm font-medium border border-[#a48374]/40 transition"
                  >
                    {doc.fileName}
                  </a>
                ))}
              </div>
            ) : (
              <p className="italic text-[#8c6f60] text-sm">
                Niciun document încărcat.
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex items-center justify-between">
            <p className="font-semibold">Revizuit:</p>
            <select
              value={client.isReviewed ? "da" : "nu"}
              onChange={(e) =>
                onToggleReviewed &&
                onToggleReviewed(
                  client.id,
                  e.target.value === "da",
                  client.name
                )
              }
              className={`border rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer transition ${
                client.isReviewed
                  ? "bg-green-100 text-green-800 border-green-400"
                  : "bg-[#fff] text-[#3a2d28] border-[#d6ccc2]/60"
              }`}
            >
              <option value="nu">Nu</option>
              <option value="da">Da</option>
            </select>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button
              aria-label="Închide detalii client"
              className="bg-[#a48374] hover:bg-[#8c6f60] text-white font-medium rounded-lg px-4 py-2 transition shadow-md"
            >
              Închide
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
