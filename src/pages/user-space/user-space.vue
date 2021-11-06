<template>
	<view>
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom">
			<image 
				src="/static/default.jpg" 
				style="width: 180rpx;height: 180rpx;"
				class="rounded-circle"
			/>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex pb-1">
					<view class="flex-1 flex flex-column justify-center align-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex-1 flex flex-column justify-center align-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
					<view class="flex-1 flex flex-column justify-center align-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex justify-center align-center">
					<button 
						type="primary" 
						size="mini" 
						class="bg-main"
						style="width: 80%;"
					>
						关注
					</button>
				</view>
			</view>
		</view>
	
		<!-- 选项卡 -->
		<view class="flex align-center" style="height: 100rpx;">
			<view 
				class="flex flex-1 align-center justify-center font font-weight-bold"
				v-for="(item, index) in tabBars" :key="index"
				:class="index === tabIndex ? 'font-md text-main ' : ''"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>
		<!-- 左右滚动 -->
		<template v-if="tabIndex === 0">
			<view class="animated fast fadeIn">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号年龄：12个月</view>
					<view class="font">账号id：1</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">星座：12个月</view>
					<view class="font">职业：1</view>
					<view class="font">故乡：1</view>
					<view class="font">情感：1</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="animated fast fadeIn">
					<common-list 
						v-for="(item, index) in list" 
						:key="index" :item="item" 
						:index="tabIndex" 
						:indey="index" 
						@follow="follow" 
						@doSupport="doSupport" 
					/>
					<divider/>
				<!-- 上拉加载更多 -->
				<load-more :loadmore="loadMore"/>
			</view>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view 
				class="flex justify-center align-center  py-2 font-md border-bottom"
				hover-class="bg-light"
				
			>
				
				<text class="iconfont icon-sousuo mr-2"/>加入黑名单
			</view>
			<view 
				class="flex justify-center align-center bg-white py-2 font-md " 
				hover-class="bg-light"
				
			>
				<text class="iconfont icon-shanchu mr-2"/>聊天
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [{
		username: "你是我的小宝贝",
		userpic: "/static/default.jpg",
		newstime: "2019-10-20 下午04:30",
		isFollow: false,
		title: "我是标题，啦啦啦啦",
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: "support", // 顶
			support_count: 1,
			unsupport_count: 2,
		},
		comment_count: 2,
		share_num: 2
	},
	{
		username: "你是我的小宝贝",
		userpic: "/static/default.jpg",
		newstime: "2019-10-20 下午04:30",
		isFollow: false,
		title: "我是标题，啦啦啦啦",
		titlepic: "",
		support: {
			type: "unsupport", //踩
			support_count: 1,
			unsupport_count: 2,
		},
		comment_count: 2,
		share_num: 2
	},
	{
		username: "你是我的小宝贝",
		userpic: "/static/default.jpg",
		newstime: "2019-10-20 下午04:30",
		isFollow: false,
		title: "我是标题，啦啦啦啦",
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: "", // 未操作
			support_count: 1,
			unsupport_count: 2,
		},
		comment_count: 2,
		share_num: 2
	},
	{
		username: "你是我的小宝贝",
		userpic: "/static/default.jpg",
		newstime: "2019-10-20 下午04:30",
		isFollow: false,
		title: "我是标题，啦啦啦啦",
		titlepic: "/static/demo/datapic/11.jpg",
		support: {
			type: "support",
			support_count: 1,
			unsupport_count: 2,
		},
		comment_count: 2,
		share_num: 2
	}];
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{ name: '主页'},
					{ name: '帖子', loadmore: "上拉加载更多", list: demo},
					{ name: '动态', loadmore: "上拉加载更多", list: demo}
				],
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadMore() {
				return this.tabBars[this.tabIndex].loadmore
			}
		},
		// 监听原生导航栏按钮事件
		onNavigationBarButtonTap() {
			this.$refs.popup.open();
		},
		methods: {
			// tab切换
			changeTab(index) {
				this.tabIndex = index;
			},
			
			// 关注
			follow(e){
				this.tabBars[e.index].list[e.indey].isFollow = true;
				uni.showToast({title: '关注成功'});
			},
			
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.tabBars[e.index].list[e.indey];
				let msg = e.type === 'support' ? '顶' : '踩';
				// 对象没被顶踩过
				if(item.support.type === '') {
					item.support[e.type + '_count']++;
				} 
				// 对象已被顶过
				if(item.support.type === 'support' && e.type === 'unsupport') {
					item.support.support_count--; // 顶 - 1					
					item.support.unsupport_count++; // 踩 + 1
				} 
				// 对象已被踩过
				if(item.support.type === 'unsupport' && e.type === 'support') {
					item.support.support_count++; // 顶 + 1					
					item.support.unsupport_count--; // 踩 - 1
				}
				//改变对象顶踩状态
				item.support.type = e.type; 
				uni.showToast({
					title: msg + '成功'
				})
			},
			
			// 上拉加载更多
			loadmore(index) {
				// 当前列表
				let item = this.newslist[index]; 
				// 判断可加载状态
				if (item.loadmore === '上拉加载更多') {
					// 修改当前列表状态
					item.loadmore = '加载中...';
					setTimeout(() => {
						item.list = [...item.list, ...item.list];
						item.loadmore = '上拉加载更多';
					}, 2000);
				}
			},
		}
	}
</script>

<style>

</style>
