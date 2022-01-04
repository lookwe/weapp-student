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

            <answerTypeTag :exerciseGrade="item.exerciseGrade" />
          </view>

          <!-- 题目 -->
          <answerTitle :title="item.exerciseTitle"></answerTitle>

          <!-- 题干 -->
          <view class="answer-stem">
            <!-- 问答 -->
            <view v-if="item.exerciseType == 1">
              <view class="u-box">
                <u-textarea
                  autoHeight
                  v-model="item.answer.answer[0].content"
                  :disabled="!!item.answer.id"
                  placeholder="请输入正确答案"
                ></u-textarea>
              </view>
              <u-button
                type="primary"
                text="提交"
                @click="saveBinID"
              ></u-button>
            </view>

            <!-- 单选 判断 -->
            <view v-if="[2, 3].includes(item.exerciseType)">
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
            <view v-if="item.exerciseType == 4">
              <u-checkbox-group
                :disabled="!!item.answer.id"
                :isDefuCSS="!item.answer.id"
                :ref="`answerCheckbox${index}`"
                shape="circle"
                v-model="item.answer.answer"
                placement="column"
              >
                <u-checkbox
                  :customStyle="{ marginBottom: '20px' }"
                  v-for="(_item, _index) in item.exerciseOptionVOS"
                  :key="_index"
                  :label="_item.exerciseOptionContent"
                  :name="_item.exerciseOption"
                  :id="_item.id"
                  :success="_item.isCorrect"
                >
                </u-checkbox>
              </u-checkbox-group>
              <u-button
                type="primary"
                text="提交"
                @click="onSubmitCheckbox"
              ></u-button>
            </view>

            <!-- 填空 -->
            <view v-if="item.exerciseType == 5">
              <view class="u-box">
                <u-input
                  v-for="(_item, _index) in item.exerciseOptionVOS"
                  :key="_index"
                  v-model="item.answer.answer[_index].content"
                  clearable
                  :disabled="!!item.answer.id"
                  placeholder="请输入正确答案"
                ></u-input>
              </view>
              <u-button
                type="primary"
                text="提交"
                @click="saveBinID"
              ></u-button>
            </view>

            <!-- 综合 -->
            <view v-if="item.exerciseType == 6">
              <view class="answer-childe">
                <u-collapse :border="false">
                  <u-collapse-item border>
                    <u-icon name="tags-fill" size="20" slot="icon"></u-icon>
                    <text slot="title">综合题题目</text>

                    <swiper class="answer-childe__swiper">
                      <swiper-item
                        v-for="(_item, _index) in item.childExercises"
                        :key="_index"
                        class="swiper-item"
                      >
                        <view class="u-page">
                          <view class="flex jsb u-box">
                            <view class="fz-17">
                              <text class="fw-600"
                                >{{ _index + 1 }}/{{
                                  item.childExercises.length
                                }}</text
                              >
                              <text>{{ typeName(_item.exerciseType) }}</text>
                            </view>

                            <answerTypeTag
                              :exerciseGrade="_item.exerciseGrade"
                            />
                          </view>

                          <!-- 题目 -->
                          <answerTitle
                            :title="_item.exerciseTitle"
                          ></answerTitle>
                        </view>
                      </swiper-item>
                    </swiper>
                  </u-collapse-item>
                </u-collapse>
              </view>
            </view>
          </view>

          <!-- 试题解析 是否正确 反馈 -->
          <view class="fz-15 flex jsb m-b-30">
            <view>
              <view v-if="[1, 5].includes(item.exerciseType)">
                <text class="c-success" v-if="item.answer.judge == 1"
                  >这道题您做对了</text
                >
                <text class="c-error" v-else-if="item.answer.judge == 0"
                  >这道题您做错了</text
                >
              </view>
            </view>
            <view class="flex">
              <u-icon
                class="m-right-2"
                color="primary"
                name="info-circle"
              ></u-icon>
              <view
                class="c-primary"
                @click="item.isShowAnalysis = !item.isShowAnalysis"
                >试题解析</view
              >
            </view>
          </view>

          <!-- 习题解析 -->
          <u-transition
            :show="!!(item.isShowAnalysis || item.answer.id)"
            mode="fade-up"
          >
            <view class="fz-15 u-box analysis-answer m-b-30">
              <view class="fz-16 fw-600">习题解析</view>

              <!-- 问填空题 -- 正确答案 TODO 兼容小程序 -->
              <view class="c-primary" v-if="[5].includes(item.exerciseType)">
                正确答案：
                <text
                  class="com-parse-html"
                  v-html="computSuccess(item.exerciseOptionVOS, true)"
                ></text>
              </view>

              <!-- 判断，单选、多选 =》 正确答案  -->
              <view
                class="c-primary"
                v-if="[2, 3, 4].includes(item.exerciseType)"
              >
                正确答案：
                <text>
                  {{ computSuccess(item.exerciseOptionVOS) }}
                </text>
              </view>

              <answerTitle :title="item.analysisAnswer"></answerTitle>

              <!-- 用户判断对错按钮 -->
              <view
                v-if="
                  item.answer.judge == -1 &&
                  [1, 5].includes(item.exerciseType) &&
                  item.answer.id
                "
                class="flex jsb juage-box u-box"
              >
                <u-button
                  class="bnt bnt-error"
                  color=""
                  type="primary"
                  text="答错了"
                  @click="onUserJudge(0)"
                ></u-button>

                <u-button
                  type="primary"
                  class="bnt bnt-success"
                  text="答对了"
                  @click="onUserJudge(1)"
                ></u-button>
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

import answerTypeTag from 'pages/answer/components/answerTypeTag'
import answerTitle from 'pages/answer/components/answerTitle'

export default {
  name: 'answer',
  components: {
    answerTypeTag,
    answerTitle
  },
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
        return enums.EXERCOES_NAME[type] || '未知题型'
      }
    },

    indexToWORD() {
      return (index) => {
        return enums.WORD[index] || '~'
      }
    },

    currAnswer() {
      return this.exerciseList[this.index]
    }
  },

  methods: {
    initData(obj, isReset) {
      delete obj.title
      const params = {
        ...obj,
        exerciseSource: '2' // 固定
      }
      myCourseApi.getExercises(params).then((data) => {
        try {
          if (!data) return

          // 读取进度 并转 前端格式
          readTxtFile(params, data, isReset).then(({ index, list }) => {
            this.index = index
            this.exerciseList = list

            console.log('vue页面得到数据')
            console.log(this.exerciseList)
          })
        } catch (error) {
          console.error(`img标签解析失败：${error}`)
        }
      })
    },

    // 绑定 题目ID 到答题卡中
    saveBinID(coutom) {
      const ab = this.currAnswer
      if (ab.answer.id) return
      ab.answer.id = ab.id
      ab.answer = Object.assign(ab.answer, coutom)
      this.saveAnswer()
    },

    // 用户自行判断对错
    onUserJudge(judge) {
      const ab = this.currAnswer
      ab.answer.judge = judge
      this.saveAnswer()
    },

    // [单选题]选择后 并绑定 {name:当前自己勾选项，id：id标识，successIndex：正确答案选项}
    groupRadioChange({ name, successIndex }) {
      this.saveBinID({
        judge: name == successIndex ? 1 : 0 // 自己选项 是否 对于正确选项，1正确，0错误
      })
    },

    // [多选题] 提交按钮
    onSubmitCheckbox() {
      const isSuccess =
        this.$refs['answerCheckbox' + this.index][0].unCheckedOther() // 提 显示正确与错误答案
      this.saveBinID({
        judge: isSuccess ? 1 : 0
      })
    },

    // set 保存当前答题
    saveAnswer() {
      this.$set(this.exerciseList, this.index, this.currAnswer)
    },
    sectionChange({ target }) {
      const { current } = target
      this.index = current
    },
    // 计算正确答案
    computSuccess(arr, isInput = false) {
      const strArr = []
      if (isInput) {
        arr.forEach((item, index) => {
          if (item.isCorrect == 1) {
            strArr.push(`${index + 1}: ${item.exerciseOptionContent} `)
          }
        })
      } else {
        arr.forEach((item) => {
          if (item.isCorrect == 1) {
            strArr.push(enums.WORD[item.exerciseOption] || '~')
          }
        })
      }
      return strArr.length > 0 && strArr.join()
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-answer {
  &__swiper {
    height: calc(100vh - var(--window-top));

    // 综合题
    .answer-childe {
      padding: 0;
      &__swiper {
        height: calc(100vh - var(--window-top) - 35vh);
      }
    }

    .swiper-item {
      overflow-y: auto;
      .fw-600 {
        padding-right: 20px;
      }

      // 题干
      .answer-stem {
        font-size: 32rpx;
        margin: 15px 0;
      }

      // 解析
      .analysis-answer {
        .fw-600 {
          margin: 0 0 15px;
        }

        .juage-box {
          .bnt {
            width: 45%;
          }
          .bnt-error {
            background: #f2c548;
            border-color: #f2c548;
            color: #303133;
          }
        }
      }
    }
  }
}
</style>
