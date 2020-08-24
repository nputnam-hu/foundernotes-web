import React, { Component } from 'react'
import Navbar from './Navbar'
import { graphql } from 'gatsby'

import Layout from '../../components/layout'
import ArticleList from './ArticleList'
import styles from './styles.module.sass'
import ArticleBody from './ArticleBody'

// const explodeArr = articles => [
//   ...articles.map(a => ({
//     ...a,
//   })),
//   ...articles.map(a => ({
//     ...a,
//     id: `${a.id}${Math.random()}`,
//   })),
//   ...articles.map(a => ({
//     ...a,
//     id: `${a.id}${Math.random()}`,
//   })),
// ]

class Article extends Component {
  render() {
    const { data, sidebarScrollHeight = 0 } = this.props
    const articles = data.articles.nodes
    return (
      <Layout title={data.article.frontmatter.title}>
        <Navbar />
        <div style={{ height: 60 }} />
        <div className={styles.articleView}>
          <ArticleList
            articles={articles}
            scrollHeight={sidebarScrollHeight}
            activeArticleId={data.article.id}
          />
          <ArticleBody article={data.article} />
        </div>
      </Layout>
    )
  }
}

export default Article

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        excerpt(pruneLength: 25)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "M/D/YY")
        }
      }
    }
    article: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        # ogImage {
        #   childImageSharp {
        #     sizes(maxWidth: 1000) {
        #       src
        #     }
        #   }
        # }
      }
    }
  }
`
