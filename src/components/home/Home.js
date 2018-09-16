import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Landing from './Landing'
import './Home.css'

export class Home extends React.Component {
  render() {
    const { loggedIn } = this.props.user
    return (
      <div className="home-wrapper">
        <div className="home">{loggedIn ? <p>Hello User</p> : <Landing />}</div>
      </div>
    )
  }
}

Home.propTypes = {
  user: propTypes.object.isRequired,
}

const mapPropToState = state => ({
  user: state.user,
})

export default connect(mapPropToState)(Home)
