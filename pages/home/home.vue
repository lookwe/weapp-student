<template>
  <view class="mod-home u-page">
    <view class="mod-school flex jsb">
      <view class="mod-school__info">
        <image mode="scaleToFill" :src="getSchoolInfo.logoUrl"></image>

        <text class="fz-24 fw-600">{{ getSchoolInfo.schoolName }}</text>
        <!-- 骨架 -->
        <!-- <u-skeleton :loading="true" avatar rows="0"></u-skeleton> -->
      </view>

      <view class="mod-school__menu"
        ><u-icon name="grid" size="40" @click="coursePopupShow = true"></u-icon
      ></view>
    </view>

    <!-- 菜单树 -->
    <u-picker
      closeOnClickOverlay
      :show="coursePopupShow"
      :columns="tree"
      keyName="name"
      ref="uPicker"
      @close="onCoursePopupHide"
      @change="changeHandler"
      @confirm="onTreeSelect"
    ></u-picker>

    <!-- 搜索 -->
    <view class="mod-query u-box">
      <u--input
        placeholder="请输入搜索的内容"
        prefixIcon="search"
        prefixIconStyle="font-size: 22px;color: #909399"
        @focus="onSearchInput"
      ></u--input>
    </view>

    <!-- VIP选择 -->
    <view class="mod-member u-box">
      <text
        @click="onSwitchVip(2)"
        :class="['vip', isVip == 2 ? 'is-active' : '']"
        >VIP课</text
      >
      <text @click="onSwitchVip(1)" :class="[isVip == 1 ? 'is-active' : '']"
        >公开课</text
      >
    </view>

    <view class="mod-swiper u-box">
      <u-swiper
        :height="172"
        radius="6"
        :list="swiperList"
        keyName="coverUrl"
        @change="(e) => (swiperCurrent = e.current)"
        @click="onSwiperClick"
      >
        <view slot="indicator" class="indicator">
          <view
            class="indicator__dot"
            v-for="(item, index) in swiperList"
            :key="index"
            :class="[index === swiperCurrent && 'indicator__dot--active']"
          ></view>
        </view>
      </u-swiper>
    </view>

    <view class="mod-course-list u-box">
      <view class="u-box__title">精选课程</view>
      <view class="u-box__content">
        <view
          class="course-item"
          v-for="(item, index) in courseList"
          :key="index"
          @click="toCourseDetails(item)"
        >
          <image
            mode="scaleToFill"
            :lazy-load="true"
            :src="item.coverUrl"
          ></image>
          <view class="fz-15 u-line-2">{{ item.courseName }}</view>
          <view class="fz-12 course-item__class">
            <text>{{ item.courseType == 0 ? '单科' : '全科' }}</text>
            <text>{{ item.classTypeNum }}个班型可选</text>
          </view>
          <view class="fz-13 course-item__money">
            ￥{{ item.startPrice }}
            <text v-show="item.classTypeNum > 1"> - {{ item.endPrice }} </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import homePageModel from '@/models/homePageModel'
export default {
  data() {
    return {
      swiperCurrent: 0,
      swiperList: [],

      tree: [],
      childList: [],
      selectTree: [],
      coursePopupShow: false,

      //  [1=非VIP， 2=VIP]
      isVip: 2,

      courseList: [],
      currIndex: 0, // 默认当前页
      totalPages: 1 // 总页数
    }
  },
  computed: {
    ...mapGetters(['getSchoolInfo'])
  },

  // 下拉刷新
  onPullDownRefresh() {},

  // 滚到底部 追加分页
  onReachBottom() {
    this.getListData((list) => {
      this.currIndex += 1
      this.courseList = this.courseList.concat(list)
    })
  },

  created() {
    this.getBannerList()
    this.getListData()
    this.getTreeList()
  },

  methods: {
    // 获取菜单树
    getTreeList() {
      this.tree = []
      homePageModel.getCouresTree().then((data) => {
        const { tree = [] } = data

        // 1层菜单
        tree.unshift({
          id: '',
          name: '所有',
          childShopwindowTreeVOS: null
        })
        this.selectTree = [tree[0]] //默认选中第一项
        this.tree = [tree]

        // 2层菜单 业务
        // let arryList = [[], []]
        // let childList = [] // 二层数据
        // tree.forEach((item) => {
        //   arryList[0].push(item)
        //   const child = item.childShopwindowTreeVOS

        //   if (Array.isArray(child)) {
        //     child.map((_item) => {
        //       childList.push(_item)
        //     })
        //   } else {
        //     childList.push([{ name: '暂无' }])
        //   }
        // })

        // arryList[1] = childList[1]
        // this.childList = childList
        // this.tree = arryList
      })
    },
    // 获取轮播图
    getBannerList() {
      this.swiperList = []
      homePageModel.getBanners(this.isVip).then((list = []) => {
        this.swiperList = list
      })
    },

    getListData(callback) {
      console.log('当前页：', this.currIndex, '总页：', this.totalPages)
      if (this.currIndex != 0 && this.currIndex >= this.totalPages) {
        return
      }
      uni.showLoading({
        title: '加载中...'
      })

      const params = {
        size: 10,
        page: this.currIndex,
        shelvesState: 1, // 0未上架，1已上架
        positionType: this.isVip
      }

      // TODO 暂时处理菜单一层
      if (this.selectTree.length > 0) {
        params.shopwindowId = this.selectTree[0].id
      }

      homePageModel
        .getCourses(params)
        .then((data = {}) => {
          const { content = [] } = data
          if (content.length == 0) {
            this.courseList = []
            return
          }
          this.totalPages = data.totalPages - 1

          callback ? callback(content) : (this.courseList = content)
        })
        .finally(() => {
          uni.hideLoading()
        })
    },

    onSwiperClick(index) {
      if (this.swiperList.length > 0) {
        const item = this.swiperList[index]
        this.toCourseDetails(item)
      }
    },

    // 跳转课程详情
    toCourseDetails(item) {
      const user = {
        schoolCourseId: item.id,
        courseType: item.courseType
      }
      uni.navigateTo({
        url: `../course-details/course-details?data=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      })
    },

    // 收到关闭菜单树
    onCoursePopupHide() {
      console.log(this.selectTree)
      this.coursePopupShow = false
      this.currIndex = 0
      this.getListData()
    },

    // 菜单树变化
    changeHandler(e) {
      const { columnIndex, value, index, picker = this.$refs.uPicker } = e

      // 第一次层变化，更新该层下面子数据
      if (columnIndex === 0 && this.childList.length) {
        picker.setColumnValues(1, this.childList[index])
      }
      this.selectTree = value
    },

    // 菜单 - 点击确认
    onTreeSelect({ value }) {
      this.selectTree = value
      this.onCoursePopupHide()
    },

    // 切换Vip 类型
    onSwitchVip(isVip) {
      this.isVip = isVip
      this.getBannerList()

      //  this.currIndex = 0
      //this.getListData()
    },

    // 点击输入框
    onSearchInput() {
      uni.$u.route({
        url: 'pages/search-list/search-list'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-home {
  // 头部网校信息
  .mod-school {
    height: 40px;

    &__info {
      line-height: 40px;
      display: flex;
      image {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-color: #eeeeee;
        border-radius: 3px;
      }
      .fw-600 {
        margin-left: 10px;
      }
    }
  }

  // 课程菜单树
  .mod-courses-class {
    width: 100%;
    height: 500px;
    background: red;
  }

  // 查询框
  .mod-query {
    height: 42px;
  }

  .mod-member {
    font-size: 18px;

    .vip {
      margin-right: 15px;
    }

    .is-active {
      font-size: 21px;
      color: $u-primary;
      transition: color 0.3s;
    }
  }

  // 轮播图
  .mod-swiper {
    .indicator {
      @include flex(row);
      justify-content: center;
      &__dot {
        height: 6px;
        width: 6px;
        border-radius: 100px;
        background-color: rgba(255, 255, 255, 0.35);
        margin: 0 5px;
        transition: background-color 0.3s;

        &--active {
          background-color: #ffffff;
        }
      }
    }
  }

  // 课程列表
  .mod-course-list {
    margin-bottom: -10px;
    .u-box__content {
      display: flex;
      flex-wrap: wrap;

      .course-item {
        width: 48%;
        height: 265px;
        margin-bottom: 10px;

        &:nth-of-type(odd) {
          margin-right: 4%;
        }

        image {
          display: inline-block;
          width: 100%;
          height: 165px;
        }

        &__class {
          margin: 10px 0;
          text {
            padding: 4px;
            border-radius: 3px;
            background-color: #f6f6f6;
            color: #8e8e93;
            &:first-child {
              margin-right: 5px;
            }
          }
        }

        &__money {
          color: #ff9500;
        }
      }
    }
  }
}
</style>
