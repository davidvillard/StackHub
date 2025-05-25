// pages/[category].js
import { useRouter } from "next/router";
import resources from "@/data/resources";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import categorias from "@/data/categories";
import SEO from "@/components/ui/Seo";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category) {
    return <div>Cargando...</div>;
  }

  // Filtramos los recursos según la categoría
  const categoryResources = resources[category];

  if (!categoryResources) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
        <p>
          No se encontraron recursos para la categoría &quot;{category}&quot;.
        </p>
      </div>
    );
  }

  const categoriaActual = categorias.find((cat) => {
    return cat.id === category;
  });

  const nombreCategoria = categoriaActual ? categoriaActual.name : "Categoría no encontrada";
  const totalResources = categoryResources.length; // Calcular el total de recursos

  return (
    <>
      <SEO 
        title={`${nombreCategoria} - StackHub | Recursos gratuitos`}
        description={`Explora nuestra colección de ${totalResources} recursos gratuitos de ${nombreCategoria.toLowerCase()} para diseñadores y desarrolladores web.`}
        keywords={`${nombreCategoria.toLowerCase()}, recursos, diseño web, desarrollo web, herramientas gratis`}
      />
      <div className="p-6 ml-0 md:ml-32 mt-8 md:mt-0">
        <h1 className="relative text-5xl font-extrabold mb-16 sm:mb-16 text-white group">
          {nombreCategoria}
          <span className="text-zinc-400 ml-3 text-base font-medium align-bottom mt-4 inline-block">
            {totalResources} {totalResources === 1 ? 'recurso' : 'recursos'} disponibles
          </span>
          <span className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full opacity-80 group-hover:w-32 transition-all duration-300"></span>
        </h1>
        {/* Bloque Grid 3x3 */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card */}
          {categoryResources.map((resource) => (
            <Link
              href={resource.url}
              key={resource.id}
              className="bg-zinc-900 rounded-2xl p-4 transition-all duration-500 hover:shadow-lg hover:shadow-white"
            >
              {/* Contenedor de la imagen */}
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={resource.image}
                  alt="Imagen"
                  width={500}
                  height={240}
                  className="w-full h-60 object-cover"
                />
              </div>

              {/* Contenedor de texto */}
              <div className="mt-4 py-1 px-1">
                {/* Título y banner */}
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{resource.title}</h2>
                  </div>
                  <div>
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:underline"
                    >
                      <div className="flex items-center justify-center text-white rounded-full transition-all hover:scale-120 hover:rounded-full"><ExternalLink /></div>
                    </Link>
                  </div>
                </div>
                {/*Contenedor descripcion y etiquetas */}
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-wrap mt-2">
                    <span className="bg-[#2D2F36] text-[#8E96A4] text-xs px-2 py-1 rounded-full mr-2">
                      {/* Aqui van las etiquetas de la array de cada resource */}
                      {resource.tags.map((tag, index) => (
                        <span key={tag}>
                          {tag}
                          {index < resource.tags.length - 1 && ' / '}
                        </span>
                      ))
}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#B0B5C0] line-clamp-2">{resource.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
