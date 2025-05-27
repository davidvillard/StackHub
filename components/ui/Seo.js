import Head from "next/head";
import { useRouter } from "next/router";

function SEO({ title, keywords = "", description }) {
  const router = useRouter();
  const canonicalUrl = `https://stackhub.netlify.app${
    router.asPath === "/" ? "" : router.asPath
  }`;
  
  // Título completo con formato para brandear
  const fullTitle = title ? `${title} | StackHub` : "StackHub - Recursos para diseñadores y desarrolladores";
  const metaDescription = description || "Colección de recursos gratuitos para diseñadores y desarrolladores web organizados por categorías.";
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
<<<<<<< HEAD
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
=======
      <meta name="google-site-verification" content="yPYcwOlcQrH1_eHTOuXu3N_rbO0ikshJYhpBmKftTHA" />

      {/* Open Graph para compartir en redes (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/logo_stackhub_white.svg" />
      <meta property="og:url" content="https://stackhub.com" />
>>>>>>> 7011c54dcc49688866766671427619d1ba768377
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="StackHub" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Head>
  );
}

export default SEO;