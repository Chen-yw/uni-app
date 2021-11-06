<template>
	<view class="flex justify-center align-center px-5 py-3">
		<view 
			class="flex-1 flex justify-center align-center"
			v-for="(item, index) in providerList"
			:key="index"
		>
			<view 
				class="flex justify-center align-center iconfont font-lg rounded-circle text-white" 
				style="width: 100rpx;height: 100rpx;"
				:class="item.icon + ' ' + item.bgColor"
			></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		data() {
			return {
				providerList: []
			}
		},
		mounted(){
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						let icon = ''
						let bgColor = ''
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								icon = 'icon-weixin'
								bgColor = 'bg-success'
								break;
							case 'qq':
								providerName = 'QQ登录'
								icon = 'icon-QQ'
								bgColor = 'bg-primary'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								icon = 'icon-xinlangweibo'
								bgColor = 'bg-warning'
								break;
							// #ifdef MP-ALIPAY
							case 'alipay':
								providerName = '支付宝登录';
								icon='changyonglogo30';
								bgColor = 'bg-primary'
								break;
							// #endif
						}
						return {
							name: providerName,
							id: value,
							icon:icon,
							bgColor:bgColor
						}
					});
					console.log(this.providerList);
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
	}
</script>

<style>
</style>
