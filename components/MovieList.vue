<template>
	<view class='movieList'>
		<view class="list-title">
			<view class="list-title-left">{{title}}</view>
			<view class="list-title-right" @click="handleToMore">
				查看更多
				<text class='iconfont icon-iconfonxiao71'></text>
			</view>
		</view>

		<scroll-view scroll-x="true">
			<view class="list-list">
				<MovieItem item-from='list' v-for='item in list' :key='item.id' :movie='item.subject?item.subject:item' class='list-item'></MovieItem>
			</view>

		</scroll-view>

	</view>
</template>

<script>
	import MovieItem from './MovieItem.vue'
	export default {
		props: {
			title: {
				type: String,
				default: ()=>{
					return '暂无'
				}
			},
			movieType: {
				type: String,
				default: ()=>{
					return ''
				}
			}
		},
		data() {
			return {
				list: []
			};
		},
		mounted() {
			this.getMoviesList()
		},
		methods: {
			// funTimestamp(delay, callback) {
			// 	if (uni.getStorageSync('timestamp')) {
			// 		const timestamp = uni.getStorageSync('timestamp')
			// 		const timeout = timestamp + delay
			// 		if (timestamp > timeout) {
			// 			uni.setStorageSync('haveStorage', false)
			// 		} else {
			// 			console.log('数据未到过期时间')
			// 			uni.setStorageSync('haveStorage', true)
			// 		}
			// 	} else {
			// 		uni.setStorageSync('haveStorage', false)
			// 		const timestamp = Date.parse(new Date())
			// 		uni.setStorageSync('timestamp', timestamp)
			// 	}
			// 	callback()
			// },

			// getMoviesList() {
			// 	if (uni.getStorageSync(this.movieType) && uni.getStorageSync('haveStorage')) {
			// 		this.list = uni.getStorageSync(this.movieType)
			// 		console.log('从缓存加载')
			// 	} else {
			// 		this.$_request({
			// 			url: this.movieType,
			// 			method: 'GET',
			// 		}).then(res => {
			// 			console.log(this.movieType, res)
			// 			this.list = res.subjects
			// 			uni.setStorageSync(this.movieType, res.subjects)
			// 		})
			// 		console.log('从网络加载')
			// 	}
			// 	uni.setStorageSync('haveStorage', true)
			// },
			getMoviesList() {
				if (uni.getStorageSync(this.movieType) && uni.getStorageSync('timestamp')) {
					this.list = uni.getStorageSync(this.movieType)
					console.log('从缓存加载')
				} else {
					this.$_request({
						url: this.movieType,
						method: 'GET',
					}).then(res => {
						console.log(this.movieType, res)
						this.list = res.subjects
						uni.setStorageSync(this.movieType, res.subjects)
						const timestamp = Date.parse(new Date())
						uni.setStorageSync('timestamp', timestamp)
					})
					console.log('从网络加载')
				}
			},
			handleToMore(){
				uni.navigateTo({
					url:`/pages/More/More?movieType=${this.movieType}`
				})
			}
		},
		components: {
			MovieItem
		}
	}
</script>

<style scoped lang="scss">
	.movieList {
		padding: 0 31rpx 30rpx;
	}

	.list-title {
		padding: 37rpx 0 40rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		line-height: 28rpx;

		.icon-iconfonxiao71 {
			font-size: 20rpx;
			padding-left: 14rpx;
		}
	}

	.list-title-left {
		font-weight: 700;
		color: #494949;
	}

	.list-title-right {
		color: $uni-color-primary;
		display: flex;
		align-items: center;
	}

	.list-list {
		display: flex;
	}
	.list-item {
		margin-right: 30rpx;
	}
</style>
