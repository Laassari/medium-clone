import React from 'react'
import Landing from './Landing'
import './Home.css'

export class Home extends React.Component {
  state = {
    loggedIn: false,
  }
  render() {
    return (
      <div className="home-wrapper">
        <div className="home">
          {this.state.loggedIn ? <p>Hello User</p> : <Landing />}
        </div>
      </div>
    )
  }
}

export default Home
