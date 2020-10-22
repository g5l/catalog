import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      company: {},
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
      },
      company: state => state.company
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
      },
      async fetchCompany ({ state }, companySlug) {
        const company = await this.$axios.$get(`${process.env.API_PATH}/company/${companySlug}`)
          .then(data => data)
        state.company = company
      }
    }
  })
}

export default createStore
