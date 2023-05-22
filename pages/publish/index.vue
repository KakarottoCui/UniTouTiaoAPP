<template>
	<view class="page-publish">
		<view class="topbar">
			<cl-topbar title="发布内容" color="#fff" background-color="#F5393B">
				<template slot="append">
					
				</template>
			</cl-topbar>
		</view>
		<view class="content">
			<cl-form-item label="标题">
				<cl-input  placeholder="输入文章标题" v-model="data.title"></cl-input>
			</cl-form-item>
		</view>
		
		<view class="content">
			<cl-form-item label="分类">
				<cl-select :border="true" label-key="typeName" value-key="tid" placeholder="选择文章分类" v-model="data.type" :options="list"></cl-select>
			</cl-form-item>
		</view>
		
		<!-- 文本域 -->
		<view class="content">
			<cl-form-item label="正文">
				<cl-textarea  maxlength="300" :auto-height="true" v-model="data.content" placeholder="输入文章正文"></cl-textarea>
			</cl-form-item>
		</view>
		<!-- 上传 -->
		<view class="upload">
			<ygy-upload-img :imgList="setImgList(data.pic1)" title="上传文章主图" :size="200" :num="1" :iconCloseStyle="info.iconCloseStyle"
				@saveImg="getImgList"></ygy-upload-img>
		</view>
		<view style="margin-top: 30rpx;padding: 20rpx;" >
			<cl-button :fill="true" type="primary" @click="editData()">提交</cl-button>
		</view>
		
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
			id:"",
			data:{
				title:"",
				content:"",
				pic1:"",
				pic1Str:"",
				type:""
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
		
		this.id = option.id || "";
		if(this.id){
			this.getData();
		}
		this.getType();
		
	},onShow() {
		this.user = appRequest.getUserInfo();
		if(!this.user){
			uni.switchTab({
				url:"/pages/index/home"
			})
		}
	},methods:{
		getImgList(arr){
			this.data.pic1Str = arr[0];
		},
		setImgList(pic){
			if(pic){
				return [this.getPicUrl(pic)];
			}else{
				return [];
			}
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
		editData(){
			
			if(!this.data.title || !this.data.content || !this.data.type || !this.data.pic1Str){
				this.$api.msg("请填写完整");
				return;
			}
			
			var _this = this;
			appRequest.request({
				method: "POST",
				url: this.data.id ? appRequest.urlMap.editNmArticle:appRequest.urlMap.addNmArticle,
				data:this.data,
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
		getData(){
			var _this = this;
			appRequest.request({
				method: "POST",
				url: appRequest.urlMap.findNmArticle,
				data:{
					id:this.id,
					validFlag:1
				},
				success: function(res) {
					if (res.data.code == 200) {
						_this.data = res.data.data;
						_this.data['pic1Str'] = res.data.data.pic1;
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
