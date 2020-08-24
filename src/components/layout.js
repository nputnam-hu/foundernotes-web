import React from 'react'
import '../styles/global.sass'

const Layout = ({ location, title, children }) => (
  <div>
    <main>{children}</main>
    <footer></footer>
  </div>
)

export default Layout
