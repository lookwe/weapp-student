<template>
  <view class="mod-but-price">
    <view class="price">
      <view class="fz-12 c-describe">课程售价</view>
      <view>
        <number-roll :value="money"></number-roll>
      </view>
    </view>

    <view class="box-reigth">
      <view class="try-look" v-if="isTry" @click="onTryLookClick">
        课程试听
      </view>
      <view class="sign-up" @click="onSignUpClick"> 报名咨询 </view>
    </view>
  </view>
</template>
 
<script>
export default {
  name: 'comButPrice',
  props: {
    isTry: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      money: 20001
    }
  },

  methods: {
    setMoney(money) {
      this.money = money
    },
    //   点击课程时刻
    onTryLookClick() {
      uni.$u.route({
        url: 'pages/inline-single/inline-single'
      })
    },

    // 报名咨询
    onSignUpClick() {
      uni.$u.route({
        url: 'pages/registration/registration'
      })
    }
  }
}
</script>
 
<style scoped lang="scss">
.mod-but-price {
  position: fixed;
  bottom: 20px;
  left: 3.6vw;
  width: 92.8vw;
  height: 60px;
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 16px 16px 0 rgba(50.1, 50.1, 71.27, 0.08),
    0 24px 32px 0 rgba(50.1, 50.1, 71.27, 0.08);
  z-index: 999;

  .price {
    width: 45%;
    background: $uni-bg-color;
    padding: 5px 0 5px 20px;
    .c-describe {
      padding-bottom: 8px;
    }
  }

  .box-reigth {
    width: 55%;
    display: flex;
    justify-content: flex-end;
    background: $uni-text-color-inverse;

    .try-look {
      width: 50%;
      background: $u-primary-light;
      color: $u-primary;
    }

    .sign-up {
      width: 50%;
      background: $u-primary;
      background: -webkit-linear-gradient(
        to right,
        $u-primary-disabled,
        $u-primary
      );
      background: linear-gradient(to right, $u-primary-disabled, #007aff);
      color: $uni-bg-color;
    }
  }

  .sign-up,
  .try-look {
    line-height: 60px;
    text-align: center;
    font-size: 18px;
  }
}
</style>