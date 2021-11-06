<template>
	<view>
		<view class="">
			<input 
				class="uni-input" 
				type="text" 
				v-model="oldpassword" 
				placeholder="输入旧密码"
			/>
			<input 
				class="uni-input" 
				type="text" 
				v-model="newpassword" 
				placeholder="输入新密码"
			/>
			<input 
				class="uni-input" 
				type="text" 
				v-model="renewpassword" 
				placeholder="输入确认密码"
			/>
		</view>
		
		<view class="px-3 py-2">
			<button 
				class="text-white bg-main"
				:class="disabled ? 'bg-main-disabled' : ''"
				style="border-radius: 50rpx; border: 0;"
				:disabled="disabled"
				@click="submit"
			>
				设置
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				renewpassword: "",
			}
		},
		computed: {
			disabled() {
				return this.oldpassword == "" || this.newpassword == "" || this.renewpassword == "";
			}
		},
		methods: {
			// 验证
			check() {
				if (this.newpassword !== this.renewpassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			
			// 提交
			submit() {
				if (!this.check()) {
					return;
				}
				uni.showToast({
					title: '密码修改成功',
					icon: 'none'
				});
			}
			
		}
	}
</script>

<style>

</style>
