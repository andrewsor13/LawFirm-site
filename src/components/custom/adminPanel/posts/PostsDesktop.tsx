"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan, FaPlus } from "react-icons/fa6";
import Notiflix from "notiflix";
import { useCustomSession } from "@/components/CustomSessionContext";
import { useDashboardContext } from "../dashboard/DashboardContext";
import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function PostsDesktop() {
  const { posts, refreshPosts, loading } = useDashboardContext();
  const { session } = useCustomSession();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/posts/id/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Eroare la ștergere");
      Notiflix.Notify.success("Articol șters cu succes!");
      await refreshPosts();
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Eroare la ștergere!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <Loader sizeClass="w-12 h-12" color="fill-[#a48374]" />
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] rounded-xl shadow-lg border border-[#e8ddd4]/60 mx-6 mt-10 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#3a2d28]">Articole</h2>
          <p className="text-[#8c6f60] font-medium">
            Total:{" "}
            <span className="text-[#a48374] font-semibold">
              {posts.length ?? 0}
            </span>
          </p>
        </div>

        {session?.user?.role === "admin" && (
          <Link
            href="/admin/posts/add-post"
            className="flex items-center gap-2 bg-[#a48374] hover:bg-[#8c6f60] text-white px-5 py-2 rounded-lg font-medium transition-all shadow-md active:scale-95"
          >
            <FaPlus size={16} />
            Adaugă articol
          </Link>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#d6ccc2]/70 bg-white/60 backdrop-blur-sm shadow-md">
        <Table className="w-full text-sm">
          <TableHeader className="bg-[#f5f0eb] text-[#3a2d28]">
            <TableRow className="border-b border-[#d6ccc2]/60">
              <TableHead>Titlu</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-center w-24">Comentarii</TableHead>
              <TableHead className="text-center w-32">Data</TableHead>
              <TableHead className="text-center w-16">Editare</TableHead>
              <TableHead className="text-center w-16">Ștergere</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#3a2d28]">
            {posts.map((post, i) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-[#d6ccc2]/50 hover:bg-[#fff9eb] transition-colors"
              >
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-[#a48374] hover:text-[#8c6f60] underline transition"
                  >
                    /blog/{post.slug}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {post._count?.comments ?? 0}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(post.createdAt).toLocaleDateString("ro-RO")}
                </TableCell>
                <TableCell className="text-center">
                  {session?.user?.role === "admin" ? (
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
                      target="_blank"
                      className="text-[#a48374] hover:text-[#8c6f60] transition"
                    >
                      <FaEdit size={18} />
                    </Link>
                  ) : (
                    <FaEdit size={18} className="text-gray-400 opacity-50" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {session?.user?.role === "admin" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-red-500 hover:text-red-700 transition">
                          <FaTrashCan size={18} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md rounded-xl bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] border border-[#d6ccc2]/60 shadow-2xl p-6">
                        <DialogHeader>
                          <DialogTitle className="text-[#3a2d28] font-bold">
                            Confirmă ștergerea
                          </DialogTitle>
                          <DialogDescription className="text-[#8c6f60] mt-1">
                            Sigur vrei să ștergi{" "}
                            <span className="font-semibold text-[#a48374]">
                              {post.title}
                            </span>
                            ? Acțiunea e ireversibilă.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                          >
                            Confirmă
                          </button>
                          <DialogClose asChild>
                            <button className="bg-gray-200 hover:bg-gray-300 text-[#3a2d28] px-4 py-2 rounded-lg transition cursor-pointer">
                              Anulează
                            </button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <FaTrashCan
                      size={18}
                      className="text-gray-400 cursor-not-allowed"
                    />
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
