import { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";

export default function MenuBar({ editor }: { editor: Editor }) {
  const buttons = [
    {
      icon: <Heading1 />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 />,
      cmd: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: () => editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold />,
      cmd: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive("bold"),
    },
    {
      icon: <Italic />,
      cmd: () => editor.chain().focus().toggleItalic().run(),
      active: () => editor.isActive("italic"),
    },
    {
      icon: <Underline />,
      cmd: () => editor.chain().focus().toggleUnderline().run(),
      active: () => editor.isActive("underline"),
    },
    {
      icon: <AlignLeft />,
      cmd: () => editor.chain().focus().setTextAlign("left").run(),
      active: () => editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter />,
      cmd: () => editor.chain().focus().setTextAlign("center").run(),
      active: () => editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight />,
      cmd: () => editor.chain().focus().setTextAlign("right").run(),
      active: () => editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List />,
      cmd: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered />,
      cmd: () => editor.chain().focus().toggleOrderedList().run(),
      active: () => editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 bg-[#f5f0eb] border border-[#d6ccc2]/70 rounded-t-xl p-3">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.cmd}
          className={`p-2 rounded-lg transition ${
            btn.active()
              ? "bg-[#a48374] text-white shadow-sm"
              : "text-[#3a2d28] hover:bg-[#e8ddd4]"
          }`}
        >
          <span className="w-5 h-5">{btn.icon}</span>
        </button>
      ))}
    </div>
  );
}
