import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faFolderOpen,
  faTag,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Facebook, Twitter } from "react-sharingbuttons"
import "react-sharingbuttons/dist/main.css"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import Imgix from "react-imgix"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    h1: props => {
      return <h2 id={props.id}>{props.children}</h2>
    },
    h2: props => {
      return <h3 id={props.id}>{props.children}</h3>
    },
    h3: props => {
      return <h4 id={props.id}>{props.children}</h4>
    },
    img: props => {
      return (
        <figure>
          <Imgix
            src={props.src}
            imgixParams={{ ar: "16:9", fit: "fill" }}
            htmlAttributes={{
              alt: props.alt,
            }}
          />
          <figcaption>{props.alt}</figcaption>
        </figure>
      )
    },
  },
}).Compiler
export default function Home({ data, location, pageContext }) {
  const htmlAst = unified()
    .use(parse, { fragment: true })
    .parse(data.microcmsBlog.content)
  return (
    <Layout>
      <SEO
        pagetitle={data.microcmsBlog.title}
        pagedesc={`${data.microcmsBlog.preface.slice(0, 70)}...`}
        pagepath={location.pathname}
        blogimg={data.microcmsBlog.eyecatch.url}
      />
      <main className="partsGrid main blogPost">
        <article className="post">
          <div className="grid12 postBlock">
            <figure className="eyecatch">
              <GatsbyImage
                image={
                  data.microcmsBlog.eyecatchimg.childImageSharp.gatsbyImageData
                }
                alt={data.microcmsBlog.eyecatchcaption}
              />
              <figcaption>{data.microcmsBlog.eyecatchcaption}</figcaption>
            </figure>
            <div className="prefaceBody">
              <h1>
                <span>{data.microcmsBlog.title}</span>
              </h1>
              <p className="preface">{data.microcmsBlog.preface}</p>
              <div className="subText">
                <div className="dateCategory">
                  <time dateTime={data.microcmsBlog.publishDate}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{data.microcmsBlog.publishDateJP}</span>
                  </time>
                  {data.microcmsBlog.category.map(cat => (
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
                <ul className="tag">
                  {data.microcmsBlog.tag.map(cat => (
                    <li key={cat.id}>
                      <Link to={`/tag/${cat.tagSlug}/`}>
                        <FontAwesomeIcon icon={faTag} />
                        <span>{cat.tag}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid12 postBlock">
            <ul className="snsShare">
              <li className="twitter">
                <Twitter
                  url={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
                  shareText={`${data.microcmsBlog.title}についてのブログです。`}
                />
              </li>
              <li className="facebook">
                <Facebook
                  url={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
                />
              </li>
            </ul>
            <div className="postBody">{renderAst(htmlAst)}</div>
            <ul className="pagination">
              {pageContext.next && (
                <li className="prev">
                  <Link to={`/blog/post/${pageContext.next.slug}/`} rel="prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{`${pageContext.next.title.slice(0, 20)}...`}</span>
                  </Link>
                </li>
              )}
              {pageContext.previous && (
                <li className="next">
                  <Link
                    to={`/blog/post/${pageContext.previous.slug}/`}
                    rel="next"
                  >
                    <span>{`${pageContext.previous.title.slice(
                      0,
                      20
                    )}...`}</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </article>
      </main>
    </Layout>
  )
}
export const query = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    microcmsBlog(id: { eq: $id }) {
      title
      publishDateJP: publishDate(formatString: "YYYY.MM.DD")
      publishDate
      category {
        category
        categorySlug
        id
      }
      tag {
        id
        tag
        tagSlug
      }
      preface
      eyecatch {
        url
      }
      eyecatchcaption
      content
      eyecatchimg {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: AUTO
            quality: 50
          )
        }
      }
    }
  }
`
