<template>
	<view>
		<!-- 帖子详情页详情信息 -->
		<commonList :item="info" isdetail @follow="follow" @doSupport="doSupport" @doComment="doComment">
			<view>{{ info.content }}</view>
			<view >
				<image 
					class="w-100" 
					mode="widthFix" 
					v-for="(item, index) in info.image" 
					:key="index" 
					:src="item.url"
					@click="preview(index)"
				></image>
			</view>
		</commonList>
		
		<!-- 底部操作条 -->
		<bottomInput @submit="submit"/>
	</view>
</template>

<script>
	import commonList from "@/components/common/common-list.vue"
	import bottomInput from '@/components/common/bottom-input.vue'
	export default {
		data() {
			return {
				// 当前帖子信息
				info: {
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
					share_num: 2,
					content: "啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
					image: [
						{url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/4.jpg"},
						{url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/5.jpg"}
					]
				}
			}
		},
		components: {
			commonList,
			bottomInput
		},
		computed: {
			imageList() {
				return this.info.image.map(v => v.uel);
			}
		},
		onLoad(e) {
			// 初始化
			if(e.detail) {
				this.__init(JSON.parse(e.detail))
				// this.info = JSON.parse(e.detail)
			}
		},
		methods: {
			__init(data) {
				// 修改标题
				uni.setNavigationBarTitle({
					"title": data.title
				})
				//请求api
			},
			
			// 关注
			follow() {
				this.info.isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			
			// 顶踩操作
			doSupport(e) {
				//  之前操作过
				if(this.info.support.type === e.type) {
					return uni.showToast({
						title: '你已经操作过了',
						icon: 'none'
					});
				}
				
				let msg = e.type === 'support' ? '顶' : '踩';
				// 之前有没有操作过
				if (this.info.support.type === "") {
					this.info.support[e.type + '_count']++ 
				} else if (this.info.support.type === "support" && e.type === "unsupport") {
					this.info.support.support_count--; // 顶 - 1
					this.info.support.unsupport_count++; // 踩 + 1
				} else if (this.info.support.type === "unsupport" && e.type === "support"){
					this.info.support.support_count++; // 顶 + 1
					this.info.support.unsupport_count--; // 踩 - 1
				}
				this.info.support.type = e.type;
				uni.showToast({
					title: msg
				});
			},
			
			// 点击评论
			doComment() {
				
			},
			
			// 点击分享
			doShare() {
				
			},
			
			// 预览图片
			preview(index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imageList,
				});
			}
		}
	}
</script>

<style>

</style>
