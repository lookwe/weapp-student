<template>
  <u-image width="95px" height="98px" mode="aspectFill" :src="coverUrl">
    <u-loading-icon
      slot="loading"
      mode="semicircle"
      color="#3c9cff"
      size="36"
    ></u-loading-icon>

    <u-loading-icon
      slot="error"
      mode="semicircle"
      color="#3c9cff"
      size="36"
    ></u-loading-icon
  ></u-image>
</template>
 
<script>
/**
 * 全局图片组件，二次封装 uView组件，根据系统业务内置 加载、失败 设计
 * 和原生组件使用一致
 */
export default {
  name: 'vueName',
  data() {
    return {}
  },
  props: {
    coverUrl: ''
  },
  methods: {}
}
</script>
 
<style scoped lang="less">
</style>