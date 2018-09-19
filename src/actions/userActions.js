import { db } from '../components/user/Firebase'
import { ADD_NEW_USER, SIGN_OUT_USER } from './Types'

export const addUserToDb = user => {
  return dispatch => {
    return db
      .collection('users')
      .doc(user.id)
      .set(user)
      .then(() => {
        dispatch(setUser({ ...user, loggedIn: true }))
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
  }
}

export const setUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
})
