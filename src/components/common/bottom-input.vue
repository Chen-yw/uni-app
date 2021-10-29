<template>
	<view
		class="fixed-bottom flex align-center border-top bg-white" 
		style="height: 100rpx;"
	>
		<input 
			type="text" 
			v-model="content" 
			class="flex-1 ml-2 rounded bg-light" 
			style="padding: 6rpx 0;"
			:adjust-position="false"
			placeholder="文明发言"
			@confirm="submit"
		/>
		<view 
			class="iconfont icon-fabu flex justify-center align-center font-md animated" 
			hover-class="jello text-main" 
			style="width: 100rpx;"
			@click="submit"
		></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
			}
		},
		methods: {
			// 发送消息
			submit() {
				if (this.content === '') {
					return uni.showToast({
						title: '消息不能为空',
						icon: 'none'
					});
				}
				this.$emit('submit', this.content);
				this.content = '';
			},
		}
	}
</script>

<style>
</style>
