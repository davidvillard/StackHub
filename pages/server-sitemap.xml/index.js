import { getServerSideSitemap } from 'next-sitemap'
import categories from '@/data/categories'
import resources from '@/data/resources'

export const getServerSideProps = async (ctx) => {
  const baseUrl = 'https://stackhub-app.vercel.app'
  
  const fields = []

  // Página principal
  fields.push({
    loc: baseUrl,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0,
  })

  // Página de FAQ
  fields.push({
    loc: `${baseUrl}/faq`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: 0.5,
  })

  // Páginas de categorías
  categories.forEach((category) => {
    const resourceCount = resources[category.id]?.length || 0
    if (resourceCount > 0) {
      fields.push({
        loc: `${baseUrl}/${category.id}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      })
    }
  })

  return getServerSideSitemap(ctx, fields)
}

export default function Sitemap() {}