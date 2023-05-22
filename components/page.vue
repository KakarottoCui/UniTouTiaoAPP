<template>
	<view class="cl-page">
		<!-- toast -->
		<cl-toast ref="toast"></cl-toast>

		<!-- message-->
		<cl-message ref="message"></cl-message>

		<!-- loading-mask -->
		<cl-loading-mask
			ref="loader"
			:loading="loader.loading"
			:text="loader.text"
		></cl-loading-mask>

		<!-- confirm -->
		<cl-confirm ref="confirm"></cl-confirm>

		<!-- content -->
		<slot></slot>
	</view>
</template>

<script>
import { isString, isObject } from "cl-uni/utils";

export default {
	componentName: "ClPage",

	props: {
		getUserInfo: Boolean,
	},

	data() {
		return {
			loader: {
				loading: false,
				text: "加载中",
			},
		};
	},

	mounted() {
		const { showLoading, hideLoading, showMessage, showToast, showConfirm } = this;

		this.$parent.$app = {
			showLoading,
			hideLoading,
			showMessage,
			showToast,
			showConfirm,
		};
	},

	methods: {
		showLoading(data) {
			if (isString(data)) {
				this.loader.text = data;
			}

			if (isObject(data)) {
				Object.assign(this.loader, data);
			}

			this.loader.loading = true;
		},

		hideLoading() {
			this.loader.loading = false;
		},

		showMessage(options) {
			this.$refs["message"].open(options);
		},

		showToast(options) {
			this.$refs["toast"].open(options);
		},

		showConfirm(options) {
			this.$refs["confirm"].open(options);
		},
	},
};
</script>

<style lang="scss" scoped>
.cl-page {
	height: 100%;
	width: 100%;
}
</style>
