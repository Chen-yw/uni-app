<template>
	<view>
		<navigator url="../login/login">
		<!-- 个人信息 -->
		<view class="flex align-center p-2" hover-class="bg-light">
			<image 
				class="rounded-circle"
				style="width: 100rpx;height: 100rpx;"
				src="/static/demo/datapic/10.jpg" 
				mode=""
			/>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold text-dark">昵称</text>
				<text class="font text-muted">总帖子 10  今日发帖 0</text>
			</view>
			<text class="iconfont icon-jinru ml-auto mr-2 font-lg"></text>
		</view>
		</navigator>
		<!-- 数据 -->
		<view class="flex align-center px-3 py-2" >
			<view 
				class="flex-1 flex flex-column justify-center align-center"
				v-for="(item,index) in myData"
				:key="index"
			>
				<text class="font-lg font-weight-bold">{{ item.num }}</text>
				<text class="font text-muted">{{ item.name }}</text>
			</view>
		</view>
		<!-- 广告位 -->
		<view class="px-3 py-2">
			<image 
				class="rounded"
				style="width: 100%; height: 170rpx;" 
				src="/static/demo/datapic/1.jpg" 
				mode="aspectFill"
			/>
		</view>
		<!--  -->
		<uni-list-item title="浏览历史" :showExtraIcon="true">
			<text slot="icon" class="iconfont icon-liulan"></text>
		</uni-list-item>
		<uni-list-item title="社区认证" :showExtraIcon="true">
			<text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子" :showExtraIcon="true">
			<text slot="icon" class="iconfont icon-keyboard"></text>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				myData: [
					{name: "帖子", num: 1},
					{name: "动态", num: 2},
					{name: "评论", num: 5},
					{name: "粉丝", num: 4},
				]
			}
		},
		components: {
			uniListItem
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../user-set/user-set',
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
