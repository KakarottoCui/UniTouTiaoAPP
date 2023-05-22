<template>
	<view class="page-recom">
		<!-- 搜索 -->
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
		<!-- 我的话题 -->
		<view class="topic">
			<view class="topic-title">我的话题</view>
			<scroll-view scroll-x="true" class="topic-list">
				<view
					class="topic-item"
					v-for="(item, index) in topic"
					:key="index"
					@tap="toDetail"
				>
					<view class="topic-cover">
						<image :src="item.cover" />
					</view>
					<view class="topic-name">
						<cl-text
							:value="item.name"
							:ellipsis="1"
							color="#333333"
							:size="28"
						></cl-text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 关注的话题 -->
		<view class="attention">
			<view class="attention-title">关注的话题</view>
			<view class="attention-list">
				<view
					class="attention-item"
					v-for="(item, index) in attention"
					:key="index"
					:class="{ 'is-first': index == 0 }"
				>
					{{ item.name }}
				</view>
			</view>
		</view>
		<!-- 视频 -->
		<view class="video">
			<view class="video-list">
				<view
					class="video-item"
					v-for="(item, index) in video"
					:key="index"
					@tap="toDetail"
				>
					<view class="video-cover">
						<image :src="item.cover" mode="" />
					</view>
					<view class="video-title">
						<cl-text
							:value="item.title"
							color="#fff"
							:size="32"
							:ellipsis="1"
						></cl-text>
					</view>
					<view class="video-Play">
						<image src="/static/images/video-play.png" />
					</view>
					<view class="video-time">
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
			topic: [
				{ cover: require("@/static/images/topic-cover1.png"), name: "大学社团合作" },
				{ cover: require("@/static/images/topic-cover2.png"), name: "工作组加班日常" },
				{ cover: require("@/static/images/topic-cover3.png"), name: "大城市中的夜生活" },
				{ cover: require("@/static/images/topic-cover1.png"), name: "工作组加班日常" },
			],
			attention: [
				{ name: "各地楼价持平稳上升" },
				{ name: "最好的我们本周上映" },
				{ name: "各地楼价持平稳上升" },
				{ name: "本城市今日热点整理" },
			],
			video: [
				{
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover1.png"),
					tiem: "05:36",
				},
				{
					title: "'监督员'大闹头等舱 国航:系因身体原因休...",
					cover: require("@/static/images/video-cover1.png"),
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
.page-recom {
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
	.topic {
		padding: 40rpx 0 40rpx 34rpx;
		&-title {
			margin-bottom: 33rpx;
			font-size: 36rpx;
			font-weight: 400;
			color: #000000;
		}
		&-list {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
				color: transparent;
				background: transparent;
			}
		}
		&-item {
			display: inline-block;
			margin-right: 36rpx;
		}
		&-cover {
			border-radius: 6rpx;
			overflow: hidden;
			image {
				width: 166rpx;
				height: 166rpx;
			}
		}
		&-name {
			width: 166rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
		}
	}
	.attention {
		padding-left: 34rpx;
		margin-bottom: 40rpx;
		.is-first {
			background-color: #ffe6e8;
		}
		&-title {
			margin-bottom: 50rpx;
			font-size: 36rpx;
			font-weight: 400;
			color: #000000;
		}
		&-list {
			display: flex;
			flex-wrap: wrap;
		}
		&-item {
			height: 66rpx;
			margin-right: 18rpx;
			margin-bottom: 20rpx;
			padding: 0 39rpx;
			background: rgba(0, 0, 0, 0.05);
			border-radius: 33rpx;
			line-height: 66rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}
	}
	.video {
		&-item {
			position: relative;
			margin-bottom: 30rpx;
		}
		&-cover {
			width: 750rpx;
			height: 379rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
		&-title {
			position: absolute;
			top: 28rpx;
			left: 20rpx;
		}
		&-Play {
			position: absolute;
			top: 140rpx;
			left: 280rpx;
			border-radius: 50%;
			image {
				width: 102rpx;
				height: 102rpx;
			}
		}
		&-time {
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
</style>
