// 购物车数据存储
const state = {
  cart: JSON.parse(localStorage.getItem('cart')) || []
}

const mutations = {
  ADD_TO_CART(state, goods) {
    const find = state.cart.find(item => item.id === goods.id)
    if (find) {
      find.num++
    } else {
      goods.num = 1
      state.cart.push(goods)
    }
  },
  REMOVE_CART(state, id) {
    // 从购物车中移除商品
    state.cart = state.cart.filter(item => item.id !== id)
  },
  CHANGE_GOODS_NUM(state, { id, num }) {
    console.log(id, num)
    const goods = state.cart.find(item => item.id === id)
    goods.num = num
  },
  CLEAR_CART(state) {
    state.cart = []
  }
}

const actions = {
  addtocart({ commit }, goods) {
    commit('ADD_TO_CART', goods)
  },
  removecart({ commit }, id) {
    commit('REMOVE_CART', id)
  },
  changegoodsnum({ commit }, { id, num }) {
    commit('CHANGE_GOODS_NUM', { id, num })
  },
  clearcart({ commit }) {
    commit('CLEAR_CART')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
