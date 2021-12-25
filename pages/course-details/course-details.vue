<template>
  <view class="mod-course-details">
    <!-- 自定义导航 -->
    <!-- <view class="mod-dao">
            123
        </view> -->
    <view class="mod-top-imgage">
      <u-image width="100vw" height="375px" :src="courseInfo.coverUrl">
        <u-loading-icon
          slot="loading"
          mode="semicircle"
          color="#3c9cff"
          size="36"
        ></u-loading-icon>
      </u-image>
    </view>

    <view class="mod-navigation">
      <view class="nav-type-list bg-white">
        <view
          v-for="(item, index) in courseInfo.classTypeVOS"
          :key="item.classTypeNo"
          :class="[
            'nav-type-item',
            courseInfo.currentClassType === index ? 'active' : ''
          ]"
          @click="onClassTypeClick(index)"
          >{{ item.classTypeName }}</view
        >
      </view>
      <view class="rich-txt-box">
        <view>项目介绍</view>
        <view>就业前景</view>
        <view>常见问题</view>
        <view>资料获取</view>
      </view>
    </view>

    <view class="u-page">
      <!-- 课程介绍 -->
      <view class="u-box course-base">
        <text class="u-box__title">
          {{ courseInfo.courseName }}
        </text>
        <view class="course-txt-describe"> 课程简介：一句话介绍 </view>
        <u-scroll-list :indicator="!isSingleType">
          <view class="scroll-list" style="flex-direction: row">
            <view
              class="course-teacher"
              :style="{ width: isSingleType ? '82vw' : '72vw' }"
              v-for="(item, index) in courseInfo.generalPracticeCourseVOS"
              :key="index"
            >
              <view class="course-teacher__img">
                <u-image
                  shape="circle"
                  :src="item.lecturerPhoto || item.lecturerVO.lecturerPhoto"
                  width="90rpx"
                  height="90rpx"
                ></u-image>
              </view>
              <view class="course-teacher__info">
                <view class="c-main fz-15">
                  {{ item.lecturerName || item.lecturerVO.lecturerName }}
                </view>
                <view class="course-teacher-resume fz-13 mod-course-name">
                  {{
                    item.lecturerIntroduction ||
                    item.lecturerVO.lecturerIntroduction
                  }}
                </view>
              </view>
            </view>
          </view>
        </u-scroll-list>
      </view>

      <!-- 富文本介绍 -->
      <view class="m-b-30 u-box">
        <view class="u-box__title">项目介绍</view>
        <view class="ke-introduce">
          <view
            v-if="courseInfo.courseInfoDTO.introduce"
            v-html="courseInfo.courseInfoDTO.introduce"
          ></view>
          <u-empty
            v-else
            mode="data"
            icon="http://cdn.uviewui.com/uview/empty/data.png"
          >
          </u-empty>
        </view>
      </view>

      <view class="m-b-30 u-box">
        <view class="u-box__title">就业前景</view>
        <view class="ke-introduce">
          <view
            v-if="courseInfo.courseInfoDTO.introduce1"
            v-html="courseInfo.courseInfoDTO.introduce1"
          ></view>
          <u-empty
            v-else
            mode="data"
            icon="http://cdn.uviewui.com/uview/empty/data.png"
          >
          </u-empty>
        </view>
      </view>

      <view class="m-b-30 u-box">
        <view class="u-box__title">常见问题</view>
        <view class="ke-introduce">
          <view
            v-if="courseInfo.courseInfoDTO.introduce2"
            v-html="courseInfo.courseInfoDTO.introduce2"
          ></view>
          <u-empty
            v-else
            mode="data"
            icon="http://cdn.uviewui.com/uview/empty/data.png"
          >
          </u-empty>
        </view>
      </view>

      <view class="m-b-30 u-box">
        <view class="u-box__title">资料获取</view>
        <view class="ke-introduce">
          <view
            v-if="courseInfo.courseInfoDTO.introduce3"
            v-html="courseInfo.courseInfoDTO.introduce3"
          ></view>
          <u-empty
            v-else
            mode="data"
            icon="http://cdn.uviewui.com/uview/empty/data.png"
          >
          </u-empty>
        </view>
      </view>

      <u-back-top
        :customStyle="{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)'
        }"
        :iconStyle="{ color: '#ffffff' }"
        :scroll-top="scrollTop"
      ></u-back-top>

      <!--  -->
      <com-but-price
        ref="comButPrice"
        :value="
          courseInfo.classTypeVOS.length > 0
            ? courseInfo.classTypeVOS[courseInfo.currentClassType]
                .appExhibitionFee
            : 0
        "
      ></com-but-price>
    </view>
  </view>
</template>

<script>
import CoursesModel from '@/models/coursesModel'
import store from '@/store/index'
export default {
  name: 'courseDetails',
  data() {
    return {
      scrollTop: 0,
      endVal: 0,

      // 是否单科
      isSingleType: false,

      courseInfo: {
        generalPracticeCourseVOS: [], // 讲师

        courseInfoDTO: {},

        classTypeVOS: [], // 课程分类
        currentClassType: 0, // 默认选中第一个班型
        params: {}
      }
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onLoad(router) {
    let { data } = router
    const params = JSON.parse(decodeURIComponent(data))
    this.params = params
    this.isSingleType = params.courseType == 0

    this.initData(params)
  },
  methods: {
    // 切换版型 更新课程数据
    onClassTypeClick(index) {
      this.$u.throttle(() => {
        this.courseInfo.currentClassType = index
        this.heandelSingleComponeClasNav()
      }, 500)
    },

    // 处理版型切换 数据更新
    heandelSingleComponeClasNav() {
      uni.showLoading({
        title: '加载中...'
      })
      // 当前选中班型编号
      const { classTypeNo } =
        this.courseInfo.classTypeVOS[this.courseInfo.currentClassType] || {}

      if (this.isSingleType) {
        // [单科] --- todo -----
      } else {
        // [全科] 版型改变，对应讲师和课程也要改变
        CoursesModel.getGeneralInfoV2({
          classTypeNo,
          ...this.params
        })
          .then((_data) => {
            // 讲师 和 资料 的数组
            this.$set(
              this.courseInfo,
              'generalPracticeCourseVOS',
              _data.generalPracticeCourseVOS || []
            )
            store.dispatch('school/setCourseInfo', this.courseInfo)
          })
          .finally(() => {
            setTimeout(() => {
              uni.hideLoading()
            }, 500)
          })
      }
    },

    // 获取单科/全科 数据信息
    getCourseInfo(params, callback) {
      if (this.isSingleType) {
        // 单科
        CoursesModel.getDownloadSignedUrl(params).then((data) => {
          data.generalPracticeCourseVOS = [data.lecturerVO]
          callback(data)
        })
      } else {
        // 全科 获取版型，默认第一项
        CoursesModel.getGeneralInfo(params).then((data) => {
          const { classTypeNo } = data.classTypeVOS[0] || {}

          // 根据班型查询 查询课程详情
          CoursesModel.getGeneralInfoV2({
            classTypeNo,
            ...params
          }).then((_data) => {
            callback(_data)
          })
        })
      }
    },

    initData(params) {
      this.getCourseInfo(params, (data) => {
        data.currentClassType = 0
        this.courseInfo = data

        // 保存课程详情
        store.dispatch('school/setCourseInfo', data)

        // 等学会了 自定义导航
        this.endVal = 99000

        console.log(this.courseInfo)
      })
    }
  }
}
</script>



<style lang="scss" scoped>
.mod-course-details {
  position: relative;

  .mod-navigation {
    background: $u-border-color;
    position: -webkit-sticky;
    position: sticky;
    z-index: 100;

    /* #ifdef MP-WEIXIN */
    top: 0;
    /* #endif */

    /* #ifdef H5 */
    top: 80rpx;
    /* #endif */

    .nav-type-list {
      width: 100vw;
      height: 80rpx;
      line-height: 80rpx;
      overflow-x: auto;
      white-space: nowrap;
      text-align: center;

      .nav-type-item {
        display: inline-block;
        margin: 0 15px;
        color: $u-tips-color;
        font-size: 18px;

        &.active {
          color: $u-primary;
          transition: color 0.3s;
        }
      }
    }

    .rich-txt-box {
      display: flex;
      justify-content: space-around;

      font-size: 14px;
      padding: 20px;
      color: $u-tips-color;
      &.active {
        color: $u-main-color;
        transition: color 0.3s;
      }
    }
  }

  // 课程基础信息 & 教室信息
  .course-base {
    .course-txt-describe {
      color: $u-light-color;
      font-size: 13px;
      padding: 10px 0;
    }

    .course-teacher {
      display: flex;
      padding: 20px;
      width: 60vw;
      margin-right: 30px;

      border-radius: 15px;
      background: linear-gradient(145deg, #ffffff, #d6dde5);

      &__img {
        margin-right: 15px;
      }
      &__info {
        .course-teacher-resume {
          margin-top: 10px;
        }
      }
    }
  }

  // 富文本
  .ke-introduce {
    display: inline-block;
    width: 100%;
    background: #f5f7f9;
    margin-bottom: 30px;
  }

  .scroll-list {
    @include flex(column);
  }
}
</style>
