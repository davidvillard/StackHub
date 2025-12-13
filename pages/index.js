import Image from "next/image";
import Link from "next/link";
import ButtonGithubStar from "../components/ui/button-star-github";
import SEO from "@/components/ui/Seo";

export default function Home() {
  return (
    <>
      <SEO
        title="StackHub - Recursos gratuitos para diseño web"
        description="Descubre más de 150 recursos gratuitos para diseñadores y desarrolladores: iconos, ilustraciones, fuentes, herramientas UI/UX y componentes. Todo organizado por categorías."
        keywords="recursos para diseñadores, recursos diseño web gratis, iconos gratis, ilustraciones gratis, fuentes tipográficas, herramientas UI UX, recursos desarrollo web, componentes React, plantillas diseño"
      />

      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 py-10">
        <Image
          src="/StackHub_3D.PNG"
          alt="StackHub - Plataforma de recursos gratuitos para diseñadores web"
          className="animate-bounceSlow w-auto h-auto max-w-[60%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%]"
          width={363}
          height={361}
          priority
        />

        <div className="flex flex-col items-center text-center gap-4 sm:gap-6 mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Bienvenido a <span className="text-[#ffea00]">StackHub</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-[20px] text-neutral-300 max-w-2xl text-wrap">
            Explora +150 recursos de diseño y desarrollo web de alta calidad. Encuentra iconos, ilustraciones, fuentes, herramientas UI/UX y componentes para tus proyectos creativos.
          </p>
        </div>

        <section className="mt-16 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-[#ffea00]">+150 Recursos</h2>
              <p className="text-neutral-400">Colección curada de recursos gratuitos para diseño web</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-[#ffea00]">13 Categorías</h2>
              <p className="text-neutral-400">Organizado por iconos, ilustraciones, fuentes, colores y más</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-[#ffea00]">100% Gratis</h2>
              <p className="text-neutral-400">Todos los recursos son gratuitos y de código abierto</p>
            </div>
          </div>
        </section>

        <Link href="https://github.com/davidvillard" aria-label="Visita el repositorio de StackHub en GitHub">
          <ButtonGithubStar />
        </Link>
      </div>
    </>
  );
}
