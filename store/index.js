import Vuex from 'vuex'
import company from './modules/company'
import products from './modules/products'
import order from './modules/order'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      products,
      company,
      order
    },
    state: () => ({
      user: {}
    }),
    mutations: {
      addUser (state, user) {
        state.user = user
      }
    }
  })
}

export default createStore
