<template>
	<view class="p-2">
		<!-- 头像昵称 | 关注按钮 -->
		<view class="flex justify-between">
			<view class="flex align-center">
				<!-- 头像 -->
				<image 
					class="rounded-circle mr-3"
					:src="item.userpic" 
					style="width: 65rpx;height: 65rpx;"
					lazy-load
					@click="openSpace"
				/>
				<!-- 昵称发布时间 -->
				<view>
					<view 
						class="font" 
						style="line-height: 1.5;"
						@click="openDetail"
						>
							{{ item.username }}
						</view>
					<text 
						class="font-sm text-light-muted" 
						style="line-height: 1.5;"
						@click=""
					>
						{{ item.newstime }}
					</text>
				</view>
			</view>
			<!-- 关注按钮 -->
			<view 
				v-if="!item.isFollow"
				class="flex justify-center align-center rounded bg-main text-white animated faster"
				hover-class="rubberBand"
				style="width: 90rpx;height: 50rpx;"
				@click="follow"
			>
				关注
			</view>
		</view>
		
		<!-- 标题 -->
		<view class="font" style="margin: 10rpx 0;">{{ item.title }}</view>
		
		<!-- 图片 -->
		<image 
			v-if="item.titlepic"
			class="rounded w-100" 
			:src="item.titlepic" 
			style="height: 350rpx;" 
			mode=""
		/>
		
		<!-- 图表按钮 -->
		<view class="flex align-center">
			<!-- 顶 -->
			<view 
				class="flex justify-center align-center flex-1 animated" 
				hover-class="jello text-main"
				@click="doSupport('support')"
				:class="item.support.type === 'support' ? 'support-active' : '' "
			>
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{ item.support.support_count > 0 ? item.support.support_count : '顶' }}</text>
			</view>
			<!-- 踩 -->
			<view 
				class="flex justify-center align-center flex-1 animated" 
				hover-class="jello text-main"
				@click="doSupport('unsupport')"
				:class="item.support.type === 'unsupport' ? 'support-active' : '' "
			>
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{ item.support.unsupport_count > 0 ? item.support.unsupport_count : '踩'}}</text>
			</view>
			<!-- 评论 -->
			<view 
				class="flex justify-center align-center flex-1 animated" 
				hover-class="jello text-main"
				@click="openDetail"
			>
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{ item.comment_count > 0 ? item.comment_count : '评论' }}</text>
			</view>
			<!-- 转发 -->
			<view 
				class="flex justify-center align-center flex-1 animated" 
				hover-class="jello text-main"
				@click="openDetail"
			>
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{ item.share_num > 0 ? item.share_num : "分享" }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			item: Object,
			index: Number,
			indey: Number
		},
		methods: {
			// 打开个人空间
			openSpace() {
				console.log('打开个人空间');
			},
			
			// 关注
			follow() {
				console.log('关注');
				console.log(!this.item.isFollow);
				// 通知父组件
				this.$emit('follow', {index: this.index, indey: this.indey});
			},
			
			// 进入详情页
			openDetail() {
				console.log("进入详情页");
			
			},
			
			// 顶踩操作
			doSupport(type) {
				// 通知父组件
				this.$emit('doSupport', {type: type, index: this.index, indey: this.indey});
			},
		}
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>
