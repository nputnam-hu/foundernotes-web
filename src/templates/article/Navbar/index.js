import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styles from './styles.module.sass'

const Navbar = () => (
  <nav className={styles.navbar}>
    <Link to="/">&lt; Back</Link>
    <h3 className={styles.navbar__name}>Notes</h3>
  </nav>
)

export default Navbar
