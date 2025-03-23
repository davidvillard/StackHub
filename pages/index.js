import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Github } from "lucide-react";
import Link from "next/link";
import ButtonGithubStar from "@/components/ui/Button-star-github";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full px-4">
      <Image 
        src="/logo_freestack_white_96px.svg" 
        alt="Freestack" 
        className="animate-bounceSlow max-w-[80%] sm:max-w-[50%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] 2xl:max-w-[20%] mt-12"
        width={363}
        height={361}
        priority
      />
      
      <h1 className="text-3xl sm:text-5xl font-bold text-center mt-12 tracking-tight">
        Bienvenido a <span className="text-[#ffea00]">Free Stack</span>
      </h1>

      <p className="text-lg sm:text-xl text-center mt-4 text-neutral-300 max-w-lg">
        Explora recursos de diseño y desarrollo web de alta calidad. Encuentra inspiración, mejora tus proyectos y crea sin límites.
      </p>

      <Link href="https://github.com/davidvillard">
        <ButtonGithubStar />
      </Link>
    </div>
  );
}
