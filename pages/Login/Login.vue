<template>
	<view>
		<view class="login-logo-box">
			<image src="../../static/img/douban.png" mode="widthFix"></image>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="login-btn login-btn-wechat"  open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信登录</button>
		<!-- #endif -->
		<view class="login-btn login-btn-douban">已有豆瓣账号登录</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="" @click="wxLogin">微信登录</button>
		<!-- #endif -->
		<view class="login-protocol">
			登录表示同意<text>豆瓣使用协议 / 隐私协议</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			wxGetUserInfo:function(res){
				console.log(res)
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				console.log('-------用户授权，并获取用户基本信息和加密数据------')
				// console.log(res.detail);
			},
			wxLogin: function() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log('-------获取code-------')
						console.log(loginRes.code);
						wx.request({
							url: 'https://xxxxx'+loginRes.code,
							success: function(info) {
								console.log('-------获取sessionKey、openid(unionid)-------')
								console.log(info);
							},
							fail: function(e) {
								console.log(e)
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.login-logo-box {
	padding: 100rpx 0 90rpx;
	text-align: center;
	image {
		width: 177rpx;
	}
}
.login-btn {
	margin: 0 40rpx 30rpx;
	font-size: 32rpx;
	text-align: center;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 8rpx;
}
.login-btn-wechat {
	background-color: #42BD56;
	color: #fff;

}
.login-btn-douban {
	background-color: #fff;
	color:#42BD56;
	border: solid 1rpx #42BD56;
}
.login-protocol {
	position: absolute;
	bottom: 90rpx;
	font-size: 24rpx;
	text-align: center;
	width: 750rpx;
	color: #A0A0A0;
	text {
		margin-left: 20rpx;
		color: #42BD56;
	}
}
</style>
