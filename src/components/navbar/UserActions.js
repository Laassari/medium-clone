import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logoutIcon from './logout.svg'

export class UserActions extends React.Component {
  state = {
    userUiShown: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.hideUserUi)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideUserUi)
  }

  hideUserUi = event => {
    if (!this.state.userUiShown) return

    if (!event.target.closest('.login')) {
      this.setState(() => ({ userUiShown: false }))
    }
  }

  showUserUi = () => {
    this.setState(currState => ({ userUiShown: !currState.userUiShown }))
  }

  logOut = () => {}

  render() {
    const avatar = this.props.user.avatarUrl
    const styles = {
      width: ' 38px',
      height: ' 38px',
      marginTop: '3px',
      borderRadius: '50%',
    }
    const { userUiShown } = this.state

    return (
      <div>
        <img
          onClick={this.showUserUi}
          src={avatar}
          alt="avatar"
          style={styles}
        />
        <div className={`user-ui ${userUiShown ? 'user-ui-show' : ''}`}>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={this.logOut}>
              Sign out <img src={logoutIcon} alt="log out" />{' '}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ user: state.user }))(UserActions)
