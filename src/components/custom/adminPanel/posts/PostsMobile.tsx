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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function PostsMobile() {
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
      <div className="flex justify-center py-20">
        <Loader sizeClass="w-10 h-10" color="fill-[#a48374]" />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] relative pb-28">
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#f5f0eb]/95 to-[#e8ddd4]/90 backdrop-blur-sm border-b border-[#d6ccc2]/60 shadow-sm px-4 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#3a2d28]">Articole</h2>
        {session?.user?.role === "admin" && (
          <Link
            href="/admin/posts/add-post"
            className="flex items-center gap-2 bg-[#a48374] hover:bg-[#8c6f60] text-white px-3 py-2 rounded-lg font-medium shadow-md transition active:scale-95"
          >
            <FaPlus size={14} />
            Adaugă
          </Link>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="px-4 py-5 flex flex-col gap-4 overflow-y-auto">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-md p-4 border border-[#d6ccc2]/70 flex flex-col gap-3"
            >
              <h3 className="font-bold text-lg text-[#3a2d28] truncate">
                {post.title}
              </h3>
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="text-[#a48374] hover:text-[#8c6f60] underline break-all"
              >
                /blog/{post.slug}
              </Link>

              <div className="text-sm text-[#3a2d28]/90 space-y-1">
                <p>
                  Comentarii:{" "}
                  <span className="font-semibold text-[#a48374]">
                    {post._count?.comments ?? 0}
                  </span>
                </p>
                <p>
                  Creat la:{" "}
                  <span className="text-[#8c6f60]">
                    {new Date(post.createdAt).toLocaleDateString("ro-RO")}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-5 mt-2">
                {session?.user?.role === "admin" ? (
                  <Link
                    href={`/admin/posts/edit/${post.slug}`}
                    target="_blank"
                    className="text-[#a48374] hover:text-[#8c6f60] transition"
                  >
                    <FaEdit size={20} />
                  </Link>
                ) : (
                  <FaEdit size={20} className="text-gray-400 opacity-50" />
                )}

                {session?.user?.role === "admin" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button>
                        <FaTrashCan
                          size={20}
                          className="text-red-500 hover:text-red-700 transition"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm rounded-xl bg-gradient-to-br from-[#f5f0eb] to-[#e8ddd4] border border-[#d6ccc2]/60 shadow-xl p-5">
                      <DialogHeader>
                        <DialogTitle className="text-[#3a2d28] font-bold text-lg">
                          Confirmă ștergerea
                        </DialogTitle>
                        <DialogDescription className="text-[#8c6f60] mt-1">
                          Sigur vrei să ștergi{" "}
                          <span className="font-semibold text-[#a48374]">
                            “{post.title}”
                          </span>
                          ? Acțiunea nu poate fi anulată.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end gap-3 mt-4">
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
                  <FaTrashCan size={20} className="text-gray-400 opacity-50" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#8c6f60] mt-10">
          Nu există articole momentan.
        </p>
      )}

      {session?.user?.role === "admin" && (
        <Link
          href="/admin/posts/add-post"
          className="fixed bottom-6 right-6 bg-[#a48374] hover:bg-[#8c6f60] text-white rounded-full p-4 shadow-lg transition active:scale-95"
        >
          <FaPlus size={20} />
        </Link>
      )}
    </div>
  );
}
