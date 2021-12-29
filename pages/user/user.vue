<template>
  <view class="mod-user">
    <view class="top-bg-image">
      <u-image width="100vw" height="30vh" :src="bgSrc"></u-image>
    </view>
    <swiper vertical class="user__swiper" :previous-margin="previousMargin">
      <swiper-item class="swiper-item">
        <!-- 用户信息 -->
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

        <!-- 功能栏 -->
        <view class="mod-nav-list m-b-30">
          <view class="li">
            <u-icon
              color="#000"
              size="60rpx"
              name="https://s4.ax1x.com/2021/12/23/TGDBW9.png"
            ></u-icon>
            <text class="nav-item-name">修改密码</text>
          </view>

          <view class="li">
            <u-icon
              size="60rpx"
              name="https://s4.ax1x.com/2021/12/23/TGDDzR.png"
            ></u-icon>
            <text class="nav-item-name">账号注销</text>
          </view>

          <view class="li">
            <u-icon
              size="60rpx"
              name="https://s4.ax1x.com/2021/12/23/TGDsQ1.png"
            ></u-icon>
            <text class="nav-item-name">意见反馈</text>
          </view>

          <view class="li">
            <u-icon
              size="60rpx"
              name="https://s4.ax1x.com/2021/12/23/TGD0JJ.png"
            ></u-icon>
            <text class="nav-item-name">关于我们</text>
          </view>
        </view>

        <!-- 退出按钮 -->
        <view class="m-b-30">
          <u-button
            type="primary"
            text="退出登录"
            @click="handlerLogout"
          ></u-button>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user',
  data() {
    return {
      bgSrc: 'https://s4.ax1x.com/2021/12/24/TYahAe.png',
      previousMargin: '400rpx'
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  onLoad() {
    // #ifdef H5
    this.previousMargin = '470rpx'
    // #endif

    // #ifdef MP-WEIXIN
    this.previousMargin = '400rpx'
    // #endif
  },

  methods: {
    ...mapActions({
      handlerLogout: 'user/logout' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
</script>


<style lang="scss" scoped>
.mod-user /deep/ .uni-swiper-wrapper,
.mod-user /deep/ uni-swiper-item,
.mod-user /deep/ swiper-item,
.mod-user /deep/ .swiper-item {
  overflow: inherit;
}
.mod-user {
  position: relative;
  overflow-y: auto;
  .top-bg-image {
    width: 100vw;
    height: 30vh;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
  }
  .user__swiper {
    // margin-top: 35vh; //todo
    height: 93vh;
    padding: 0 25px;

    .user-base {
      height: 190rpx;
      display: flex;
      position: relative;

      .user-imgage {
        width: 25%;
        .img-head {
          position: absolute;
          top: -30%;
          left: 0;
          border: 2px solid $uni-text-color-inverse;
          border-radius: 50%;
        }
      }
      .user-info {
        width: 75%;
        box-sizing: border-box;
        padding: 30rpx 20rpx;

        .fw-600 {
          padding-bottom: 30rpx;
        }
      }
    }

    .mod-nav-list {
      .li {
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 36rpx;
        .nav-item-name {
          padding-left: 30px;
        }
      }
    }
  }
}
</style>
