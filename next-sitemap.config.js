module.exports = {
  siteUrl: 'https://stackhub.netlify.app',
  generateRobotsTxt: true,
  outDir: 'public', // Asegura que se escriba en la carpeta public
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/_next/", "/api/", "/404", "/500", "/*.json$"] },
    ],
  },
}