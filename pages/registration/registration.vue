<template>
  <!-- 报名咨询 -->
  <view class="mod-registration u-page">
    <view></view>

    <view class="code-img">
      <u-image :width="250" :src="imgUrl" radius="15">
        <u-loading-icon
          slot="loading"
          mode="semicircle"
          color="#3c9cff"
          size="36"
        ></u-loading-icon>
      </u-image>
      <view class="fz-18 m-b-30">添加老师微信好友</view>
      <view class="fz-15 c-content">高效沟通答疑</view>
    </view>
    <view class="mod-nav">
      <view class="save-img">
        <u-icon
          labelPos="center"
          name="download"
          :size="40"
          color="#ffffff"
        ></u-icon>
        <view class="fz-18">保存本地</view>
      </view>
      <view class="share-wechat fz-18">
        <u-icon
          labelPos="center"
          name="weixin-fill"
          :size="40"
          color="#ffffff"
        ></u-icon>
        分享微信
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'registration',
  data() {
    return {
      imgUrl: ''
    }
  },
  onLoad(data = {}) {
    this.imgUrl = decodeURIComponent(data.url)
  },
  methods: {}
}
</script>

<style scoped>
.mod-registration ::v-deep .u-image {
  margin: 0 auto;
}
</style>

<style lang="scss" scoped>
.mod-registration {
  height: 100vh;
  background: $u-primary;
  overflow: hidden;

  .code-img {
    border-radius: 18px;
    background: $uni-bg-color;
    box-shadow: 8px 8px 16px #368ce6, -8px -8px 16px #42acff;
    height: 280px;
    margin-top: 60px;
    text-align: center;
    padding: 50px;
  }

  .mod-nav {
    height: 100px;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    color: #fff; // 固定死
  }
}
</style>
