import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Imgix from "react-imgix"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faChevronRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  const data = useStaticQuery(graphql`
    query {
      allMicrocmsBlog(
        sort: { order: DESC, fields: publishDate }
        skip: 0
        limit: 4
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
  `)
  return (
    <div className="partsGrid">
      <aside className="aside">
        <h2>
          <span>RECENT ARTICLES</span>
        </h2>
        <div className="grid12 postBlock">
          {data.allMicrocmsBlog.edges.map(({ node }) => (
            <article className="post" key={node.id}>
              <figure className="eyecatch">
                <Link to={`/blog/post/${node.slug}`}>
                  <Imgix
                    src={node.eyecatch.url}
                    imgixParams={{ ar: "16:9", fit: "fill" }}
                    htmlAttributes={{
                      alt: node.eyecatchcaption,
                    }}
                  />
                </Link>
              </figure>
              <div className="text">
                <h3>
                  <Link to={`/blog/post/${node.slug}`}>
                    {`${node.title.slice(0, 20)}...`}
                  </Link>
                </h3>
                <div className="subText">
                  <time dateTime={node.publishDate}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{node.publishDateJP}</span>
                  </time>
                  {node.category.map(cat => (
                    <a href="#" className="category" key={cat.id}>
                      <FontAwesomeIcon icon={faFolderOpen} />
                      <span>{cat.category}</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <div className="pagination">
            <Link to={`/blog/`}>
              <span>SEE MORE</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
