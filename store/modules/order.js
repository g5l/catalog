const state = () => ({
  order: {
    products: []
  }
})

const getters = {
  totalPrice: (state) => {
    let total = 0
    state.order.products.forEach((product) => {
      total += product.amount * parseFloat(product.price)
    })
    return total
  },
  products: state => state.order.products,
  productsAmount: state => state.order.products.length
}

const actions = {
  finishOrder ({ state, rootState }) {
    return this.$axios.$post(`${process.env.API_PATH}/finishOrder`, {
      user: rootState.user,
      products: state.order.products
    })
  }
}

const mutations = {
  addProductToOrder (state, product) {
    const products = state.order.products
    const index = products.findIndex(p => p.id === product.id)

    if (index >= 0) {
      state.order.products[index].amount += product.amount
    } else {
      state.order.products.push(product)
    }
  },
  removeProductOnOrder (state, productId) {
    const products = state.order.products
    const index = products.findIndex(p => p.id === productId)
    products.splice(index)
  },
  resetOrder (state) {
    state.order.products = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
