"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import ButtonGeneral from "@/components/ButtonGeneral";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useContact } from "@/hooks/useContact";

export default function FooterContact() {
  const { isActive } = useSiteSettings();
  const { contact, loading } = useContact();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const router = useRouter();
  const handleClick = () => router.push("/contact/#contactForm");

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const iconSize = 40;

  const phone = contact?.phone || "+40 700 000 000";
  const email = contact?.email || "avocat@avocat.ro";
  const address = contact?.address || "Str. Exemplu 10, București";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      id="contact-form"
      className="w-full relative border-t pb-10 border-[var(--color-hover)] min-h-[400px] flex items-center justify-center"
    >
      <Image
        className="object-cover brightness-40 -z-20 absolute blur-xs"
        alt="background"
        fill
        src="/images/background_courtroom.jpg"
      />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="relative w-32 h-32 m-8">
          <Image src="/logo_no_text.svg" alt="logo" fill />
        </div>

        {loading ? (
          <p className="text-gray-300">Se încarcă informațiile de contact...</p>
        ) : (
          <>
            <div className="hidden sm:flex flex-col gap-10 justify-center items-center">
              <motion.ul className="flex flex-col lg:flex-row gap-5 justify-center w-full max-w-3xl">
                <motion.li
                  variants={item}
                  className="flex-1 min-w-[220px] lg:-translate-y-[50%]"
                >
                  {isActive ? (
                    <div className="w-full flex items-center justify-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition">
                      <p className="text-2xl font-bold">Blog</p>
                    </div>
                  ) : (
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition"
                    >
                      <FaPhone
                        size={iconSize}
                        className="text-xl text-[var(--color-primary)]"
                      />
                      <span className="text-lg">{phone}</span>
                    </a>
                  )}
                </motion.li>

                <motion.li variants={item} className="flex-1 min-w-[220px]">
                  {isActive ? (
                    <a
                      href={`mailto:${email}`}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition"
                    >
                      <IoMdMail
                        size={iconSize}
                        className="text-2xl text-[var(--color-primary)]"
                      />
                      <span className="text-lg break-all">{email}</span>
                    </a>
                  ) : (
                    <div className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition">
                      <IoLocationOutline
                        size={iconSize}
                        className="text-2xl text-[var(--color-primary)]"
                      />
                      <span className="text-lg">{address}</span>
                    </div>
                  )}
                </motion.li>

                <motion.li
                  variants={item}
                  className="flex-1 min-w-[220px] lg:-translate-y-[50%]"
                >
                  {isActive ? (
                    <div className="w-full flex items-center justify-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition">
                      <p className="text-xl font-bold">Juridic</p>
                    </div>
                  ) : (
                    <a
                      href={`mailto:${email}`}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-600/80 shadow hover:shadow-lg hover:scale-[1.02] transition"
                    >
                      <IoMdMail
                        size={iconSize}
                        className="text-2xl text-[var(--color-primary)]"
                      />
                      <span className="text-lg break-all">{email}</span>
                    </a>
                  )}
                </motion.li>
              </motion.ul>

              {!isActive && (
                <button onClick={handleClick}>
                  <ButtonGeneral>Contactează Avocatul</ButtonGeneral>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:hidden gap-4 justify-center items-center w-full max-w-xs">
              <motion.ul
                className="flex flex-col gap-4 justify-center items-center w-full"
                variants={item}
                initial="hidden"
                animate="show"
              >
                <motion.li
                  variants={item}
                  className="w-full flex items-center justify-center p-3 rounded-xl bg-gray-600/80 shadow hover:shadow-lg transition"
                >
                  <p className="text-lg font-bold text-white tracking-wide">
                    Blog Juridic
                  </p>
                </motion.li>

                <motion.li
                  variants={item}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-600/80 shadow hover:shadow-lg transition"
                >
                  <IoMdMail
                    size={22}
                    className="text-[var(--color-primary)] flex-shrink-0"
                  />
                  <span className="text-md text-white break-all text-center">
                    {email}
                  </span>
                </motion.li>

                {!isActive && (
                  <motion.li
                    variants={item}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-600/80 shadow hover:shadow-lg transition"
                  >
                    <FaPhone
                      size={22}
                      className="text-[var(--color-primary)] flex-shrink-0"
                    />
                    <span className="text-md text-white text-center">
                      {phone}
                    </span>
                  </motion.li>
                )}
              </motion.ul>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}
