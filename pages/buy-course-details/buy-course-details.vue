<template>
  <view class="buy-course-details">
    <view class="course-info m-b-30 u-page">
      <view class="course-name-box">
        <view class="fz-19 fw-600 u-line-2">
          {{ getBuyCourse.courseName }}
        </view>
        <view>
          <view class="fz-14 c-describe"
            >服务期：还剩{{ getBuyCourse.effectiveTime2 }}天</view
          >
          <view class="course-class">
            <text>{{ isSingleType ? '单科' : '全科' }}</text>
            <text>{{ getBuyCourse.classTypeName }}</text>
          </view>
        </view>
      </view>

      <view class="course-image">
        <u-image
          width="100%"
          height="220rpx"
          mode="scaleToFill"
          :src="getBuyCourse.coverUrl"
        ></u-image>
      </view>
    </view>

    <!-- 讲师团队 -->
    <view class="teacher-box u-box">
      <view
        class="course-teacher"
        :style="{ width: getBuyCourse.courseType == 0 ? '83vw' : '72vw' }"
        v-for="(item, index) in getBuyCourse.lecturerVOS"
        :key="index"
      >
        <view class="flex">
          <view class="course-teacher__img">
            <u-image
              shape="circle"
              :src="item.lecturerPhoto"
              width="90rpx"
              height="90rpx"
            ></u-image>
          </view>
          <view class="course-teacher__info">
            <view class="fz-15">
              {{ item.lecturerName }}
            </view>
            <view class="fz-13 u-line-2">
              {{ item.lecturerIntroduction }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mod-nav-list u-page">
      <view
        class="li"
        v-for="(key, index) in menuList"
        :key="index"
        @click="toCurseDirectory(key)"
      >
        <view class="flex ac">
          <u-icon size="28" :name="getTypeName(key).icon"></u-icon>
          <text class="nav-item-name">{{ getTypeName(key).name }}</text>
        </view>
        <view>
          <u-icon color="#000" size="18" name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import menuMixin from '@/common/mixin/menuMixin'
import classEnum from '@/util/enum'

export default {
  // 购买课程详情
  name: 'buyCourseDetails',
  mixins: [menuMixin],
  data() {
    return {
      RECORD: 'https://s4.ax1x.com/2021/12/28/TrWAfO.png',
      EXERCISE: 'https://s4.ax1x.com/2021/12/28/TrWe6H.png',
      MATERIAL: 'https://s4.ax1x.com/2021/12/28/TrWVpD.png',

      menuList: []
    }
  },
  computed: {
    ...mapGetters(['getBuyCourse']),
    getTypeName() {
      return (key) => {
        return {
          name: classEnum[key].typeName,
          icon: this[key]
        }
      }
    },
    isSingleType() {
      return this.getBuyCourse.courseType == 0
    }
  },
  onLoad() {
    console.log(this.getBuyCourse)
    this.fetchClassTypeNavlist(this.getBuyCourse, () => {
      const ab = this.classTypeNavlist.map((item) => {
        const nameCode = item.classModuleEnumCode
        if (nameCode.indexOf('_')) {
          return nameCode.substring(nameCode.indexOf('_') + 1)
        } else {
          return nameCode
        }
      })

      // 菜单资源key
      this.menuList = Array.from(new Set(ab))
    })
  },
  methods: {
    ...mapActions({
      setVideoInfo: 'school/setVideoInfo'
    }),
    toCurseDirectory(key) {
      // 判断全科

      if (this.isSingleType) {
        // 把老师放入播放vuex里
        this.setVideoInfo({
          lecturerVO: this.getBuyCourse.lecturerNo[0]
        })
        this.toSingleCurse(key)
      } else {
        // 全科
      }
    },

    // 跳转全科页面
    toAllListPage() {},

    // 跳转单科 课程目录
    toSingleCurse(key) {
      const params = this.classTypeNavlist.filter((item) =>
        item.classModuleEnumCode.includes(key)
      )
      uni.$u.route({
        url: 'pages/buy-course-details/directory/directory',
        params: {
          data: JSON.stringify(params),
          courseNo: this.getBuyCourse.courseNo,
          title: this.getTypeName(key).name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buy-course-details {
  overflow-x: auto;

  .course-info {
    margin-top: 50rpx;
    display: flex;

    .course-name-box {
      flex: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 10px;

      .course-class {
        font-size: 14px;
        margin-top: 10px;

        text {
          padding: 4px;
          background: #ff3b30;
          color: #fff;
          border-radius: 6px;
          margin-right: 20rpx;
        }
      }
    }
    .course-image {
      flex: 2;
      border: 1px solid #f0f0f0;
    }
  }

  .teacher-box {
    overflow-x: auto;
    white-space: nowrap;
    margin-left: 15px;

    .course-teacher {
      display: inline-block;
      padding: 15px;
      width: 60vw;
      margin-right: 30px;

      border-radius: 15px;
      //background: linear-gradient(145deg, #d6dde5, #ffffff);

      color: #fff;

      background: #00d2ff;
      background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
      background: linear-gradient(to right, #3a7bd5, #00d2ff);
      &__img {
        margin-right: 15px;
        display: inline-block;
      }
      &__info {
        width: 80%;
        white-space: initial;
        display: inline-block;
        .fz-15 {
          margin-bottom: 10px;
        }
      }
    }
  }

  .mod-nav-list {
    height: 250px;

    .li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 17px;
      .nav-item-name {
        padding-left: 25px;
      }
    }
  }
}
</style>
