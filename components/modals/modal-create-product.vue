<template>
  <div class="modal__create-product">
    <div class="create-product__content">
      <div class="content__header">
        <img
          src="~/assets/icon-close.svg"
          class="header__close"
          @click="closeModal()"
        >
      </div>
      <div class="content__container">
        <div class="columns">
          <div class="column is-6">
            <img :src="product.image" class="content__image">
          </div>
          <div class="column is-6">
            <div class="content__info">
              <p class="info__item">
                <strong>Nome:</strong>
                {{ product.name }}
              </p>
              <p class="info__item">
                <strong>Referência:</strong>
                {{ product.reference }}
              </p>
              <p class="info__item amount">
                <strong>Quantidade:</strong>
                <a-number-spinner
                  :min-value="1"
                  @value="amountValue"
                />
              </p>
              <p class="info__item">
                <strong>Observação:</strong>
                <textarea
                  id="note"
                  v-model="note"
                  class="create-product__note"
                  name="note"
                  rows="5"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <button
              class="button is-normal button--grey content__add"
              @click="add()"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ANumberSpinner from '~/components/atoms/a-number-spinner.vue'
export default {
  name: 'AInput',
  components: {
    ANumberSpinner
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    product: {
      type: Object,
      default: () => {
        return ''
      }
    }
  },
  data: () => {
    return {
      amount: 0,
      note: ''
    }
  },
  methods: {
    ...mapMutations(['addProduct']),
    closeModal () {
      this.$emit('close-modal')
    },
    amountValue (value) {
      this.amount = value
    },
    add () {
      const product = Object.assign(this.product, {
        amount: this.amount,
        note: this.note
      })

      this.addProduct(product)
      this.closeModal()
      this.$emit('success')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal__create-product {
    position: fixed;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#000000, 0.35);

    @media screen and (max-width: 960px) {
      background: #ffffff;
    }

    .create-product__content {
      width: 700px;
      background: #ffffff;
      border-radius: 10px;
      padding: 0 30px 30px 30px;

      @media screen and (max-width: 960px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }

      .content__header {
        padding: 18px 0;
        text-align: right;

        .header__close {
          width: 12px;
          cursor: pointer;
        }
      }

      .content__image {
        width: 250px;
        display: block;
        margin: auto;
      }

      .content__container {
        width: 100%;

        .content__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          padding-right: 20px;

          .info__item {
            padding: 5px 0;

            &.amount {
              display: flex;
              align-items: center;

              .number-spinner {
                margin-left: 10px;
              }
            }

            textarea {
              width: 100%;
              margin-top: 8px;
              display: block;
              border: 1px solid #D1D1D1;
              border-radius: 5px;
            }
          }
        }
      }

      .create-product__note {
        padding: 8px 10px;

        &:focus {
          outline: none;
        }
      }

      .content__add {
        margin: auto;
        margin-top: 15px;

        &:focus {
          border-color: none;
          color: #ffffff;
        }
      }
    }
  }
</style>
