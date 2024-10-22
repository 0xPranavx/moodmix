import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { firaSans} from "@/app/font";
import Image from "next/image";
import Logo from '@/components/icon'
import Link from "next/link";




// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://moodmix-ai.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
 openGraph :{
  title: "moodmix",
  description: "Turn your Mood into the Perfect Spotify AI Playlist",
  siteName: 'moodmix',
 }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
    <body className= {`${firaSans.className} flex h-screen flex-col  m-2 justify-between`}>
      <nav className="flex justify-start items-center mt-2 m-2 p-2 border-b border-dashed border-neutral ">
       
      <Link href="/">
       <Logo width="40px" height="40px"/></Link>
       <Link href="/"> <h1 className="text-xl font-bold mr-2">moodmix</h1> </Link>
      </nav> 
      <div>{children}
      <Toaster /></div>
      <footer className="flex justify-start items-center p-4 w-full">
      
       <p className="text-md">Made with ♥ by <Link className="text-blue-400" href="https://x.com/0xPranavx">0xpranavx</Link> 
       . <Link className="text-blue-400" href="https://buymeacoffee.com/praanav9994" >buy me a coffee</Link> to support me.</p>
      </footer>
   
      </body>
    </html>
  );
}
