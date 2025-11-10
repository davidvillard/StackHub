import Layout from "@/components/layout";
import SEO from "@/components/ui/Seo";
import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable}`}>
      <Layout> 
        <SEO title="StackHub" description="Colección de recursos gratuitos organizado por categorias. Unete a StackHub!"/>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

export default MyApp;
