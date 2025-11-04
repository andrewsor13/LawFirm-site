"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import FaqMenuBar from "./FaqMenuBar";

type Props = {
  content: string;
  onChange: (data: { html: string; text: string }) => void;
};

export default function FaqEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        protocols: ["http", "https", "mailto"],
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange({
        html: editor.getHTML(),
        text: editor.getText(),
      });
    },
    editorProps: {
      attributes: {
        class:
          "bg-white p-5 text-black focus:outline-none min-h-[400px] lg:min-h-[600px] overflow-y-visible whitespace-pre-wrap rounded-b-lg",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm">
      {editor && <FaqMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
