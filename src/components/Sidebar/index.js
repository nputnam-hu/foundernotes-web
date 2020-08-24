import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './styles.module.sass'

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo__large.png" }) {
          childImageSharp {
            fixed(width: 190, height: 190) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        title: file(relativePath: { eq: "title.png" }) {
          childImageSharp {
            fixed(width: 337, height: 73) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__content}>
          <div className={styles.mobileTop}>
            <Link to="/">
              <Img
                fixed={data.title.childImageSharp.fixed}
                className={styles.mobileTop__logo}
              />
            </Link>
          </div>
          <Link to="/">
            <Img
              fixed={data.logo.childImageSharp.fixed}
              className={styles.index__logo}
            />
          </Link>
          <div className={styles.sidebar__links}>
            <Link to="/crypto">Crypto</Link>
            <br />
            <Link to="/creators">Creators</Link>
            <br />>
            <br />
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className={styles.sidebar__divider} />
      </div>
    )}
  />
)
export default Sidebar
