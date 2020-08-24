import React from 'react'
import Helmet from 'react-helmet'
import '../styles/global.sass'

const Layout = ({ location, title, children }) => (
  <div>
    <Helmet titleTemplate="%s | Noah Putnam">
      <title>{title}</title>
    </Helmet>
    <main>{children}</main>
    <footer></footer>
  </div>
)

export default Layout
