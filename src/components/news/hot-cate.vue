<template>
	<view>
		<view class="flex justify-between align-center">
			<text class="font-md mx-2">热门分类</text>
			<view class="flex align-center font text-secondary" @click="openMore">
				更多 <text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex align-center px-2 py-3 border-bottom">
			<block v-for="(item, index) in hotCate" :key="index">
				<view
					class="border rounded bg-light mx-1 px-2 animated"
					hover-class="jello"
					@click="openDetail(item)"
				>
					{{ item.name }}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: ['hotCate'],
		methods: {
			// 更多
			openMore() {
				uni.navigateTo({
					url: '/pages/topic-nav/topic-nav',				
				});
			},
			// 话题详情页
			openDetail(item) {
				console.log('打开话题分类页')
			},
		}
	}
	
</script>

<style>
</style>
