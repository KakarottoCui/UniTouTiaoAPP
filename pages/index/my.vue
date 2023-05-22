<template>
	<view class="page-my">
		<!-- 用户信息 -->
		<view class="info">
			<view class="avatar">
				<image :src="user.pic ? getPicUrl(user.pic) : require('@/static/icon/nuoMi.png')" />
			</view>
			<view class="name"><cl-text :value="user.nickName" :size="48" color="#fff"></cl-text></view>
			<view class="introduction">
				<!-- <cl-text
					:value="info.introduction"
					:size="24"
					color="#FF9D9D"
					:ellipsis="1"
				></cl-text >-->
			</view>
		</view>
		<!-- 统计 -->
		<view class="count">
			<view @click="jump(index)" class="item" v-for="(item, index) in count" :key="index">
				<view class="icon">
					<image :src="item.icon" />
				</view>
				<view class="name">
					{{ item.name }}
				</view>
			</view>
		</view>
		<!-- 线 -->
		<view class="line"></view>
		<!-- 导航 -->
		<view class="nav">
			<cl-list-item label="修改信息" border @click="visible=true;">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
			<cl-list-item label="智能客服" border @click="xiaosi()">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
			<cl-list-item label="退出登录" border @click="logOut">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
		</view>
		
		<cl-popup
			ref="popup"
			:visible.sync="visible"
			direction="bottom"
			radius="20rpx 20rpx 0 0"
			@close="visible=false;"
		>
			<cl-form label-position="top">
				<cl-form-item label="昵称">
					<cl-input v-model="user.nickName"></cl-input>
				</cl-form-item>
				<cl-form-item label="手机号">
					<cl-input v-model="user.address"></cl-input>
				</cl-form-item>
				<view>
					<view class="item">
						<ygy-upload-img title="更换头像" :size="200" :num="1" :iconCloseStyle="info.iconCloseStyle"
							@saveImg="getImgList"></ygy-upload-img>
					</view>
				</view>
			</cl-form>
		
			<view class="footer" style="margin-top:30rpx; margin-bottom: 10vh;">
				<cl-row :gutter="20">
					<cl-col :span="12">
						<cl-button fill round @tap="visible=false;getUserInfo();">取消</cl-button>
					</cl-col>
					<cl-col :span="12">
						<cl-button fill round type="primary" @tap="submit">提交</cl-button>
					</cl-col>
				</cl-row>
			</view>
		</cl-popup>
		
	</view>
</template>

<script>
	import ygyUploadImg from '@/components/ygy-upload-img/ygy-upload-img.vue'
	import appRequest from "@/common/appRequestUrl.js";
export default {
	components: {
		ygyUploadImg
	},
	data() {
		return {
			visible:false,
			user:"",
			info: {
				iconCloseStyle: { //关闭图标样式
					fontSize: '60rpx',
					color: "#f40"
				}
			},
			count: [
				{ icon: require("@/static/icon/publish1.png"), name: "我的文章" },
				{ icon: require("@/static/icon/comment.png"), name: "我的评论" }
			],count2: [
				{ icon: require("@/static/icon/publish1.png"), name: "文章管理" },
				{ icon: require("@/static/icon/comment.png"), name: "评论管理" },
				{ icon: require("@/static/icon/history.png"), name: "分类管理" }
			],
		};
	},onShow() {
		this.user = appRequest.getUserInfo();
		if(!this.user){
			uni.redirectTo({
				url:"/pages/login/index"
			})
		}
		if(this.user.type == 1){
			this.count = this.count2;
		}
	},
	methods: {
		jump(index){
			if(index==0){
				uni.navigateTo({
					url: "/pages/search/article",
				});
			}else if(index==1){
				uni.navigateTo({
					url: "/pages/search/comment",
				});
			}else if(index==2){
				uni.navigateTo({
					url: "/pages/publish/type",
				});
			}
		},
		xiaosi(){
			uni.navigateTo({
				url: "/pages/xiaoSi/xiaoSi",
			});
		},
		submit(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.editNmUser,
				data:{
					nickName:this.user.nickName,
					address:this.user.address,
					pic:this.user.pic
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.user.pic = res.data.data.pic;
						uni.setStorageSync('userInfo', _this.user);
						_this.visible=false;
					}else{
						uni.showToast({
							title:"修改失败",
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
		getUserInfo(){
			this.user = appRequest.getUserInfo();
		},
		logOut(){
			uni.clearStorage();
			uni.navigateTo({
				url: "/pages/login/index",
			});
		},
		toMessage() {
			uni.navigateTo({
				url: "/pages/message/index",
			});
		},getImgList(arr){
			this.user.pic = arr[0];
		},
		myAttention() {
			uni.navigateTo({
				url: "/pages/login/index",
			});
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
		
		}
	},
};
</script>

<style lang="scss">
.page-my {
	.info {
		width: 100%;
		padding: 38rpx 30rpx;
		background-color: #f5393b;
		box-sizing: border-box;
		.avatar {
			width: 129rpx;
			height: 129rpx;
			margin: 0 auto;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.name {
			margin-top: 16rpx;
			text-align: center;
		}
		.introduction {
			margin-top: 12rpx;
			padding: 0 30rpx;
			text-align: center;
		}
		.avatar {
			width: 129rpx;
			height: 129rpx;
			margin: 0 auto;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.name {
			margin-top: 16rpx;
			text-align: center;
		}
		.introduction {
			margin-top: 12rpx;
			padding: 0 30rpx;
			text-align: center;
		}
	}

	.count {
		display: flex;
		padding: 46rpx 34rpx;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 84rpx;
			text-align: center;
			flex: 1;
		}
		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50rpx;
			height: 50rpx;
			margin-bottom: 28rpx;
			image {
				max-width: 50rpx;
				max-height: 50rpx;
			}
		}
		.name {
			font-size: 22rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	.line {
		width: 100%;
		height: 15rpx;
		background-color: #fafafc;
	}
	.nav {
		padding: 0 32rpx;
		.cl-list-item {
			padding: 4rpx 6rpx;
		}
		.cl-list-item__label {
			font-size: 28rpx;
			font-weight: 400;
			color: #252737;
		}
		text {
			color: #cacad6;
		}
	}
}
</style>
