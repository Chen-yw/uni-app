<script>
export default {
  onLaunch() {
    // console.log('App Launch: 检测更新,网络监听,初始化数据')
		// 网络监听
		this.$U.onNetWork();
	},
  onShow() {
    // console.log('App Show')
  },
  onHide() {
    // console.log('App Hide')
  },
};
</script>

<style>
/*每个页面公共css */
/* 官方css库 */
@import "./common/uni.css";
/* 自定义图标库 */
@import "./common/icon.css";
/* 动画库 https://animate.style https://raw.githubusercontent.com/daneden/animate.css/master/animate.css*/
@import "./common/animate.css";
/* 引入自定义样式库 */
@import "./common/free.css";
/* 引入全局样式 */
@import "./common/base.css";
</style>
