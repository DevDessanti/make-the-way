import "./globals.css";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Make the Way · Inteligência da Reforma Tributária",
  description: "Plataforma de inteligência da Reforma Tributária",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}