<template>
  <view class="mod-answer">
    <view> 做题 </view>
  </view>
</template>

<script>
import myCourseApi from '@/models/myCourseModel'
export default {
  name: 'answer',
  data() {
    return {}
  },
  onLoad(obj) {
    uni.setNavigationBarTitle({ title: obj.title })
    this.initData(obj)
  },

  methods: {
    initData(obj) {
      delete obj.title

      // todo: com-list 在付给课程 编写上次记录

      const params = {
        ...obj,
        exerciseSource: '2'
      }

      myCourseApi.getExercises(params).then((data) => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-answer {
}
</style>
