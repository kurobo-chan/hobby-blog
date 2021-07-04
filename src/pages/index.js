import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RandomPosts from "../components/randomposts"

export default function Home({ pageContext }) {
  return (
    <Layout>
      <SEO />
      <RandomPosts a_number={1} id={pageContext.id} />
    </Layout>
  )
}
