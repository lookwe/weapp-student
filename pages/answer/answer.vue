<template>
  <view class="mod-answer">
    <view></view>
    <swiper :current="index" class="mod-answer__swiper" @change="sectionChange">
      <swiper-item
        class="swiper-item u-box"
        v-for="(item, index) in exerciseList"
        :key="index"
      >
        <view class="answer-main u-page">
          <view class="flex jsb u-box">
            <view class="fz-17">
              <text class="fw-600"
                >{{ index + 1 }}/{{ exerciseList.length }}</text
              >
              <text>{{ typeName(item.exerciseType) }}</text>
            </view>
            <view class="fz-14 answer-difficulty">
              <text v-if="item.exerciseGrade == 1" class="simple box-circu"
                >易</text
              >
              <text v-if="item.exerciseGrade == 2" class="moderate box-circu"
                >中</text
              >
              <text v-if="item.exerciseGrade == 3" class="difficulty box-circu"
                >难</text
              >
            </view>
          </view>

          <!-- 题目 -->
          <view class="swiper-title fz-16">
            <!-- #ifdef H5 -->
            <rich-text :nodes="item.exerciseTitle"></rich-text>
            <!-- #endif -->

            <!-- #ifdef H5 -->
            <text class="com-parse-html" v-html="item.exerciseTitle"></text>
            <!-- #endif -->
          </view>

          <!-- 题干 -->
          <view>
            <!-- 单选 -->
            <view> </view>
            <!-- 多选 -->
            <view> </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import myCourseApi from '@/models/myCourseModel'
import { readTxtFile } from './js'
import * as enums from './js/enumerate'

export default {
  name: 'answer',
  data() {
    return {
      index: 0,
      exerciseList: []
    }
  },
  onLoad(obj) {
    uni.setNavigationBarTitle({ title: obj.title })
    this.initData(obj, false)
  },

  computed: {
    typeName() {
      // 1:问答题  2:判断题  3:单选题  4:多选题 5:填空题 6:综合体（有子试题）
      return (type) => {
        return enums.EXERCOES_NAME[type] || '未知'
      }
    }
  },

  methods: {
    initData(obj, isReset) {
      delete obj.title

      // todo: com-list 在付给课程 编写上次记录

      const params = {
        ...obj,
        exerciseSource: '2'
      }

      myCourseApi.getExercises(params).then((data) => {
        try {
          if (!data) return

          let dataStr = JSON.stringify(data)
          dataStr = dataStr
            .replace(/<\$\$>.*?<\/\$\$>/g, '')
            .replace(
              /<image>(.*?)<\/image>/g,
              '<view class=\\"cursor-p\\"> <image mode=\\"scaleToFill\\" src=\\"data:image/png;base64,$1\\"></image> </view>'
            )

          // 读取进度 并转 前端格式
          readTxtFile(params, JSON.parse(dataStr), isReset).then(
            ({ index, list, isInit = true }) => {
              this.index = index
              this.exerciseList = list

              console.log('vue页面得到数据')
              console.log(this.exerciseList)
            }
          )
        } catch (error) {
          console.error(`img标签解析失败：${error}`)
        }
      })
    },

    sectionChange({ target }) {
      const { current } = target
      this.curNow = current
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-answer {
  &__swiper {
    height: 80vh;

    border-bottom: 1px solid red;
    .swiper-item {
      .answer-main {
      }
      .fw-600 {
        padding-right: 20px;
      }

      .answer-difficulty {
        .box-circu {
          padding: 4px;
          border-radius: 50%;
        }
        .simple {
          background: #e1ffd2;
          color: #35a202;
        }
        .moderate {
          background: #fff8e9;
          color: #fa9d39;
        }
        .difficulty {
          background: #ffd8d6;
          color: #ff3b30;
        }
      }

      .swiper-title {
        margin-top: 10px;
        background: #f0f0f0;
        padding: 15px;
        border-radius: 15px;
      }
    }
  }
}
</style>
