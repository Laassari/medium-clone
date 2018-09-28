import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from './Firebase'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import propTypes from 'prop-types'
import { addUserToDb, setUser } from '../../actions/userActions'
import 'firebase/auth'
import './Auth.css'

const Auth = props => {
  if (props.user.loggedIn) {
    return <Redirect to="/" />
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
          signupDate: Date.now(),
        }

        //the last visited URL to return to
        const { lastUrl } = props.location.state || {
          lastUrl: { pathname: '/' },
        }

        if (authResult.additionalUserInfo.isNewUser) {
          //sign up
          props.addUserToDb(user).then(() => props.history.push(lastUrl))
        } else {
          //returning user
          props.setUser({ ...user, loggedIn: true })

          props.history.push(lastUrl)
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
