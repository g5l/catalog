<template>
  <div>
    <div v-if="render" class="header">
      <div class="container">
        <section class="section">
          <div class="columns">
            <div class="column is-12">
              <div class="header__content">
                <div class="header__logo">
                  <router-link :to="{ path: 'products' }">
                    <img src="~/assets/logo-dashboard.png">
                  </router-link>
                  <div class="header__title is-hidden-touch">
                    Olá, {{ $store.state.user.name }}
                  </div>
                </div>
                <div class="icons">
                  <router-link :to="{ path: 'order' }">
                    <div class="header__orders">
                      <span
                        v-if="productsAmount"
                        class="orders__amount"
                      >
                        {{ productsAmount }}
                      </span>
                      <img src="~/assets/icon-file-text.svg" class="orders__icon">
                      Pedido
                    </div>
                  </router-link>
                  <img
                    class="logout__icon"
                    src="~/assets/icon-power.svg"
                    alt="Sair"
                    @click="logout"
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LOGIN_TOKEN } from '~/constant'

export default {
  computed: {
    ...mapGetters('company', ['isCompanyEmpty']),
    ...mapGetters('order', ['productsAmount']),
    render () {
      return this.$route.name !== 'company'
    }
  },
  mounted () {
    if (this.isCompanyEmpty) {
      const companySlug = this.$route.params.company
      this.fetchCompany(companySlug)
    }
  },
  methods: {
    ...mapActions('company', ['fetchCompany']),
    logout () {
      if (process.client) {
        window.localStorage.removeItem(LOGIN_TOKEN)
      }
      this.$router.push({ name: 'company' })
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background: #ececec;
  min-height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--grey {
  display: block;
  border-radius: 5px;
  background: #292929;
  color: #ffffff;
  padding: 0 50px;
  text-decoration: none;
  transition: all 0.3s;
}

.button--grey:hover {
  color: #fff;
  background-color: #353535;
}

a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: none;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
  }
}

.header {
  background: #000000;
  padding: 30px 0;

  .section {
    padding-top: 0;
    padding-bottom: 0;
  }

  .header__content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header__logo {
      display: flex;
      align-items: center;
      color: #ffffff;

      img {
        height: 50px;
      }

      .header__title {
        font-size: 18px;
        margin-left: 60px;
      }
    }

    .icons {
      display: flex;
      align-content: center;

      .header__orders {
        position: relative;
        display: flex;
        align-items: center;
        color: #ffffff;
        margin-right: 30px;

        .orders__amount {
          position: absolute;
          top: -7px;
          left: -11px;
          background: #ffffff;
          color: #000000;
          font-size: 12px;
          padding: 0 6px;
          border-radius: 50%;
        }

        .orders__icon {
          width: 17px;
          margin-right: 8px;
        }
      }

      .logout__icon {
        cursor: pointer;
      }
    }
  }
  }
</style>
