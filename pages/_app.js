// pages/_app.js
import Layout from "@/components/layout";
import SEO from "@/components/ui/Seo";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout> 
      <SEO title="StackHub" description="Colección de recursos gratuitos organizado por categorias. Unete a StackHub!"/>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
