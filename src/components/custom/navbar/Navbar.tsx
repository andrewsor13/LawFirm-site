import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const navLinks = [
    { label: "Acasa", path: "/" },
    { label: "Despre", path: "/despre" },
    { label: "Domenii de practică", path: "/domenii-de-practica" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return <NavbarClient session={session} navLinks={navLinks} />;
}
