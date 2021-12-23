<template>
  <view class="mod-user">
    <view>
      <u-image width="100vw" hieght="420px" :src="src"></u-image>
    </view>
    <view class="user-page">
      <view class="user-base">
        <view class="user-imgage">
          <u-image
            class="img-head"
            width="75"
            height="75"
            shape="circle"
            :src="src"
          ></u-image>
        </view>
        <view class="user-info">
          <view class="fz-19 fw-600">你好旧时光</view>
          <view class="fz-14 c-explain u-line-2"
            >你好旧时你好旧时光好旧时你好旧时光23你好旧时光23你23你好旧时光23你好旧时光23光23</view
          >
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
        <u-button type="primary" text="退出登录"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      src: 'https://obs-sxmaps.obs.cn-south-1.myhuaweicloud.com/1634286671506%E6%88%90%E8%80%83%E4%B8%93%E7%A7%91%E5%85%A5%E5%AD%A6%E6%95%B0%E5%AD%A6%E5%B0%81%E9%9D%A2.png?AccessKeyId=EFEFKMKB34MST8GOISMX&Expires=1640337454&Signature=ULStCaw0hxRCLL4s37w4bcPkt4c%3D'
    }
  },
  created() {},
  methods: {}
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
      padding: 15px 30px 15px 20px;

      .fw-600 {
        padding-bottom: 15px;
      }
      .fz-15 {
      }
    }
  }

  .mod-nav-list {
    margin-top: 15px;
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

  .mod-bnt-logout {
  }
}
</style>
