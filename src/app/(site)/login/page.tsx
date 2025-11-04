"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        Notiflix.Notify.failure("Email sau parolă incorectă");
      } else {
        router.push("/admin/dashboard");
        Notiflix.Notify.success("Logged in successfully");
      }
    } catch (error) {
      console.log("A apărut o eroare. Încearcă din nou.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen justify-center items-center flex">
      <div className="bg-white rounded-2xl p-10 flex flex-col justify-center items-center gap-5 w-4/5 max-w-sm sm:w-sm">
        <h2 className="text-black">Log In</h2>
        <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-black sm:text-xl">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 text-black sm:text-xl rounded-md p-1 placeholder:text-gray-300"
              placeholder="email@email.com"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black sm:text-xl">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-black sm:text-xl rounded-md p-1 placeholder:text-gray-300"
              placeholder="********"
            ></input>
          </div>
          <button
            type="submit"
            className="h-16 p-2 bg-[var(--color-primary)] sm:text-xl text-[var(--color-background)] hover:bg-[var(--color-hover)] active:bg-[var(--color-hover)] hover:cursor-pointer transition duration-200 ease-in-out rounded-lg "
          >
            {loading ? (
              <Loader sizeClass="w-10 h-10" color="fill-white" />
            ) : (
              <p>Log In</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
