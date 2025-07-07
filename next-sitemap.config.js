/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://archanagroups.in',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public',
  // 👇 Manual static route list (add your actual pages here)
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/transport'),
    await config.transform(config, '/biocycle'),
    await config.transform(config, '/contact'),
  ],
};
