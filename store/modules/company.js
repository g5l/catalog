import _ from 'lodash'

const state = () => ({
  company: {
    slug: ''
  }
})

const getters = {
  isCompanyEmpty: (state) => {
    return _.isEmpty(state.company)
  },
  company: state => state.company,
  slug: state => state.company.slug
}

const actions = {
  async fetchCompany ({ commit }, companySlug) {
    const company = await this.$axios.$get(`${process.env.API_PATH}/company/${companySlug}`)
    commit('addCompany', company)
  }
}

const mutations = {
  addCompany (state, company) {
    state.company = company
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
