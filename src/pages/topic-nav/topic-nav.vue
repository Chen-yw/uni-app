<template>
	<view class="content">
		<!-- 顶部选项卡 -->
		<view style="height: 100rpx;overflow: hidden;">
			<scroll-view
				scroll-x 
				:scroll-into-view="scrollInto"
				scroll-with-animation="true"
				class="scroll-row "
				style="height: 116rpx;"
			>
				<view 
					class="scroll-row-item px-3 py-1 font-md"
					v-for="(item, index) in tabBars" 
					:key="index" 
					:id="'tab' + index"
					:class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
					@click="changeTab(index)"
				>
					{{ item.name }}
				</view>
			</scroll-view>
		</view>
		
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
							<topicList :item="itemy" :indey="indey"/>
						</block>
						<!-- 上拉加载 -->
						<load-more :loadmore="item.loadmore"/>
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
	const demo = [{
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
					}]
	import topicList from "@/components/news/topic-list.vue"
	import loadMore from '@/components/common/load-more.vue'
	
	export default {
		data() {
			return {
				scrollH: 600, // 列表高度
				// 顶部选项卡
				scrollInto: "", // 根据id滚动定位
				tabIndex: 0, // 活跃项
				tabBars: [
					{
						name: '关注',
					},
					{
						name: '推荐',
					},
					{
						name: '体育',
					},
					{
						name: '热点',
					},
					{
						name: '财经',
					},
					{
						name: '娱乐',
					},
					{
						name: '军事',
					},
					{
						name: '历史',
					},
					{
						name: '本地',
					},
				],
				newslist: []
			}
		},
		components: {
			topicList,
			loadMore,
		},
		// 监听点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			})
		},
		// 监听导航按钮的点击事件
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../add-input/add-input'
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					// px => rpx
					this.scrollH = res.windowHeight - uni.upx2px(100)
				}
			});
			
			// 根据选项生成列表
			this.getData();
		},
		onShow() {
			// console.log('进入页面');
		},
		onHide() {
			// console.log('隐藏页面');
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
			
			// 监听swiper滑动
			onChangeTab(e) {
				// console.log(e.detail.current);
				this.changeTab(e.detail.current);
			},
			
			// 切换选项
			changeTab(index) {
				if (this.tabIndex === index ) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = 'tab' + index; // 选项卡同步向左滚动
			},
			
			// 关注
			follow(e){
				this.newslist[e.index].list[e.indey].isFollow = true;
				uni.showToast({title: '关注成功'});
			},
			
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				let item = this.newslist[e.index].list[e.indey];
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

<style></style>

