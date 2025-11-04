"use client";
import React from "react";
import Editor from "@/components/custom/editor/Editor";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Article = {
  id?: number;
  title?: string;
  imageUrl?: string;
  content?: string;
  createdAt?: string;
  editable?: boolean;
};

export default function EditWrapperMobile(article: Article) {
  const router = useRouter();

  const handleEdit = async (data: {
    content: string;
    imageUrl: string;
    title: string;
  }): Promise<boolean> => {
    try {
      const response = await fetch(
        article.editable ? `/api/posts/id/${article.id}` : `/api/posts`,
        {
          method: article.editable ? "PATCH" : "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.ok;
    } catch (err) {
      console.error("Network error:", err);
      return false;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] text-[#3a2d28] pb-24">
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-[#d6ccc2]/60 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#8c6f60] hover:text-[#3a2d28] transition active:scale-95"
        >
          <FaArrowLeft />
          <span className="font-semibold">Înapoi</span>
        </button>

        <h1 className="text-lg font-bold text-[#3a2d28]">
          {article.editable ? "Editează articolul" : "Articol nou"}
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto px-3 pt-5"
      >
        <div className="bg-white/90 backdrop-blur-sm border border-[#e8ddd4]/60 rounded-2xl shadow-lg p-4">
          <Editor
            id={article.id}
            initialContent={article.content}
            initialTitle={article.title}
            initialImageUrl={article.imageUrl}
            onSave={handleEdit}
            editable={article.editable}
          />
        </div>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-[#a48374] hover:bg-[#8c6f60] text-white font-semibold px-5 py-3 rounded-full shadow-lg active:scale-95 transition-all"
        onClick={() => {
          const form = document.querySelector("form");
          form?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
      >
        <FaSave />
        <span>Salvează</span>
      </motion.button>
    </div>
  );
}
