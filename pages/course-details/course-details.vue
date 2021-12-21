<template>
    <view class="mod-course-details">
        <!-- 自定义导航 -->
        <!-- <view class="mod-dao">
            123
        </view> -->
        <view class="mod-top-imgage">
            <image :src="courseInfo.coverUrl" alt="">
                
        </view>
        
        <view class="u-page">
            <!-- 课程介绍 -->
            <view class="u-box course-base">
                <text class="u-box__title">
                    {{ courseInfo.courseName}}
                </text>
                <view class="course-txt-describe">
                    课程简介：一句话介绍
                </view>
                <u-scroll-list :indicator="!isSingleType">
                    <view
                        class="scroll-list"
                        style="flex-direction: row;"
                    >
                        <view class="course-teacher"
                            :style="{width: isSingleType ? '82vw' : '72vw'}"
                            v-for="(item, index) in courseInfo.generalPracticeCourseVOS"
                            :key="index">
                                <view class="course-teacher__img">
                                    <u--image
                                        shape="circle"
                                        :src="item.lecturerPhoto || item.lecturerVO.lecturerPhoto"
                                        width="90rpx"
                                        height="90rpx"
                                    ></u--image>
                                </view>
                                <view class="course-teacher__info">
                                    <view class="c-main fz-15">
                                        {{ item.lecturerName || item.lecturerVO.lecturerName }}
                                    </view>
                                    <view class="course-teacher-resume fz-13 mod-course-name">
                                        {{ item.lecturerIntroduction || item.lecturerVO.lecturerIntroduction }}
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
                    <view v-if="courseInfo.courseInfoDTO.introduce" v-html="courseInfo.courseInfoDTO.introduce"></view>
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
                    <view v-if="courseInfo.courseInfoDTO.introduce1" v-html="courseInfo.courseInfoDTO.introduce1"></view>
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
                    <view v-if="courseInfo.courseInfoDTO.introduce2" v-html="courseInfo.courseInfoDTO.introduce2"></view>
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
                    <view v-if="courseInfo.courseInfoDTO.introduce3" v-html="courseInfo.courseInfoDTO.introduce3"></view>
                    <u-empty
                        v-else
                        mode="data"
                        icon="http://cdn.uviewui.com/uview/empty/data.png"
                    >
                    </u-empty>
                </view>
            </view>

           <u-back-top
             :customStyle="{background: 'linear-gradient(to right, #00c6ff, #0072ff)',}"
		    :iconStyle="{color: '#ffffff'}"
            :scroll-top="scrollTop"></u-back-top>

            <!--  -->
            <view class="mod-but-price">
                <view class="price">
                    <view class="fz-12 c-describe">课程售价</view>
                    <view>
                        <number-roll :value="endVal"></number-roll>
                    </view>
                </view>
                
                <view class="try-look" @click="onTryLookClick">
                    课程试听
                </view>
                <view class="sign-up" @click="onSignUpClick">
                    报名咨询
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
import CoursesModel from '@/models/coursesModel'
export default {
  name: 'courseDetails',
  data() {
    return {
      scrollTop: 0,

      endVal: 0,

      // 是否单科
      isSingleType: false,

      currentClassType: 0, // 默认选中第一个班型
      courseInfo: {
        generalPracticeCourseVOS: [], // 讲师
        classTypeVOS: [], // 课程分类
        courseInfoDTO: {}
      }
    }
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onLoad(router) {
    let { data } = router
    const params = JSON.parse(decodeURIComponent(data))
    this.isSingleType = params.courseType == 0

    this.initData(params)
  },
  methods: {
    //   点击课程时刻
    onTryLookClick() {
      uni.$u.route({
        url: 'pages/inline-single/inline-single',
        params: {
          url: this.courseInfo.consultingQrCodeUrl
        }
      })
    },

    // 报名咨询
    onSignUpClick() {
      uni.$u.route({
        url: 'pages/registration/registration',
        params: {
          url: this.courseInfo.consultingQrCodeUrl
        }
      })
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
        // 全科
        CoursesModel.getGeneralInfo(params).then((data) => {
          const { classTypeNo } = data.classTypeVOS[0] || {}

          // 默认第一个班型，根据班型查询
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
        this.courseInfo = data

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
  .mod-dao {
    display: inline-block;
    height: var(--status-bar-height);
    width: 100%;
    background: red;
  }
  .mod-top-imgage {
    image {
      width: 100%;
      height: 375px;
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

  .mod-but-price {
    position: fixed;
    bottom: 20px;
    left: 3.6vw;
    width: 92.8vw;
    height: 60px;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    box-shadow: 1px 1px 15px #999;

    .price {
      width: 45%;
      background: $uni-bg-color;
      padding: 5px 0 5px 20px;
      .c-describe {
        padding-bottom: 8px;
      }
    }

    .try-look {
      width: 27.5%;
      background: $u-primary-light;
      color: $u-primary;
    }

    .sign-up {
      width: 27.5%;
      background: $u-primary;
      background: -webkit-linear-gradient(
        to right,
        $u-primary-disabled,
        $u-primary
      );
      background: linear-gradient(to right, $u-primary-disabled, $u-primary);

      color: $uni-bg-color;
    }

    .sign-up,
    .try-look {
      line-height: 60px;
      text-align: center;
      font-size: 18px;
    }
  }

  .scroll-list {
    @include flex(column);
  }
}
</style>
