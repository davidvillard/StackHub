import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Github } from "lucide-react";
import Link from "next/link";
import ButtonGithubStar from "@/components/ui/button-star-github";

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
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/* Logo con animación de rebote */}
      <Image 
        src="/logo_freestack_white_96px.svg" 
        alt="Freestack" 
        className="animate-bounceSlow"
        width={363}
        height={361}
      />
      
      {/* Título principal */}
      <h1 className="text-5xl font-bold text-center mt-24 tracking-tight">
        Bienvenido a <span className="text-[#ffea00]">Free Stack</span>
      </h1>

      {/* Descripción */}
      <p className="text-xl text-center mt-6 text-neutral-300 max-w-xl leading-relaxed">
      Explora recursos de diseño y desarrollo web de alta calidad. Encuentra inspiración, mejora tus proyectos y crea sin límites.
      </p>

      {/* Botón de acción */}
      <Link href="https://github.com/davidvillard">
        <ButtonGithubStar/>
      </Link>
    </div>
  );
}
