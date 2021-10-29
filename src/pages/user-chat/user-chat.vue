<template>
	<view>
		<!-- 聊天列表 -->
		<!-- <scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'"> -->
		<scroll-view 
			scroll-y="true" 
			style="position: absolute;left: 0;top: 0;right: 0;bottom: 100rpx;"
			:scroll-into-view="scrollInto"
			scroll-with-animation
		>
			<block v-for="(item, index) in list" :key="index">
				<view :id="`chat${index}`">
						<user-chat-list 
							:item="item" 
							:index="index" 
							:pretime="index > 0 ? list[index-1].create_time : 0"
						/>
				</view>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<bottomInput @submit="submit"/>
	</view>
</template>

<script>
	// 模拟当前登录用户的userid
	const user_id = 1;
	import userChatList from '@/components/user-chat/user-chat-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		data() {
			return {
				// content: "",
				// scrollH: 500,
				scrollInto: "",
				list: [
					{
						user_id: 2,
						avatar: "/static/demo/userpic/19.jpg",
						username: "小可爱",
						data: "你好啊",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 1,
						avatar: "/static/demo/demo6.jpg",
						username: "小可爱",
						data: "你好啊",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 2,
						avatar: "/static/demo/userpic/19.jpg",
						username: "小可爱",
						data: "你好啊非常热爱社团招新让我恶心的恻然触发额外向载入史册人分外",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 1,
						avatar: "/static/demo/demo6.jpg",
						username: "小可爱除非袜子分享他说法方向啊二法则我太菜是真的是分析非常",
						data: "你好啊",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 2,
						avatar: "/static/demo/userpic/19.jpg",
						username: "小可爱",
						data: "你好啊",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 1,
						avatar: "/static/demo/demo6.jpg",
						username: "小可爱",
						data: "你好啊",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 2,
						avatar: "/static/demo/userpic/19.jpg",
						username: "小可爱",
						data: "你好啊二三个字蹭热度插入一个工程系人GV置顶刷新供热传递给给数组热心人GV容易",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 1,
						avatar: "/static/demo/demo6.jpg",
						username: "小可爱",
						data: "发发发发发发付付付付付付付付付发发发发发发付付付付付付付呃呃呃呃呃呃呃呃呃",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
					{
						user_id: 1,
						avatar: "/static/demo/demo6.jpg",
						username: "小可爱",
						data: "呃呃呃",
						type: "text", // image， video， audio
						create_time: 1570783530,
					},
				]
			}
		},
		components: {
			userChatList,
			bottomInput
		},
		onLoad() {
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.scrollH = res.windowHeight - uni.upx2px(101);
			// 	}
			// })
		},
		onReady() {
			// 滚动到底部
			this.pageToBottom()
		},
		computed: {},
		methods: {
			// 发送消息
			submit(data) {
				let obj = {
					user_id: 1,
					avatar: "/static/demo/demo6.jpg",
					username: "小可爱",
					data: data,
					type: "text", // image， video， audio
					create_time: (new Date()).getTime(),
				};
				this.list.push(obj);
				// 滚动到底部
				this.pageToBottom();
				
			},
			
			// 滚动到底部
			pageToBottom() {
				let lastIndex = this.list.length - 1;
				if (this.lastIndex < 0) return;
				this.scrollInto = 'chat' + this.lastIndex;
			},
			
		}
	}
</script>

<style>

</style>
