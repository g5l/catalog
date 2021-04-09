<template>
  <div class="login">
    <div class="login__content">
      <!-- <img v-if="company && company.Profile.logo" class="content_logo" :src="company.Profile.logo"> -->
      <h1 class="content__title">
        Acessar
      </h1>
      <form class="login__form" @submit.prevent="validateUser">
        <div class="login__input">
          <a-input
            v-model="$v.email.$model"
            label="Email"
            placeholder="contato@exemplo.com.br"
            class="input__item"
          />
          <span v-if="!$v.email.required && $v.email.$dirty">
            é preciso informar um e-mail
          </span>
          <span v-if="!$v.email.email && $v.email.$dirty">
            e-mail inválido
          </span>
        </div>
        <div class="login__input">
          <a-input
            v-model.trim.lazy="$v.password.$model"
            label="Senha"
            type="password"
            placeholder=""
            class="input__item"
          />
          <span v-if="!$v.password.required && $v.password.$dirty">
            é preciso informar uma senha
          </span>
        </div>

        <div v-if="error">
          {{ error }}
        </div>

        <button
          class="button is-medium button--grey content__button"
          type="submit"
        >
          Entrar
        </button>
      </form>
      <div class="content__copyright">
        Desenvolvido por
        <a href="http://www.g5l.com.br" target="__blank">
          G5L
        </a>
      </div>
    </div>
    <div class="login__art">
      <!-- <img v-if="company.Profile.logo" :src="company.Profile.logo" /> -->
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import { LOGIN_TOKEN } from '~/constant'

import AInput from '~/components/atoms/a-input.vue'

export default {
  components: {
    AInput
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },
  data () {
    return {
      loading: false,
      email: '',
      password: '',
      returnUrl: 'products',
      error: ''
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters('company', ['company'])
  },
  mounted () {
    const companySlug = this.$route.params.company
    this.fetchCompany(companySlug)
  },
  methods: {
    ...mapActions('company', ['fetchCompany']),
    ...mapMutations(['addUser']),
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) { this.login() }
    },
    login () {
      const email = this.email
      const password = this.password
      const url = `${process.env.API_PATH}/dashlogin`
      const data = { email, password, companySlug: this.company.slug }
      const fetchData = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      if (!(email && password)) { return }
      this.loading = true

      fetch(url, fetchData)
        .then(response => response.json())
        .then((data) => {
          const { auth, token, user } = data
          if (auth) {
            window.localStorage.setItem(LOGIN_TOKEN, token)
            this.addUser(user)
            this.$router.push({ path: `${this.company.slug}/products` })
          } else {
            this.error = 'Usuário não encontrado'
          }
        })
        .catch((error) => {
          this.error = error
          this.loading = false
          if (error) {
            this.password = ''
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login {
    font-family: "Helvetica Neue";
    display: flex;
    height: 100vh;
    background: #ffffff;

    .login__content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      width: 40%;
      padding-left: 90px;
      padding-right: 150px;

      @media (max-width: 768px) {
        padding: 0 30px;
        width: 100%;
        align-items: center;
      }

      form {
        width: 100%;

        @media (max-width: 768px) {
          margin-bottom: 20px;
        }
      }

      .content_logo {
        margin: auto auto 0 auto;
        max-height: 150px;
      }

      .content__title {
        width: 100%;
        font-size: 35px;
        color: #292929;
        margin-bottom: 20px;
        margin-top: 50px;

        @media (max-width: 768px) {
          display: none;
          text-align: center;
          margin-bottom: 10px;
        }
      }

      .login__form {
        margin-bottom: auto;
      }

      .login__input {
        .input__item {
          margin-top: 20px;
        }

        span {
          color: #cc0000;
          margin-top: 10px;
        }
      }

      .content__button {
        margin-top: 35px;
      }

      .content__copyright {
        align-self: center;
        margin-top: auto;
        margin-bottom: 15px;
      }
    }

    .login__art {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 100%;
      background-size: cover;
      background-color: #e6e600;

      @media (max-width: 768px) {
        display: none;
      }

      img {
        width: 450px;
      }
    }
  }
</style>
