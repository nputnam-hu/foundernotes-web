import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from '../styles/index.module.sass'

const Index = ({ data }) => (
  <div className={styles.index}>
    <h1>Noah Putnam</h1>
    <div className={styles.app}>
      <ul>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <a href="https://economyofbits.substack.com">E-conomy</a>
        </li>
        <li>
          <a href="https://twitter.com/noah_putnam">Twitter</a>
        </li>
      </ul>
    </div>
  </div>
)

export default Index

export const pagequery = graphql`
  query IndexQuery {
    notes: file(relativePath: { eq: "notesIcon.png" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
