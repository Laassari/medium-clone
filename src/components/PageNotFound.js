import React from 'react'
import { Link } from 'react-router-dom'
import notFound from './not-found.svg'

const styles = {
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const PageNotFound = () => {
  return (
    <div style={styles}>
      <img src={notFound} alt="not found" />
      <div>
        <h1>404- Page not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  )
}

export default PageNotFound
