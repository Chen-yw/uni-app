<template>
	<view>
		<!-- 自定义导航 -->
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="标题"></uni-nav-bar> -->
		<uni-nav-bar 
			left-icon="back" 
			statusBar 
			:border="false" 
			@clickLeft="goBack"
		>
			<view class="flex justify-center align-center w-100">
				<text>所有人可见</text>
				<text class="iconfont icon-shezhi ml-1"></text>
			</view>
		</uni-nav-bar>
		
		<!-- 文本域 -->
		<textarea class="uni-textarea p-2" v-model="content" placeholder="说一句话吧" />
		
		<!-- 多图上传 -->
		<upload-image ref='uploadImage' :show="show" :list="imageList" @change="changeImage"/>
	
	  <!-- 底部操作条 -->
		<view class="border fixed-bottom flex align-center bg-white" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated" hover-class="jello"/>
			<view class="iconfont icon-huati footer-btn animated" hover-class="jello"/>
			<view 
				class="iconfont icon-tupian footer-btn animated" 
				hover-class="jello"
				@click="iconClickEvent('uploadImage')"
			/>
			<view 
				class="bg-main text-white mr-4 ml-auto flex justify-center align-center rounded animated" 
				hover-class="jello" 
				style="width: 160rpx;height: 60rpx;"
			>
				发布
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage from '@/components/common/upload-image.vue'
	export default {
		data() {
			return {
				content: '',
				imageList: [],
				showBack: false, // 是否已经弹出一次保存提示框
			}
		},
		components: {
			uniNavBar,
			uploadImage
		},
		computed: {
			show() {
				return this.imageList.length > 0;
			}
		},
		// 监听返回
		onBackPress() {
			if ((this.content !== '' || this.imageList.length > 0) && this.showBack === false) {
				uni.showModal({
					title: '提示',
					content: '是否保存为草稿',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm) {
							this.store();
							// console.log('已保存');
						} else { // 点击取消，清除缓存
							uni.removeStorage({
								key:"add-input"
							})
						}
						// 手动执行返回
						uni.navigateBack({ delta: 1 })
					}
				});
				this.showBack = true;
				return true;
			}
		},
		
		// 页面加载时
		onLoad() {
			uni.getStorage({
				key:"add-input",
				success:(res)=>{
					// console.log(111, res.data);
					if (res.data) {
						let result = JSON.parse(res.data)
						this.content = result.content
						this.imageList = result.imageList
						// console.log(222, result.imageList);
					}
				}
			});
		},
		
		methods: {
			// 底部图标点击事件
			iconClickEvent(e) {
				switch(e) {
					case 'uploadImage':
						this.$refs.uploadImage.chooseImage();
						break;
				}
			},
			
			// 返回
			goBack() {
				uni.navigateBack({ delta: 1 });
			},
			
			// 选中图片
			changeImage(e) {
				this.imageList = e;
			},
			
			// 保存操作
			store() {
				// 保存为本地存储
				let obj = {
					content: this.content,
					imageList: this.imageList
				}
				uni.setStorage({
					key: 'add-input',
					data: JSON.stringify(obj)
				})
			},
		}
	}
</script>

<style>
.footer-btn {
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
}
</style>
