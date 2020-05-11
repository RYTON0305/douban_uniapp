<template>
	<view>
		<view class="mine-login">
			<view class="mine-login-btn" @click="handleToLogin">
				登录
			</view>
		</view>

		<view class="mine-profile">
			<view class="mine-profile-title" @click="handleToLogin">
				<view class="left">我的书影音</view>
				<view class="right" @click="handleToLogin">登录查看<text class='iconfont icon-iconfonxiao71'></text></view>
			</view>

			<view class="mine-profile-item" v-for="(item,key,index) in profileList" :key='index' @click="handleToLogin">
				<view class="item-title">{{key}}分析</view>
				<view class="item-box">
					<view class="item-icon">
						<text :class="['iconfont','icon'+(index+1),item.iconClass]"></text>
					</view>
					<view class="item-analysis">
						<view class="left">
							<text class="count">0</text> 看过
						</view>
						<view class="mid">
							<view>标记10{{item.quantifier+item.name}}</view>
							<view>开启{{key}}分析</view>
						</view>
						<view class="right">
							<view class="btn">立即开启</view>
							<text class='iconfont icon-iconfonxiao71'></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="version">
			版本1.0.46
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profileList: {
					'观影': {
						name: '影片',
						quantifier: '部',
						iconClass: 'icon-guanyingjilu'
					},
					'读书': {
						name: '读书',
						quantifier: '本',
						iconClass: 'icon-dushu'
					},
					'音乐': {
						name: '唱片',
						quantifier: '张',
						iconClass: 'icon-yinle'
					},
				}
			};
		},
		methods: {
			handleToLogin() {
				uni.navigateTo({
					url: '../Login/Login'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine-login {
		width: 750rpx;
		height: 420rpx;
		background-image: $uni-login-banner;
		background-size: contain;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mine-login-btn {
		width: 340rpx;
		height: 90rpx;
		border-radius: 40rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
	}

	.mine-profile>.mine-profile-item:last-of-type .item-analysis {
		border: 0;
	}

	.mine-profile-title {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;

		.left {
			font-size: 32rpx;
			font-weight: 700;
		}

		.right {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #8e8e8e;

			.iconfont {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #8e8e8e;
			}
		}
	}

	.item-title {
		font-size: 24rpx;
		margin-left: 118rpx;
		padding: 16rpx 0;
	}

	.item-box {
		display: flex;

	}

	.item-icon {
		width: 116rpx;
		text-align: center;
		position: relative;

		.iconfont {
			position: absolute;
			font-size: 40rpx;
			bottom: 30rpx;
			left: 40rpx;
		}

		.icon1 {
			color: #A7CEF6
		}

		.icon2 {
			color: #A2DFAC
		}

		.icon3 {
			color: #FFBE9F
		}
	}

	.item-analysis {
		display: flex;
		justify-content: space-between;
		margin-right: 30rpx;
		flex: 1;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
		align-items: flex-end;

		.left {
			color: #818181;
			font-size: 24rpx;
			// font-weight: 700;

			.count {
				font-size: 34rpx;
				margin-right: 10rpx;
			}
		}

		.mid {
			color: #c0c0c0;
			font-size: 24rpx;
			margin-left: 90rpx;
		}

		.right {
			float: right;
			display: flex;
			align-items: center;

			.btn {
				width: 132rpx;
				height: 46rpx;
				font-size: 24rpx;
				border-radius: 5rpx;
				padding: 12rpx 16rpx;
				background-color: #f5f5f5;
				text-align: center;
				line-height: 48rpx;
				font-weight: 700;
			}

			.iconfont {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #8e8e8e;
			}
		}
	}

	.version {
		margin-top: 90rpx;
		text-align: center;
		font-size: 22rpx;
		color: #C0C0C0;
	}
</style>
