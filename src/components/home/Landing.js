import React from 'react'
import { Link } from 'react-router-dom'

export class Landing extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="center-inline hero">
          <h1>A medium.com clone without the banners</h1>
          <p>
            This an open source side project built with ReactJS, Redux, and
            Firebase among other tools and libraries. You can check the source
            on <a href="https://github.com/Laassari/medium-clone">Github</a>.
          </p>
        </div>
        <div className="cta center-inline">
          <Link className="btn" to="/auth">
            Login
          </Link>
          <Link className="btn" to="/explore">
            Explore
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

export default Landing
