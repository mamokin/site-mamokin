const config = require('./config');

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    menuLinks: [
      {
        name: 'home',
        description: 'Homepage',
        link: '/'
      },
      {
        name: 'Apps',
        description: 'Application Demos',
        link: '/Apps'
      },
      {
        name: 'Encoding',
        description: 'Encoding Application',
        link: '/Apps/Encoding'
      }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.pathPrefix || config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icon: config.manifestIcon, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
};
