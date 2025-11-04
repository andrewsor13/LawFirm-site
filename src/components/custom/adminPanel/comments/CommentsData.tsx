"use client";

import React from "react";
import Link from "next/link";
import Notiflix from "notiflix";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import CommentDetails from "./CommentDetails";
import { FaCheck, FaTrashAlt, FaRegCommentDots } from "react-icons/fa";
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
import { useDashboardContext } from "../dashboard/DashboardContext";

export default function CommentsData() {
  const { comments, posts, loading, refreshComments } = useDashboardContext();

  const handleApproveComment = async (id: number) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAccepted: true }),
      });

      if (!res.ok) throw new Error("Eroare la aprobarea comentariului.");

      Notiflix.Notify.success("Comentariu aprobat!");
      await refreshComments();
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Eroare la aprobarea comentariului.");
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Eroare la ștergere");
      Notiflix.Notify.success("Comentariu șters!");
      await refreshComments();
    } catch (err) {
      console.error(err);
      Notiflix.Notify.failure("Eroare la ștergerea comentariului.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader sizeClass="w-16 h-16" color="fill-[#a48374]" />
      </div>
    );

  const pending = comments.filter((c) => !c.isAccepted);

  return (
    <div className="bg-white/90 backdrop-blur-md border border-[#d6ccc2]/70 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      <header className="flex items-center justify-between border-b border-[#d6ccc2]/60 pb-3">
        <h2 className="text-2xl font-bold text-[#3a2d28] flex items-center gap-3">
          <FaRegCommentDots className="text-[#a48374]" />
          Comentarii în așteptare
        </h2>
        <p className="text-[#8c6f60] font-medium">Total: {pending.length}</p>
      </header>

      {pending.length === 0 ? (
        <p className="text-center text-[#3a2d28]/70 font-medium py-10">
          Nu sunt comentarii noi de aprobat 🎉
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pending.map((item, i) => {
            const post = posts.find((p) => p.id === item.postId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative bg-gradient-to-br from-[#fefcfb] to-[#f4ede6] border border-[#d6ccc2]/60 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-[#3a2d28] break-words">
                      {item.name}
                    </h3>
                    <CommentDetails
                      comment={item}
                      postSlug={post?.slug}
                      onApprove={handleApproveComment}
                      onDelete={handleDeleteComment}
                    />
                  </div>

                  <p className="mt-3 text-[#3a2d28]/80 line-clamp-3 bg-[#fff]/70 p-3 rounded-lg border border-[#d6ccc2]/40">
                    {item.content}
                  </p>

                  {post && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-3 text-sm text-[#a48374] underline hover:text-[#8c6f60]"
                      target="_blank"
                    >
                      {post.title || post.slug}
                    </Link>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#d6ccc2]/60">
                  <button
                    onClick={() => handleApproveComment(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition active:scale-95"
                  >
                    <FaCheck size={14} />
                    Aproba
                  </button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition active:scale-95">
                        <FaTrashAlt size={14} />
                        Șterge
                      </button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md bg-gradient-to-br from-[#3a2d28] to-[#5a473f] text-white rounded-2xl shadow-2xl p-6 border border-[#d6ccc2]/40">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-[#f5f0eb] border-b border-[#d6ccc2]/40 pb-2">
                          Confirmare ștergere
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#d6ccc2]/90 mt-2">
                          Această acțiune este <strong>ireversibilă</strong>.
                          Confirmă doar dacă ești sigur că vrei să elimini
                          comentariul.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-5 bg-black/20 p-4 rounded-lg border border-[#d6ccc2]/30">
                        <p className="text-[#f5f0eb]/90">
                          <span className="font-semibold text-amber-300">
                            Comentariu:
                          </span>{" "}
                          {item.content.length > 120
                            ? item.content.slice(0, 120) + "..."
                            : item.content}
                        </p>
                      </div>

                      <DialogFooter className="mt-6 flex flex-wrap gap-3 justify-end">
                        <button
                          onClick={() => handleDeleteComment(item.id)}
                          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition active:scale-95"
                        >
                          Confirmă ștergerea
                        </button>

                        <DialogClose asChild>
                          <button className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition active:scale-95">
                            Anulează
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
