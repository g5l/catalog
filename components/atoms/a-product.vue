<template>
  <div class="product">
    <img :src="image" class="product__image">
    <p class="product__title">
      {{ reference }} - {{ name }}
    </p>
    <p class="product__price">
      {{ priceFormated }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AProduct',
  props: {
    image: {
      type: String,
      default: ''
    },
    reference: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    }
  },
  computed: {
    priceFormated () {
      return parseFloat(this.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .product {
    background:#FFFFFF;
    border-radius: 10px;
    padding: 25px 30px;
    cursor: pointer;
    text-align: center;

    .product__title {
      margin-top: 20px;
    }

    .product__image {
      display: block;
      margin: auto;
      height: 220px;
      object-fit: cover;
    }

    .product__price {
      font-weight: 600;
    }
  }
</style>
