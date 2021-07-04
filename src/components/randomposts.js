import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Home(props) {
  const randomSelect = (array, num) => {
    let newArray = []
    while (newArray.length < num && array.length > 0) {
      const rand = Math.floor(Math.random() * array.length)
      newArray.push(array[rand])
      array.splice(rand, 1)
    }
    return newArray
  }
  const data = useStaticQuery(graphql`
    query {
      allMicrocmsBlog {
        nodes {
          preface
          id
          slug
          title
          eyecatchimg {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                formats: AUTO
                quality: 50
                placeholder: BLURRED
              )
            }
          }
          eyecatchcaption
        }
      }
    }
  `)
  const baseposts = data.allMicrocmsBlog.nodes.filter(
    node => node.id !== props.id
  )
  const randomposts = randomSelect(baseposts, props.a_number)
  return (
    <main className="partsGrid main top">
      {randomposts.map(node => {
        return (
          <article className="post" key={node.slug}>
            <Link to={`/blog/post/${node.slug}/`} className="postLink" />
            <div className="placeholder" />
            <figure className="eyecatch">
              <GatsbyImage
                image={node.eyecatchimg.childImageSharp.gatsbyImageData}
                alt={node.eyecatchcaption}
              />
            </figure>
            <div className="grid12">
              <div className="text">
                <h1>{node.title}</h1>
                <p>{node.preface}</p>
              </div>
            </div>
          </article>
        )
      })}
    </main>
  )
}
