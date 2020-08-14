<template>
  <div class="number-spinner">
    <button
      :disabled="disableMinusButton"
      class="spinner__button spinner__minus"
      @click="countMinus()"
    >
      -
    </button>
    <div class="spinner_count">
      {{ value }}
    </div>
    <button
      :disabled="disablePlusButton"
      class="spinner__button spinner__plus"
      @click="countPlus()"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'ANumberSpinner',
  props: {
    maxValue: Number,
    minValue: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: 0,
      disablePlusButton: false,
      disableMinusButton: false
    }
  },
  watch: {
    value (val) {
      this.currentValue(val)
      this.changeButtonsStatus(val)
    }
  },
  mounted () {
    this.changeButtonsStatus(this.value)
    this.value = this.minValue
  },
  methods: {
    countPlus () {
      this.value++
    },
    countMinus () {
      if (this.value > 0) { this.value-- }
    },
    changeButtonsStatus (val) {
      if (val <= this.minValue) {
        this.disableMinusButton = true
      } else {
        this.disableMinusButton = false
      }

      if (val >= this.maxValue) {
        this.disablePlusButton = true
      } else {
        this.disablePlusButton = false
      }
    },
    currentValue (val) {
      this.$emit('value', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.number-spinner {
  display: flex;
  box-shadow: 0px 2px 6px #00000029;

  .spinner_count {
    min-width: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
  }

  .spinner__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--main-color);
    color: #2c2c2c;
    border: 2px solid #2c2c2c;
    font-weight: bold;
    font-size: 25px;
    width: 40px;
    height: 35px;
    line-height: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      background: #e0e0e0;
    }
  }
}
</style>
