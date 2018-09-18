import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from './Firebase'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { addUserToDb, setUser } from '../../actions/userActions'
import 'firebase/auth'
import './Auth.css'

const Auth = props => {
  if (props.user.loggedIn) {
    props.history.push('/')
    return null
  }

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult(authResult) {
        const user = {
          username:
            authResult.user.displayName ||
            authResult.additionalUserInfo.username, //for Github

          id: authResult.user.uid,
          avatarUrl: authResult.user.photoURL,
        }

        if (authResult.additionalUserInfo.isNewUser) {
          //sign up
          props.addUserToDb(user).then(() => props.history.push('/'))
        } else {
          //returning user
          props.setUser(user)
          props.history.push('/')
        }
      },
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  }

  return (
    <div className="auth">
      <p>Please sign-in:</p>
      <StyledFirebaseAuth
        routeHistory={props.history}
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

Auth.propTypes = {
  addUserToDb: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

export default connect(
  mapStateToProps,
  { addUserToDb, setUser }
)(Auth)
