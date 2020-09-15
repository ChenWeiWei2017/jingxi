const getters = {
  token: state => state.user.token,
  username: state => state.user.name,
  userAvatar: state => state.user.avatar,
  shopcart: state => state.shopcart.cart,
  cartnum: state => state.shopcart.cart && state.shopcart.cart.length > 0 ? state.shopcart.cart.length : null
}

export default getters
