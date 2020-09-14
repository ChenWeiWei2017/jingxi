const getters = {
  token: state => state.user.token,
  username: state => state.user.name,
  userAvatar: state => state.user.avatar
}

export default getters
