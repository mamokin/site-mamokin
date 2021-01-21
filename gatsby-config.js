const config = require('./config');

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    author: config.authorName,
    description: config.description,
    image: config.image,
    keyword: 'site, web, frontend developer, developer, gatsby, react',
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
        name: 'Encode',
        description: 'Encoding Application',
        link: '/Apps/Encode'
      },
      {
        name: 'Decode',
        description: 'Decoding Application',
        link: '/Apps/Decode'
      },
      {
        name: 'Encode & Decode',
        description: 'Encoding & Decoding Application',
        link: '/Apps/EncodeDecode'
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
