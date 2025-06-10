/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ulusalbarter.com',
  generateRobotsTxt: true,
  changefreq: 'monthly',         // Varsayılan: tüm sayfalara uygulanır
  priority: 0.7,                 // Varsayılan öncelik
  sitemapSize: 5000,
  exclude: ['/api/*'],          // API route'lar hariç
  transform: async (config, url) => {
    // Özel sayfa bazlı ayarlamalar
    const pageSettings = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/dashboard': { priority: 0.5, changefreq: 'daily' },
      '/barter': { priority: 0.8, changefreq: 'monthly' },
      '/iletisim': { priority: 0.8, changefreq: 'yearly' },
      '/hakkinda': { priority: 0.8, changefreq: 'yearly' },
      '/urun-ekle': { priority: 0.5, changefreq: 'weekly' },
      '/uyelik': { priority: 0.8, changefreq: 'monthly' },
      '/terms': { priority: 0.5, changefreq: 'yearly' },
      '/privacy': { priority: 0.5, changefreq: 'yearly' },
      '/cookies': { priority: 0.5, changefreq: 'yearly' },
      '/kayit': { priority: 0.5, changefreq: 'yearly' },
      '/sifremi-unuttum': { priority: 0.5, changefreq: 'yearly' },
    };

    return {
      loc: url,
      changefreq: pageSettings[url]?.changefreq || config.changefreq,
      priority: pageSettings[url]?.priority || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};