import React from 'react'
import { Link } from 'react-router-dom'
import UserAction from './UserActions'
import logo from './logo.svg'
import './Navbar.css'

export class Navbar extends React.Component {
  state = {
    loggedIn: true,
  }

  render() {
    return (
      <div className="nav-wrapper">
        <nav>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="login">
            {this.state.loggedIn ? (
              <UserAction />
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
