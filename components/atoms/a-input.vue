<template>
  <div class="form_item">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :class="{ 'borderless': borderless }"
      class="input"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'AInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    borderless: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
  .form_item {
    width: 100%;

    label {
      color: #292929;
      font-size: 16px;
      font-weight: 600;
      line-height: 2.3;
    }

    .input {
      width: 100%;
      padding: 0 15px;
      display: block;
      border: 1px solid #B2B2B2;
      color: #444444;

      &:focus {
        box-shadow: none;
        border-color: #9a9a9a;
      }

      &.borderless {
        border: none;
      }
    }
  }
</style>
