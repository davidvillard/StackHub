import Head from "next/head";

function SEO({ title, keywords, description }) {
  return (
    <Head>
      {/* Meta SEO Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="David Villard" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph para compartir en redes (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/logo_freestack_white.svg" />
      <meta property="og:url" content="https://freestack.com" />
      <meta property="og:type" content="website" />

      {/* Favicon */}
      <link rel="icon" href="/logo_freestack_white.svg" />
    </Head>
  );
}

export default SEO;