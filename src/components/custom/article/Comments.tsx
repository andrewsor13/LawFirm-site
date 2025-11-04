"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import Notiflix from "notiflix";
import { Comment } from "@/lib/types";

type Props = {
  postId: number;
};

const fetcher = async (url: string): Promise<Comment[]> => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Eroare la încărcarea comentariilor");
  }

  return data;
};

export default function Comments({ postId }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [active, setIsActive] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const { data: session } = useSession();

  const { data: comments, mutate } = useSWR<Comment[]>(
    `/api/comments?postId=${postId}&isAccepted=true`,
    fetcher
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      Notiflix.Notify.failure("Completează numele și mesajul.");
      return;
    }
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        name,
        content: message,
        postId,
        isAccepted: false,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setName("");
      setMessage("");
      setIsActive(false);
      mutate();
      Notiflix.Notify.success("Comentariu trimis către aprobare!");
    } else {
      const data = await res.json();
      Notiflix.Notify.failure(
        data.error || "Eroare la trimiterea comentariului"
      );
    }
  };

  const handleReply = async (
    e: React.FormEvent<HTMLFormElement>,
    commentId: number
  ) => {
    e.preventDefault();
    if (!reply.trim()) {
      Notiflix.Notify.failure("Răspunsul nu poate fi gol.");
      return;
    }
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        name: session ? "Avocat Alexandra Gogoloș" : "Anonim",
        content: reply,
        postId,
        parentId: commentId,
        isAccepted: true,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setReply("");
      setActiveReplyId(null);
      mutate();
      Notiflix.Notify.success("Răspuns trimis!");
    } else {
      const data = await res.json();
      Notiflix.Notify.failure(data.error || "Eroare la trimiterea răspunsului");
    }
  };

  return (
    <div className="flex flex-col mt-16">
      <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">
        Comentarii ({Array.isArray(comments) ? comments.length : 0})
      </h3>

      <button
        onClick={() => setIsActive(!active)}
        className="w-fit rounded-lg px-5 py-2 text-sm font-semibold bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-hover)] transition-all"
      >
        Adaugă un comentariu
      </button>

      <AnimatePresence>
        {active && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:w-4/5 bg-[var(--color-background)]/95 border border-[var(--color-primary)] rounded-xl p-5 flex flex-col gap-4 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Nume</label>
              <input
                className="rounded-md bg-[var(--color-container)] text-[var(--color-text)] p-2"
                placeholder="Nume..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Comentariu</label>
              <textarea
                className="rounded-md bg-[var(--color-container)] text-[var(--color-text)] p-2"
                placeholder="Lasă un comentariu..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="self-start rounded-md px-4 py-2 bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-hover)] transition-all"
            >
              Trimite
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-8 space-y-6">
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[var(--color-container)]/70 rounded-xl p-5 shadow-md"
            >
              <p className="font-semibold text-[var(--color-text)]">
                {comment.name}
              </p>
              <p className="text-[var(--color-text)] mt-1">{comment.content}</p>

              {session && (
                <div className="mt-3">
                  <button
                    onClick={() =>
                      setActiveReplyId((prev) =>
                        prev === comment.id ? null : comment.id
                      )
                    }
                    className="text-sm rounded-md px-3 py-1 bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-hover)] transition-all"
                  >
                    Răspunde
                  </button>
                </div>
              )}

              <AnimatePresence>
                {activeReplyId === comment.id && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => handleReply(e, comment.id)}
                    className="mt-4 pl-4 border-l-4 border-[var(--color-accent)] space-y-3"
                  >
                    <textarea
                      className="w-full rounded-md bg-[var(--color-container)] text-[var(--color-text)] p-2"
                      placeholder="Lasă un răspuns..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="rounded-md px-4 py-2 bg-[var(--color-primary)] text-[var(--color-background)] hover:bg-[var(--color-hover)] transition-all"
                    >
                      Trimite răspuns
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-[var(--color-accent)] space-y-3">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-[var(--color-background)]/80 rounded-lg p-3"
                    >
                      <p className="font-semibold text-[var(--color-text)]">
                        {reply.name}
                      </p>
                      <p className="text-[var(--color-text)] mt-1">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
