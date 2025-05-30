import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost, Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"]
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono.className} antialiased scroll-smooth `}
      >
        {children}
      </body>
    </html>
  );
}
