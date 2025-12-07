// pages/[category].js
import { useRouter } from "next/router";
import resources from "@/data/resources";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import categorias from "@/data/categories";
import SEO from "@/components/ui/Seo";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">Cargando...</div>
      </div>
    );
  }

  const categoryResources = resources[category];

  if (!categoryResources) {
    return (
      <div className="p-8 ml-0 md:ml-32 mt-8 md:mt-0 min-h-screen">
        <SEO
          title="Categoría no encontrada"
          description="La categoría solicitada no existe en StackHub"
        />
        <div className="max-w-2xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-3 text-white">Categoría no encontrada</h1>
          <p className="text-zinc-500">
            No se encontraron recursos para &quot;{category}&quot;
          </p>
        </div>
      </div>
    );
  }

  const categoriaActual = categorias.find((cat) => cat.id === category);
  const nombreCategoria = categoriaActual ? categoriaActual.name : "Categoría no encontrada";
  const totalResources = categoryResources.length;

  const categoryDescriptions = {
    icons: `Descubre ${totalResources} iconos SVG gratuitos y minimalistas para tus proyectos de diseño web. Iconos vectoriales de alta calidad, personalizables y optimizados.`,
    illustrations: `Explora ${totalResources} ilustraciones gratis para diseño web. Recursos vectoriales de alta calidad para proyectos creativos y presentaciones.`,
    fonts: `Encuentra ${totalResources} fuentes tipográficas gratuitas para diseño web. Tipografías modernas y elegantes para tus proyectos creativos.`,
    colors: `Paletas de colores y herramientas de color para diseñadores. ${totalResources} recursos para crear combinaciones perfectas en tus diseños.`,
    tools: `${totalResources} herramientas gratuitas para diseño y desarrollo web. Recursos esenciales para diseñadores UI/UX y desarrolladores frontend.`,
    images: `Bancos de imágenes gratuitas y recursos fotográficos para diseño web. ${totalResources} fuentes de imágenes libres de derechos.`,
    videos: `Recursos de video gratuitos para proyectos creativos. ${totalResources} bancos de videos stock y herramientas de edición.`,
    background: `Fondos y texturas para diseño web. ${totalResources} recursos de backgrounds gratuitos y patrones personalizables.`,
    components: `Componentes UI y bibliotecas de interfaz para desarrollo web. ${totalResources} recursos de componentes React, Vue y más.`,
    inspirations: `Galería de inspiración para diseñadores web. ${totalResources} sitios y recursos de referencia para proyectos creativos.`,
    logos: `Recursos y herramientas para crear logos profesionales. ${totalResources} opciones gratuitas para diseño de identidad de marca.`,
    librerias: `Bibliotecas y frameworks para desarrollo web. ${totalResources} librerías JavaScript, CSS y más recursos técnicos.`,
    ia: `Herramientas de inteligencia artificial para diseñadores y desarrolladores. ${totalResources} recursos de IA para automatizar tu flujo de trabajo.`
  };

  const categoryKeywords = {
    icons: "iconos svg gratis, iconos vectoriales, iconos web, iconos minimalistas, iconos para diseño",
    illustrations: "ilustraciones gratis, ilustraciones vectoriales, ilustraciones web, recursos gráficos",
    fonts: "fuentes gratis, tipografías web, fuentes google, fuentes para diseño, tipografías modernas",
    colors: "paletas de colores, combinaciones de colores, herramientas color, teoría del color",
    tools: "herramientas diseño web, herramientas ui ux, software diseño gratis, recursos desarrollo",
    images: "imágenes gratis, fotos stock, bancos de imágenes, imágenes libres de derechos",
    videos: "videos stock gratis, videos para proyectos, recursos multimedia, videos libres",
    background: "fondos para web, texturas gratis, patrones diseño, backgrounds css",
    components: "componentes react, componentes ui, bibliotecas ui, frameworks css",
    inspirations: "inspiración diseño web, portfolios diseño, galerías web, tendencias diseño",
    logos: "crear logos gratis, diseño de logos, herramientas logo, identidad de marca",
    librerias: "librerías javascript, frameworks css, bibliotecas react, recursos desarrollo web",
    ia: "herramientas ia diseño, inteligencia artificial, automatización diseño, ai tools"
  };

  const seoDescription = categoryDescriptions[category] || `Explora ${totalResources} recursos gratuitos de ${nombreCategoria.toLowerCase()} para diseñadores y desarrolladores web.`;
  const seoKeywords = categoryKeywords[category] || `${nombreCategoria.toLowerCase()}, recursos diseño web, herramientas gratis`;

  return (
    <>
      <SEO
        title={`${nombreCategoria} - Recursos Gratuitos para Diseñadores Web`}
        description={seoDescription}
        keywords={`${seoKeywords}, recursos para diseñadores, ${nombreCategoria.toLowerCase()} gratis`}
      />
      <div className="px-6 py-16 md:px-12 md:py-16 min-h-screen max-w-8xl mx-auto">
        {/* Header con contenido rico para SEO */}
        <header className="mb-16">
          <p className="text-zinc-500 text-sm mb-3 tracking-wide">
            {totalResources} {totalResources === 1 ? 'recurso gratuito' : 'recursos gratuitos'}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            {nombreCategoria}
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            {seoDescription}
          </p>
        </header>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": `${nombreCategoria} - Recursos de diseño web`,
              "description": seoDescription,
              "numberOfItems": totalResources,
              "itemListElement": categoryResources.slice(0, 10).map((resource, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "SoftwareApplication",
                  "name": resource.title,
                  "description": resource.description,
                  "url": resource.url,
                  "image": resource.image,
                  "applicationCategory": "DesignApplication",
                  "operatingSystem": "Web"
                }
              }))
            })
          }}
        />

        {/* Grid de recursos con datos estructurados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-16 pb-0">
          {categoryResources.map((resource, index) => (
            <article
              key={resource.id}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`Visitar ${resource.title}`}
              >
                {/* Imagen optimizada */}
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-zinc-900">
                  <Image
                    src={resource.image}
                    alt={`${resource.title} - Recurso de ${nombreCategoria.toLowerCase()} para diseñadores`}
                    width={500}
                    height={375}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={index < 10 ? "eager" : "lazy"}
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Contenido con Schema.org */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2
                      className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors"
                      itemProp="name"
                    >
                      {resource.title}
                    </h2>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </div>

                  <p
                    className="text-sm text-zinc-500 leading-relaxed line-clamp-2"
                    itemProp="description"
                  >
                    {resource.description}
                  </p>

                  {/* Tags con keywords */}
                  <div className="flex flex-wrap gap-2 pt-1" itemProp="keywords">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Datos ocultos para Schema */}
                  <meta itemProp="applicationCategory" content="DesignApplication" />
                  <meta itemProp="operatingSystem" content="Web" />
                  <link itemProp="url" href={resource.url} />
                </div>
              </Link>
            </article>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://stackhub-app.vercel.app"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": nombreCategoria,
                  "item": `https://stackhub-app.vercel.app/${category}`
                }
              ]
            })
          }}
        />
      </div>
    </>
  );
}