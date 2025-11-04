import type { Metadata } from "next";
import Footer from "@/components/custom/footer/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FooterForm from "@/components/custom/footer/FooterContact";
import Navbar from "@/components/custom/navbar/Navbar";
import { ContactProvider } from "@/context/ContactContext";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Avocat Gogoloș Alexandra-Loredana",
  description: "Pagină de prezentare Avocat Gogoloș Alexandra-Loredana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ContactProvider>
        <header className="fixed z-40">
          <Navbar />
        </header>
        <main>
          <ScrollToTop />
          {children}
          <FooterForm />
        </main>
        <Footer />
      </ContactProvider>
    </div>
  );
}
