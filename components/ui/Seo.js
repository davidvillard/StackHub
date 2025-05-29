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
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="StackHub" />
    </Head>
  );
}

export default SEO;