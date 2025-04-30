import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
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
    <div className="flex flex-col items-center justify-center w-full h-full px-6 py-10 sm:py-16 lg:py-20">
      <Image 
        src="/logo_freestack_white_96px.svg" 
        alt="Freestack"
        className="animate-bounceSlow w-auto h-auto max-w-[60%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%]"
        width={363}
        height={361}
        priority
      />

      <div className="flex flex-col items-center text-center gap-4 sm:gap-6 mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Bienvenido a <span className="text-[#ffea00]">Free Stack</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl text-wrap">
          Explora recursos de diseño y desarrollo web de alta calidad. Encuentra inspiración, mejora tus proyectos y crea sin límites.
        </p>

        <Link href="https://github.com/davidvillard">
          <ButtonGithubStar />
        </Link>
      </div>
    </div>
  );
}
