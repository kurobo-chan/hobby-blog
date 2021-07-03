import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home() {
  return (
    <Layout>
      <SEO />
      <main className="partsGrid main top">
        <article className="post">
          <a href="#" className="postLink" />
          <div className="placeholder" />
          <figure className="eyecatch">
            <img src="/image/test.jpg" alt="" />
          </figure>
          <div className="grid12">
            <div className="text">
              <h1>
                タイトルがここに入ります。タイトルがここに入ります。
                タイトルがここに入ります。
              </h1>
              <p>
                テキストがここに入ります。テキストがここに入ります。テキストがここに入ります。テキストがここに入ります。テキストがここに入ります。テキストがここに入ります。テキストがここに入ります。
              </p>
            </div>
          </div>
        </article>
      </main>
    </Layout>
  )
}
