"use client";

import React, { useState } from "react";
import Notiflix from "notiflix";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function AddFaqForm() {
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    question: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim()) {
      Notiflix.Notify.warning("Te rugăm să scrii o întrebare.");
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Notiflix.Notify.warning("Adresa de email nu este validă.");
      return;
    }
    if (!acceptedTerms) {
      Notiflix.Notify.warning(
        "Trebuie să accepți termenii și condițiile pentru a trimite întrebarea."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: formData.author || "Anonim",
          email: formData.email || null,
          question: formData.question,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        Notiflix.Notify.failure("A apărut o eroare. Încearcă din nou.");
      }
    } catch (error) {
      console.error(error);
      Notiflix.Notify.failure("Eroare la trimiterea formularului.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-white to-[#f9f9f9] border border-[#d6ccc2]/70 rounded-2xl shadow-lg p-8 text-[#3a2d28] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Pune o întrebare
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Ai nelămuriri? Pune o întrebare mai jos.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-black"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nume (opțional)
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Ex: Andrei Popescu"
                  className="w-full rounded-lg border border-[#d6ccc2]/60 px-4 py-2 focus:ring-2 focus:ring-[#a48374]/50 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email (opțional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemplu@email.com"
                  className="w-full rounded-lg border border-[#d6ccc2]/60 px-4 py-2 focus:ring-2 focus:ring-[#a48374]/50 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Întrebarea ta <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Scrie aici întrebarea ta..."
                  className="w-full rounded-lg border border-[#d6ccc2]/60 px-4 py-2 focus:ring-2 focus:ring-[#a48374]/50 outline-none transition resize-none"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 accent-[#a48374] w-4 h-4"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 leading-snug"
                >
                  Accept{" "}
                  <Link
                    href="/termeni-si-conditii"
                    target="_blank"
                    className="text-[#a48374] underline hover:text-[#8c6f60] transition"
                  >
                    termenii și condițiile
                  </Link>{" "}
                  site-ului.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#a48374] hover:bg-[#8c6f60] text-white font-semibold rounded-lg shadow-md transition active:scale-95 disabled:opacity-70"
              >
                {loading ? "Se trimite..." : "Trimite întrebarea"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed">
              * Răspunsul la întrebare{" "}
              <span className="font-semibold">nu este garantat</span>. Prin
              trimiterea formularului, accepți că întrebarea ta poate fi
              publicată pe site în secțiunea „Întrebări frecvente”.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <FaCheckCircle className="text-green-600 text-6xl mb-4" />
            </motion.div>

            <h3 className="text-2xl font-semibold text-[#3a2d28] mb-2">
              Întrebarea a fost trimisă!
            </h3>
            <p className="text-gray-600 mb-6">
              Mulțumim pentru contribuție. Vom analiza întrebarea ta cât mai
              curând.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition active:scale-95"
            >
              Trimite o altă întrebare
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
