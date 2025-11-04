"use client";

import React, { useState, useId } from "react";
import { useCustomSession } from "@/components/CustomSessionContext";
import Notiflix from "notiflix";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import { RxAvatar } from "react-icons/rx";
import { FaRegEnvelope, FaKey, FaUserEdit } from "react-icons/fa";

export default function Account() {
  const { session } = useCustomSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const idPrefix = useId();

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      Notiflix.Notify.failure("Parolele nu corespund!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: password || undefined,
        }),
      });

      if (!res.ok) throw new Error("Eroare la actualizarea contului!");

      Notiflix.Notify.success("Profil actualizat cu succes!");
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Eroare la salvarea modificărilor!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg border border-[#e8ddd4]/60 p-6 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3 border-b border-[#d6ccc2]/50 pb-3">
        <FaUserEdit size={22} className="text-[#a48374]" />
        <h2 className="text-xl font-bold text-[#3a2d28]">
          Setările contului tău
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="bg-[#f5f0eb] w-16 h-16 rounded-xl flex items-center justify-center shadow-md border border-[#e8ddd4]">
            <RxAvatar size={36} className="text-[#8c6f60]" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
        </div>
        <div>
          <p className="text-[#3a2d28] font-semibold">{session?.user?.name}</p>
          <p className="text-[#8c6f60]/80 text-sm">{session?.user?.email}</p>
          <span className="text-xs font-medium text-[#a48374] bg-[#cbad8d]/20 px-2 py-0.5 rounded-full mt-1 inline-block">
            {session?.user?.role || "Utilizator"}
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="flex flex-col gap-5 mt-2 text-black"
      >
        <div className="flex flex-col">
          <label
            htmlFor={`${idPrefix}-account-name`}
            className="text-[#3a2d28] font-semibold mb-1"
          >
            Nume
          </label>
          <div className="relative">
            <FaUserEdit className="absolute left-3 top-3.5 text-[#a48374]/70" />
            <input
              id={`${idPrefix}-account-name`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full pl-10 p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:outline-none focus:ring-2 focus:ring-[#a48374] transition-all"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a48374] peer-focus:w-full transition-all"></span>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor={`${idPrefix}-account-email`}
            className="text-[#3a2d28] font-semibold mb-1"
          >
            Email
          </label>
          <div className="relative">
            <FaRegEnvelope className="absolute left-3 top-3.5 text-[#a48374]/70" />
            <input
              id={`${idPrefix}-account-email`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full pl-10 p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:outline-none focus:ring-2 focus:ring-[#a48374] transition-all"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a48374] peer-focus:w-full transition-all"></span>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor={`${idPrefix}-new-password`}
            className="text-[#3a2d28] font-semibold mb-1"
          >
            Parolă nouă
          </label>
          <div className="relative">
            <FaKey className="absolute left-3 top-3.5 text-[#a48374]/70" />
            <input
              id={`${idPrefix}-new-password`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lasă gol dacă nu vrei să o schimbi"
              className="peer w-full pl-10 p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:outline-none focus:ring-2 focus:ring-[#a48374] transition-all"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a48374] peer-focus:w-full transition-all"></span>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor={`${idPrefix}-confirm-new-password`}
            className="text-[#3a2d28] font-semibold mb-1"
          >
            Confirmă parola nouă
          </label>
          <div className="relative">
            <FaKey className="absolute left-3 top-3.5 text-[#a48374]/70" />
            <input
              id={`${idPrefix}-confirm-new-password`}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full pl-10 p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:outline-none focus:ring-2 focus:ring-[#a48374] transition-all"
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a48374] peer-focus:w-full transition-all"></span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all shadow-md ${
            loading
              ? "bg-[#a48374]/60 cursor-not-allowed"
              : "bg-[#a48374] hover:bg-[#8c6f60] active:scale-95"
          }`}
        >
          {loading ? (
            <Loader sizeClass="w-6 h-6 mx-auto" color="fill-white" />
          ) : (
            "Salvează modificările"
          )}
        </button>
      </form>
    </motion.div>
  );
}
