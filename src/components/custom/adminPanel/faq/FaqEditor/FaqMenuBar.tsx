"use client";

import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  Link as LinkIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FaqMenuBar({ editor }: { editor: Editor | null }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editor) setUrl(editor.getAttributes("link").href || "");
  }, [editor]);

  if (!editor) return null;

  const saveLink = () => {
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
      .run();
  };

  const unsetLink = () => {
    setUrl("");
    editor.chain().focus().unsetLink().run();
  };

  const options = [
    {
      icon: <Heading1 size={16} />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 size={16} />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 size={16} />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold size={16} />,
      cmd: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <Italic size={16} />,
      cmd: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <Underline size={16} />,
      cmd: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      icon: <List size={16} />,
      cmd: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered size={16} />,
      cmd: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="w-full border-b border-[#d1b9a9]/60 bg-gradient-to-r from-[#f7f3ef] to-[#e8ddd4] rounded-t-lg shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-3 px-3 py-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={opt.cmd}
            className={`p-2 rounded-md transition-all duration-200 ${
              opt.active
                ? "bg-[#9c6b56] text-white shadow-sm"
                : "text-[#2c1d16] hover:bg-[#e0d2c7]"
            }`}
          >
            {opt.icon}
          </button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`p-2 rounded-md transition-all duration-200 ${
                editor.isActive("link")
                  ? "bg-[#9c6b56] text-white shadow-sm"
                  : "text-[#2c1d16] hover:bg-[#e0d2c7]"
              }`}
            >
              <LinkIcon size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-3 w-64 bg-white border border-[#d1b9a9]/70 rounded-lg shadow-xl">
            <DropdownMenuLabel className="text-[#2c1d16] font-semibold">
              Gestionează link
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://exemplu.com"
                className="text-[#2c1d16]"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-[#9c6b56] hover:bg-[#835745] text-white"
                  onClick={saveLink}
                  disabled={!url}
                >
                  Salvează
                </Button>
                {editor.getAttributes("link").href && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={unsetLink}
                  >
                    Șterge
                  </Button>
                )}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
