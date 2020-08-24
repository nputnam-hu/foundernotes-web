import React from 'react'
import styles from './styles.module.sass'

const ArticleBody = ({
  article: {
    html,
    frontmatter: { title, date },
  },
}) => (
  <div className={styles.articleBody}>
    <h1>{title}</h1>
    <span>{date}</span>
    <div
      className={styles.articleBody__html}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
)

export default ArticleBody
