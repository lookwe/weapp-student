<template>
  <view class="mod-inline-single">
    <view> </view>
    <view class="u-page">
      <view class="u-box mod-list">
        <view
          class="mod-list__item"
          v-for="(item, index) in courseList"
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
    </view>
  </view>
</template>
 
<script>
import myCourseApi from '@/models/myCourseModel'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'inlineSingle',
  computed: {
    ...mapGetters(['getBuyCourse'])
  },
  data() {
    return {
      courseList: [],
      params: null
    }
  },
  onLoad(params) {
    console.log(params)
    this.params = params
    this.initData()
  },
  methods: {
    ...mapActions({
      setVideoInfo: 'school/setVideoInfo'
    }),

    initData() {
      const params = { ordersItemNo: this.getBuyCourse.ordersItemNo }
      myCourseApi
        .getGeneralPracticeCourseDetail(params)
        .then(({ generalPracticeCourseVOS }) => {
          if (generalPracticeCourseVOS) {
            this.courseList = generalPracticeCourseVOS
          }
        })
    },
    //   点击课程时刻
    toDirectoryClick(item) {
      // 把讲师加入 vuex 视频课程信息中
      const obj = this.getBuyCourse
      obj.lecturerVO = item.lecturerVO
      this.setVideoInfo(obj)

      uni.$u.route({
        url: 'pages/buy-course-details/directory/directory',
        params: {
          ...this.params,
          courseNo: item.courseNo,
          ordersItemNo: item.ordersItemNo
        }
      })
    }
  }
}
</script>
 
<style scoped lang="scss">
@import '@/common/scss/com-list.scss';
.mod-inline-single {
  overflow-y: auto;
  .mod-list {
    margin: 40rpx 0;
    &__item {
      box-shadow: 0 11px 22px #d9d9d9, 0 -11px 22px #ffffff;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .txt-pr-2 {
    padding-right: 4px;
  }
}
</style>