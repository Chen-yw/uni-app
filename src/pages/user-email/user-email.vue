<template>
	<view>
		<view class="">
			<input 
				class="uni-input" 
				type="text" 
				v-model="email" 
				placeholder="请输入你要绑定的邮箱"
			/>
			<input 
				class="uni-input" 
				type="text" 
				v-model="password" 
				placeholder="请输入密码"
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
				绑定
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: ""
			}
		},
		computed: {
			disabled() {
				return this.email == "" || this.password == "";
			}
		},
		methods: {
			// 验证
			check() {
				let rule =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (!rule.test(this.email)) {
					uni.showToast({
						title: '邮箱格式不正确',
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
					title: '绑定成功',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>

</style>
