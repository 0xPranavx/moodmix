import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "moodmix",
  description: "generate playlist through ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= "${inter.classname} m-0">{children}
      <Toaster />
      </body>
    </html>
  );
}
