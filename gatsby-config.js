/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `KUROBO HOBBY BLOG`,
    description: `KUROBOの趣味ブログ`,
    lang: `ja`,
    siteUrl: `https://kurobo-hobby-blog.netlify.app`,
    locale: `ja_JP`,
    fbappid: process.env.FACEBOOK_ID,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HOBBY BLOG`,
        short_name: `hobby-note`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#424242`,
        display: `standalone`,
        icon: `src/images/sitetitle.svg`,
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.microCMS_API_KEY,
        serviceId: "hobby-blog",
        apis: [
          {
            endpoint: "blog",
          },
          {
            endpoint: "category",
          },
          {
            endpoint: "tag",
          },

          {
            endpoint: "profile",
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
