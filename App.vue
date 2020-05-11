<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	};
</script>

<style lang="scss">
	@import "./static/iconfont.css";

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */

	.movie-rating {
		.uni-rate__icon-on {
			top: -9rpx !important;
		}

		.uni-icons {
			font-size: 20rpx !important;
		}
		.uni-rate {
			width: 112rpx;
			display: flex;
			justify-content: space-around;
		}
		
	}
</style>
