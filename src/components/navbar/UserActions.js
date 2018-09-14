import React from 'react'
import { Link } from 'react-router-dom'
import userAvatar from './avatar.svg'
import logoutIcon from './logout.svg'

export class UserActions extends React.Component {
  state = {}

  userUiRef = React.createRef()
  showUserUi = () => {
    this.userUiRef.current.classList.toggle('user-ui-show')
  }

  logOut = () => {}

  render() {
    const avatar = this.state.avatar || userAvatar
    const styles = { width: ' 38px', height: ' 38px', marginTop: '3px' }
    
    return (
      <div onClick={this.showUserUi}>
        <img src={avatar} alt="avatar" style={styles} />
        <div className="user-ui" ref={this.userUiRef}>
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
