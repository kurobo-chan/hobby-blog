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
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HOBBY BLOG`,
        short_name: `hobby-note`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#424242`,
        display: `standalone`,
        icon: `src/image/sitetitle.svg`,
      },
    },
  ],
}
