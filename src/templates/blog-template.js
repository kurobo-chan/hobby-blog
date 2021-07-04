import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import Imgix from "react-imgix"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faFolderOpen,
  faTag,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

export default function Home({ data, location, pageContext }) {
  return (
    <Layout>
      <SEO
        pagetitle="新着記事一覧"
        pagedesc="KUROBO趣味ブログです"
        pagepath={location.pathname}
      />
      <main className="partsGrid main blog">
        <h1 className="blogTitle">
          <i className="fas fa-folder-open" />
          <span> 新着記事 </span>
        </h1>
        <div className="blogBlock grid12">
          {data.allMicrocmsBlog.edges.map(({ node }) => (
            <article className="post" key={node.id}>
              <Link to={`/blog/post/${node.slug}`}>
                <figure className="eyecatch">
                  <Imgix
                    src={node.eyecatch.url}
                    imgixParams={{ ar: "16:9", fit: "fill" }}
                    htmlAttributes={{
                      alt: node.eyecatchcaption,
                    }}
                  />
                </figure>
              </Link>
              <h2>
                <Link to={`/blog/post/${node.slug}`}>{`${node.title.slice(
                  0,
                  20
                )}...`}</Link>
              </h2>
              <div className="subText">
                <time dateTime={node.publishDate}>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{node.publishDateJP}</span>
                </time>
                {node.category.map(cat => (
                  <Link
                    to={`/cat/${cat.categorySlug}/`}
                    className="category"
                    key={cat.id}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} />
                    <span>{cat.category}</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="grid12">
          <ul className="pagination">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/blog/`
                      : `/blog/${pageContext.currentPage - 1}/`
                  }
                  ref="prev"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>PREV</span>
                </Link>
              </li>
            )}
            {!pageContext.isLast && (
              <li className="next">
                <Link to={`/blog/${pageContext.currentPage + 1}/`} rel="next">
                  <span>NEXT</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </main>
    </Layout>
  )
}
export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMicrocmsBlog(
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          slug
          title
          eyecatch {
            url
          }
          eyecatchcaption
          publishDateJP: publishDate(formatString: "YYYY.MM.DD")
          publishDate
          category {
            category
            categorySlug
            id
          }
        }
      }
    }
  }
`
