<template>
  <div class="orderAtom">
    <div class="order__header">
      <img
        src="~/assets/icon-close.svg"
        title="Excluir"
        class="header__close"
        @click="deleteOrder()"
      >
    </div>
    <div class="order__content">
      <div class="columns">
        <div class="column is-5">
          <img :src="image" class="order__image">
        </div>
        <div class="column is-7">
          <div class="content">
            <p>
              <strong>Nome:</strong>
              {{ name }}
            </p>
            <p>
              <strong>Referência:</strong>
              {{ reference }}
            </p>
            <p>
              <strong>Quantidade:</strong>
              {{ amount }}
            </p>
            <p>
              <strong>Total:</strong>
              {{ total }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    reference: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 0
    },
    price: {
      type: String,
      default: ''
    }
  },
  computed: {
    total () {
      const total = parseFloat(this.price) * this.amount
      return total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  },
  methods: {
    deleteOrder () {
      this.$emit('delete', this.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.orderAtom {
  position: relative;
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 15px 20px;

  .order__header {
    position: absolute;
    right: 20px;
    text-align: right;

    .header__close {
      width: 12px;
      cursor: pointer;
    }
  }

  .order__content {
    font-size: 14px;

    .order__image {
      display: block;
      margin: auto;
      height: 150px;
      object-fit: cover;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      margin-left: 15px;

      p {
        margin: 0;
      }
    }
  }
}
</style>
