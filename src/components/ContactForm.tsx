"use client";

import React, { useRef, useState } from "react";
import Notiflix from "notiflix";
import Loader from "./Loader";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSizeMB =
    files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingButton(true);

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      Notiflix.Notify.failure("Fișierele nu pot depăși 10MB.");
      setLoadingButton(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Eroare la trimitere");

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setFiles([]);
    } catch (error) {
      console.error("Error:", error);
      Notiflix.Notify.failure("Eroare la trimiterea formularului!");
    } finally {
      setLoadingButton(false);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-5 text-black"
          >
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-[#3a2d28] font-semibold mb-1 text-sm"
              >
                Nume
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[#3a2d28] font-semibold mb-1 text-sm"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-[#3a2d28] font-semibold mb-1 text-sm"
              >
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-[#3a2d28] font-semibold mb-1 text-sm"
              >
                Mesaj
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                className="p-3 rounded-md border border-[#d6ccc2]/70 bg-white focus:ring-2 focus:ring-[#a48374] outline-none transition-all resize-none"
              />
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const droppedFiles = Array.from(e.dataTransfer.files);
                setFiles((prev) => [...prev, ...droppedFiles]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-[#a48374] bg-[#a48374]/10"
                  : "border-[#d6ccc2]/70 hover:bg-[#f5f0eb]/50"
              }`}
            >
              <FiUpload className="mx-auto mb-2 text-[#a48374]" size={22} />
              <p className="text-sm text-[#3a2d28]">
                Trage fișierele aici sau{" "}
                <span className="font-semibold text-[#a48374] underline">
                  alege manual
                </span>
              </p>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="*/*"
                onChange={handleFilesChange}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-sm text-[#8c6f60]">
                  {files.length} fișier{files.length > 1 ? "e" : ""} — total:{" "}
                  {totalSizeMB.toFixed(2)} MB
                </p>
                <ul className="flex flex-col gap-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white border border-[#d6ccc2]/60 rounded-lg px-3 py-2 text-sm shadow-sm"
                    >
                      <span className="truncate text-[#3a2d28]">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="flex items-center gap-1 text-[#a48374] hover:text-white hover:bg-[#a48374] border border-[#a48374]/60 rounded-md px-2 py-1 text-xs transition-all"
                      >
                        <FiTrash2 size={12} />
                        Șterge
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-start gap-2 mt-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 accent-[#a48374]"
              />
              <label
                htmlFor="terms"
                className="text-[#3a2d28]/80 text-xs cursor-pointer leading-relaxed"
              >
                Sunt de acord cu{" "}
                <a
                  href="/termeni-si-conditii"
                  target="_blank"
                  className="underline text-[#a48374]"
                >
                  termenii și condițiile
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loadingButton}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all ${
                loadingButton
                  ? "bg-[#a48374]/60 cursor-not-allowed"
                  : "bg-[#a48374] hover:bg-[#8c6f60] active:scale-95"
              }`}
            >
              {loadingButton ? (
                <Loader sizeClass="w-6 h-6 mx-auto" color="fill-white" />
              ) : (
                "Trimite"
              )}
            </button>
          </motion.form>
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
              Mesaj trimis cu succes!
            </h3>
            <p className="text-gray-600 mb-6">
              Mulțumim pentru mesajul tău! Te vom contacta în cel mai scurt
              timp.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition active:scale-95"
            >
              Trimite un alt mesaj
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
