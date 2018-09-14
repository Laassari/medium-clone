import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => (
  <div className="footer-wrapper">
    <footer>
      made with{' '}
      <span role="img" aria-label="heart emoji">
        💓
      </span>{' '}
      by <Link to=""> Laassari</Link>
    </footer>
  </div>
)

export default Footer
