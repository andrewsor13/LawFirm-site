import type { Metadata } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { RootProviders } from "@/providers/RootProviders";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const MerriweatherFont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

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
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-V44599LPZS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V44599LPZS');
            `,
          }}
        />
      </head>
      <body
        className={`${OpenSans.className} ${MerriweatherFont.variable}  antialiased relative`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
