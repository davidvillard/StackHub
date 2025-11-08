import Head from "next/head";
import { useRouter } from "next/router";

function SEO({ 
  title, 
  keywords = "", 
  description,
  image = "/og-image.jpg",
  type = "website"
}) {
  const router = useRouter();

  // URL base (cambiar a vercel cuando lo despliegues)
  const baseUrl = "https://stackhub-app.vercel.app";
  const canonicalUrl = `${baseUrl}${router.asPath === "/" ? "" : router.asPath}`;
  
  // Título optimizado con palabra clave principal
  const defaultTitle = "StackHub - Recursos Gratuitos para Diseñadores y Desarrolladores Web";
  const fullTitle = title ? `${title} | StackHub` : defaultTitle;
  
  // Descripción optimizada con palabras clave LSI
  const metaDescription = description || "Descubre +500 recursos gratuitos para diseñadores y desarrolladores web: iconos, ilustraciones, fuentes, herramientas UI/UX, componentes y más. Todo organizado y actualizado.";
  
  // Keywords optimizadas
  const metaKeywords = keywords || "recursos para diseñadores, recursos diseño web, herramientas diseño gratis, iconos gratis, ilustraciones gratis, fuentes gratis, recursos desarrollo web, UI UX recursos, componentes web, plantillas diseño";

  // Imagen OG optimizada
  const ogImage = `${baseUrl}${image}`;
  
  return (
    <Head>
      {/* Title Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      
      {/* Meta Tags básicos */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="David Villard" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="StackHub" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@davidvillard" />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "StackHub",
            "description": metaDescription,
            "url": baseUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "StackHub",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/StackHub_3D.png`
              }
            }
          })
        }}
      />
    </Head>
  );
}

export default SEO;