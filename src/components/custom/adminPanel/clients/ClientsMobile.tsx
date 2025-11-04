"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";
import ModalClient from "./ModalClient";
import ClientDetails from "./ClientDetails";
import Link from "next/link";
import { useDashboardContext } from "../dashboard/DashboardContext";

export default function ClientsMobile() {
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

      await refreshClients();
      Notiflix.Notify.success(`Status actualizat pentru ${name}`);
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Nu s-a putut actualiza statusul");
    }
  };

  const filteredClients =
    filter === "new" ? clients?.filter((c) => !c.isReviewed) : clients;

  return (
    <div className="flex flex-col gap-5 p-4 pb-24 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] min-h-screen rounded-t-2xl">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-[#3a2d28] flex items-center justify-between">
          Clienți
          <ModalClient />
        </h2>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-[#d6ccc2]/50 flex justify-between items-center text-sm text-[#3a2d28]">
          <div>
            <p>
              Clienți noi:{" "}
              <span className="font-semibold text-[#a48374]">
                {clients?.filter((client) => !client.isReviewed).length ?? 0}
              </span>
            </p>
            <p>
              Total:{" "}
              <span className="font-semibold text-[#a48374]">
                {clients?.length ?? 0}
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-[#a48374] text-white shadow-md"
                : "bg-white text-[#3a2d28] border border-[#d6ccc2]/60"
            }`}
          >
            Toți clienții
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              filter === "new"
                ? "bg-[#a48374] text-white shadow-md"
                : "bg-white text-[#3a2d28] border border-[#d6ccc2]/60"
            }`}
          >
            Clienți noi
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader sizeClass="w-10 h-10" color="fill-[#a48374]" />
        </div>
      ) : filteredClients && filteredClients.length > 0 ? (
        <div className="flex flex-col gap-4 mt-2">
          {filteredClients.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border border-[#d6ccc2]/60 shadow-md p-4 relative flex flex-col gap-2 ${
                client.isReviewed ? "bg-white" : "bg-[#fff9eb]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-[#3a2d28]">
                    {client.name}
                  </p>
                  <Link
                    href={`mailto:${client.email}`}
                    className="text-sm text-[#8c6f60] hover:text-[#a48374] transition"
                  >
                    {client.email}
                  </Link>
                  <p className="text-sm text-[#8c6f60]">
                    Tel:{" "}
                    <Link
                      href={`tel:${client.phone}`}
                      className="underline text-[#a48374]"
                    >
                      {client.phone}
                    </Link>
                  </p>
                </div>

                <ClientDetails
                  client={client}
                  onToggleReviewed={toggleReviewed}
                />
              </div>

              <div className="flex flex-col text-sm text-[#3a2d28] mt-1">
                <p>Documente: {client.documents?.length ?? 0}</p>
                <p className="text-xs text-[#8c6f60] mt-1">
                  {new Date(client.createdAt).toLocaleDateString("ro-RO")}
                </p>
              </div>

              <div className="flex flex-col mt-2">
                <label className="text-sm text-[#3a2d28] font-medium mb-1">
                  Revizuit
                </label>
                <select
                  value={client.isReviewed ? "da" : "nu"}
                  onChange={(e) =>
                    toggleReviewed(
                      client.id,
                      e.target.value === "da",
                      client.name
                    )
                  }
                  className={`rounded-md px-3 py-2 text-sm border transition-all cursor-pointer ${
                    client.isReviewed
                      ? "bg-green-100 text-green-800 border-green-400"
                      : "bg-white text-[#3a2d28] border-[#d6ccc2]/70"
                  }`}
                >
                  <option value="nu">Nu</option>
                  <option value="da">Da</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#8c6f60] mt-6">
          Nu există clienți înregistrați.
        </p>
      )}
    </div>
  );
}
