<template>
  <view class="fz-14 answer-difficulty">
    <text v-if="exerciseGrade == 1" class="simple box-circu">易</text>
    <text v-if="exerciseGrade == 2" class="moderate box-circu">中</text>
    <text v-if="exerciseGrade == 3" class="difficulty box-circu">难</text>
  </view>
</template>
 
<script>
export default {
  props: {
    exerciseGrade: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>
 
<style scoped lang="scss">
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
</style>