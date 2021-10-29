<!-- 消息页 -->
<template>
  <view>
		<!-- 消息列表 -->
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<msg-list :item="item" :index="index" />
			</block>
		</template>
		 
		<template v-else>
			<noThing/>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view 
				class="flex justify-center align-center bg-white py-2 font-md border-bottom"
				hover-class="bg-light"
				@click="popupEvent('friend')"
			>
				
				<text class="iconfont icon-sousuo mr-2"/>添加好友
			</view>
			<view 
				class="flex justify-center align-center bg-white py-2 font-md " 
				hover-class="bg-light"
				@click="popupEvent('clear')"
			>
				<text class="iconfont icon-shanchu mr-2"/>清空列表
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						update_time: "1570718427",
						data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
						noread: 20
					},
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						update_time: "1570718427",
						data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
						noread: 20
					},
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						update_time: "1570718427",
						data: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
						noread: 20
					}
				];
	import msgList from '@/components/msg/msg-list.vue'
	import onThing from '@/components/common/nothing.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		name: "msg",
		data() {
			return {
				list: []
			};
		},
		components: {
			msgList,
			onThing,
			uniPopup
		},
		// 页面加载
		onLoad() {
			this.list = demo;
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.refresh();
		},
		// 监听原生导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch(e.index) {
				case 0: // 左边
				// 关闭弹出层
				uni.navigateTo({
					url: '../user-list/user-list',
				});
					break;
				case 1: // 右边
					this.$refs.popup.open();
					break;
			}
		},
		methods: {
			// 下拉刷新
			refresh() {
				setTimeout(() => {
					this.list = [...this.list, ...demo];
					// 停止下拉刷新
					uni.stopPullDownRefresh();
				}, 2000);
			},
			// 弹出层选项点击事件
			popupEvent(e) {
				switch (e){
					case 'friend': 
						uni.navigateTo({
							url: '../search/search?type=user',
						});
						break;
					case 'clear':
						console.log('清空列表');
						break;
				}
				// 关闭弹出层
				this.$refs.popup.close();
			}
		}
	};
</script>
<style scoped></style>

