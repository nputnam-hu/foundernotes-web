import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import Content, { HTMLContent } from '../../../components/Content'
import Layout from '../../../components/layout'
import Time from '../../../components/Time'
import styles from './styles.module.sass'

export class BlogPostTemplate extends Component {
  state = {
    scrollHeight: 0,
    pageUrl: '',
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ pageUrl: window.location.href })
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    this.setState({
      scrollHeight:
        window.scrollY /
        (document.getElementById('article-container').scrollHeight -
          window.innerHeight),
    })
  }
  render() {
    const {
      htmlBody,
      contentComponent,
      helmet,
      title,
      publishDate,
    } = this.props
    const author = { name: 'Noah Putnam', headshot: '', bio: 'Blabla' }
    const { name, headshot, bio } = author
    const PostContent = contentComponent || Content

    return (
      <>
        {helmet || ''}
        <section id="article-container" className={styles.container}>
          <div className={styles.BlogPost}>
            {/* Blog Post Info */}
            <div className={styles.BlogPost__title}>{title}</div>
            {/* Post Content Section */}
            <PostContent
              className={`${styles.BlogPost__content} ${styles.bodytext} ql-editor `}
              content={htmlBody}
            />
            {/* Tags Section */}
            {/* Article Footer */}
            <div className={styles.Article__footer}>
              <Link style={{ textDecoration: 'none' }} to={author.slug}>
                <div className={styles.AuthorPage__header}>
                  <div className={styles.AuthorPage__header__imageContainer}>
                    {/* <Img
                  className={styles.AuthorPage__header__image}
                  alt={name}
                  fixed={headshot.childImageSharp.large}
                /> */}
                  </div>
                  <div className={styles.AuthorPage__header__text}>
                    <div className={styles.AuthorPage__header__text__name}>
                      {name}
                    </div>
                    <div className={styles.AuthorPage__header__text__bio}>
                      {bio}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <hr />
            {/* {morePosts && morePosts.length > 0 && <MorePosts posts={morePosts} />} */}
          </div>
        </section>
      </>
    )
  }
}
const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const morePosts = data.allBlogPost
    ? data.allBlogPost.edges.map(p => p.node)
    : []
  const rootUrl = 'https://e-conomy.nyc'
  return (
    <Layout>
      <BlogPostTemplate
        htmlBody={post.html}
        contentComponent={HTMLContent}
        subtitle={post.frontmatter.subtitle}
        helmet={
          <Helmet titleTemplate="%s | E-conomy">
            <title>{`${post.title}`}</title>
            <meta name="description" content={`${post.subtitle}`} />
            <meta property="og:title" content={post.title} />
            <meta property="og:url" content={`${rootUrl}${post.fields.slug}`} />
            {post.frontmatter.ogImage && (
              <meta
                property="og:image"
                content={`${rootUrl}${post.frontmatter.ogImage.childImageSharp.sizes.src}`}
              />
            )}
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="twitter:card" content="summary" />
            <meta property="og:type" content="article" />
            <meta property="og:locale" content="en_US" />
            <link rel="canonical" href={`${rootUrl}${post.fields.slug}`} />
          </Helmet>
        }
        coverPhoto={post.coverPhoto}
        tags={[]}
        title={post.frontmatter.title}
        publishDate={post.frontmatter.date}
        morePosts={morePosts}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
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
