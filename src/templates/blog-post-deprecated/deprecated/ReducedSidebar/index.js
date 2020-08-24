import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Sidebar from '../../../../components/Sidebar'
import styles from './styles.module.sass'

const ReducedSidebar = ({ scrollHeight }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo__small.png" }) {
          childImageSharp {
            fixed(width: 95, height: 95) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <div className={styles.sidebar}>
        <div className={styles.reducedBar}>
          <Link to="/" className={styles.reducedBar__logo}>
            <Img fixed={data.logo.childImageSharp.fixed} />
          </Link>
          <div className={styles.progressbar}>
            <div
              className={styles.progressbar__gradient}
              style={{
                height:
                  scrollHeight < 1 ? `calc(100% * ${scrollHeight}` : `100%`,
              }}
            />
            <div
              className={styles.progressbar__grey}
              style={{
                height:
                  scrollHeight < 1
                    ? `calc(100% - (100% * ${scrollHeight})`
                    : '0%',
              }}
            />
          </div>
        </div>
        <div className={styles.fullBar}>
          <Sidebar />
        </div>
      </div>
    )}
  />
)

export default ReducedSidebar
