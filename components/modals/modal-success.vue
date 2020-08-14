<template>
  <div class="modal__success">
    <div class="success__content">
      <img src="~/assets/icon-success.svg" class="success__icon">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AInput',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.modal__success {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000000, 0.35);

  .success__content {
    width: 600px;
    background: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding: 100px 0;
    color: #8DC63F;
    font-size: 26px;
    font-weight: 800;

    .success__icon {
      width: 100px;
      display: block;
      margin: auto;
      margin-bottom: 20px;
    }
  }
}
</style>
