import userAvatar from './../components/navbar/avatar.svg'
import { ADD_NEW_USER, SIGN_OUT_USER } from '../actions/Types'

const initState = {
  username: '',
  loggedIn: false,
  id: '',
  avatarUrl: userAvatar,
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      const { username, loggedIn, id, avatarUrl } = action.payload
      return { username, loggedIn, id, avatarUrl }

    case SIGN_OUT_USER:
      return initState

    default:
      return state
  }
}

export default userReducer
