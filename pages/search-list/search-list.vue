<template>
  <view class="mod-search-list">
    <!-- 搜索 -->
    <view class="mod-query bg-white">
      <view class="query-search">
        <u-input
          :focus="true"
          placeholder="请输入搜索的内容"
          prefixIcon="search"
          prefixIconStyle="font-size: 22px;color: #909399"
          @input="onSearchInput"
        ></u-input>
      </view>
    </view>

    <view class="u-page mod-list">
      <view class="mod-list__item" v-for="(item, index) in list" :key="index">
        <view class="course-img">
          <u-image width="95px" height="95px" :src="item.coverUrl"> </u-image>
        </view>
        <view class="course-box">
          <view class="fz-16 u-line-2">{{ item.courseName || '课程' }}</view>
          <view class="fz-12 course-box_class">
            <text>{{ item.courseType == 0 ? '单科' : '全科' }}</text>
            <text>{{ item.classTypeNum }}个班型可选</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import homePageModel from '@/models/homePageModel'
export default {
  name: 'searchList',
  data() {
    return {
      list: [],
      obj: {
        courseNo: '1',
        courseName: '03708中国近现代史纲要',
        coverUrl:
          'https://obs-sxmaps.obs.cn-south-1.myhuaweicloud.com:443/1635914074727%E8%BF%91%E4%BB%A3%E5%8F%B2.png?AccessKeyId=EFEFKMKB34MST8GOISMX&Expires=1640681072&Signature=xHBiodD42rtZNpamGquWn9kIDw4%3D',
        chapterRecordingNum: null,
        recordingNum: 12,
        advancedRecordingNum: null,
        materialsNum: 13,
        advancedMaterialsNum: null,
        chapterExerciseNum: null,
        exerciseNum: null,
        advancedExerciseNum: null,
        lecturerVO: {
          lecturerNo: 'ls0000030',
          lecturerName: '王少龙',
          lecturerPhoto:
            'https://obs-sxmaps.obs.cn-south-1.myhuaweicloud.com:443/16359340343721634290620154%E7%8E%8B%E5%B0%91%E9%BE%99%E5%89%AF%E6%9C%AC.png?AccessKeyId=EFEFKMKB34MST8GOISMX&Expires=1640681072&Signature=Zb%2FAzxQwzy5mHj2o3ajkUOua2HA%3D',
          lecturerIntroduction:
            '王老师，有着多年高校和职业院校教学、科研经验，申报国家自然科学基金一项，省市级科研项目十余项，发表学术文章十余篇，对课程内容的把握、知识点的了解准确清晰，能够运用不同的教学方法帮助学员理解、记忆知识点。授课氛围轻松活跃，尊重学员，认真负责。'
        }
      }
    }
  },
  onReady() {
    console.log(this.$refs.uInput)
  },
  methods: {
    // 加载数据
    initData(courseName) {
      this.list = []
      homePageModel
        .findCourseByName({
          courseName
        })
        .then((data = []) => {
          console.log('查询数据')
          console.log(data)

          this.list = data
        })
    },

    onSearchInput(courseName = '') {
      if (courseName.trim().length > 0) {
        this.initData(courseName)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/com-list.scss';
.mod-search-list {
  position: relative;
  overflow-y: auto;

  .mod-query {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 1;
    padding: 12rpx 0;

    .query-search {
      width: 96%;
      margin: 0 auto;
    }
  }

  .mod-list {
    margin-top: 110rpx;
    &__item {
      box-shadow: 0 2px 7px #d9d9d9, 0 -11px 22px #ffffff;

      .course-box_class {
        margin: 8px 0;
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
    }
  }
}
</style>
