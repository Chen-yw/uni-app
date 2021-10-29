<template>
	<view class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light">
		<image 
			:src="item.avatar" 
			class="rounded-circle mr-2" 
			style="height: 100rpx; width: 100rpx;"
		/>
		<view class="flex flex-column flex-1">
			<text class="font-md text-dark">{{ item.username }}</text>
			<uniBadge 
				:text="item.age" 
				:type="item.sex != 0 && item.sex === 1 ? 'error' : 'primary'" 
				size="small" 
				:leng="2"
			>
				<text 
					v-if="item.sex > 0" 
					class="iconfont icon-nv text-white font-sm" 
					:class="item.sex === 1 ? 'icon-nv' : 'icon-nan'"
					style="margin-right: 6rpx;"
				></text>
			</uniBadge>
		</view>
		<view 
			class="uni-icon uni-icon-checkbox-filled"
			:class="item.isFollow ? 'text-light-muted' : 'text-main'"
		></view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-ui/uni-badge/uni-badge.vue'
	export default {
		props: {
			item: Object,
			index: Number
		},
		components: {
			uniBadge
		},
		// 
	}
</script>

<style>
</style>
