<template>
  <view class="mod-catalog">
    <view class="catalog-types">
      <view
        v-for="(item, index) in classTypeNavlist"
        :key="index"
        :class="[
          'catalog-type__item',
          currentClassType === index ? 'active' : ''
        ]"
        @click="onClickItem(index)"
      >
        {{ item.moduleName }}
      </view>
    </view>
    <view class="mod-directory-list u-page">
      <com-list ref="comList"></com-list>
    </view>
  </view>
</template>

<script>
// 全科下面 单科，课程菜单列表页面

import { mapGetters } from 'vuex'
import classEnum from '@/util/enum'
import menuMixin from '@/common/mixin/menuMixin'

export default {
  name: 'catalog',
  mixins: [menuMixin],
  data() {
    return {
      currentClassType: 0
    }
  },
  computed: {
    ...mapGetters(['getCourseInfo']),
    // icon图片名称
    getCurrentIconName() {
      const { api } = this.actionMap || {}
      return {
        getRecordingCourseDutyList: 'play-circle', // 视频
        getExams: 'edit-pen', // 习题·
        getMaterials: 'file-text' // 资料
      }[api]
    },
    // 执行对象
    actionMap() {
      // 当前选中类型
      const { classModuleEnumCode } =
        this.classTypeNavlist[this.currentClassType] || {}

      // 根据当前类型Code获取执行枚举
      const action = classEnum[classModuleEnumCode]
      return action
    }
  },
  onLoad({ courseNo }) {
    this.courseNo = courseNo

    // 通过vuex 获取版型号
    const { classTypeNo } =
      this.getCourseInfo.classTypeVOS[this.getCourseInfo.currentClassType] || {}

    // 获取菜单资源 混入函数
    this.fetchClassTypeNavlist({ classTypeNo }, this.getDirectors)
  },
  methods: {
    // 获取目录
    getDirectors() {
      const { classModuleEnumCode } =
        this.classTypeNavlist[this.currentClassType] || {}
      this.$refs.comList.fetchDirectoryList({
        classModuleEnumCode,
        courseNo: this.courseNo
      })
    },

    onClickItem(index) {
      this.currentClassType = index
      this.getDirectors()
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-catalog {
  position: relative;
  overflow: hidden;

  .catalog-types {
    position: fixed;
    top: var(--window-top);
    left: 0;
    width: 100vw;
    height: 80rpx;
    background: $u-border-color;
    overflow-x: auto;
    white-space: nowrap;
    line-height: 80rpx;
    z-index: 99;

    .catalog-type__item {
      display: inline-block;
      margin: 0 15px;
      color: $u-tips-color;

      &.active {
        color: $u-main-color;
        transition: color 0.3s;
      }
    }
  }

  .mod-directory-list {
    margin-top: 35px;
  }
}
</style>
