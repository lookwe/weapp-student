<template>
    <view class="mod-course-details">
        <view class="mod-dao">
            123
        </view>
        <view class="mod-top-imgage">
            <image :src="src" alt="">
        </view>
        
        <view class="u-page">
            <!-- 课程介绍 -->
            <view class="u-box course-base">
                <text class="u-box__title">3-4年级语文高分技巧短训营</text>
                <view class="course-txt-describe">
                    课程简介：一句话介绍
                </view>
                <u-scroll-list :indicator="false">
                    <view
                        class="scroll-list"
                        style="flex-direction: row;"
                    >
                        <view class="course-teacher" style="width: 82vw"  v-for="(item) in [1]" :key="item">
                                <view class="course-teacher__img">
                                    <u--image
                                        shape="circle"
                                        :src="src"
                                        width="90rpx"
                                        height="90rpx"
                                    ></u--image>
                                </view>
                                <view class="course-teacher__info">
                                    <view class="c-main fz-15">
                                        刘晓峰
                                    </view>
                                    <view class="course-teacher-resume fz-13 mod-course-name">
                                        主授科目：成人学历提升艺术设计主授科目：成人学历提升艺术设计人学历提升艺术设计主授科目：成人学历提升艺术设
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
                    
                </view>
                
            </view>
            <view class="u-box">
                 <view class="u-box__title"></view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
  name: 'courseDetails',
  data() {
    return {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2Fb8a1e4cbd83646ee82ed5e4c52d3687f.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642303215&t=dcfb499641698a915207be13fcfdb724'
    }
  },
  onLoad(router) {
    let { data } = router
    const params = JSON.parse(decodeURIComponent(data))
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.mod-course-details {
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

  .ke-introduce {
    display: inline-block;
    width: 100%;
    height: 300px;
    background: #e6eaef;
    margin-bottom: 30px;
    border: 1px solid red;
  }

  .scroll-list {
    @include flex(column);
  }
}
</style>
