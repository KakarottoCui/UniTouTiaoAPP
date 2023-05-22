<template>
	<view>
		<view class="cu-chat">
			<view  v-for="(item,index) in infoList" :key="index">
				
				<view v-if="item.type == 0" class="cu-item self">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<image :src="user.pic" class="cu-avatar radius" ></image>
					<view class="date">{{item.time}}</view>
				</view>
				
				<view v-if="item.type == 1" class="cu-item">
					<image src="../../static/images/robotHead.png" class="cu-avatar radius" ></image>
					<view class="main">
						<view class="content shadow">
							<text>{{item.content}}</text>
						</view>
					</view>
					<view class="date "> {{item.time}}</view>
				</view>
				
			</view>
			
			
			
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<input v-model="text" placeholder="请输入留言" class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 ></input>
			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<button class="cu-btn bg-green shadow" @click="getMessage">发送</button>
		</view>

	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				InputBottom: 0,
				infoList:[],
				robotInfo:[],
				user:{},
				text:""
			};
		},
		onLoad() {
			var info = {content:"你好，我是万能的小思。",time:new Date().toLocaleString(),type:1};
			this.infoList.push(info);
			// this.user = appRequest.getUserInfo();
			// if (!this.user) {
			// 	uni.reLaunch({
			// 		url:"/pages/index/index"
			// 	});
			// }
		},onShow() {
			
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},getMessage(){
				var info = {content:this.text,time:new Date().toLocaleString(),type:0};
				this.infoList.push(info);
				var _this = this;
				appRequest.request({
					method: "GET",
					url: appRequest.urlMap.sendMessage +_this.text,
					success: function(res) {
						var data = {content:res.data.data,time:new Date().toLocaleString(),type:1};
						_this.infoList.push(data);
						uni.pageScrollTo({
						  scrollTop: 99999,
						  duration: 0
						})
					},
					fail: function(res) {
						
					} });
				
			},
		}
	}
</script>

<style>
	@import "@/static/colorui/main.css";
	@import "@/static/colorui/icon.css";
	page{
		padding: 0rpx;
		background-color: #e9ecef;
		box-sizing: border-box;
		padding-bottom: 100upx;
	}

</style>
