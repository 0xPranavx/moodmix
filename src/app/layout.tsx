import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { firaSans} from "@/app/font";




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
      
    <body className= {`${firaSans.className}   `}>{children}
      <Toaster />
      </body>
    </html>
  );
}
