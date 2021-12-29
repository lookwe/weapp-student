<template>
  <view class="video-box">
    <video
      id="com-video"
      class="com-video-class"
      :src="src"
      @error="videoErrorCallback"
      @timeupdate="onTimeupdate"
      @ended="$emit('ended')"
      page-gesture
      controls
      :duration="duration"
      ref="videoRef"
    ></video>
  </view>
</template>
 
<script>
export default {
  name: 'vueName',
  props: {
    src: '',
    isBuy: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      videoVm: null
    }
  },
  mounted() {
    const createVideoContext = uni.createVideoContext('com-video', this)

    // #ifdef H5
    this.videoVm = this.$refs.videoRef || createVideoContext.pageVm
    // #endif

    // #ifdef MP-WEIXIN
    this.videoVm = createVideoContext
    // #endif

    console.log(this.videoVm)
  },

  methods: {
    onTimeupdate(videoOjb) {
      if (this.isBuy) {
        // 购买视频 不用计算进度变化
        return
      }
      this.$emit('timeupdate', videoOjb)
    },
    videoErrorCallback: function (e) {
      uni.showModal({
        content: e.target.errMsg,
        showCancel: false
      })
    },

    // 暂停
    pause() {
      this.videoVm.pause()
    }
  }
}
</script>

<style>
.video-box {
  width: 100vw;
}

.com-video-class {
  width: 100%;
  height: 430rpx;
}
</style>