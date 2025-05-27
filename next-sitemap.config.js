module.exports = {
  siteUrl: 'https://stackhub.netlify.app',
  generateRobotsTxt: true,
  outDir: 'public', // Make sure this directory exists
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/_next/", "/api/", "/404", "/500", "/*.json$"] },
    ],
  },
}