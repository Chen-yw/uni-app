<template>
  <view>
   <!-- 导航 -->
	 <uni-nav-bar statusBar="true" :border="false" :fixed="true" @clickRight="openAddInput">
		 <view class="flex justify-center align-center w-100 font-weight-bold">
			 <!-- <view class="font-lg text-main">关注</view> -->
			 <block v-for="(item, index) in tabBars" :key="index">
				 <view 
					class="mx-2" 
					:class="tabIndex === index ? 'font-lg text-main' : 'font-md text-light-muted'"
					@click="changeTab(index)"
				>
					{{ item.name }}
				</view>
			 </block>
		 </view>
		 <text slot="right" class="iconfont icon-fatie_icon"/>
	 </uni-nav-bar>
	 
	 <!-- 内容 -->
	 <swiper 
		:duration="150"
		:current="tabIndex"
		:style="'height:' + scrollH + 'px;'"
		@change="onChangeTab"
	>
		<!-- 关注 -->
	 	<swiper-item>
	 		<scroll-view scroll-y :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmoreEvent(tabIndex)">
				<block v-for="(item, indey) in list" :key="indey">
					<commonList :item="item" :indey="indey" @follow="follow" @doSupport="doSupport"/>
					<!-- 全局分割线 -->
					<divider/>
				</block>
				<loadMore :loadmore="load_more"/>
	 		</scroll-view>
	 	</swiper-item>
		<!-- 话题 -->
		<swiper-item>
			<scroll-view scroll-y :style="'height:' + scrollH + 'px;'">
				<!-- 话题 -> 热门分类 -->
				<hotCate :hotCate="hotCate"></hotCate>
				<!-- 话题 -> 搜索框 -->
				<view class="p-2">
					<view class="bg-light rounded flex justify-center align-center py-2 text-secondary" @click="openSearch">
						<text class="iconfont icon-sousuo mr-2"/>
						搜索话题
					</view>
				</view>
				<!-- 话题 -> 轮播图 -->
				<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<image
							class="w-100 rounded"
							src="/static/demo/banner3.jpg" 
							style="height: 300rpx;" 
							mode=""
						/>
					</swiper-item> 
				</swiper>
				<!-- 话题 -> 最近更新 -->
				<view class="px-2 font-md">最近更新</view>
				<!-- 话题列表组件 -->
				<block v-for="(item, index) in topicList" :key="index">
					<topicList :item="item" :index="index"/>
				</block>
			</scroll-view>
		</swiper-item>
	 </swiper>
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
	}]
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '../../components/news/topic-list.vue'
	export default {
		name: "news",
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{name: '关注'}, {name: '话题'}],
				list: [], // 关注列表
				// 1.上拉加载更多 2.加载中... 3.没有更多
				load_more: '上拉加载更多',
				hotCate: [
					{name: '关注'},
					{name: '推荐'},
					{name: '体育'},
					{name: '热点'},
					{name: '财经'},
					{name: '娱乐'},
				],
				
				topicList: [
					{
						cover: '/static/demo/topicpic/1.jpeg',
						title: '话题名称',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '/static/demo/topicpic/1.jpeg',
						title: '#话题名称#',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '/static/demo/topicpic/1.jpeg',
						title: '#话题名称#',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '/static/demo/topicpic/1.jpeg',
						title: '#话题名称#',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
					{
						cover: '/static/demo/topicpic/1.jpeg',
						title: '#话题名称#',
						desc: '话题描述',
						today_count: 0,
						news_count: 10
					},
				]
			};
		},
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					// px => rpx
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				}
			});
			
			this.list = demo;
		},
		methods: {
			// 打开发布页
			openAddInput() {
				uni.navigateTo({
					url: '../add-input/add-input'
				})
			},
			
			// 切换选项
			changeTab(index) {
				this.tabIndex = index;
			},
			
			// 滑动
			onChangeTab(e) {
				this.tabIndex = e.detail.current;
			},
			
			// 关注
			follow(e){
				this.list[e.indey].isFollow = true;
				uni.showToast({title: '关注成功'});
			},
			
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.list[e.indey];
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
			
			// 加载更多
			loadmoreEvent(tabIndex) {
				// 验证当前是否初一加载状态
				if (this.load_more !== '上拉加载更多') return;
				// 设置加载状态
				this.load_more = '加载中...'
				// 模拟请求数据
				setTimeout(() => {
					// 加载数据
					this.list = [...this.list, ...this.list];
					// 设置加载状态
					this.load_more = '上拉加载更多'
				}, 2000)
			},
			
			// 打开搜索框
			openSearch() {
				uni.navigateTo({
					url: '../search/search?type=topic',
				});
			}
		}
	};
</script>
<style scoped></style>
