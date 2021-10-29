<template>
	<view>
		<!-- tab -->
		<view class="flex align-center py-2" style="height: 100rpx;">
			<view 
				class="flex flex-1 align-center justify-center font font-weight-bold"
				v-for="(item, index) in tabBars" :key="index"
				:class="index === tabIndex ? 'font-md text-main ' : ''"
				@click="changeTab(index)"
			>
				{{ item.name }} <text v-if="item.num > 0" class="ml-1">{{ item.num }}</text>
			</view>
		</view>
		
		<!-- 列表 -->
		<swiper
			:duration="150" 
			:current="tabIndex" 
			@change="onChangeTab"
			:style="'height:' + scrollH + 'px;'"
		>
			<swiper-item v-for="(item, index) in newslist" :key="index">
				<scroll-view 
					scroll-y 
					:style="'height:' + scrollH + 'px;'"
					@scrolltolower="loadmore(index)"
				>
				
					<template v-if="item.list.length">
						<!-- 列表 -->
						<block v-for="(itemy, indey) in item.list" :key="indey">
							<userList :item="itemy" :index="indey"></userList>
							
						</block>
						<!-- 上拉加载 -->
						<load-more v-if="item.list.length > 10" :loadmore="item.loadmore"/>
					</template>
					<!-- 无数据 -->
					<template v-else>
						<noThing/>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	const demo = [
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
	
	import loadMore from '@/components/common/load-more.vue'
	import noThing from '@/components/common/nothing.vue'
	import userList from '@/components/user-list/user-list.vue'
	export default {
		data() {
			return {
				scrollH: 600, // 列表高度
				tabIndex: 0,
				tabBars: [
					{ name: '互关', num: 0 },
					{ name: '关注', num: 2 },
					{ name: '粉丝', num: 10 }
				],
				newslist: []
			}
		},
		components: {
			loadMore,
			noThing,
			userList
		},
		// 监听点击输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=user',
			});
		},
		// 监听点击取消
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1,
			});
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					// px => rpx
					this.scrollH = res.windowHeight - uni.upx2px(140); 
				}
			});
			
			// 初始化数据
			this.getData();
		},
		methods: {
			// 获取数据
			getData() {
				var arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						// 1.上拉记在更多  2.加载中... 3.没有更多了
						loadmore: "上拉加载更多",
						list: []
					}
					if(i < 2) {
						obj.list = demo;
					}
					arr.push(obj);
				}
				this.newslist = arr;
			},
			
			// tab切换
			changeTab(index) {
				this.tabIndex = index;
			},
			
			// 监听swiper滑动
			onChangeTab(e) {
				// console.log(e.detail.current);
				this.changeTab(e.detail.current);
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
