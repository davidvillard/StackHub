import Head from "next/head";
import { useRouter } from "next/router";

function SEO({ title, keywords = "", description }) {
  const router = useRouter();
  const canonicalUrl = `https://stackhub.netlify.app${
    router.asPath === "/" ? "" : router.asPath
  }`;

  return (
    <Head>
      {/* Meta SEO Básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="David Villar Durán" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="google-site-verification" content="yPYcwOlcQrH1_eHTOuXu3N_rbO0ikshJYhpBmKftTHA" />

      {/* Open Graph para compartir en redes (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/logo_stackhub_white.svg" />
      <meta property="og:url" content="https://stackhub.com" />
      <meta property="og:type" content="website" />

      {/* Favicon */}
      <link rel="icon" href="/logo_stackhub_white.svg" />

      {/* Schema.org markup for Google+ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "StackHub",
            url: "https://stackhub.netlify.app",
            description:
              "Colección de recursos gratuitos organizado por categorias para diseñadores y desarrolladores.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://stackhub.netlify.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Head>
  );
}

export default SEO;