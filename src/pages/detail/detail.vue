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
		
		<!-- 评论 -->
		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论 {{comments.length}}
		</view>
		<view class="px-2">
			<view class="uni-comment-list"
			v-for="(item,index) in comments"
			:key="index">
				<!-- <view v-if="item.fid" style="width: 60rpx;"></view> -->
				<view v-if="item.fid"></view>
				<view class="flex w-100"
				:class="item.fid ? 'bg-light rounded p-2' : ''">
					<view class="uni-comment-face"><image :src="item.userpic"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.username}}</text>
						</view>
						<view class="uni-comment-content"
						@click="reply(item.id)">{{item.data}}</view>
						<view class="uni-comment-date">
							<view>{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<!-- 底部操作条 -->
		<bottomInput @submit="submit"/>
		
		<!-- 底部弹出分享 -->
		<moreShare ref="moreshare" :providerList="providerList"></moreShare>
	</view>
</template>

<script>
	import commonList from "@/components/common/common-list.vue"
	import bottomInput from '@/components/common/bottom-input.vue'
	import moreShare from '@/components/common/more-share.vue'
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
				},
				comments: [
					{
						id: 1155,
						fid: 1,
						username: "小可爱",
						userpic: "/static/demo/datapic/11.jpg",
						data: "啦啦啦",
						time: '2021-12-10 14:20:01'
					}
				],
				providerList: [
					{icon: "icon-weixin",color: "bg-success", name: "微信"},
					{icon: "icon-huati",color: "bg-dark", name: "朋友圈"},
					{icon: "icon-xinlangweibo",color: "bg-danger", name: "新浪微博"},
					{icon: "icon-QQ",color: "bg-primary", name: "QQ好友"},
				]
				
			}
		},
		components: {
			commonList,
			bottomInput,
			moreShare
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
		// 监听原生导航栏按钮
		onNavigationBarButtonTap() {
			this.$refs.moreshare.open();
		}, 
		// 监听返回按钮
		onBackPress() { 
			this.$refs.moreshare.close();
			uni.navigateBack({
				delta: 1
			})
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
			},
			
			// 提交评论
			submit(e) {
				console.log(e);
			},
			
			// 回复评论
			reply(id){
				this.reply_id = id
				this.focus = true
			},
		
		}
	}
</script>

<style>

</style>
