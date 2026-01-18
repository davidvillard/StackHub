/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://stackhub-app.vercel.app',
  outDir: './public',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/faq'),
      await config.transform(config, '/icons'),
      await config.transform(config, '/illustrations'),
      await config.transform(config, '/fonts'),
      await config.transform(config, '/colors'),
      await config.transform(config, '/tools'),
      await config.transform(config, '/images'),
      await config.transform(config, '/videos'),
      await config.transform(config, '/background'),
    ];
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
