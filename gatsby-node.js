const { graphql } = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  store,
  cache,
  actions,
  createNodeId,
}) => {
  if (node.internal.type === `MicrocmsBlog`) {
    const fileNode = await createRemoteFileNode({
      url: `${node.eyecatch.url}?q=100`,
      parentNodeId: node.id,
      cache,
      store,
      createNode: actions.createNode,
      createNodeId: createNodeId,
    })
    if (fileNode) {
      node.eyecatchimg___NODE = fileNode.id
    }
  }
}

const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogresult = await graphql(`
    query {
      allMicrocmsTag {
        nodes {
          tag
          tagId
          tagSlug
        }
      }
      allMicrocmsCategory {
        nodes {
          category
          categoryId
          categorySlug
        }
      }
      allMicrocmsBlog {
        group(field: category___categorySlug) {
          totalCount
          fieldValue
        }
        groupTag: group(field: tag___tagSlug) {
          totalCount
          fieldValue
        }
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
      }
    }
  `)
  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
    return
  }
  blogresult.data.allMicrocmsBlog.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/post/${node.slug}/`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })
  const blogPostsPerPage = 5
  const blogPosts = blogresult.data.allMicrocmsBlog.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage)
  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })
	 blogresult.data.allMicrocmsBlog.group.forEach(node => {
     const catPostsPerPage = 5 
     const catPosts = node.totalCount 
     const catPages = Math.ceil(catPosts / catPostsPerPage) 
     Array.from({ length: catPages }).forEach((_, i) => {
       createPage({
         path:
           i === 0
             ? `/cat/${node.fieldValue}/`
             : `/cat/${node.fieldValue}/${i + 1}/`,
         component: path.resolve(`./src/templates/cat-template.js`),
         context: {
           catid: blogresult.data.allMicrocmsCategory.nodes.find(
             n => n.categorySlug === node.fieldValue
           ).categoryId,
           catname: blogresult.data.allMicrocmsCategory.nodes.find(
             n => n.categorySlug === node.fieldValue
           ).category,
           catslug: node.fieldValue,
           skip: catPostsPerPage * i,
           limit: catPostsPerPage,
           currentPage: i + 1, 
           isFirst: i + 1 === 1, 
           isLast: i + 1 === catPages, 
         },
       })
     })
	 })
	blogresult.data.allMicrocmsBlog.groupTag.forEach(node => {
    const tagPostsPerPage = 5
    const tagPosts = node.totalCount
    const tagPages = Math.ceil(tagPosts / tagPostsPerPage)
    Array.from({ length: tagPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/tag/${node.fieldValue}/`
            : `/tag/${node.fieldValue}/${i + 1}/`,
        component: path.resolve(`./src/templates/tag-template.js`),
        context: {
          tagid: blogresult.data.allMicrocmsTag.nodes.find(
            n => n.tagSlug === node.fieldValue
          ).tagId,
          tagname: blogresult.data.allMicrocmsTag.nodes.find(
            n => n.tagSlug === node.fieldValue
          ).tag,
          tagslug: node.fieldValue,
          skip: tagPostsPerPage * i,
          limit: tagPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === tagPages,
        },
      })
    })
  })
}
