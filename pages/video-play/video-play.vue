<template>
  <view class="mod-video-play">
    <view class="video-box"> </view>
    <view class="course-info u-page">
      <view class="course-name fz-18 u-line-2"
        >Python零基础快速就业到高级网络爬虫/人工智能/数据分析</view
      >

      <view class="teacher">
        <u-image
          shape="circle"
          src="https://cn.vuejs.org/images/logo.svg"
          width="50rpx"
          height="50rpx"
        ></u-image>
        <text class="teacher__name fz-16 c-content">主讲老师：安其拉</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'videoPlay',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.mod-video-play {
  .video-box {
    height: 210px;
    background: chartreuse;
  }

  .course-info {
    overflow-y: auto;

    .course-name {
      margin: 40rpx 0;
    }

    .teacher {
      display: flex;
      padding: 20rpx;
      border-radius: 8px;

      background: #8e9eab;
      background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);
      background: linear-gradient(to right, #eef2f3, #8e9eab);

      &__name {
        padding-left: 20rpx;
      }
    }
  }
}
</style>
