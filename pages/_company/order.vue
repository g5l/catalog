<template>
  <div class="order">
    <div class="container">
      <div class="columns is-multiline">
        <div
          v-for="product in products"
          :key="product.id"
          class="column is-4"
        >
          <a-order
            :id="product.id"
            :image="product.image"
            :name="product.name"
            :price="product.price"
            :reference="product.reference"
            :amount="product.amount"
            @delete="deleteOrder"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <div class="order__bottom">
            <div class="bottom__total">
              <strong> Valor Total do Pedido:</strong><br>
              {{ totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
            </div>
            <button
              class="button is-normal button--grey order__finish-button"
              @click="send()"
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal-success
      v-if="isSuccessModalOpen"
      text="Pedido enviado!"
    />
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import AOrder from '~/components/atoms/a-order.vue'
import ModalSuccess from '~/components/modals/modal-success'

export default {
  middleware: 'auth',
  components: {
    AOrder,
    ModalSuccess
  },
  data () {
    return {
      isSuccessModalOpen: false
    }
  },
  computed: {
    ...mapGetters('order', ['totalPrice', 'products'])
  },
  methods: {
    ...mapActions('order', ['finishOrder']),
    ...mapMutations('order', ['removeProductOnOrder', 'resetOrder']),
    deleteOrder (productId) {
      this.removeProductOnOrder(productId)
    },
    send () {
      this.finishOrder()
        .then((response) => {
          if (response.message === 'ok') {
            this.openSucessModal()
          }
        })
        .catch(error => error)
    },
    openSucessModal () {
      this.isSuccessModalOpen = true
      setTimeout(() => {
        this.isSuccessModalOpen = false
        this.sendToProductsList()
        this.resetOrder()
      }, 1000)
    },
    sendToProductsList () {
      this.$router.push({ path: 'products' })
    }
  }
}
</script>
<style lang="scss" scoped>
.order {
  background: #ececec;
  padding: 30px 0;
  height: 100%;

  .order__bottom {
    display: flex;
    align-items: center;
    border-radius: 5px;
    justify-content: center;
    background: #d8d8d8cc;
    padding: 30px 50px;
    margin: 40px auto 20px auto;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .bottom__total {
      text-align: center;

      @media (min-width: 768px) {
        padding-right: 40px;
      }
    }

    .order__finish-button {
      @media (max-width: 768px) {
        margin-top: 20px;
      }
    }
  }
}
</style>
