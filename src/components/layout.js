import React from 'react'
import SEO from './seo'
import '../styles/global.sass'

const Layout = ({ location, title, children, ogImage }) => (
  <div>
    <SEO title={title} ogImage={ogImage} />
    <main>{children}</main>
    <footer></footer>
  </div>
)

export default Layout
