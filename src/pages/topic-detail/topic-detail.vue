<template>
	<view>
		<topicInfo :info="info"></topicInfo>
		<divider/>
			<view
				v-for="(item, index) in hotList" :key="index"
				class="p-2 flex align-center border-bottom"
				hover-class="bg-light"
			>
				<text class="iconfont icon-xihuan text-main"></text>
				<text class="font-md text-dark text-ellipsis">
					{{ item.title }}
				</text>
			</view>
		<divider/>
		
		<!-- tab -->
		<view class="flex align-center py-2">
			<view 
				class="flex flex-1 align-center justify-center font"
				v-for="(item, index) in tabBars" :key="index"
				:class="index === tabIndex ? 'font-md text-main font-weight-bold' : ''"
				@click="changeTab(index)"
			>
				{{ item.name }}
			</view>
		</view>
		
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(itemy, indey) in listData" :key="indey">
				<commonList :item="itemy" :indey="indey" @doSupport="doSupport"></commonList>
				<divider/>
			</block>
		</template>
		<template v-else>
			<noThing/>
		</template>
		<!-- 上拉加载 -->
		<loadmore :loadmore='loadText'></loadmore>
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
	import topicInfo from "@/components/topic-detail/topic-info.vue"
	import commonList from '@/components/common/common-list.vue'
	import noThing from '@/components/common/nothing.vue'
	import loadmore from '@/components/common/load-more.vue'
	export default {
		data() {
			return {
				info: {
					cover: "/static/demo/topicpic/1.jpeg",
					desc: "话题描述",
					news_count: 10,
					title: "#话题名称#",
					today_count: 0
				},
				hotList: [
					{title: '【新人必读】uni-app实战第二季商场类项目开发'},
					{title: '【新人必读】uni-app实战第三季仿微信项目开发'},
				],
				tabIndex: 0,
				tabBars: [
					{ name: '默认' },
					{ name: '最新' }
				],
				list1: [], // 默认列表
				loadText1: '上拉加载更多',
				list2: [], // 最新列表
				loadText2: '上拉加载更多',
			}
		},
		components: {
			topicInfo,
			commonList,
			noThing,
			loadmore
		},
		computed: {
			// 当前列表数据
			listData() {
				// return this['list' + this.tabIndex + 1];
				if (this.tabIndex === 0) {
					return this.list1
				}
				return this.list2;
			},
			// 当前上拉加载
			loadText() {
				if (this.tabIndex === 0) {
					return this.loadText1;
				}
				return this.loadText2;
			}
		},
		onLoad(e) {
			if (e.info) {
				let res = JSON.parse(e.info) 
				// console.log(this.info);
			}
			this.list1 = demo;
		},
		// 触底事件
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			// tab切换
			changeTab(index) {
				this.tabIndex = index;
			},
			
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.listData[e.indey];
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
			loadmore() {
				// 拿到当前的列表
				let index = this.tabIndex + 1;
				// 判断是否处于可加载状态
				if (this.loadText !== '上拉加载更多') return;
				// 设置上拉加载状态处于加载中...
				if (index === 1) {
					this.loadText1 = '加载中...';
				} else {
					this.loadText2 = '加载中...';
				}
				// this['loadText' + index ] = '加载中...';
				// 请求数据
				setTimeout(() => {
					this['list' + index] = [...this['list' + index], ...this['list' + index]];
					// this['loadText' + index ] = '上拉加载更多'
					if (index === 1) {
						this.loadText1 = '上拉加载更多';
					} else {
						this.loadText2 = '上拉加载更多';
					}
				}, 2000)
			}
		}
	}
</script>

<style>
.filter {
	filter: blur(10px);
}
</style>
