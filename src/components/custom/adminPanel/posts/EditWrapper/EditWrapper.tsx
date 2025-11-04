"use client";
import React from "react";
import Editor from "@/components/custom/editor/Editor";

type Article = {
  id?: number;
  title?: string;
  imageUrl?: string;
  content?: string;
  createdAt?: string;
  editable?: boolean;
};

export default function EditWrapper(article: Article) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] py-10 flex justify-center px-4">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-md border border-[#e8ddd4]/60 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <header className="flex justify-between items-center border-b border-[#d6ccc2]/60 pb-4">
          <h1 className="text-2xl font-bold text-[#3a2d28]">
            {article.editable
              ? "✏️ Editează articolul"
              : "📰 Creează articol nou"}
          </h1>
          {article.createdAt && (
            <p className="text-[#8c6f60] text-sm">
              {new Date(article.createdAt).toLocaleDateString("ro-RO")}
            </p>
          )}
        </header>

        <Editor
          id={article.id}
          initialContent={article.content}
          initialTitle={article.title}
          initialImageUrl={article.imageUrl}
          onSave={handleEdit}
          editable={article.editable}
        />
      </div>
    </div>
  );
}
