import React from 'react'
import { Link } from 'react-router-dom'
import userAvatar from './avatar.svg'
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
    const avatar = this.state.avatar || userAvatar
    const styles = { width: ' 38px', height: ' 38px', marginTop: '3px' }
    const { userUiShown } = this.state

    return (
      <div onClick={this.showUserUi}>
        <img src={avatar} alt="avatar" style={styles} />
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

export default UserActions
