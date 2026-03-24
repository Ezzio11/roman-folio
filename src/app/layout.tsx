import type { Metadata } from "next";
import { Anton, Bebas_Neue, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  weight: ["400", "700", "900"],
  variable: "--font-barlow",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roman Reigns — Tribal Chief",
  description: "The official resume of Roman Reigns. Undisputed. Head of the Table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebasNeue.variable} ${inter.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <div className="noise" />
        <div className="tribal-texture" />
        {children}
      </body>
    </html>
  );
}
