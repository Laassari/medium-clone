import { db } from '../components/user/Firebase'
import { ADD_NEW_USER } from './Types'

export const addUserToDb = user => {
  return dispatch => {
    return db
      .collection('users')
      .doc(user.id)
      .set(user)
      .then(() => {
        dispatch(ADD_NEW_USER_ACTION(user))
      })
      .catch(error => {
        console.error('Error writing document: ', error)
      })
  }
}

export const ADD_NEW_USER_ACTION = user => ({
  type: ADD_NEW_USER,
  payload: user,
})
