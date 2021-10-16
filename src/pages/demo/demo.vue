<template>
	<view>
		<view 
			class="view-box animated"
			hover-stay-time="800"
			hover-class="view-box-hover rubberBand"
		>演示</view>
		<text selectable="true">这是text \n 这是text \n</text>
		<view class="view-box" id="view2">选择器</view>
		<text>这是text组件</text>
		<a href='intent://#Intent;action=android.intent.action.VIEW;scheme=googlechrome://navigate?url=https://www.baidu.com;package=com.android.chrome;end'>打开浏览器</a>
		<!-- 直接用webview打开外部链接啊，会默认跳转到浏览器打开的webView.loadUrl（“https://www.baidu.com”）； -->

		<!-- class 支持的语法 -->
		<view class="box" :class="['bor', 'fs']"></view>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.view-box {
	width: 200upx;
	height: 200upx;
	background: #007AFF;
	color: #FFFFFF;
	margin: 100upx;
}

.view-box-hover {
	background: red;
}

#view2, text {
	width: 200upx;
	height: 200upx;
	color: #000;
	background: yellow;
}

.view-box:hover {}

.bor {}
.fs {}
</style>
