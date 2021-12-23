<template>
  <view class="u-page dom-login">
    <view></view>
    <view class="u-demo-block logo-box">
      <image
        class="logo"
        src="https://obs-sxmaps.obs.cn-south-1.myhuaweicloud.com/1639564017091%E5%8A%A0%E5%88%86logo.png?AccessKeyId=EFEFKMKB34MST8GOISMX&Expires=1640312802&Signature=1JIaFjZnqM4Ry%2FP4NNmmLTjeRT8%3D"
        mode=""
      />
      <text class="app-name">加分课堂</text>
    </view>

    <view class="u-demo-block text-center fz-18">
      <text>欢迎您登录网校系统</text>
    </view>

    <view class="u-demo-block">
      <text class="u-demo-block__title white">用户名/学号</text>
      <view class="u-demo-block__content">
        <u-input
          v-model="formInline.username"
          placeholder="请输入账号"
          border="surround"
          clearable
        ></u-input>
      </view>
    </view>

    <view class="u-demo-block">
      <text class="u-demo-block__title white">密码</text>
      <view class="u-demo-block__content">
        <u-input
          v-model="formInline.password"
          :password="pwdIconName === 'eye-off'"
          placeholder="请输入密码"
          border="surround"
        >
          <template slot="suffix">
            <u-icon
              :name="pwdIconName"
              color="#2979ff"
              @click="
                pwdIconName =
                  pwdIconName === 'eye-fill' ? 'eye-off' : 'eye-fill'
              "
            ></u-icon>
          </template>
        </u-input>
      </view>
    </view>

    <view class="u-demo-block">
      <u-button
        :disabled="formInline.username === '' || formInline.password === ''"
        type="primary"
        text="登 录"
        class="white"
        @click="handelLogin"
      ></u-button>
    </view>
  </view>
</template>

<script>
import store from '@/store/index'
import userApi from '@/models/userModel'
import homeApi from '@/models/homePageModel'
import publicApi from '@/models/publicModel'

export default {
  data() {
    return {
      pwdIconName: 'eye-off', // eye-fill
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    change(e) {
      console.log('change', e)
    },

    handelLogin() {
      uni.showLoading({
        title: '登录中...'
      })
      userApi
        .login(this.formInline)
        .then((userInfo) => {
          if (userInfo) {
            store.dispatch('user/login', userInfo)
            this.onSchoolInfo()
            console.log('我来了')
            uni.switchTab({
              url: '/pages/home/home'
            })
          }
        })
        .finally(() => {
          uni.hideLoading()
        })
    },

    // 获取网校信息 & 解析图片 & 保存缓存
    onSchoolInfo() {
      homeApi.getSchoolInfo().then((schoolInfo) => {
        // 根据文件名解密完整路径
        const { logo = '', appQRCode = '', qrCode = '' } = schoolInfo

        const objectKeys = []
        if (logo) {
          objectKeys.push(logo)
        }
        if (appQRCode) {
          objectKeys.push(appQRCode)
        }
        if (qrCode) {
          objectKeys.push(qrCode)
        }

        // 解析圖片
        publicApi
          .getDownloadSignedUrl({
            objectKeys
          })
          .then((data) => {
            schoolInfo.logoUrl = data[logo]
            schoolInfo.appQRCodeUrl = data[appQRCode]
            schoolInfo.qrCodeUrl = data[qrCode]

            store.dispatch('school/setSchoolInfo', schoolInfo)
          })
      })
    }
  },
  created() {
    console.log(uni.getSystemInfoSync())
  }
}
</script>


<style lang="scss">
.dom-login ::v-deep .u-input {
  background: $uni-text-color-inverse;
}
input:-internal-autofill-selected {
  background: $uni-text-color-inverse;
}
</style>

<style lang="scss" scoped>
.dom-login {
  padding: 0 30px;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    180.25deg,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 1) 100%
  );
  background-image: url(https://s4.ax1x.com/2021/12/23/T89EfU.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .logo-box {
    margin-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 60px;
      height: 60px;
    }
    .app-name {
      font-size: 33px;
    }
  }
}
</style>