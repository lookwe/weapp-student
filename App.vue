<script>
export default {
  globalData: {},
  onLaunch: function () {
    //console.log('App Launch，app启动')
  },
  onShow: function () {
    //console.log('App Show，app展现在前台')
  },
  onHide: function () {
    //console.log('App Hide，app不再展现在前台')
  },
  onThemeChange: function () {
    console.log('监听系统主题状态变化。')
  },
  // 比如通过分享卡片、小程序码）且发现页面不存在，才会触发
  onPageNotFound: function () {
    console.log('404')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';
@import 'common/scss/template.scss';
@import 'common/scss/global.scss';
</style>
