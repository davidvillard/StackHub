module.exports = {
  siteUrl: 'https://stackhub.netlify.app',
  generateRobotsTxt: true,
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/404',
          '/500',
          '/*.json$',
        ],
      },
    ],
  },
};
