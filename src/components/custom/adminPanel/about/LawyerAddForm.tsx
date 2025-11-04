"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";

type Lawyer = {
  id: number;
  name: string;
  photo: string;
  description: string;
};

interface Props {
  editLawyer?: Lawyer | null;
  onClose?: () => void;
  onSuccess?: () => void;
  formIndex?: number;
}

export default function LawyerAddForm({
  editLawyer = null,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState(editLawyer?.name || "");
  const [description, setDescription] = useState(editLawyer?.description || "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(editLawyer?.photo || "");
  const [hasPreview, setHasPreview] = useState(!!editLawyer?.photo);
  const [loading, setLoading] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!editLawyer;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (file) formData.append("file", file);
      if (deleteImage) formData.append("deleteImage", "true");

      const url = isEdit ? `/api/about/${editLawyer.id}` : "/api/about";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Eroare la salvare");

      Notiflix.Notify.success(
        isEdit ? "Avocat actualizat cu succes!" : "Avocat adăugat cu succes!"
      );
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch {
      Notiflix.Notify.failure("Eroare la salvare!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setHasPreview(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full bg-[#fff9f5]/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-[#d1b9a9]/50"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative w-full lg:w-1/3">
          {hasPreview ? (
            <div className="relative">
              <Image
                src={previewUrl}
                alt="Preview"
                width={350}
                height={420}
                className="rounded-2xl object-cover shadow-xl border border-[#d1b9a9]/50"
              />
              <button
                type="button"
                onClick={() => {
                  setHasPreview(false);
                  setFile(null);
                  setPreviewUrl("");
                  setDeleteImage(true);
                }}
                className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition"
                title="Șterge imaginea"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-[420px] flex flex-col items-center justify-center border-2 border-dashed border-[#d1b9a9]/60 rounded-2xl cursor-pointer bg-[#faf5f1] hover:bg-[#f2e5dc] transition"
            >
              <span className="text-[#9c6b56] text-lg">📷 Încarcă imagine</span>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Numele avocatului"
            required
            className="border-b-2 border-[#d1b9a9]/70 bg-transparent text-2xl font-semibold focus:border-[#9c6b56] outline-none transition"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrierea avocatului..."
            rows={8}
            required
            className="w-full border border-[#d1b9a9]/70 rounded-lg p-4 text-[#2c1d16] bg-white focus:ring-2 focus:ring-[#9c6b56]/40 focus:outline-none transition"
          />

          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#9c6b56] hover:bg-[#835745] text-white px-6 py-2 rounded-lg shadow-md transition active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <Loader sizeClass="w-5 h-5" color="fill-white" />
              ) : isEdit ? (
                "Salvează modificările"
              ) : (
                "Adaugă avocat"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow-sm transition"
            >
              Anulează
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
