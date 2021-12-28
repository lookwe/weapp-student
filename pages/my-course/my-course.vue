<template>
  <view class="mod-my-ourse u-page">
    <view class="my-course-lst">
      <view
        class="course-item m-b-30"
        v-for="(item, index) in courseList"
        :key="index"
        @click="toBuyCoursePage(item)"
      >
        <view class="course-item__content">
          <view class="fz-14 c-describe"
            >服务期：
            <text v-if="item.effectiveTime2 > 0"
              >还剩{{ item.effectiveTime2 }}天</text
            >
            <text v-else class="c-error">已过期</text>
          </view>
          <view class="u-line-2 fz-18">{{ item.courseName }}</view>

          <view class="course-bnt">
            <u-button
              type="primary"
              text="开始学习"
              :disabled="item.effectiveTime2 < 1"
            ></u-button>
          </view>
        </view>
        <view class="course-item__image">
          <u-image
            width="100%"
            height="170px"
            mode="scaleToFill"
            :src="item.coverUrl"
          ></u-image>
          <view
            :class="[
              'course-type-tag',
              item.courseType == 0 ? 'single' : 'all'
            ]"
          >
            {{ item.courseType == 0 ? '单科' : '全科' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import myCourseApi from '@/models/myCourseModel'
import { UTCDateToLocalDate, getDaysBetween } from '@/util/utils'
import store from '@/store'
export default {
  name: 'myCourse',
  data() {
    return {
      courseList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    toBuyCoursePage(item) {
      if (item.effectiveTime2 < 1) {
        return
      }

      store.dispatch('school/setBuyCourse', item)
      uni.$u.route({
        url: 'pages/buy-course-details/buy-course-details'
      })
    },
    initData() {
      this.courseList = []
      myCourseApi.getAllCourse().then((data) => {
        this.courseList = data.map((item) => {
          item.effectiveTime2 = parseInt(
            // 根据当前时间
            getDaysBetween(new Date(), UTCDateToLocalDate(item.serviceEndTime))
          )
          return item
        })

        console.log(this.courseList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-my-ourse {
  overflow-y: auto;
  .my-course-lst {
    margin-top: 50rpx;

    .course-item {
      height: 170px;
      border-radius: 14px;
      overflow: hidden;
      display: flex;

      //flex-direction: row-reverse;
      background: #ffffff;
      box-shadow: 0 11px 22px #d9d9d9, 0 -11px 22px #ffffff;

      &__content {
        width: 55%;
        padding: 15px 5px 0 15px;

        .c-describe {
          padding-bottom: 10px;
        }

        .course-bnt {
          width: 80px;
          margin-top: 25px;
        }
      }

      &__image {
        width: 45%;
        background: #d9d9d9;
        position: relative;

        .course-type-tag {
          position: absolute;
          top: 10px;
          right: 10px;

          padding: 5px;
          color: #fff;
          font-size: 12px;
          border-radius: 5px;

          &.all {
            background: red;
          }
          &.single {
            background: $u-primary;
          }
        }
      }
    }
  }
}
</style>
