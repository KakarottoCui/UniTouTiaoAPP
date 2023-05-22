<template>
	<view class="page-detail">
		<view class="title">{{ det.title }}</view>
		<view class="time"> 时间：{{ det.createTime }} </view>
		<!-- 富文本 -->
		<!-- <view class="content" v-html=""></view> -->
		<view class="cover">
			<image :src="getPicUrl(det.pic1)" />
		</view>
		<view class="content">
			{{ det.content }}
		</view>
		
		<view v-if="user.type==1||user.uid == det.creater" style="margin-bottom: 20rpx; padding: 20rpx;display: flex;justify-content: start;" >
			<view style="color:darkgreen;margin-right: 30rpx;"  @click="edit(det)">修改</view>
			<view style="color:#f95859 ;" @click="del(det)">删除</view>
		</view>
		
		<view class="evalution" v-if="commentList.length>0">
			<view class="section-tit">评论</view>
			
			<view class="eva-list" :class="{Skeleton:!loaded}">
				<view  v-for="(item, index) in commentList" :key="index"
					class="eva-item"
				>
					<image :src="item.cid ? getPicUrl(item.cid) : require('@/static/icon/nuoMi.png')" mode="aspectFill"></image>
					<view class="eva-right" :class="index == commentList.length - 1 ? '':'border-bottom' ">
						<text>{{item.cname}}</text>
						<text>{{item.createTime}}</text>
						<!-- <view class="zan-box">
							<text>{{item.zan}}</text>
							<cl-icon name="cl-icon-like-fill" color="red" :size="33"></cl-icon>
						</view> -->
						<text class="content">{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部功能区 -->
		<view class="bottom">
			<view class="input" @click="visible=true;">
				<cl-input prefix-icon="cl-icon-edit" placeholder="请输入评论" round></cl-input>
			</view>
			<view class="feature"  @click="setCollect(myLike,1)">
				<cl-icon v-if="myLike" name="cl-icon-good-fill" color="#FFE153"></cl-icon>
				<cl-icon v-else name="cl-icon-good-fill" color="#999999"></cl-icon>
				<cl-text :value="like.length" color="#999999" :size="28"></cl-text>
			</view>
			<view class="feature" @click="setCollect(myCollect,0)">
				<cl-icon v-if="myCollect" name="cl-icon-like-fill" color="#F95859"></cl-icon>
				<cl-icon v-else name="cl-icon-like-fill" color="#999999"></cl-icon>
				<cl-text :value="collect.length" color="#999999" :size="28"></cl-text>
			</view>
		</view>
		
		<cl-popup
			ref="popup"
			:visible.sync="visible"
			direction="bottom"
			radius="20rpx 20rpx 0 0"
			@close="content='';visible=false;"
		>
			<cl-form label-position="top">
				<cl-form-item label="评论">
					<cl-textarea v-model="content" placeholder="请输入评论"></cl-textarea>
				</cl-form-item>
			</cl-form>
		
			<view class="footer">
				<cl-row :gutter="20">
					<cl-col :span="12">
						<cl-button fill round @tap="content='';visible=false;">取消</cl-button>
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
	import appRequest from "@/common/appRequestUrl.js";
export default {
	data() {
		return {
			content:"",
			user:{},
			id:"",
			visible:false,
			commentList:[],
			det: {},
			like:[],
			collect:[],
			myLike:false,
			myCollect:false,
			feature: {
				like: 3568,
				comment: 356,
				forward: 368,
			},loaded:true
		};
	},onLoad(options) {
		this.id = options.id;
		
	},onShow() {
		this.user = appRequest.getUserInfo();
		if(!this.user){
			uni.redirectTo({
				url:"/pages/login/index"
			})
		}
		this.getData();
		this.setCollectInfo();
		this.getComment();
	},methods:{
		edit(item){
			uni.navigateTo({
				url:"/pages/publish/index?id="+item.id
			})
		},
		del(item){
			
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.editNmArticle,
				data:{
					validFlag:0,
					id:item.id
				},
				success: function(res) {
					if (res.data.code == 200) {
						uni.showModal({
							title:"提示",
							content:"操作成功",
							showCancel:false,
							success() {
								uni.navigateBack();
							}
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
			
		},
		getPicUrl(info) {
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
		getData(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmArticle,
				data:{
					id:this.id
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.det = res.data.data;
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
		setCollectInfo(){
			var _this = this;
			this.getCollect(0,"",function(data){
				_this.collect = data;
			})
			this.getCollect(1,"",function(data){
				_this.like = data;
			})
			this.getCollect(0,this.user.uid,function(data){
				_this.myCollect = data.length > 0 ?data[0]:false;
			})
			this.getCollect(1,this.user.uid,function(data){
				_this.myLike = data.length >0?data[0]:false;
			})
		}
		,
		getCollect(type,uid,callBack){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmCollectList,
				data:{
					type:type,
					aid:this.id,
					creater:uid,
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						callBack(res.data.data);
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
		setCollect(obj,type){
			var _this = this;
			
			let url = obj ? appRequest.urlMap.editNmCollect : appRequest.urlMap.addNmCollect;
			let data ;
			if(obj){
				data = {
					validFlag : 0,
					id:obj.id
				}
			}else{
				data = {
					aid : this.det.id,
					title:this.det.title,
					type:type
				}
			}
			
			var _this = this;
			appRequest.request({
				method: "POST",
				url: url,
				data:data,
				success: function(res) {
					if (res.data.code == 200) {
						uni.showToast({
							title:"成功",
							icon:"none"
						})
						_this.setCollectInfo();
						
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
			
		},submit(){
			if(!this.content){
				this.$api.msg("请输入评论");
				return;
			}
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.addNmComment,
				data:{
					content:this.content,
					aid:this.id,
					type:0,
					cid:this.user.pic,
					cname:this.user.nickName
				},
				success: function(res) {
					if (res.data.code == 200) {
						uni.showToast({
							title:"评论成功",
							icon:"none"
						})
						_this.getComment();
						_this.visible = false;
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
		},getComment(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmCommentList,
				data:{
					type:0,
					aid:this.id,
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.commentList = res.data.data;
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
.page-detail {
	padding: 50rpx 0;
	.title {
		padding: 0 30rpx;
		font-size: 42rpx;
		font-weight: 400;
		color: #20263c;
		line-height: 56rpx;
	}
	.time {
		margin: 26rpx 0 62rpx 0;
		padding: 0 30rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #9b9b9b;
	}
	.cover {
		margin-bottom: 65rpx;
		padding: 0 30rpx;
		image {
			width: 678rpx;
		}
	}
	.content {
		padding: 0 30rpx 80rpx 30rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
		line-height: 65rpx;
	}
	.bottom {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 108rpx;
		padding: 0 30rpx;
		box-shadow: 0px 6rpx 10rpx 0px rgba(0, 0, 0, 0.06);
		box-sizing: border-box;
		.input {
			margin-right: 28rpx;
			flex: 1;
			.cl-input {
				height: 60rpx;
				background-color: #f6f5f5;
			}
		}
		.feature {
			margin-right: 28rpx;
		}
		.cl-icon {
			margin-right: 6rpx;
		}
	}
	.evalution{
		display:flex;
		flex-direction:column;
		background: #fff;
		margin-top: 16upx;
		padding: 40upx 0;
	}
	
	.eva-item{
		display:flex;
		padding: 20upx 40upx;
		image{
			width: 60upx;
			height: 60upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 24upx;
		}
	}
	.eva-right{
		display:flex;
		flex-direction:column;
		flex: 1;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		position:relative;
		.zan-box{
			display:flex;
			align-items:base-line;
			position:absolute;
			top: 10upx;
			right: 10upx;
			.yticon{
				margin-left: 8upx; 
			}
		}
		.content{
			font-size: $font-base;
			color: #333;
			padding-top:20upx;
		}
	}
	
	.section-tit {
		padding-left: 40upx;
		font-size: $font-base+2upx;
		color: $font-color-dark;
		margin-bottom: 30upx;
		text-align:left;
	}
	
	.border-bottom{
		border-bottom: 0.5px solid $font-color-disabled;
	}
}
</style>
