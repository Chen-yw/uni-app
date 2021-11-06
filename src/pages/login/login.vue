<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<!-- 返回 -->
		<view>
			<view
				class="iconfont icon-guanbi flex justify-center align-center font-lg" 
				style="width: 100rpx;height: 100rpx;"
				hover-class="bg-light"
				@click="back"
			></view>
		</view>
		<!-- 登录表单 -->
		<view class="text-center text-muted" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">
			{{status ? '手机验证码登录' : '账号密码登录'}}
		</view>
		<view class="px-2">
			<!-- 账号密码登录 -->
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" v-model="username" class="border-bottom p-2" placeholder="账号/手机号/邮箱"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="password" class="border-bottom p-2 flex-1" placeholder="密码"/>
				  <view 
						class="border-bottom flex justify-center align-center font text-muted" 
						style="width: 150rpx;"
					>
						忘记密码？
					</view>
				</view>
			</template>
			<!-- 手机号登录 -->
			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center font px-2">+86</view>
					<input type="text" v-model="phone" class="border-bottom p-2 flex-1" placeholder="手机号"/>
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" class="border-bottom p-2 flex-1" placeholder="请输入验证码"/>
				  <view 
						class="border-bottom flex justify-center align-center font-sm text-white bg-main" 
						style="width: 150rpx;"
						:class="codeTime > 0 ? 'bg-main-disabled' : ''"
						@click="getCode"
					>
						{{codeTime > 0 ? codeTime + 's' : '获取验证码'}}
					</view>
				</view>
			</template>
		</view>
		
		<!-- 按钮 -->
		<view class="px-3 py-2">
			<button 
				class="text-white bg-main" 
				style="border-radius: 50rpx; border: 0;" 
				:style="disabled"
				:class="disabled ? 'bg-main-disabled' : 'bg-main'"
				@click="submit"
			>
				登录
			</button>
		</view>
		
		<!-- 验证码登录 -->
		<view class="flex justify-center align-center pt-2 pb-4">
			<view class="text-primary font-sm" @click="changeStatus">{{status ? '账号密码登录' : '验证码登录'}}</view>
			<text class="text-muted mx-2"> | </text>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>
		<!-- 社交账号登录 -->
		<view class="flex justify-center align-center">
			<view style="width: 100rpx; height: 1rpx; background-color: #dddddd;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="width: 100rpx; height: 1rpx; background-color: #dddddd;"></view>
		</view>
		<!-- <other-login></other-login> -->
		<view class="flex justify-center align-center px-5 py-3">
			<view class="flex-1 flex justify-center align-center ">
				<view class="flex justify-center align-center iconfont icon-weixin bg-success font-lg rounded-circle  text-white" style="width: 100rpx;height: 100rpx;"></view>
			</view>
			<view class="flex-1 flex justify-center align-center">
				<view class="flex justify-center align-center iconfont iconfont icon-QQ bg-primary font-lg rounded-circle  text-white" style="width: 100rpx;height: 100rpx;"></view>
			</view>
			<view class="flex-1 flex justify-center align-center">
				<view class="flex justify-center align-center iconfont icon-xinlangweibo bg-danger font-lg rounded-circle text-white" style="width: 100rpx;height: 100rpx;"></view>
			</view>
		</view>
		
		<view class="flex justify-center align-center text-muted">注册即代表同意 <text class="text-primary">《xxx社区协议》</text></view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue'
	import otherLogin from '@/components/common/other-login.vue'
	export default {
		data() {
			return {
				// statusBarHeight: 0
				status: false, // 登录方式选择
				username: '',
				password: '',
				phone: '',
				code: '',
				codeTime: 0
			}
		},
		components: {
			uniStatusBar,
			otherLogin
		},
		computed: {
			disabled() {
					if ((this.username === '' || this.password === '') && (this.phone === '' || this.code === '')) {
						return true;
					}
					return false;
			}
		},
		onLoad() {
			let {statusBarHeight} = uni.getSystemInfoSync();
			this.statusBarHeight = statusBarHeight;
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 初始化表单
			initForm() {
				this.username = '';
				this.password = '';
				this.phone = '';
				this.code = '';
			},
			// 切换登录方式
			changeStatus() {
				// 初始化表单
				this.initForm();
				this.status = !this.status;
			},
			// 获取验证码
			getCode() {
				// 防止重复获取
				if (this.codeTime > 0) {
					return;
				}
				// 验证手机号
				if (!this.validate()) return;
				// 倒计时
				this.codeTime = 60;
				let timer = setInterval(() => {
					
					if (this.codeTime >= 1) {
						this.codeTime--;
					} else {
						this.codeTime = 0;
						clearInterval(timer);
					}
				}, 1000)
			},
			// 表单验证
			validate() {
				var mPattern = /^1[34578]\d{9}$/;
				if (!mPattern.test(this.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					});
					return false;
				}
				// ...更多验证
				return true;
			},
			// 提交
			submit() {
				// 表单验证
				if (!this.validate()) return;
				// 提交后端
				// 登录成功处理
			}
		}
	}
</script>

<style>

</style>
