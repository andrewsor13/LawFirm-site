"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "next/image";
import MenuBar from "./MenuBar";
import Popup from "./Popup";
import { X } from "lucide-react";
import { useCallback } from "react";

const DEFAULT_CONTENT = "<p>Scrie ceva aici...</p>";

interface Props {
  editable?: boolean;
  postId?: number;
  initialContent?: string;
  initialImageUrl?: string;
  initialTitle?: string;
  onSubmit: (data: {
    content: string;
    imageUrl: string;
    title: string;
  }) => Promise<boolean>;
}

export default function EditorComponent({
  postId,
  initialContent,
  initialImageUrl,
  initialTitle,
  onSubmit,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [localData, setLocalData] = useState({
    content: initialContent || DEFAULT_CONTENT,
    imageUrl: initialImageUrl || "",
    title: initialTitle || "",
  });

  const getStorageKey = useCallback(
    () => (postId ? `tiptap-post-${postId}` : "tiptap-draft-new"),
    [postId]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Link,
    ],
    content: localData.content,
    editorProps: {
      attributes: {
        class:
          "bg-[#fffaf7] text-[#3a2d28] p-5 min-h-[26rem] focus:outline-none whitespace-pre-wrap",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setLocalData((prev) => {
        const updated = { ...prev, content: html };
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          localStorage.setItem(getStorageKey(), JSON.stringify(updated));
        }, 400);
        return updated;
      });
    },
  });

  useEffect(() => {
    if (!editor) return;

    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocalData({
          content: parsed.content ?? initialContent ?? DEFAULT_CONTENT,
          imageUrl: parsed.imageUrl ?? initialImageUrl ?? "",
          title: parsed.title ?? initialTitle ?? "",
        });
        editor.commands.setContent(parsed.content ?? DEFAULT_CONTENT, false);
      } else {
        editor.commands.setContent(initialContent ?? DEFAULT_CONTENT, false);
      }
    } catch (e) {
      console.error("Eroare la încărcarea draftului:", e);
      editor.commands.setContent(initialContent ?? DEFAULT_CONTENT, false);
    } finally {
      setIsLoaded(true);
    }

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [editor, getStorageKey, initialContent, initialImageUrl, initialTitle]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await onSubmit(localData);
    if (success) {
      localStorage.removeItem(getStorageKey());
    }
  };

  const handleRemoveImage = () => {
    setLocalData((prev) => {
      const updated = { ...prev, imageUrl: "" };
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      return updated;
    });
  };

  if (!isLoaded || !editor) return null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="relative w-full">
        {localData.imageUrl ? (
          <div className="relative rounded-xl overflow-hidden h-72 border border-[#d6ccc2]/70 shadow-md group">
            <button
              type="button"
              className="w-full h-full"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src={
                  localData.imageUrl.startsWith("http") ||
                  localData.imageUrl.startsWith("/")
                    ? localData.imageUrl
                    : "https://placehold.co/600x400?text=Imagine+invalidă"
                }
                alt="Imagine articol"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="100vw"
              />
            </button>

            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition"
              aria-label="Șterge imaginea"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="border-2 border-dashed border-[#d6ccc2]/80 w-full h-72 rounded-xl text-[#8c6f60] hover:text-[#3a2d28] hover:border-[#a48374] transition flex flex-col gap-1 items-center justify-center font-medium"
          >
            <span className="text-2xl">＋</span>
            <span>Adaugă imagine</span>
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Titlul articolului"
        value={localData.title}
        onChange={(e) =>
          setLocalData((p) => {
            const updated = { ...p, title: e.target.value };
            localStorage.setItem(getStorageKey(), JSON.stringify(updated));
            return updated;
          })
        }
        className="p-3 rounded-lg border border-[#d6ccc2]/70 bg-white/90 text-[#3a2d28] text-lg font-semibold focus:ring-2 focus:ring-[#a48374] focus:border-[#a48374] outline-none transition-all"
      />

      <div className="rounded-xl border border-[#d6ccc2]/60 overflow-hidden shadow-sm">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(
              "preview-article",
              JSON.stringify({
                title: localData.title,
                content: localData.content,
                imageUrl: localData.imageUrl,
              })
            );
            setTimeout(() => {
              window.open("/admin/posts/preview", "_blank");
            }, 50);
          }}
          className="px-4 py-2 rounded-lg border border-[#d6ccc2]/80 text-[#3a2d28] hover:bg-[#f5f0eb]/70 transition"
        >
          Previzualizează
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-lg shadow-md transition active:scale-95"
        >
          Salvează
        </button>
      </div>

      {isOpen && (
        <Popup
          handleImgUrlChange={(url) =>
            setLocalData((prev) => {
              const updated = { ...prev, imageUrl: url };
              localStorage.setItem(getStorageKey(), JSON.stringify(updated));
              return updated;
            })
          }
          imageUrl={localData.imageUrl}
          setIsOpen={setIsOpen}
        />
      )}
    </form>
  );
}
