import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'

import styles from './styles.module.sass'

const formatTime = d => {
  const now = moment()
  const publishDate = moment(d)
  switch (now.diff(publishDate, 'days')) {
    case 0:
      return 'Today'
    case 1:
      return 'Yesterday'
    default:
      return d
  }
}

const PinIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    width="18px"
    height="18px"
    style={{ marginTop: 1 }}
  >
    <g>
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <path d="M16,9V4l1,0c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H7C6.45,2,6,2.45,6,3v0 c0,0.55,0.45,1,1,1l1,0v5c0,1.66-1.34,3-3,3h0v2h5.97v7l1,1l1-1v-7H19v-2h0C17.34,12,16,10.66,16,9z" />
    </g>
  </svg>
)

const ArticleCard = ({
  activeArticleId,
  article: {
    id,
    excerpt,
    fields: { slug },
    frontmatter: { title, date },
  },
}) => (
  <Link
    to={slug}
    key={id}
    className={`${styles.article} ${
      activeArticleId === id ? styles.active : ''
    }`}
  >
    <h2>{title}</h2>
    <div className={styles.article__info}>
      <span>{formatTime(date)}</span>
      <p>{excerpt}</p>
    </div>
  </Link>
)

const ArticleList = ({ articles, scrollHeight, activeArticleId }) => {
  const [firstArticle, ...rest] = articles
  return (
    <div className={styles.articleList}>
      <div className={styles.articleList__first}>
        <div className={styles.topbar}>
          {PinIcon}
          <div style={{ width: 7 }} />
          <span>LATEST</span>
        </div>
        <ArticleCard article={firstArticle} activeArticleId={activeArticleId} />
      </div>
      <div className={styles.articleList__rest}>
        {rest.map(article => (
          <ArticleCard article={article} activeArticleId={activeArticleId} />
        ))}
      </div>
    </div>
  )
}

export default ArticleList
