<template>
  <view class="mod-video-play">
    <com-video
      :src="getVideoInfo.item.fileUrl"
      :isBuy="getVideoInfo.item.isBuy"
      @ended="videoEnd"
      @timeupdate="videoWatch"
      ref="comVideo"
    ></com-video>

    <view class="course-info u-page">
      <view class="course-name fz-18 u-line-2">{{
        getVideoInfo.item.fileName
      }}</view>

      <view class="teacher">
        <u-image
          shape="circle"
          :src="getVideoInfo.lecturerVO.lecturerPhoto"
          width="50rpx"
          height="50rpx"
        ></u-image>
        <text class="teacher__name fz-16 c-content"
          >主讲老师：{{ getVideoInfo.lecturerVO.lecturerName }}</text
        >
      </view>
    </view>

    <view class="title-try-end white" v-if="isTryEnd">
      <view>
        <view class="fz-14">试看已结束</view>
        <view class="mod-video-bnt">
          <u-button
            type="primary"
            text="购买完整版课程"
            @click="clickBuyCourse"
          >
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'videoPlay',
  data() {
    return {
      isTryEnd: false
    }
  },

  computed: {
    ...mapGetters(['getVideoInfo']),

    // 试看时间
    duration() {
      return this.getVideoInfo.item.tryLength * 60
    }
  },
  beforeDestroy() {
    // 离开前销毁 播放vuex 视频状态 保留老师
    const obj = this.getVideoInfo
    obj.item = {}
    this.setVideoInfo(obj)
  },
  methods: {
    ...mapActions({
      setVideoInfo: 'school/setVideoInfo'
    }),
    videoEnd() {
      console.log('完毕')
    },

    // ======> 非购买模块 <=======

    // 扫码报名
    clickBuyCourse() {
      uni.$u.route({
        url: 'pages/course-details/registration/registration'
      })
    },

    videoWatch({ detail }) {
      // 判断是否试看模块
      const { currentTime } = detail
      if (currentTime > this.duration) {
        this.isTryEnd = true
        this.$refs.comVideo.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-video-play {
  position: relative;

  .title-try-end {
    width: 100%;
    height: 430rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;

    .white {
      text-align: center;
    }
    .mod-video-bnt {
      margin-top: 20px;
      border-radius: 20px;
      width: 420rpx;
      overflow: hidden;
    }
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
