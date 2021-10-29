<template>
	<view 
		class="flex align-center p-2 border-bottom border-light-secondary" 
		hover-class="bg-light"
		@click="open"
	>
		<image 
			:src="item.avatar" 
			class="rounded-circle mr-2" 
			style="height: 80rpx; width: 80rpx;"
		/>
		<view class="flex flex-1 flex-column ">
			<view class="flex justify-between align-center">
				<text class="font-md">{{ item.username }}</text>
				<text class="font text-secondary">{{ item.update_time | formatTime }}</text>
			</view>
			<view class="flex justify-between align-center">
				<text class="text-secondary text-ellipsis" style="width: 500rpx;">{{ item.data }}</text>
				<uniBadge :text="item.noread" type="error"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	import $T from '@/common/time.js';
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			index: Number,
		},
		components: {
			uniBadge,
		},
		// 过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		methods: {
			// 打开聊天页
			open() {
				uni.navigateTo({
					url: '../../pages/user-chat/user-chat',
				});
			}
		}
	}
</script>

<style>
</style>
