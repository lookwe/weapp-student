<template>
  <view class="u-page dom-login" :style="{ height: view.Height + 'px' }">
    <view class="u-demo-block"></view>

    <view class="u-demo-block text-center">
      <text>欢迎您登录网校系统</text>
    </view>

    <view class="u-demo-block">
      <text class="u-demo-block__title">用户名/学号</text>
      <view class="u-demo-block__content"
        ><u--input
          v-model="formInline.username"
          placeholder="请输入账号"
          border="surround"
          clearable
        ></u--input
      ></view>
    </view>

    <view class="u-demo-block">
      <text class="u-demo-block__title">密码</text>
      <view class="u-demo-block__content">
        <u--input
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
        </u--input>
      </view>
    </view>

    <view class="u-demo-block">
      <u-button
        :disabled="formInline.username === '' || formInline.password === ''"
        type="primary"
        text="登 录"
        @click="handelLogin"
      ></u-button>
    </view>
  </view>
</template>

<script>
import store from '@/store/index.js'
import userApi from '@/models/userModel.js'
import homeApi from '@/models/homePageModel.js'
import publicApi from '@/models/publicModel.js'

export default {
  data() {
    return {
      view: {
        Height: 0
      },
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
            uni.redirectTo({
              url: '../home/home'
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
    console.log('created')
    console.log(uni.getSystemInfoSync())
    console.log('------- crecte -------')
    const { windowHeight, windowTop, statusBarHeight } = uni.getSystemInfoSync()
    console.log('windowHeight', windowHeight)
    console.log('windowTop', windowTop)
    console.log('statusBarHeight', statusBarHeight)

    // 让页面高度和屏幕高度一样，好放背景图
    this.view.Height = windowHeight - (windowTop || statusBarHeight) - 16
    console.log('当前型号全屏高度：', this.view.Height, 'px')
  }
}
</script>

<style lang="scss" scoped>
.dom-login {
  padding: 30px;
  background-color: #f4f6fa;

  //
  // background-image: url(https://oss.tool.lu/cache/202112/03/1430409i2i5p60ikhro9n8.png.optim.png); // 在线工具: https://tool.lu/tinyimage/
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center -120px;
}
</style>
