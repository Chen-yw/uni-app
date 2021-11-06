<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="标题文字" showAnimation>
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
			<uni-collapse-item title="标题文字" showAnimation>
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
		</uni-collapse>
		
		<view class="px-3 py-2">
			<button 
				class="text-white bg-main" 
				style="border-radius: 50rpx; border: 0;" 
			>
				意见反馈
			</button>
		</view>
		
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
