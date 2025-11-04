"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function ContactEditForm() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mapEmbed, setMapEmbed] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/contact");
        if (!res.ok) throw new Error("Eroare la fetch");
        const data = await res.json();
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setMapEmbed(data.mapEmbed || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email, address, mapEmbed }),
      });

      if (!res.ok) throw new Error("Eroare la salvare");
      alert("Datele de contact au fost actualizate cu succes!");
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la salvare!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="p-6 bg-white text-black rounded-lg justify-center items-center shadow-md mx-5 mt-10 flex flex-col gap-5">
        {loading ? (
          <Loader sizeClass="w-1/3 h-1/3" color="fill-black" />
        ) : (
          <form
            className="space-y-4 w-full max-w-2xl text-black p-6 rounded-xl"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Editează datele de contact
            </h2>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="p-3 rounded-xl border border-gray-200 shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] 
                  focus:border-[var(--color-primary)] transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded-xl border border-gray-200 shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] 
                  focus:border-[var(--color-primary)] transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Adresă
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="p-3 rounded-xl border border-gray-200 shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] 
                  focus:border-[var(--color-primary)] transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="mapEmbed"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Cod Embed Hartă (Google Maps)
              </label>
              <textarea
                id="mapEmbed"
                value={mapEmbed}
                onChange={(e) => setMapEmbed(e.target.value)}
                rows={3}
                className="p-3 rounded-xl border border-gray-200 shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] 
                  focus:border-[var(--color-primary)] transition"
              />
              <span className="text-xs text-gray-500 mt-3">
                Introdu doar ce conține <code>src</code> din iframe-ul Google
                Maps. Ex: <code>https://www.google.com/maps/embed?pb=...</code>
              </span>

              <div className="mt-4">
                {isValidUrl(mapEmbed) ? (
                  <iframe
                    className="w-full h-64 rounded-2xl shadow"
                    src={mapEmbed}
                    loading="lazy"
                  ></iframe>
                ) : (
                  <p className="text-sm text-gray-500 italic text-center">
                    Introdu un link valid pentru a vedea preview-ul hărții.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[var(--color-primary)] text-white 
                py-3 rounded-xl shadow-md font-semibold 
                hover:bg-[var(--color-primary)]/80 transition disabled:opacity-70"
              disabled={saving}
            >
              {saving ? (
                <Loader sizeClass="w-1/3 h-8" color="fill-white" />
              ) : (
                "Salvează"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
