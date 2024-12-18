import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Footer from "@/components/root/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const jost = Jost({
  weight: ["100", "300", "500", "700", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Brewcode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
