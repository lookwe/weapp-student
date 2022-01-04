<template>
  <!-- 题目 -->
  <view class="answer-title fz-16">
    <!-- #ifdef MP-WEIXIN -->
    <!-- <rich-text :nodes="item.exerciseTitle"></rich-text> -->
    <u-parse :content="title"></u-parse>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <text class="com-parse-html" v-html="title"></text>
    <!-- #endif -->
  </view>
</template>
 
<script>
export default {
  props: {
    title: {
      type: [String],
      default: ''
    }
  }
}
</script>
 
<style scoped lang="scss">
.answer-title {
  margin-top: 10px;
  background: #f3f4f6;
  padding: 15px;
  border-radius: 10px;
}
</style>