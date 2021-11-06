<template>
	<view>
		<uni-list-item title="头像" @click="changeUserpic">
			<view slot="right" class="flex align-center">
				<image
					:src="userpic" 
					style="width: 120rpx;height: 120rpx;" 
					class="rounded-circle"
					mode=""
				/>
				<text class="iconfont icon-bianji ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view slot="right" class="flex align-center">
				<input type="text" class="uni-input text-right" v-model="username" />
				<text class="iconfont icon-bianji ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeSex">
			<view slot="right" class="flex align-center">
				<text>{{ sexText }}</text>
				<text class="iconfont icon-bianji ml-2"></text>
			</view>
		</uni-list-item>
		
		<picker mode="date" :value="birthday" @change="onDateChange">
			<uni-list-item title="生日">
				<view slot="right" class="flex align-center">
					<text>{{ birthday }}</text>
					<text class="iconfont icon-bianji ml-2"></text>
				</view>
			</uni-list-item>
		</picker>
		<uni-list-item title="情感" @click="changeEmotion">
			<view slot="right" class="flex align-center">
				<text>{{ emotionText }}</text>
				<text class="iconfont icon-bianji ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click="changeJob">
			<view slot="right" class="flex align-center">
				<text>{{ job }}</text>
				<text class="iconfont icon-bianji ml-2"></text>
			</view>
		</uni-list-item>
		<!-- <picker mode="multiSelector" @columnchange="addressColumnChange" :value="address" :range="addressArray">
			<uni-list-item title="家乡">
				<view slot="right" class="flex align-center">
					<text>{{ addressText }}</text>
					<text class="iconfont icon-bianji ml-2"></text>
				</view>
			</uni-list-item>
		</picker> -->
			<uni-list-item title="家乡" @click="showCityPicker">
				<view slot="right" class="flex align-center">
					<text>{{ pickerText }}</text>
					<text class="iconfont icon-bianji ml-2"></text>
				</view>
			</uni-list-item>
		
	
		<view class="px-3 py-2">
			<button 
				class="text-white bg-main"
				style="border-radius: 50rpx; border: 0;"
				@click="submit"
			>
				完成
			</button>
		</view>
		
		<mpvueCityPicker
			:themeColor="themeColor" 
			ref="mpvueCityPicker" 
			:pickerValueDefault="cityPickerValueDefault" 
			@onConfirm="onConfirm"
		/>
	</view>
</template>

<script>
	const sexArray = ['保密', '男', '女'];
	const emotionArray = ['保密', '单身', '热恋', '已婚'];
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import mpvueCityPicker from '@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				userpic: "/static/default.jpg",
				username: "昵称",
				sex: 0,
				birthday: "2019-10-18",
				emotion: 0,
				job: "保密",
				// address: [0, 0, 0],
				// addressArray: [
				// 	['亚洲', '欧洲'],
				// 	['中国', '日本'],
				// 	['北京', '上海', '广州']
				// ],
				
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				pickerText: "地址"
			}
		},
		components: {
			uniListItem,
			mpvueCityPicker
		},
		computed: {
			sexText() {
				return sexArray[this.sex];
			},
			emotionText() {
				return emotionArray[this.emotion];
			},
			addressText() {
				return this.addressArray[0][this.address[0]] + ' ' + this.addressArray[1][this.address[1]] + ' ' + this.addressArray[2][this.address[2]]
			}
		},
		// 监听返回
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		// 监听页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		methods: {
			// 修改头像
			changeUserpic() {
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], //从相册选择
				    success: res => {
				        this.userpic = res.tempFilePaths[0];
				    }
				});
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
				    itemList: sexArray,
				    success: res => {
				      this.sex = res.tapIndex;
				    },
				    fail: function (res) {
				      console.log(res.errMsg);
				    }
				});
			},
			// 修改情感
			changeEmotion() {
				uni.showActionSheet({
				    itemList: emotionArray,
				    success: res => {
				      this.emotion = res.tapIndex;
				    },
				    fail: function (res) {
				      console.log(res.errMsg);
				    }
				});
			},
			// 修改职业
			changeJob() {
				let jobArray = ['保密','IT','教师','农民'];
				uni.showActionSheet({
				    itemList: jobArray,
				    success: res => {
				      this.job = jobArray[res.tapIndex];
				    },
				    fail: function (res) {
				      console.log(res.errMsg);
				    }
				});
			},
			// 修改生日
			onDateChange(e) {
				this.birthday = e.detail.value;
			},
			// 三级联动选择
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			// 三级联动提交事件
			onConfirm(e) {
				this.pickerText = e.label
			},
		
			// 提交
			submit() {
			}
			
			// 修改地址
			// addressColumnChange(e) {
			// 	// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
			// 	this.address[e.detail.column] = e.detail.value
			// 	switch (e.detail.column) {
			// 		case 0: //拖动第1列
			// 			switch (this.address[0]) {
			// 				case 0:
			// 					this.addressArray[1] = ['中国', '日本']
			// 					this.addressArray[2] = ['北京', '上海', '广州']
			// 					break
			// 				case 1:
			// 					this.addressArray[1] = ['英国', '法国']
			// 					this.addressArray[2] = ['伦敦', '曼彻斯特']
			// 					break
			// 			}
			// 			this.address.splice(1, 1, 0)
			// 			this.address.splice(2, 1, 0)
			// 			break
			// 		case 1: //拖动第2列
			// 			switch (this.address[0]) { //判断第一列是什么
			// 				case 0:
			// 					switch (this.address[1]) {
			// 						case 0:
			// 							this.addressArray[2] = ['北京', '上海', '广州']
			// 							break
			// 						case 1:
			// 							this.addressArray[2] = ['东京','北海道']
			// 							break
			// 					}
			// 					break
			// 				case 1:
			// 					switch (this.address[1]) {
			// 						case 0:
			// 							this.addressArray[2] = ['伦敦', '曼彻斯特']
			// 							break
			// 						case 1:
			// 							this.addressArray[2] = ['巴黎', '马赛']
			// 							break
			// 					}
			// 					break
			// 			}
			// 			this.address.splice(2, 1, 0)
			// 			break
			// 	}
			// 	this.$forceUpdate()
			// },
		}
	}
</script>

<style>

</style>
