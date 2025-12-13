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

  // URL base
  const baseUrl = "https://stackhub-app.vercel.app"; // use custom domain later
  const canonicalUrl = `${baseUrl}${router.asPath === "/" ? "" : router.asPath}`;

  // Titles
  const defaultTitle = "StackHub - Recursos gratuitos para diseño web";
  const fullTitle = title || defaultTitle;
  
  // Descripción optimizada (máximo 155 caracteres)
  const metaDescription = description || "Descubre +150 recursos gratuitos para diseño web: iconos, ilustraciones, fuentes, herramientas UI/UX y componentes. Actualizado semanalmente.";
  
  // Keywords optimizadas
  const metaKeywords = keywords || "recursos diseño web, iconos gratis, ilustraciones gratis, fuentes web, herramientas UI UX, componentes React, recursos desarrollo web, diseño gratuito";

  // Imagen OG optimizada
  const ogImage = `${baseUrl}${image}`;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="David Villard" />
      <meta name="language" content="es" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Language" content="es" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />
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
      <meta name="twitter:image:alt" content={fullTitle} />
      <meta name="twitter:creator" content="@davidvillard" />
      <meta name="twitter:site" content="@stackhub" />
      
      {/* JSON-LD Schema - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "StackHub",
            "alternateName": "Stack Hub",
            "description": metaDescription,
            "url": baseUrl,
            "inLanguage": "es-ES",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "StackHub",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/StackHub_3D.PNG`,
                "width": 363,
                "height": 361
              },
              "sameAs": [
                "https://github.com/davidvillard/StackHub"
              ]
            }
          })
        }}
      />
      
      {/* JSON-LD Schema - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "StackHub",
            "url": baseUrl,
            "logo": `${baseUrl}/StackHub_3D.PNG`,
            "description": "Plataforma de recursos gratuitos para diseñadores y desarrolladores web",
            "founder": {
              "@type": "Person",
              "name": "David Villard",
              "url": "https://github.com/davidvillard"
            },
            "sameAs": [
              "https://github.com/davidvillard/StackHub"
            ]
          })
        }}
      />
    </Head>
  );
}

export default SEO;