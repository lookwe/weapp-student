<template>
  <view class="mod-directory">
    <view class="top-avigation bg-white">
      <view class="u-page">
        <u-subsection
          :list="list"
          mode="subsection"
          keyName="moduleName"
          :current="curNow"
          @change="sectionChange"
        ></u-subsection>
      </view>
    </view>

    <view class="directory-list u-page">
      <swiper :current="curNow" class="swiper" @change="sectionChange">
        <swiper-item class="swiper-item">
          <com-list :isBuy="true" ref="comList0"></com-list>
        </swiper-item>
        <swiper-item class="swiper-item">
          <com-list :isBuy="true" ref="comList1"></com-list>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  name: 'directory',
  data() {
    return {
      list: [],
      curNow: 0,
      courseNo: '',
      ordersItemNo: '',

      isSign: [false, false]
    }
  },
  watch: {
    curNow() {
      this.getDirectors()
    }
  },
  onLoad({ data, courseNo, title, ordersItemNo }) {
    this.courseNo = courseNo
    this.ordersItemNo = ordersItemNo
    this.list = JSON.parse(data)

    if (this.list.length > 0) {
      this.$nextTick(() => {
        this.getDirectors()
      })
    }
    uni.setNavigationBarTitle({ title })
  },
  methods: {
    sectionChange(index) {
      if (typeof index === 'number') {
        this.curNow = index
      } else {
        const { current } = index.target
        this.curNow = current
      }
    },

    // 获取目录
    getDirectors() {
      if (this.isSign[this.curNow]) {
        return
      }
      const { classModuleEnumCode } = this.list[this.curNow] || {}
      const refName = `comList${this.curNow}`

      this.$refs[refName].fetchDirectoryList(
        {
          classModuleEnumCode,
          courseNo: this.courseNo,
          ordersItemNo: this.ordersItemNo
        },
        () => {
          // 成功就表示为true， 下次不在重复请求
          this.$set(this.isSign, this.curNow, true)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-directory {
  overflow-y: auto;
  position: relative;
  .top-avigation {
    position: fixed;
    top: var(--window-top);
    left: 0;
    width: 100vw;
    height: 75rpx;
    z-index: 99;
    padding-top: 10px;
  }
  .directory-list {
    margin-top: var(--window-top);

    /* #ifdef MP-WEIXIN */
    margin-top: calc(var(--window-top) + 85rpx);
    /* #endif */
  }
}

.swiper {
  height: calc(100vh - var(--window-top) - 60px);

  .swiper-item {
    overflow: auto;
  }
}
</style>
