<template>
  <view class="mod-inline-single u-page">
    <view></view>

    <view class="u-box mod-list">
      <view class="mod-list__item">
        <view>
          <u-image
            width="80px"
            height="80px"
            mode="aspectFill"
            :src="src"
          ></u-image>
        </view>
        <view> </view>
      </view>
    </view>
  </view>
</template>
 
<script>
import uImage from '../../uni_modules/uview-ui/components/u--image/u--image.vue'
export default {
  components: { uImage },
  name: 'inlineSingle',
  data() {
    return {
      src: 'https://obs-sxmaps.obs.cn-south-1.myhuaweicloud.com/1637137253297%E6%B1%89%E8%AF%AD%E8%A8%80%C2%B7%E6%9C%AC%E7%A7%91.jpg?AccessKeyId=EFEFKMKB34MST8GOISMX&Expires=1640245075&Signature=7lsPWsyjBqB17aAN8wKwsexUTIk%3D'
    }
  },
  methods: {}
}
</script>
 
<style scoped lang="scss">
.mod-inline-single {
  height: 100vh;
  background: $u-primary;
  overflow: hidden;

  .mod-list {
    margin-top: 80px;
    &__item {
      height: 120px;
      background: red;
    }
  }
}
</style>