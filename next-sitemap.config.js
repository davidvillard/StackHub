/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://stackhub-app.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  
  // Agregar rutas manualmente
  additionalPaths: async (config) => {
    const result = []

    // Página principal
    result.push({
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    })

    // FAQ
    result.push({
      loc: '/faq',
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    })

    // Categorías
    const categories = [
      'icons', 'illustrations', 'fonts', 'colors', 
      'tools', 'images', 'videos', 'background',
      'components', 'inspirations', 'logos', 'librerias', 'ia'
    ]

    categories.forEach((category) => {
      result.push({
        loc: `/${category}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      })
    })

    return result
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
