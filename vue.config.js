module.exports = {
	publicPath: "/",
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require("os").cpus().length > 1,
	css: {
		sourceMap: false,
	},
	devServer: {
		port: 9100,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true,
		},
		disableHostCheck: true,
	},
	configureWebpack: () => {
		return {
			optimization: { minimize: true },
		};
	},
};
