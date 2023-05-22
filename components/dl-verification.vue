<template>
	<view class="dt-verification" @tap="initCode">
		<canvas :style="{width: width, height: height}" canvas-id="myCanvas"></canvas>
	</view>
</template>

<script>
	var mix = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'I', 'M', 'N', 'O', 'P', 'Q',
			'R', 'S','T', 'U', 'V', 'W', 'S', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
	var num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
	var context = null
	export default {
		props: {
			width: {
				default: '220rpx'
			}, // 验证码宽度，必须携带单位
			height: {
				default: '80rpx'
			}, // 验证码高度，必须携带单位
			type: {
				default: 'num'
			} ,// 验证码类型,支持数字类型及字母数字混合 type: num || mix
			length: {
				default: 4,
				type: Number
				
			} // 强制校验, this.length 暂仅支持 4  || 6
		},
		mounted() {
			this.$nextTick(() => {
				this.initCode()
			})
		},
		methods: {
			// 初始化canvas对象及获取验证码
			initCode() {
				context = uni.createCanvasContext('myCanvas', this)
				var w = this.removeUnit(this.width)
				var h = this.removeUnit(this.height)
				context.setFillStyle('white')
				context.setLineWidth(5)
				context.fillRect(0,0, w, h)
				var codeStr = '' // 随机生成验证码
				
				var length = this.length >= 6 ? 6 : 4
				var x = length == 6 ? 17 : 27
				var list = this.type === 'num' ? num : mix
				for (let i = 0; i < length; i++) {
					var c = list[this.rn(0, list.length - 1)]
					var deg = this.rn(- 30, 30)
					context.setFontSize(18)
					context.setTextBaseline('top')
					context.setFillStyle(this.rc(150, 80))
					context.save()
					context.translate(x * i + 15, parseInt(h / 1.5))
					context.rotate(deg * Math.PI / 180)
					context.fillText(c, -15+5, -15)
					context.restore()
					codeStr += c
				}
				// 将生成验证码返回
				this.$emit('change',codeStr)
				this.setBgCanvas(w,h)
				// 完成绘画
				context.draw() 
			},
			// 生成 canvas 背景
			setBgCanvas(w, h) {
				for (let i = 0; i < 40; i++) {
					context.beginPath()
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI)
					context.closePath()
					context.setFillStyle(this.rc(200, 150))
					context.fill()
				}
			},
			// 去除px , rpx
			removeUnit(str) {
				var isSwitch = false
				var num =Number(str.replace('rpx', '').replace('px', '').replace('upx', '')) || 0
				if (str.includes('upx') || str.includes('rpx')) {
					isSwitch = true
				}
				if (isSwitch) num = uni.upx2px(num)
				return num
			},
			rc(max, min) {
				return `rgb(${this.rn(max, min)}, ${this.rn(max, min)}, ${this.rn(max, min)})`
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min
			}
		}
	}
</script>

<style lang='scss' scoped>
	.pages {
		
	}
</style>
