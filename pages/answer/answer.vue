<template>
  <view class="mod-answer">
    <view></view>
    <swiper :current="index" class="mod-answer__swiper" @change="sectionChange">
      <swiper-item
        class="swiper-item u-box"
        v-for="(item, index) in exerciseList"
        :key="index"
      >
        <view class="u-page">
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
          <view class="answer-title fz-16">
            <!-- #ifdef MP-WEIXIN -->
            <!-- <rich-text :nodes="item.exerciseTitle"></rich-text> -->
            <u-parse :content="item.exerciseTitle"></u-parse>
            <!-- #endif -->

            <!-- #ifdef H5 -->
            <text class="com-parse-html" v-html="item.exerciseTitle"></text>
            <!-- #endif -->
          </view>

          <!-- 题干 -->
          <view class="answer-stem">
            <!-- 问答 -->
            <view v-if="item.exerciseType == 1">
              <view class="u-box">
                <u-input
                  v-model="item.answer.answer[0].content"
                  :disabled="!!item.answer.id"
                  placeholder="请输入正确答案"
                ></u-input>
              </view>
              <u-button
                type="primary"
                text="提交"
                @click="onSubmitQuestion"
              ></u-button>
            </view>

            <!-- 判断 -->
            <view v-if="item.exerciseType == 2"> </view>

            <!-- 单选 -->
            <view v-if="item.exerciseType == 3 && item.answer.answer[0]">
              <view class="u-demo-block__content">
                <view class="u-page__radio-item">
                  <u-radio-group
                    :disabled="!!item.answer.id"
                    :isDefuCSS="!item.answer.id"
                    v-model="item.answer.answer[0].id"
                    placement="column"
                    @change="groupRadioChange"
                  >
                    <u-radio
                      v-for="(_item, _index) in item.exerciseOptionVOS"
                      :key="_index"
                      :label="_item.exerciseOptionContent"
                      :name="_item.exerciseOption"
                      :id="_item.id"
                      :success="_item.isCorrect"
                    >
                    </u-radio>
                  </u-radio-group>
                </view>
              </view>
            </view>

            <!-- 多选 -->
            <view v-if="item.exerciseType == 4"> </view>

            <!-- 填空 -->
            <view v-if="item.exerciseType == 5"> </view>

            <!-- 综合 -->
            <view v-if="item.exerciseType == 6"> </view>

            <!-- 多选 -->
            <view> </view>
          </view>

          <!-- 试题解析 是否正确 反馈 -->
          <view class="fz-15 flex jsb">
            <view>
              <view v-if="[1, 5].includes(item.exerciseType)">
                <text class="c-success" v-if="true">这道题您做对了</text>
                <text class="c-success" v-else>这道题您做错了</text>
              </view>
            </view>
            <text
              class="c-primary"
              @click="item.isShowAnalysis = !item.isShowAnalysis"
              >试题解析</text
            >
          </view>

          <!-- 习题解析 -->
          <u-transition
            :show="!!(item.isShowAnalysis || item.answer.id)"
            mode="fade-up"
          >
            <view class="fz-15 u-box analysis-answer m-b-30">
              <view class="fz-16 fw-600">习题解析</view>
              <view
                class="c-primary"
                v-if="[2, 3, 4].includes(item.exerciseType)"
              >
                正确答案：
                <!-- TODO 小程序兼容-->
                <text v-html="'C'"></text>
              </view>
              <view class="answer-title">
                <!-- #ifdef MP-WEIXIN -->
                <!-- <rich-text :nodes="item.analysisAnswer"></rich-text> -->
                <u-parse :content="item.analysisAnswer"></u-parse>
                <!-- #endif -->

                <!-- #ifdef H5 -->
                <text
                  class="com-parse-html"
                  v-html="item.analysisAnswer"
                ></text>
                <!-- #endif -->
              </view>
            </view>
          </u-transition>
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
      exerciseList: [],
      // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
      radiovalue1: 1
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
    },

    indexToWORD() {
      return (index) => {
        return enums.WORD[index] || '~'
      }
    }
  },

  methods: {
    sectionChange({ target }) {
      const { current } = target
      this.index = current
    },
    initData(obj, isReset) {
      delete obj.title
      const params = {
        ...obj,
        exerciseSource: '2' // 固定
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
            ({ index, list }) => {
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

    // [单选题]选择后 并绑定 {name:当前自己勾选项，id：id标识，successIndex：正确答案选项}
    groupRadioChange({ name, id, successIndex }) {
      const ab = this.exerciseList[this.index]

      ab.answer.id = ab.id
      ab.answer.judge = name == successIndex ? 1 : 0 // 自己选项 是否 对于正确选项，1正确，0错误
      this.$set(this.exerciseList, this.index, ab)
    },

    // [填空题]选择后
    onSubmitQuestion() {
      console.log(this.index)
      const ab = this.exerciseList[this.index]

        // todo 提交后 还要让用户自己判断 答对答错
      ab.answer.id = ab.id
      
    },
  }
}
</script>

<style lang="scss" scoped>
.mod-answer {
  &__swiper {
    height: calc(100vh - var(--window-top));

    .swiper-item {
      overflow-y: auto;
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

      // 题目
      .answer-title {
        margin-top: 10px;
        background: #f0f0f0;
        padding: 15px;
        border-radius: 10px;
      }

      // 题干
      .answer-stem {
        font-size: 32rpx;
        margin: 15px 0;
      }

      // 解析
      .analysis-answer {
        .fw-600 {
          margin: 30rpx 0;
        }
      }
    }
  }
}
</style>
