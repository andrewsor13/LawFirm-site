"use client";
import Image from "next/image";
import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import AddFaqForm from "../faqs/AddFaqForm";
import Loader from "@/components/Loader";
import { useAppContext } from "@/context/AppContext";

const container = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function ContactMobile() {
  const { siteSettings, contact } = useAppContext();
  const blogMode = siteSettings?.blogMode ?? false;
  const hasContact = !!contact;

  return (
    <section className="relative min-h-screen">
      <Image
        className="object-cover -z-20 absolute blur-xs"
        alt="background courtroom"
        fill
        src="/images/background_courtroom.jpg"
      />

      <div className="w-full h-full bg-white/90 backdrop-blur py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative w-full max-w-5xl mx-auto px-6 space-y-10"
        >
          <h1 className="text-4xl font-bold text-center mt-15 text-[var(--color-primary)]">
            {blogMode ? "Întrebări" : "Contact"}
          </h1>

          {!hasContact ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center items-center min-h-[60vh]"
            >
              <Loader sizeClass="w-14 h-14" color="fill-[#a48374]" />
            </motion.div>
          ) : (
            <>
              {blogMode ? (
                <div className="flex flex-col items-center gap-10">
                  <motion.div variants={item} className="w-full rounded-2xl ">
                    <AddFaqForm />
                  </motion.div>

                  {contact.email && (
                    <motion.div
                      variants={item}
                      className="w-full bg-[#f5f0eb] border border-[#e0d2c7]/70 rounded-xl p-5 text-center shadow-inner"
                    >
                      <h3 className="text-lg font-semibold text-[#3a2d28] mb-2">
                        Ai nevoie de ajutor suplimentar?
                      </h3>
                      <p className="text-sm text-[#6b5446] mb-3">
                        Scrie-ne direct pe adresa:
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center justify-center gap-2 text-[#9c6b56] hover:text-[#835745] font-medium underline transition-all"
                      >
                        <IoMdMail className="text-xl" />
                        {contact.email}
                      </a>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-10 text-black">
                  <motion.ul
                    className="grid gap-6 sm:grid-cols-2"
                    variants={container}
                  >
                    {contact.phone && (
                      <motion.li variants={item}>
                        <a
                          href={`tel:${contact.phone}`}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-[1.02] transition"
                        >
                          <FaPhone className="text-2xl text-[var(--color-primary)]" />
                          <span className="text-lg">{contact.phone}</span>
                        </a>
                      </motion.li>
                    )}

                    {contact.email && (
                      <motion.li variants={item}>
                        <a
                          href={`mailto:${contact.email}`}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-[1.02] transition break-words"
                        >
                          <IoMdMail className="text-2xl text-[var(--color-primary)]" />
                          <span className="text-lg break-all">
                            {contact.email}
                          </span>
                        </a>
                      </motion.li>
                    )}

                    {contact.address && (
                      <motion.li variants={item} className="sm:col-span-2">
                        <div className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white shadow hover:shadow-lg hover:scale-[1.02] transition">
                          <IoLocationOutline className="text-2xl text-[var(--color-primary)]" />
                          <span className="text-lg">{contact.address}</span>
                        </div>
                      </motion.li>
                    )}
                  </motion.ul>

                  {contact.mapEmbed && (
                    <motion.div variants={item} className="w-full h-72 sm:h-96">
                      <iframe
                        className="w-full h-full rounded-2xl shadow"
                        src={contact.mapEmbed}
                        loading="lazy"
                      ></iframe>
                    </motion.div>
                  )}

                  <motion.div variants={item}>
                    <div className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition">
                      <ContactForm />
                    </div>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
