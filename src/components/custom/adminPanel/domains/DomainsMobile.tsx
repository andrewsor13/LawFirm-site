"use client";

import React from "react";
import Link from "next/link";
import Notiflix from "notiflix";
import { motion } from "framer-motion";
import { useCustomSession } from "@/components/CustomSessionContext";

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

import {
  FaGavel,
  FaBalanceScale,
  FaHandshake,
  FaRegCheckCircle,
} from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiPoliceOfficerHead, GiFamilyTree } from "react-icons/gi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { RiBankLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useAppContext } from "@/context/AppContext";

const iconMap: Record<string, React.ElementType> = {
  FaGavel,
  FaBalanceScale,
  FaHandshake,
  HiOutlineClipboardDocumentList,
  GiPoliceOfficerHead,
  GiFamilyTree,
  MdOutlineWorkOutline,
  BsPeopleFill,
  RiBankLine,
};

export default function DomainsMobile() {
  const { session } = useCustomSession();
  const { domains, refreshDomains } = useAppContext();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/domains/id/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Eroare la ștergere");
      Notiflix.Notify.success("Domeniu șters cu succes!");
      await refreshDomains();
    } catch {
      Notiflix.Notify.failure("Eroare la ștergere!");
    }
  };

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg border border-[#e8ddd4]/60 mx-3 mt-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#3a2d28]">
            Domenii juridice
          </h2>
          <p className="text-[#8c6f60] font-medium">
            Total:{" "}
            <span className="text-[#a48374] font-semibold">
              {domains?.length ?? 0}
            </span>
          </p>
        </div>
      </div>

      {domains && domains.length > 0 ? (
        <div className="flex flex-col gap-4">
          {domains.map((domain, i) => {
            const Icon = iconMap[domain.icon] || FaRegCheckCircle;
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/70 border border-[#d6ccc2]/70 backdrop-blur-sm rounded-xl shadow-md p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-[#a48374]" />
                    <h3 className="font-semibold text-[#3a2d28] text-lg">
                      {domain.title}
                    </h3>
                  </div>

                  <span className="text-sm text-[#8c6f60]">
                    {domain.createdAt
                      ? new Date(domain.createdAt).toLocaleDateString("ro-RO")
                      : "-"}
                  </span>
                </div>

                <Link
                  href={`/domenii-de-practica/${domain.slug}`}
                  target="_blank"
                  className="text-[#a48374] hover:text-[#8c6f60] underline break-words text-sm transition"
                >
                  /domenii-de-practica/{domain.slug}
                </Link>

                <div className="flex justify-end gap-4 mt-2">
                  {session?.user?.role === "admin" ? (
                    <Link
                      href={`/admin/domains/edit/${domain.slug}`}
                      target="_blank"
                      className="text-[#a48374] hover:text-[#8c6f60] transition"
                    >
                      <FaEdit size={18} />
                    </Link>
                  ) : (
                    <FaEdit
                      size={18}
                      className="text-gray-400 cursor-not-allowed"
                    />
                  )}

                  {session?.user?.role === "admin" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-red-500 hover:text-red-700 transition">
                          <FaTrashCan size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md rounded-xl bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] border border-[#d6ccc2]/60 shadow-2xl p-6">
                        <DialogHeader>
                          <DialogTitle className="text-[#3a2d28] text-lg font-bold">
                            Confirmă ștergerea
                          </DialogTitle>
                          <DialogDescription className="text-[#8c6f60] mt-1">
                            Ești sigur că vrei să ștergi domeniul{" "}
                            <span className="font-semibold text-[#a48374]">
                              {domain.title}
                            </span>
                            ? Această acțiune este ireversibilă.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => handleDelete(domain.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            Confirmă
                          </button>

                          <DialogClose asChild>
                            <button className="bg-gray-200 hover:bg-gray-300 text-[#3a2d28] px-4 py-2 rounded-lg transition cursor-pointer">
                              Anulează
                            </button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <FaTrashCan
                      size={18}
                      className="text-gray-400 cursor-not-allowed"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-[#8c6f60] italic">
          Nu există domenii juridice încă.
        </p>
      )}
    </div>
  );
}
