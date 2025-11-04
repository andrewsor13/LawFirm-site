"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Notiflix from "notiflix";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useCustomSession } from "@/components/CustomSessionContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function DomainsDesktop() {
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
    <div className="p-6 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg border border-[#e8ddd4]/60 mx-6 mt-10 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col">
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

      <div className="overflow-x-auto rounded-xl border border-[#d6ccc2]/70 bg-white/60 backdrop-blur-sm shadow-md">
        <Table className="w-full text-sm">
          <TableHeader className="bg-[#f5f0eb] text-[#3a2d28]">
            <TableRow className="border-b border-[#d6ccc2]/60">
              <TableHead className="font-bold py-3 px-4 text-left">
                Icon / Titlu
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-left">
                Slug
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-center w-32">
                Data creare
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-center w-16">
                Editare
              </TableHead>
              <TableHead className="font-bold py-3 px-4 text-center w-16">
                Ștergere
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#3a2d28]">
            {domains?.map((domain, i) => {
              const Icon = iconMap[domain.icon] || FaRegCheckCircle;
              return (
                <motion.tr
                  key={domain.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-[#d6ccc2]/50 hover:bg-[#fff9eb] transition-colors"
                >
                  <TableCell className="py-3 px-4 font-medium truncate">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-[#a48374]" />
                      {domain.title}
                    </div>
                  </TableCell>

                  <TableCell className="py-3 px-4 truncate">
                    <Link
                      target="_blank"
                      href={`/domenii-de-practica/${domain.slug}`}
                      className="text-[#a48374] hover:text-[#8c6f60] underline transition"
                    >
                      /domenii-de-practica/{domain.slug}
                    </Link>
                  </TableCell>

                  <TableCell className="py-3 px-4 text-center">
                    {domain.createdAt
                      ? new Date(domain.createdAt).toLocaleDateString("ro-RO")
                      : "-"}
                  </TableCell>

                  <TableCell className="py-3 px-4 text-center">
                    <div className="flex justify-center items-center">
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
                    </div>
                  </TableCell>

                  <TableCell className="py-3 px-4 text-center">
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
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
