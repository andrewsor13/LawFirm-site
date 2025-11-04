"use client";

import React, { useState } from "react";
import Notiflix from "notiflix";
import Loader from "@/components/Loader";
import { useCustomSession } from "@/components/CustomSessionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

export default function AccountForm() {
  const { session } = useCustomSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user.role !== "admin") {
      Notiflix.Notify.failure("Doar administratorii pot adăuga conturi!");
      return;
    }

    if (password !== confirmPassword) {
      Notiflix.Notify.failure("Parolele nu corespund!");
      return;
    }

    setLoadingButton(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const res = await fetch("/api/admin-accounts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Eroare la trimiterea formularului!");

      Notiflix.Notify.success("Cont adăugat cu succes!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("editor");
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("A apărut o eroare, încearcă din nou!");
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5 text-black bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] p-6 rounded-xl shadow-lg border border-[#e8ddd4]/60"
    >
      <div className="flex items-center gap-3 border-b border-[#d6ccc2]/50 pb-2">
        <FaUserPlus size={20} className="text-[#a48374]" />
        <h3 className="text-lg font-bold text-[#3a2d28]">Adaugă un cont nou</h3>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="new-account-name"
          className="text-[#3a2d28] font-semibold mb-1"
        >
          Nume
        </label>
        <input
          id="new-account-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="new-account-email"
          className="text-[#3a2d28] font-semibold mb-1"
        >
          Email
        </label>
        <input
          id="new-account-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="new-account-password"
          className="text-[#3a2d28] font-semibold mb-1"
        >
          Parolă
        </label>
        <input
          id="new-account-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="new-account-confirm-password"
          className="text-[#3a2d28] font-semibold mb-1"
        >
          Confirmă parola
        </label>
        <input
          id="new-account-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="new-account-role"
          className="text-[#3a2d28] font-semibold mb-1"
        >
          Rol
        </label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger
            id="new-account-role"
            className="w-full border border-[#d6ccc2]/70 bg-white rounded-md focus:ring-2 focus:ring-[#a48374] transition"
          >
            <SelectValue placeholder="Selectează un rol" />
          </SelectTrigger>
          <SelectContent className="bg-[#f5f0eb] text-[#3a2d28] font-medium border border-[#d6ccc2]/70">
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        disabled={loadingButton}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-all shadow-md ${
          loadingButton
            ? "bg-[#a48374]/60 cursor-not-allowed"
            : "bg-[#a48374] hover:bg-[#8c6f60] active:scale-95"
        }`}
      >
        {loadingButton ? (
          <Loader sizeClass="w-6 h-6 mx-auto" color="fill-white" />
        ) : (
          "Salvează contul"
        )}
      </button>
    </motion.form>
  );
}
