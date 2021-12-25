<template>
  <view>
    <u-transition :show="!!directoryList.length" mode="fade-left">
      <view
        :class="['mod-nav-list', 'm-b-30', isBuy ? 'is-buy' : 'no-buy']"
        v-show="directoryList.length"
      >
        <view
          :class="['li', item.tryLength > 0 ? 'is-buy' : 'no-buy']"
          v-for="(item, index) in directoryList"
          :key="index"
          @click="onItemLiClick(typeName, item)"
        >
          <u-icon
            :color="isBuy ? 'is-buy' : 'no-buy'"
            size="25"
            :name="typeName"
          ></u-icon>
          <text class="nav-item-name u-line-2">
            {{ item.fileName || item.materialsName || item.examName }}
          </text>
          <view class="icon-right">
            <!-- 视频 -->
            <view v-show="typeName === 'play-circle'">
              <view v-if="isBuy"> </view>
              <view v-else>
                <text v-if="item.tryLength > 0" class="c-error">试看</text>
              </view>
            </view>

            <!-- 习题 -->
            <view v-show="typeName === 'edit-pen'">
              <view v-if="isBuy"> </view>
              <view v-else> </view>
            </view>

            <!-- 资料 -->
            <view v-show="typeName === 'file-text'">
              <view v-if="isBuy"> </view>
              <view v-else> </view>
            </view>
          </view>
        </view>
      </view>
    </u-transition>

    <u-transition :show="isDirectory" mode="fade-left">
      <view v-show="!directoryList.length">
        <u-empty
          mode="list"
          icon="http://cdn.uviewui.com/uview/empty/list.png"
        />
      </view>
    </u-transition>
  </view>
</template>
 
<script>
import CoursesModel from '@/models/coursesModel'
import classEnum from '@/util/enum'
export default {
  name: 'comList',
  props: {
    isBuy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDirectory: false,
      directoryList: [],

      classModuleEnumCode: '',
      actionMap: null
    }
  },
  computed: {
    // icon图片名称
    typeName() {
      const { api } = this.actionMap || {}
      return {
        getRecordingCourseDutyList: 'play-circle', // 视频
        getExams: 'edit-pen', // 习题·
        getMaterials: 'file-text' // 资料
      }[api]
    }
  },

  methods: {
    // 获取目录
    fetchDirectoryList({ classModuleEnumCode, courseNo }) {
      this.isDirectory = false
      if (classModuleEnumCode) {
        const actionMap = classEnum[classModuleEnumCode]
        this.actionMap = actionMap
        this.directoryList = []

        CoursesModel[actionMap.api]({
          ...actionMap.parmas,
          courseNo
        })
          .then((directoryList) => {
            console.log('课程目录')
            console.log(directoryList)

            if (Array.isArray(directoryList)) {
              this.isDirectory = true
              this.directoryList = directoryList
            }
          })
          .catch(() => {
            this.isDirectory = false
          })
      } else {
        // 显示空目录
        this.isDirectory = false
      }
    },

    // 跳转试看视频
    onTryVideo() {
      uni.$u.route({
        url: 'pages/video-play/video-play',
        params: {}
      })
    },

    onItemLiClick(type, iiem) {
      switch (type) {
        case 'play-circle':
          this.onTryVideo()
          break

        case 'edit-pen':
          console.log('习题点击')
          break

        case 'file-text':
          console.log('资料点击')
          break
      }
    }
  }
}
</script>
 
<style scoped lang="scss">
.mod-nav-list {
  .li {
    display: flex;
    align-items: center;

    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 15px;
    .nav-item-name {
      padding-left: 20px;
      width: 72%;
    }

    .icon-right {
      display: inline-block;
      width: 20%;
      text-align: right;
    }
  }
}

.is-buy {
  color: $uni-text-color;
}

.no-buy {
  color: $uni-text-color-disable;
}
</style>