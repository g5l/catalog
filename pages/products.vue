<template>
  <div class="products">
    <section class="section">
      <div class="container">
        <div class="products__header">
          <div class="columns">
            <div class="column is-6">
              <a-input
                v-model="searchItem"
                placeholder="Pesquisar"
                borderless
              />
            </div>
          </div>
        </div>
        <div class="products__list">
          <div class="columns is-multiline">
            <div
              v-for="product in itensFiltered"
              :key="product.id"
              class="column is-3"
            >
              <a-product
                :image="product.image[0].url"
                :name="product.name"
                :price="product.price"
                :reference="product.reference"
                @click.native="openModal(product)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <modal-create-product
      v-if="isModalOpen"
      :product="currentProduct"
      @close-modal="closeModal"
      @success="successModal"
    />
    <modal-success
      v-if="isSuccessModalOpen"
      text="Produto Adicionado!"
    />
  </div>
</template>

<script>
import AInput from '~/components/atoms/a-input.vue'
import AProduct from '~/components/atoms/a-product.vue'
import ModalCreateProduct from '~/components/modals/modal-create-product'
import ModalSuccess from '~/components/modals/modal-success'

export default {
  components: {
    AInput,
    AProduct,
    ModalCreateProduct,
    ModalSuccess
  },
  middleware: 'auth',
  async asyncData ({ $axios }) {
    const products = await $axios.$get(`${process.env.API_PATH}/products`)
    return { products }
  },
  data: () => {
    return {
      isModalOpen: false,
      isSuccessModalOpen: false,
      searchItem: '',
      currentProduct: {}
    }
  },
  computed: {
    itensFiltered () {
      const filter = this.searchItem.toLowerCase().trim()
      return this.products.filter((item, index) => {
        return item.name.toLowerCase().includes(filter) || item.reference.toLowerCase().includes(filter)
      })
    }
  },
  methods: {
    openModal (product) {
      this.isModalOpen = true
      this.currentProduct = {
        id: product.id,
        name: product.name,
        image: product.image[0].url,
        price: product.price,
        reference: product.reference
      }
    },
    closeModal () {
      this.isModalOpen = false
      this.isSuccessModalOpen = false
    },
    successModal () {
      this.isSuccessModalOpen = true
      setInterval(() => {
        this.isSuccessModalOpen = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .products {
    .products__header {
      padding: 0 0 15px 0;
    }

    .products__list {
      margin-top: 20px;
    }
  }
</style>
