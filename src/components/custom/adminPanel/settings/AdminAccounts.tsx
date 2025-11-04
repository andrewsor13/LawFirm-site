"use client";

import React, { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";
import Modal from "@/components/Modal";
import AccountForm from "./AccountForm";
import { motion } from "framer-motion";
import { FaUserShield, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

type Account = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminAccounts() {
  const { session } = useCustomSession();
  const currentUserId = session?.user?.id;

  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await fetch("/api/admin-accounts");
        if (!res.ok) throw new Error("Eroare la fetch");
        const data: Account[] = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure("Eroare la preluarea conturilor!");
      } finally {
        setLoading(false);
      }
    };
    getAccounts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin-accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAccounts((prev) => prev?.filter((acc) => acc.id !== id) || []);
        Notiflix.Notify.success("Cont șters cu succes!");
      } else {
        Notiflix.Notify.failure("Nu s-a putut șterge contul.");
      }
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Eroare la ștergere!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader sizeClass="w-1/4 h-1/4" color="fill-[#8c6f60]" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg border border-[#e8ddd4]/60 p-6 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b border-[#d6ccc2]/50 pb-3">
        <div className="flex items-center gap-3">
          <FaUserShield size={22} className="text-[#a48374]" />
          <h2 className="text-xl font-bold text-[#3a2d28]">Conturi Admin</h2>
        </div>
        <Modal
          dialogTrigger={
            <button
              className="flex items-center gap-2 bg-[#a48374] hover:bg-[#8c6f60] text-white px-4 py-2 rounded-md shadow-md transition-all"
              name="add-admin"
            >
              <FaPlusCircle />
              Adaugă cont
            </button>
          }
          dialogTitle={"Adaugă cont admin"}
          dialogDescription={"Completează detaliile pentru noul cont admin."}
          title="Adaugă cont"
          component={AccountForm}
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-[#f5f0eb] border-b border-[#e8ddd4]">
              <TableHead className="font-semibold text-[#3a2d28]">
                Nume
              </TableHead>
              <TableHead className="font-semibold text-[#3a2d28]">
                Email
              </TableHead>
              <TableHead className="font-semibold text-[#3a2d28]">
                Rol
              </TableHead>
              <TableHead className="text-right font-semibold text-[#3a2d28]">
                Acțiuni
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts && accounts.length > 0 ? (
              accounts.map((account) => (
                <TableRow
                  key={account.id}
                  className="hover:bg-[#f5f0eb]/70 transition-all border-b border-[#e8ddd4]/60"
                >
                  <TableCell className="font-medium text-[#3a2d28]">
                    {account.name}
                  </TableCell>
                  <TableCell className="text-[#3a2d28]/80">
                    {account.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        account.role === "admin"
                          ? "bg-[#a48374]/20 text-[#8c6f60]"
                          : "bg-[#cbad8d]/20 text-[#a48374]"
                      }`}
                    >
                      {account.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {account.id !== Number(currentUserId) ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm shadow-sm transition">
                            <FaTrashAlt size={13} /> Șterge
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white rounded-xl border border-[#e8ddd4]">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#3a2d28]">
                              Ești sigur că vrei să ștergi acest cont?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[#8c6f60]/80">
                              Acțiunea este permanentă și nu poate fi anulată.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-gray-100">
                              Anulează
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(account.id)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Confirmă
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <span className="italic text-[#a48374]/70 text-sm">
                        (Contul tău)
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-[#8c6f60]/70 py-6 italic"
                >
                  Nu există conturi admin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
