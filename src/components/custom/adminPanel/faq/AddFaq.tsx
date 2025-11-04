"use client";

import { Domain } from "@/lib/types";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import FaqEditor from "./FaqEditor/FaqEditor";
import { useCustomSession } from "@/components/CustomSessionContext";
import Loader from "@/components/Loader";

export default function AddFaq() {
  const [title, setTitle] = useState("");
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainId, setDomainId] = useState<string | undefined>(undefined);
  const [isPublished, setIsPublished] = useState(false);
  const { session } = useCustomSession();
  const [contentHtml, setContentHtml] = useState("");
  const [contentText, setContentText] = useState("");

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await fetch("/api/domains?fields=basic");
        if (!res.ok) throw new Error("Nu s-au putut încărca domeniile");
        const data: Domain[] = await res.json();
        setDomains(data);
      } catch {
        Notiflix.Notify.failure("Eroare la încărcarea domeniilor!");
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/faq", {
        method: "POST",
        body: JSON.stringify({
          author: session?.user.name,
          email: session?.user.email,
          question: title,
          html: contentHtml,
          text: contentText,
          domainId: domainId ? parseInt(domainId) : undefined,
          isPublished,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Eroare la salvare!");

      Notiflix.Notify.success(
        isPublished
          ? "Întrebarea a fost publicată cu succes!"
          : "Întrebarea a fost salvată ca draft!"
      );

      setTitle("");
      setContentHtml("");
      setContentText("");
      setDomainId(undefined);
      setIsPublished(false);
    } catch {
      Notiflix.Notify.failure("Eroare la salvare!");
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-[#f7f3ef] to-[#ece2da] flex justify-center">
      <div className="max-w-5xl w-full px-5 py-10 text-[#2c1d16] overflow-visible">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Adaugă Întrebare Nouă
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader sizeClass="w-12 h-12" color="fill-[#9c6b56]" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white rounded-xl border border-[#d1b9a9]/60 shadow-lg p-6 md:p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium">
                Întrebare
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: Care sunt pașii pentru redactarea unui contract?"
                className="border border-[#d1b9a9]/70 text-[#2c1d16] bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Răspuns</label>
              <FaqEditor
                content={contentHtml}
                onChange={({ html, text }) => {
                  setContentHtml(html);
                  setContentText(text);
                  setIsPublished(isPublished);
                }}
              />
            </div>

            <div className="flex flex-col gap-2 w-fit">
              <label className="font-medium">Domeniu (opțional)</label>
              <Select onValueChange={(v) => setDomainId(v)} value={domainId}>
                <SelectTrigger className="w-fit border border-[#d1b9a9]/70 bg-white">
                  <SelectValue placeholder="Selectează un domeniu (opțional)" />
                </SelectTrigger>
                <SelectContent className="bg-white text-[#2c1d16]">
                  {domains.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="publish-switch"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <label htmlFor="publish-switch" className="font-medium">
                Publică această întrebare
              </label>
            </div>

            <Button
              type="submit"
              className="self-start bg-[#9c6b56] hover:bg-[#835745] text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95"
            >
              {isPublished ? "Salvează și Publică" : "Salvează"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
