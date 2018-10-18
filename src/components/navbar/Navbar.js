import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import UserAction from './UserActions'
import logo from './logo.svg'
import './Navbar.css'

export class Navbar extends React.Component {
  render() {
    const { loggedIn } = this.props.user
    return (
      <div className="nav-wrapper">
        <nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="login">
            {loggedIn ? (
              <UserAction />
            ) : (
              <Link
                to={{
                  pathname: '/auth',
                  state: { lastUrl: this.props.location },
                }}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  user: propTypes.object.isRequired,
}

const mapPropToState = state => ({
  user: state.user,
})

export default withRouter(connect(mapPropToState)(Navbar))
