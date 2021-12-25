<template>
  <video
    id="comVideo"
    :src="src"
    @error="videoErrorCallback"
    @timeupdate="$emit('timeupdate', $event)"
    @ended="$emit('ended')"
    page-gesture
    controls
    :duration="duration"
    ref="videoRef"
  ></video>
</template>
 
<script>
export default {
  name: 'vueName',
  props: {
    src: '',
    width: '',
    height: '',
    duration: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      videoVm: null
    }
  },
  mounted() {
    const createVideoContext = uni.createVideoContext('comVideo', this)

    // #ifdef H5
    this.videoVm = this.$refs.videoRef || createVideoContext.pageVm
    // #endif

    // #ifdef MP-WEIXIN
    this.videoVm = createVideoContext
    // #endif
  },

  methods: {
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
 
<style scoped lang="scss">
#comVideo {
  width: 100vw;
  height: 430rpx;
}
</style>