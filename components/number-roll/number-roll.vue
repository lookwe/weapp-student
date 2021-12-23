<template>
  <div class="number-grow">{{ test }}</div>
</template>

<script>
import { formatMoney } from '@/util/utils'
export default {
  name: 'numberRoll',
  data() {
    return {
      test: 0
    }
  },
  props: {
    // 特效时间
    time: {
      type: Number,
      default: 0.5
    },
    value: {
      type: Number,
      default: 0
    },
    //保留几位数
    places: {
      type: Number,
      default: 0
    }
  },
  //异步 数据改动时就执行
  computer: {
    getValue() {
      return this.value
    }
  },
  watch: {
    getValue() {
      this.numberGrow()
    }
  },
  methods: {
    numberGrow() {
      let _this = this
      let step = (_this.value * 10) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        _this.test = formatMoney(current, _this.places)
      }, 10)
    }
  }
}
</script>

<style scoped>
.number-grow {
  display: inline-block;
}
</style>

