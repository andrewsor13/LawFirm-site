"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  handleImgUrlChange: (url: string) => void;
  imageUrl: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Popup({
  handleImgUrlChange,
  imageUrl,
  setIsOpen,
}: Props) {
  const [url, setUrl] = useState(imageUrl ?? "");
  const ref = useRef<HTMLDivElement>(null);

  const handleApply = () => {
    handleImgUrlChange(url.trim());
    setIsOpen(false);
  };

  useEffect(() => {
    const handleCloseOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleCloseOutside);
    return () => document.removeEventListener("mousedown", handleCloseOutside);
  }, [ref, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-2/5 max-h-[85vh] bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-2xl shadow-2xl border border-[#d6ccc2]/60 p-6 overflow-y-auto"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[#a48374] hover:text-[#8c6f60] transition active:scale-95"
          aria-label="Închide fereastra"
        >
          <IoCloseCircleOutline size={32} />
        </button>

        <h2 className="text-xl font-bold text-[#3a2d28] mb-4 border-b border-[#d6ccc2]/60 pb-2">
          Adaugă sau schimbă imaginea articolului
        </h2>

        <div className="flex flex-col gap-4 mt-2">
          <label htmlFor="imageUrl" className="text-[#3a2d28] font-semibold">
            Link-ul imaginii
          </label>
          <input
            id="imageUrl"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Ex: https://site.ro/imagine.jpg"
            className="p-3 rounded-lg border border-[#d6ccc2]/70 bg-white/90 text-[#3a2d28] placeholder:text-[#8c6f60]/70 focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
          />

          {url && (
            <div className="mt-3 rounded-lg overflow-hidden border border-[#d6ccc2]/60 shadow-sm relative w-full h-48">
              <Image
                src={
                  url.startsWith("http") || url.startsWith("/")
                    ? url
                    : "https://placehold.co/600x400?text=Previzualizare+invalidă"
                }
                alt="Preview imagine articol"
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg border border-[#d6ccc2]/80 text-[#3a2d28] hover:bg-[#f5f0eb]/60 transition active:scale-95"
          >
            Anulează
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition active:scale-95"
          >
            Aplică imaginea
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
