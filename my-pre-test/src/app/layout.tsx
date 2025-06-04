import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import manifest from "./manifest";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

export const generateMetadata = async ({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const title = params.locale === "th" ? "แอปของฉัน" : "MyApp";
  const description =
    params.locale === "th" ? "โปรเจ็คสำหรับเว็บแอป" : "Project for web app";
  return {
    ...manifest,
    title,
    description,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.variable} font-sans antialiased`}>
        <Header />
        <main className="flex-1 px-4 py-6 bg-gray-50 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
