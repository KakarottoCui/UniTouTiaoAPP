<template>
	<view class="page-message">
		<view class="count">
			<view @click="getData(index)" class="item" v-for="(item, index) in features" :key="index">
				<view class="icon">
					<image :src="item.icon" />
				</view>
				<view class="name">{{ item.name }}</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-if="list.length == 0">
				<view class="content">无数据</view>
			</view>
			<view v-if="tabIndex<3" @click="toDetail(item)" class="item" v-for="(item, index) in list" :key="index">
				<view v-if="item.title" class="content">{{ item.title }}</view>
				<view v-if="item.content" class="content">{{ item.content }}</view>
				<view class="time">{{ item.createTime }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
export default {
	data() {
		return {
			features: [
				{ icon: require("@/static/icon/activity.png"), name: "收藏" },
				{ icon: require("@/static/icon/like2.png"), name: "点赞" },
				{ icon: require("@/static/icon/comment2.png"), name: "评论" },
				// { icon: require("@/static/icon/system.png"), name: "私信" }
			],
			list: [],
			tabIndex:0
		};
	},onShow(){
		this.user = appRequest.getUserInfo();
		if(!this.user){
			uni.redirectTo({
				url:"/pages/login/index"
			})
		}
		this.getData(0);
	},methods:{
		getData(index){
			this.tabIndex = index;
			this.list = [];
			if(index<2){
				this.getCollect(index)
			}
			if(index == 2){
				this.getComment(index)
			}
			if(index == 3){
				this.getCollect(index)
			}
		}
		,toDetail(item) {
			uni.navigateTo({
				url: "/pages/news/detail?id="+item.id,
			});
		},getComment(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmCommentList,
				data:{
					type:0,
					creater:this.user.uid,
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.list = res.data.data;
					}else{
						uni.showToast({
							title:"获取失败",
							icon:"none"
						})
					}
				},
				fail: function(res) {
					uni.showToast({
						title:"网络异常",
						icon:"none"
					})
				}
			})
		}
		,
		getCollect(type){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmCollectList,
				data:{
					type:type,
					creater:this.user.uid,
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.list = res.data.data;
					}else{
						uni.showToast({
							title:"获取失败",
							icon:"none"
						})
					}
				},
				fail: function(res) {
					uni.showToast({
						title:"网络异常",
						icon:"none"
					})
				}
			})
		}
	}
};
</script>

<style lang="scss">
.page-message {
	padding-top: 30rpx;
	background-color: #fafafa;
	.count {
		display: flex;
		width: calc(100% - 76rpx);
		margin: 0 38rpx;
		padding: 30rpx 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 6rpx 16rpx 0 rgba(0, 0, 0, 0.08);
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 64rpx;
			.icon {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 6rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.name {
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
		}
	}
	.list {
		padding: 26rpx 40rpx;
		.item {
			margin-bottom: 32rpx;
			padding: 45rpx 46rpx 40rpx 46rpx;
			background: #fff;
			box-shadow: 0px 6rpx 10rpx 0px rgba(0, 0, 0, 0.02);
			border-radius: 12rpx;
			.content {
				margin-bottom: 18rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}
			.time {
				font-size: 20rpx;
				font-weight: 400;
				color: #adafbc;
			}
		}
	}
}
</style>
