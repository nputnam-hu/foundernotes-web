module.exports = {
  siteMetadata: {
    title: `Noah Putnam: notes about fintech, startups, and philosophy`,
    author: `Noah Putnam`,
    description: `A journal of my experience building a fintech startup and what it takes to build something people actually want.`,
    siteUrl: `https://noahputnam.com/`,
    social: {
      twitter: `noah_putnam`,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        useResolveUrlLoader: true,
        sassRuleTest: /global\.s(a|c)ss$/,
        sassRuleModulesTest: /.*\.module\.s(a|c)ss$/,
        debug: true,
        javascriptEnabled: true,
      },
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Oxygen:300,400,500, 700`, `Open Sans`, `Lalezar`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-163957115-1`,
      },
    },
  ],
}
