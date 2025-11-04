"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Notiflix from "notiflix";
import { useDashboardContext } from "../dashboard/DashboardContext";
import ClientDetails from "./ClientDetails";
import ModalClient from "./ModalClient";
import { FiUsers } from "react-icons/fi";
import Link from "next/link";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ClientsDesktop() {
  const { clients, refreshClients, loading } = useDashboardContext();
  const [filter, setFilter] = useState<"all" | "new">("all");

  const toggleReviewed = async (id: number, value: boolean, name: string) => {
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isReviewed: value }),
      });
      if (!res.ok) throw new Error("Eroare la actualizare");

      await refreshClients(); // 🔁 actualizează contextul global
      Notiflix.Notify.success(`Status actualizat pentru ${name}`);
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Nu s-a putut actualiza statusul");
    }
  };

  const filteredClients =
    filter === "new" ? clients.filter((c) => !c.isReviewed) : clients;

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader sizeClass="w-12 h-12" color="fill-[#a48374]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg mx-5 mt-10 flex flex-col gap-6 border border-[#e8ddd4]/60"
    >
      <div className="flex justify-between items-center border-b border-[#d6ccc2]/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#a48374]/20 p-2 rounded-xl">
            <FiUsers size={22} className="text-[#a48374]" />
          </div>
          <h2 className="text-2xl font-bold text-[#3a2d28]">Clienți</h2>
        </div>
        <ModalClient />
      </div>

      <div className="flex flex-wrap justify-between gap-4 text-[#3a2d28] text-sm font-medium">
        <div className="flex gap-6">
          <p>
            <span className="text-[#8c6f60]">Clienți noi:</span>{" "}
            {clients.filter((c) => !c.isReviewed).length}
          </p>
          <p>
            <span className="text-[#8c6f60]">Total:</span> {clients.length}
          </p>
        </div>

        <div className="flex gap-2">
          {["all", "new"].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key as "all" | "new")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                filter === key
                  ? "bg-[#a48374] text-white border-[#a48374]"
                  : "bg-white text-[#3a2d28] border-[#d6ccc2]/60"
              }`}
            >
              {key === "all" ? "Toți" : "Doar noi"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#d6ccc2]/60 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f5f0eb]/60 text-[#3a2d28]">
              <TableHead></TableHead>
              <TableHead>Nume</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Documente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Revizuit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="text-center">
                  <ClientDetails
                    client={client}
                    onToggleReviewed={toggleReviewed}
                  />
                </TableCell>
                <TableCell className="text-[#a48374] font-bold">
                  {client.name}
                </TableCell>
                <TableCell>
                  <Link
                    href={`mailto:${client.email}`}
                    className="text-[#a48374] hover:underline"
                  >
                    {client.email}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`tel:${client.phone}`}
                    className="text-[#a48374] hover:underline"
                  >
                    {client.phone}
                  </Link>
                </TableCell>
                <TableCell className="text-center text-[#a48374]">
                  {client.documents?.length || 0}
                </TableCell>
                <TableCell className="text-[#a48374]">
                  {new Date(client.createdAt).toLocaleDateString("ro-RO")}
                </TableCell>
                <TableCell>
                  <select
                    value={client.isReviewed ? "da" : "nu"}
                    onChange={(e) =>
                      toggleReviewed(
                        client.id,
                        e.target.value === "da",
                        client.name
                      )
                    }
                    className={`border rounded-md px-3 py-1 text-sm font-medium ${
                      client.isReviewed
                        ? "bg-green-100 text-green-800 border-green-400"
                        : "bg-white text-[#3a2d28] border-[#d6ccc2]/60"
                    }`}
                  >
                    <option value="nu">Nu</option>
                    <option value="da">Da</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
