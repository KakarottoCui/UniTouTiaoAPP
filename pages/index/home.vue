<template>
	<view class="page-home">
		<view class="search">
			<view class="input" @tap="toSearch">
				<cl-input prefix-icon="cl-icon-search" :placeholder="hotTitle"></cl-input>
			</view>
			<image src="/static/icon/message.png" @click="toMessage" />
		</view>
		<cl-sticky is-topbar>
			<view class="tabs">
				<cl-tabs
					v-model="active"
					:labels="tabs"
					justify="start"
					unColor="#999999"
					show-dropdown
					:border="false"
					@tab-change="activeTab"
				>
				</cl-tabs>
			</view>
		</cl-sticky>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index" @tap="toDetail(item)">
				<view class="det">
					<view class="title">
						<cl-text
							:value="item.title"
							color="#000000"
							:size="32"
							:ellipsis="2"
						></cl-text>
					</view>
					<view class="count">
						<view class="is-top" >{{tName}}</view>
						<!-- <view class="count-item">{{ item.comment }}评</view> -->
						<view class="count-item">{{ item.createTime }}</view>
					</view>
				</view>
				<view class="cover">
					<image :src="getPicUrl(item.pic1)" mode="" />
				</view>
			</view>
		</view>
		<!-- <view class="hot">
			<view class="hot-head">
				<view class="tag">热点</view>
				<cl-text :value="`实时更新于${hotTime}`" color="#999999" :size="22"></cl-text>
			</view>

			<view class="hot-list">
				<view class="item" v-for="(item, index) in hot" :Key="index">
					<cl-text
						:value="item.title"
						color="#333333"
						:size="36"
						:margin="[0, 0, 30, 0]"
						:ellipsis="1"
					></cl-text>
				</view>
			</view>
		</view> -->
		<view class="publish">
			<view class="open" @tap="onOpen">
				<image :src="open" />
			</view>
			<view class="popup">
				<cl-popup :visible.sync="visible" size="90%" :padding="36" direction="center">
					<view class="publish-list">
						<view
							class="item"
							v-for="(item, index) in publish"
							:key="index"
							@tap="toPublish"
						>
							<view class="icon">
								<image :src="item.icon" mode="aspectFit" />
							</view>
							<view class="name">
								{{ item.name }}
							</view>
						</view>
					</view>
				</cl-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
export default {
	data() {
		return {
			user:"",
			hotTitle: "热搜：热搜内容标题",
			searchText:"",
			active: "",
			tName:"最新",
			tabs: [
				{ label: "最新", name: "" }
			],
			list: [
				
			],
			hotTime: "15:09",
			open: require("@/static/icon/publish.png"),
			visible: false,
			publish: [
				{ icon: require("@/static/icon/publish1.png"), name: "创建文章" }
				// { icon: require("@/static/icon/publish2.png"), name: "小视频" },
				// { icon: require("@/static/icon/publish3.png"), name: "提问" },
				// { icon: require("@/static/icon/publish4.png"), name: "爆料" },
			],
		};
	},onLoad() {
		
	},onShow() {
		this.user = appRequest.getUserInfo();
		this.getType();
		this.getData();
	},
	methods: {
		activeTab(name){
			var _this = this;
			this.tabs.map(function(item,index){
				if(item.name == name){
					_this.tName = item.label;
				}
			});
			this.getData(name);
		},
		getData(type){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmArticleList,
				data:{
					validFlag:1,
					type:type,
					title:this.searchText
				},
				success: function(res) {
					if (res.data.code == 200) {
						let data = res.data.data;
						_this.list = data;
						console.log(JSON.stringify(data));
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
		},
		getType(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmInfoTypeList,
				data:{
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						let data = res.data.data;
						data.map(function(item,index,arr){
							_this.tabs.push({ label:item.typeName , name: item.tid });
						})
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
		},getPicUrl(info) {
			if(info){
				if( info.length > 10 ){
					return info;
				}else {
					return appRequest.urlMap.getPicById + info;
				}
			}else {
				return "";
			}
		
		},
		toSearch() {
			uni.navigateTo({
				url: "/pages/search/index",
			});
		},
		toDetail(item) {
			uni.navigateTo({
				url: "/pages/news/detail?id="+item.id,
			});
		},
		onOpen() {
			this.visible = true;
		},
		toPublish() {
			this.visible = false;
			uni.navigateTo({
				url: "/pages/publish/index",
			});
		},
		toMessage() {
			uni.navigateTo({
				url: "/pages/message/index",
			});
		},
	},
};
</script>

<style lang="scss">
.page-home {
	.search {
		display: flex;
		align-items: center;
		width: 100%;
		height: 123rpx;
		padding: 0 35rpx;
		background-color: #f95859;
		box-sizing: border-box;

		.input {
			flex: 1;
		}

		image {
			width: 38rpx;
			height: 35rpx;
			margin-left: 30rpx;
		}
	}
	.tabs {
		background-color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 1rpx solid #eee;

		/deep/.cl-tabs {
			&__dropdown {
				color: #000;
			}
		}
	}
	.list {
		width: calc(100% - 60rpx);
		padding-top: 30rpx;
		border-bottom: 1rpx solid #eeeeee;
		margin: 0 30rpx;
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 38rpx;
			.det {
				margin-right: 66rpx;
				flex: 1;
				/deep/.cl-text {
					line-height: 40rpx;
				}
				.count {
					display: flex;
					align-items: center;
					margin-top: 33rpx;
					.is-top {
						width: 75rpx;
						height: 32rpx;
						margin-right: 20rpx;
						background-color: #f95859;
						color: #f5c7cc;
						border-radius: 16rpx;
						font-size: 22rpx;
						text-align: center;
					}
					&-item {
						margin-right: 20rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #999999;
					}
				}
			}
			.cover {
				width: 205rpx;
				height: 147rpx;
				border-radius: 8rpx;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.hot {
		width: calc(100% - 60rpx);
		margin: 33rpx 30rpx 0 30rpx;
		&-head {
			display: flex;
			.tag {
				width: 76rpx;
				height: 39rpx;
				margin-right: 15rpx;
				margin-bottom: 31rpx;
				background: #d43c3d;
				border-radius: 4rpx;
				color: #fff;
				text-align: center;
				line-height: 39rpx;
				font-size: 28rpx;
			}
		}
		&-list {
			.item {
				position: relative;
				padding-left: 35rpx;
				::after {
					content: "";
					display: inline-block;
					position: absolute;
					top: 20rpx;
					left: 0;
					width: 9rpx;
					height: 9rpx;
					background-color: #3c4166;
					border-radius: 50%;
					z-index: -1;
				}
			}
		}
	}
	.publish {
		.open {
			position: fixed;
			right: 30rpx;
			bottom: 130rpx;
			width: 120rpx;
			height: 120rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.popup {
			/deep/.cl-popup {
				border-radius: 50rpx;
			}
		}
		&-list {
			display: flex;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex: 1;
				.icon {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 6rpx;
					image {
						max-width: 64rpx;
						max-height: 57rpx;
					}
				}
				.name {
					font-size: 22rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}
	}
}
</style>
