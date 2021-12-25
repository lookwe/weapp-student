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
import CoursesModel from '@/models/coursesModel'
import classEnum from '@/util/enum'

export default {
  name: 'catalog',
  data() {
    return {
      classTypeNavlist: [],
      currentClassType: 0
    }
  },
  computed: {
    ...mapGetters(['getCourse']),
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
      this.getCourse.classTypeVOS[this.getCourse.currentClassType] || {}

    // 获取菜单资源
    this.fetchClassTypeNavlist({ classTypeNo })
  },
  methods: {
    // 数据初始化 组件调用
    fetchClassTypeNavlist({ classTypeNo }) {
      this.classTypeNavlist = []
      this.currentClassType = 0
      CoursesModel.getClassTypeModule({ classTypeNo }).then((data) => {
        this.classTypeNavlist = data

        this.getDirectors()
      })
    },

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
    background: $u-border-color; //$u-info-disabled;
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
