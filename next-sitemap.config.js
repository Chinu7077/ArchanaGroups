/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://archanagroups.in',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public',
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/transport'),
    await config.transform(config, '/biocycle'),
    await config.transform(config, '/contact'),
  ],
};
