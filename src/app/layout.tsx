import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { firaSans} from "@/app/font";
import Image from "next/image";
import Logo from '@/components/icon'
import Link from "next/link";




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
      
    <body className= {`${firaSans.className} flex h-screen flex-col  m-2 justify-between`}>
      <nav className="flex justify-start items-center mt-2 m-2 ">
       <Logo width="40px" height="40px"/>
       <h1 className="text-xl font-bold mr-2">moodmix</h1>
      </nav>
      <div>{children}
      <Toaster /></div>
      <footer className="flex justify-start items-center p-4 w-full">
      
       <p className="text-md">Made with ♥ by <Link className="text-blue-400" href="https://x.com/0xPranavx">0xpranavx</Link>.</p>
      </footer>
   
      </body>
    </html>
  );
}
