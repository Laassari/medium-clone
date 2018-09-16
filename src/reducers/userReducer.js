import userAvatar from './../components/navbar/avatar.svg'

const initState = {
  username: '',
  loggedIn: false,
  id: '',
  avatarUrl: userAvatar,
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default userReducer
