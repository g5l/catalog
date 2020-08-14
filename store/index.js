import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: {},
      order: {
        products: []
      }
    }),
    getters: {
      totalPrice: (state) => {
        let total = 0
        state.order.products.forEach((product) => {
          total += product.amount * parseFloat(product.price)
        })
        return total
      }
    },
    mutations: {
      addUser (state, user) {
        state.user = user
      },
      addProduct (state, product) {
        const products = state.order.products
        const index = products.findIndex(p => p.id === product.id)

        if (index >= 0) {
          state.order.products[index].amount += product.amount
        } else {
          state.order.products.push(product)
        }
      },
      removeProduct (state, productId) {
        const products = state.order.products
        const index = products.findIndex(p => p.id === productId)
        products.splice(index)
      },
      resetOrder (state) {
        state.order.products = []
      }
    },
    actions: {
      finishOrder ({ state }) {
        return this.$axios.$post(`${process.env.API_PATH}/finishOrder`, {
          user: state.user,
          products: state.order.products
        })
      }
    }
  })
}

export default createStore
