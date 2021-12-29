<template>
  <view class="mod-answer u-page">
    <view> 做题 </view>
    <swiper
      vertical
      :current="index"
      class="mod-answer__swiper"
      @change="sectionChange"
    >
      <swiper-item class="swiper-item"> </swiper-item>
    </swiper>
  </view>
</template>

<script>
import myCourseApi from '@/models/myCourseModel'
import { readTxtFile } from './js'
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
    background: red;
    .swiper-item {
      height: 300px;
      background: salmon;
    }
  }
}
</style>
