<template>
  <view class="mod-inline-single">
    <view> </view>
    <view class="u-page">
      <view class="u-box mod-list">
        <view
          class="mod-list__item"
          v-for="(item, index) in getCourseInfo.generalPracticeCourseVOS"
          :key="index"
          @click="toDirectoryClick(item)"
        >
          <view class="course-img">
            <u-image width="95px" height="95px" :src="item.coverUrl"> </u-image>
          </view>
          <view class="course-box">
            <view class="fz-16 u-line-2">{{ item.courseName || '课程' }}</view>
            <view class="fz-12 c-describe">
              <view v-if="item.recordingNum || item.advancedRecordingNum">
                <text>视频：</text>
                <text class="txt-pr-2" v-if="item.recordingNum"
                  >基础课{{ item.recordingNum }}节</text
                >
                <text v-if="item.advancedRecordingNum">
                  | 进阶课{{ item.advancedRecordingNum }}节</text
                >
              </view>

              <view v-if="item.exerciseNum || item.advancedExerciseNum">
                <text>习题：</text>
                <text class="txt-pr-2" v-if="item.exerciseNum"
                  >章节习题{{ item.exerciseNum }}题
                </text>
                <text v-if="item.advancedExerciseNum">
                  | 进阶习题{{ item.advancedExerciseNum }}题</text
                >
              </view>

              <view v-if="item.materialsNum || item.advancedMaterialsNum">
                <text>资料：</text>
                <text class="txt-pr-2" v-if="item.materialsNum"
                  >资料{{ item.materialsNum }}份 &nbsp;</text
                >
                <text v-if="item.advancedMaterialsNum">
                  | 进阶资料{{ item.advancedMaterialsNum }}份</text
                >
              </view>
            </view>
          </view>
        </view>
      </view>

      <com-but-price :isTry="false"></com-but-price>
    </view>
    <view class="mod-but-box"></view>
  </view>
</template>
 
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'inlineSingle',
  computed: {
    ...mapGetters(['getCourseInfo', 'getVideoInfo'])
  },
  methods: {
    ...mapActions({
      setVideoInfo: 'school/setVideoInfo' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
    //   点击课程时刻
    toDirectoryClick(item) {
      // 把讲师加入 vuex 视频课程信息中
      const obj = this.getVideoInfo
      obj.lecturerVO = item.lecturerVO
      this.setVideoInfo(obj)

      uni.$u.route({
        url: 'pages/inline-single/catalog/catalog',
        params: {
          courseNo: item.courseNo
        }
      })
    }
  }
}
</script>
 
<style scoped lang="scss">
@import '@/common/scss/com-list.scss';
.mod-inline-single {
  height: 100vh;
  background: $uni-text-color-inverse;
  overflow-y: auto;
  background-image: url(https://s4.ax1x.com/2021/12/23/T8sGef.png);
  background-repeat: no-repeat;
  background-size: 100% 70%;
  position: relative;

  .mod-but-box {
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    height: 80px;
    background: $uni-text-color-inverse;
  }

  .txt-pr-2 {
    padding-right: 4px;
  }


}
</style>