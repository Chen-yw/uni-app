<template>
	<view>
		<template v-if="searchList.length === 0">
			<!-- 搜索历史 -->
			<view class="py-2 font-md ml-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view 
					class="border rounded font mx-2 my-1 px-1 "
					hover-class="bg-light"
					v-for="(item, index) in list" 
					:key="index"
					@click="searchHistoryClick(item)"
				>
					{{ item }}
				</view>
			</view>
		</template>
		
		<!-- 数据列表 -->
			<block v-for="(itemy, indey) in searchList" :key="indey">
				<!-- 帖子 -->
				<template v-if="type === 'post'">
					<commonList :item="itemy" :indey="indey" @follow="follow" @doSupport="doSupport"/>
					<!-- 全局分割线 -->
					<divider/>
				</template>
				<!-- 话题 -->
				<template v-else-if="type === 'topic'">
					<topicList :item="itemy" :index="indey"></topicList>
				</template>
				<!-- 用户 -->
				<template v-else="type === 'user'">
					<userList :item="itemy" :index="index"></userList>
				</template>

				
			</block>
	</view>
</template>

<script>
	// 测试数据
	const demo1 = [
		{
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
	const demo2 = [{
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
					}];
	
	const demo3 = [
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						sex:1, // 0未知 1女性 2男性
						age: 24,
						isFollow: true,
					},
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						sex:1,
						age: 24,
						isFollow: false,
					},
					{
						avatar: "/static/default.jpg",
						username: "你是我的小宝贝",
						sex:2,
						age: 24,
						isFollow: true,
					}
				];
	import commonList from "@/components/common/common-list.vue"
	import topicList from '@/components/news/topic-list.vue'
	import userList from "@/components/user-list/user-list.vue"
	export default {
		data() {
			return {
				type: '', // 搜索类型
				searchText: '', //搜索框内容
				list: [
					'uni-app第二季实战商城类app和小程序',
					'vue',
					'vue实战',
					'uni-app实战',
					'vuex实战',
					'uni-app第三季微信app和小程序开发',
					'vuex',
					'依赖注入',
					'123'
				],
				searchList: [],  // 搜索结果列表
			}
		},
		components: {
			commonList,
			topicList,
			userList
		},
		
		// 监听导航搜索框输入
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text);
			this.searchText = e.text;
		},
		// 监听导航搜索按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent();
			}
		},
		
		onLoad(e) {
			if (e.type) {
				this.type = e.type;
			}
			let pageTitle = '帖子'
			switch (this.type){
				case 'post':
					pageTitle = '帖子'
					break;
				case 'topic':
					pageTitle = '话题'
					break;
				case 'user':
					pageTitle = '用户'
					break;
			}
			// 修改搜索占位符
			// #ifdef APP-PLUS
				let currentWebview = this.$mp.page.$getAppWebview();
				let tn = currentWebview.getStyle().titleNView;
				tn.searchInput.placeholder = '搜索' + pageTitle;
				currentWebview.setStyle({
					titleNView: tn
				})
			// #endif
		},
		methods: {
			// 点击搜索历史
			searchHistoryClick(text) {
				this.searchText = text;
				this.searchEvent();
			},
			
			// 搜索事件
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard()
				// 显示loading
				uni.showLoading({
					title: "加载中...",
					mask: false
				})
				// 请求搜索
				setTimeout(() => {
					switch (this.type){
						case 'post':
							this.searchList = demo1;
							break;
						case 'topic':
							this.searchList = demo2;
							break;
						case 'user':
							this.searchList = demo3;
							break;
					}
					// 隐藏loading
					uni.hideLoading(); 
				}, 3000)
			},
		
			// 关注
			follow(e){
				this.searchList[e.indey].isFollow = true;
				uni.showToast({title: '关注成功'});
			},
			
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.searchList[e.indey];
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
		}
	}
</script>

<style>

</style>
