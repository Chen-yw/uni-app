<template>
  <view class="content">
    <!-- 图标演示 -->
    <!-- <text
      class="iconfont icon-smile"
      style="font-size: 180px; color: red;"
    ></text> -->
    <!-- 动画使用方式一：点击效果 -->
    <view style="display: flex;justify-content: center;padding: 50rpx;">
      <view
        class="animated fast"
        hover-class="pulse"
        style="border: 1rpx solid #333333; padding: 20rpx;"
        >点击效果</view
      >
      <!-- 动画使用方式二：v-if -->
      <!-- 动画使用方式三： -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style></style>
