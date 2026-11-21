/**
 * Lighthouse Testing Configuration
 *
 * SINGLE SOURCE OF TRUTH for all Lighthouse tests
 * Works identically in local development and CI
 *
 * URLs use localhost:3000 format - works everywhere!
 */

module.exports = {
  // Pages to test - add more as your site grows
  // All URLs use localhost:3000 (with subdomains) - works in both local and CI
  pages: [
    {
      url: "http://localhost:3000/",
      name: "Homepage",
      category: "Main Site",
      critical: true,
    },
    {
      url: "http://jpmorgan.localhost:3000/",
      name: "JP Morgan",
      category: "Landing Pages",
      critical: true,
    },
    // Add more pages as needed:
    // {
    //   url: 'http://localhost:3000/pricing',
    //   name: 'Pricing',
    //   category: 'Main Site',
    //   critical: true,
    // },
    // {
    //   url: 'http://localhost:3000/about',
    //   name: 'About',
    //   category: 'Main Site',
    //   critical: false,
    // },
    // {
    //   url: 'http://goldman.localhost:3000/',
    //   name: 'Goldman Sachs',
    //   category: 'Landing Pages',
    //   critical: true,
    // },
  ],

  // Lighthouse CI settings
  ci: {
    numberOfRuns: 3,

    // Assertion thresholds
    thresholds: {
      critical: {
        performance: 0.8, // 80% - warn
        accessibility: 0.9, // 90% - error
        seo: 0.85, // 85% - warn
        cls: 0.1, // Cumulative Layout Shift - error
      },
      normal: {
        performance: 0.75, // 75% - warn (less strict)
        accessibility: 0.9, // 90% - error (always strict)
        seo: 0.8, // 80% - warn
        cls: 0.15, // Cumulative Layout Shift - error (more lenient)
      },
    },
  },
};
