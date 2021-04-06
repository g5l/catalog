const state = () => ({
  products: []
})

const getters = {
  products: state => state.products
}

const actions = {
  async fetchProducts ({ commit }, companySlug) {
    const products = await this.$axios.$get(`${process.env.API_PATH}/products/${companySlug}`)
    commit('addProducts', products)
  }
}

const mutations = {
  addProducts (state, products) {
    state.products = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
