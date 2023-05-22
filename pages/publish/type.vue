<template>
	<view class="page-publish">
		<view class="topbar">
			<cl-topbar title="分类管理" color="#fff" background-color="#F5393B">
				<template slot="append">
					<cl-button type="text">分类管理</cl-button>
				</template>
			</cl-topbar>
		</view>
		<view class="content" v-for="(item,index) in list" :key="index">
			<cl-form-item :label="'分类'+(index+1)">
				<cl-input  placeholder="分类标题" v-model="item.typeName">
					
					<view slot="append">
						<cl-button size="mini" type="success" @click="editData(item,1)">修改</cl-button>
						<cl-button size="mini" type="error"  @click="editData(item,0)">删除</cl-button>
					</view>
					
				</cl-input>
			</cl-form-item>
		</view>
		
		<view style="margin-top: 30rpx;padding: 20rpx;" >
			<cl-button :fill="true" type="primary" @click="visible=true;">新增分类</cl-button>
		</view>
		
		<cl-popup
			ref="popup"
			:visible.sync="visible"
			direction="bottom"
			radius="20rpx 20rpx 0 0"
			@close="visible=false;"
		>
			<cl-form label-position="top">
				<cl-form-item label="分类名">
					<cl-input v-model="data.typeName"></cl-input>
				</cl-form-item>
			</cl-form>
		
			<view class="footer" style="margin-top:30rpx; margin-bottom: 10vh;">
				<cl-row :gutter="20">
					<cl-col :span="12">
						<cl-button fill round @tap="visible=false;data.typeName='';">取消</cl-button>
					</cl-col>
					<cl-col :span="12">
						<cl-button fill round type="primary" @tap="editData(data,1)">新增</cl-button>
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
			visible:false,
			id:"",
			data:{
				typeName:"",
				validFlag:1
			},
			user:"",
			info: {
				iconCloseStyle: { //关闭图标样式
					fontSize: '60rpx',
					color: "#f40"
				}
			},list:[]
		};
	},onLoad(option){
		
		this.getType();
		
	},onShow() {
		this.user = appRequest.getUserInfo();
		if(!this.user){
			uni.switchTab({
				url:"/pages/index/home"
			})
		}
	},methods:{
		
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
		},
		editData(item,res){
			
			if(!item.typeName){
				this.$api.msg("分类名不能为空");
				return;
			}
			
			item.validFlag = res;
			
			var _this = this;
			appRequest.request({
				method: "POST",
				url: item.tid ? appRequest.urlMap.editNmInfoType:appRequest.urlMap.addNmInfoType,
				data:item,
				success: function(res) {
					if (res.data.code == 200) {
						uni.showModal({
							title:"提示",
							content:"操作成功",
							showCancel:false,
							success() {
								_this.getType();
								_this.visible = false;
							}
						})
					}else{
						uni.showToast({
							title:"操作失败",
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
page {
	height: 100%;
}
.page-publish {
	position: relative;
	height: 100%;
	.topbar {
		.cl-topbar__icon {
			padding: 0 40rpx 0 0;
		}
		/deep/ .cl-button__text {
			color: #ffffff;
			font-size: 26rpx;
		}
	}
	.content {
		padding: 46rpx 40rpx;
		.cl-textarea {
			min-height: 378rpx;
		}
	}
	.upload {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 237rpx;
		height: 237rpx;
		margin-left: 40rpx;
		border-radius: 10rpx;
	}
	.position {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 40rpx;
		bottom: 112rpx;
		width: 184rpx;
		height: 57rpx;
		border: 1rpx solid #eeeeee;
		border-radius: 29rpx;
	}
	.bottom {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 94rpx;
		padding: 0 34rpx;
		box-shadow: 0 6rpx 10rpx 0 rgba(0, 0, 0, 0.06);
		box-sizing: border-box;
		.keyboard {
			flex: 1;
			image {
				width: 41rpx;
				height: 45rpx;
			}
		}
		.features {
			margin-right: 58rpx;
		}
	}
}
</style>
