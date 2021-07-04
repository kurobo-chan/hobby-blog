import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

export default function Home(props)
{
	const navFunc = () => {
    document.querySelector("html").classList.toggle("open")
  }
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
    <ul className="pickupBlock contentBlock">
      {randomposts.map(node => {
        return (
          <li key={node.slug}>
            <Link
              to={`/blog/post/${node.slug}/`} onClick={navFunc}
            >{`${node.title.slice(0, 20)}...`}</Link>
          </li>
        )
      })}
    </ul>
  )
}
