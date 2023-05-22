<template>
	<view class="page-video">
		<view class="search">
			<view class="input" @tap="toSearch">
				<cl-input prefix-icon="cl-icon-search" :placeholder="hotTitle"></cl-input>
			</view>
			<image src="/static/icon/message.png" />
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
				>
				</cl-tabs>
			</view>
		</cl-sticky>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="info">
					<view class="avatar">
						<image :src="item.avatar" />
					</view>
					<view class="name">
						{{ item.name }}
					</view>
					<view class="like">
						<cl-icon name="cl-icon-good-fill"></cl-icon>
						{{ item.like }}
					</view>
					<view class="comment">
						<cl-icon name="cl-icon-comment-fill" color="#999999"></cl-icon>
						{{ item.comment }}
					</view>
					<view class="btn">关注</view>
				</view>
				<view class="video" @tap="toDetail">
					<view class="cover">
						<image :src="item.cover" mode="" />
					</view>
					<view class="title">
						<cl-text
							:value="item.title"
							color="#fff"
							:size="32"
							:ellipsis="1"
						></cl-text>
					</view>
					<view class="Play">
						<image src="/static/images/video-play.png" />
					</view>
					<view class="time">
						{{ item.tiem }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hotTitle: "热搜：热搜内容标题",
			active: "attention",
			tabs: [
				{ label: "关注", name: "attention" },
				{ label: "推荐", name: "recom" },
				{ label: "推荐", name: "recom" },
				{ label: "财经", name: "finance" },
				{ label: "娱乐", name: "entertainment" },
				{ label: "搞笑", name: "funny" },
				{ label: "军事", name: "military" },
				{ label: "商务", name: "business" },
			],
			list: [
				{
					avatar: require("@/static/images/avatar.png"),
					name: "小包子",
					like: "3568",
					comment: "356",
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover.png"),
					tiem: "05:36",
				},
				{
					avatar: require("@/static/images/avatar.png"),
					name: "小包子",
					like: "3568",
					comment: "356",
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover.png"),
					tiem: "05:36",
				},
				{
					avatar: require("@/static/images/avatar.png"),
					name: "小包子",
					like: "3568",
					comment: "356",
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover.png"),
					tiem: "05:36",
				},
				{
					avatar: require("@/static/images/avatar.png"),
					name: "小包子",
					like: "3568",
					comment: "356",
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover.png"),
					tiem: "05:36",
				},
				{
					avatar: require("@/static/images/avatar.png"),
					name: "小包子",
					like: "3568",
					comment: "356",
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover.png"),
					tiem: "05:36",
				},
			],
		};
	},
	methods: {
		toSearch() {
			uni.navigateTo({
				url: "/pages/search/index",
			});
		},
		toDetail() {
			uni.navigateTo({
				url: "/pages/news/detail",
			});
		},
	},
};
</script>

<style lang="scss">
.page-video {
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
		width: calc(100%-68rpx);
		margin: 0 34rpx;
		padding: 30rpx 0;
		.item {
			margin-bottom: 35rpx;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #eee;
			.info {
				display: flex;
				align-items: center;
				margin-bottom: 31rpx;
				.avatar {
					width: 94rpx;
					height: 94rpx;
					margin-right: 25rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.name {
					margin-right: 36rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: #000000;
				}
				.like {
					display: flex;
					align-items: center;
					margin-right: 38rpx;
					color: #999999;
					.cl-icon {
						margin-right: 6rpx;
					}
				}
				.comment {
					display: flex;
					align-items: center;
					color: #999999;
					.cl-icon {
						margin-right: 6rpx;
					}
				}
				.btn {
					width: 120rpx;
					height: 57rpx;
					margin-left: auto;
					border: 2rpx solid #d43c3d;
					box-shadow: 0 6rpx 20rpx 0 rgba(249, 88, 89, 0.3);
					border-radius: 29rpx;
					color: #d43c3d;
					text-align: center;
					line-height: 57rpx;
				}
			}
			.video {
				position: relative;
				.cover {
					width: 678rpx;
					height: 370rpx;
					border-radius: 20rpx;
					overflow: hidden;
					image {
						width: 678rpx;
						height: 370rpx;
					}
				}
				.title {
					position: absolute;
					top: 28rpx;
					left: 20rpx;
				}
			}
			.Play {
				position: absolute;
				top: 140rpx;
				left: 280rpx;
				border-radius: 50%;
				image {
					width: 102rpx;
					height: 102rpx;
				}
			}
			.time {
				position: absolute;
				right: 10rpx;
				bottom: 10rpx;
				width: 108rpx;
				height: 47rpx;
				background: rgba(0, 0, 0, 0.2);
				border-radius: 24rpx;
				color: #fff;
				text-align: center;
				line-height: 47rpx;
				font-size: 26rpx;
			}
		}
	}
}
</style>
