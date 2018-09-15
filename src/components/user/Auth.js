import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from './Firebase'
import 'firebase/auth'
import './Auth.css'

const Auth = props => {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult() {
        //TODO: update the redux store.
        props.history.push('/')
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
        {...props}
        routeHistory={props.history}
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default Auth
