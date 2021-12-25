<template>
  <view class="mod-user">
    <view>
      <u-image width="100vw" hieght="420px" :src="bgSrc"></u-image>
    </view>
    <view class="user-page">
      <view class="user-base">
        <view class="user-imgage">
          <view class="img-head">
            <u-image
              width="150rpx"
              height="150rpx"
              shape="circle"
              :src="getUser.iconUrl"
            ></u-image>
          </view>
        </view>
        <view class="user-info">
          <view class="fz-19 fw-600">{{ getUser.userName }}</view>
          <view class="fz-14 c-explain u-line-2">{{
            getUser.signature || '什么也没留下'
          }}</view>
        </view>
      </view>

      <view class="mod-nav-list m-b-30">
        <view class="li">
          <u-icon
            color="#000"
            size="30"
            name="https://s4.ax1x.com/2021/12/23/TGDBW9.png"
          ></u-icon>
          <text class="nav-item-name">修改密码</text>
        </view>

        <view class="li">
          <u-icon
            size="30"
            name="https://s4.ax1x.com/2021/12/23/TGDDzR.png"
          ></u-icon>
          <text class="nav-item-name">账号注销</text>
        </view>

        <view class="li">
          <u-icon
            size="30"
            name="https://s4.ax1x.com/2021/12/23/TGDsQ1.png"
          ></u-icon>
          <text class="nav-item-name">意见反馈</text>
        </view>

        <view class="li">
          <u-icon
            size="30"
            name="https://s4.ax1x.com/2021/12/23/TGD0JJ.png"
          ></u-icon>
          <text class="nav-item-name">关于我们</text>
        </view>
      </view>

      <view class="m-b-30">
        <u-button
          type="primary"
          text="退出登录"
          @click="handlerLogout"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user',
  data() {
    return {
      bgSrc: 'https://s4.ax1x.com/2021/12/24/TYahAe.png'
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    ...mapActions({
      handlerLogout: 'user/logout' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
</script>

<style lang="scss" scoped>
.mod-user {
  .user-page {
    padding: 0 25px;
  }
  .user-base {
    height: 110px;
    display: flex;

    .user-imgage {
      width: 25%;
      position: relative;
      .img-head {
        position: absolute;
        top: -26%;
        left: 0;
        border: 2px solid $uni-text-color-inverse;
        border-radius: 50%;
      }
    }
    .user-info {
      width: 75%;
      box-sizing: border-box;
      padding: 15px 10px;

      .fw-600 {
        padding-bottom: 15px;
      }
    }
  }

  .mod-nav-list {
    height: 250px;

    .li {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 18px;
      .nav-item-name {
        padding-left: 30px;
      }
    }
  }
}
</style>
