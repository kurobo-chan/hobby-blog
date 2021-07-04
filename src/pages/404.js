import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ location }) {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" pagepath={location.pathname} />
      <div className="partsGrid">
        <h1 style={{ textAlign: "center", padding: "20vh 0" }}>
          お探しのページが見つかりませんでした
        </h1>
      </div>
    </Layout>
  )
}
