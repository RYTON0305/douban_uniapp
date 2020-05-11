<template>
	<view class="more-container">
		<MovieItem item-from='more' v-for='item in list' :key='item.id' :movie='item.subject?item.subject:item' class='movie-item'></MovieItem>
	</view>
</template>

<script>
	import MovieItem from '../../components/MovieItem.vue'
	export default {
		data() {
			return {
				list: [],
				options: {},
				count: 20
			};
		},
		onLoad(options) {
			this.options = options
			this.getMoviesList(options.movieType)
			setTimeout(()=>{
				uni.hideLoading()
			},500)
		},
		onReachBottom() {
			console.log('到底了')
			if(!this.loaded){
				this.getMoreMovie(this.options.movieType, this.count + 10)
			} else {
				uni.showToast({
					title:'没有更多了',
					icon:'none'
				})
			}
			
		},
		methods: {
			getMoviesList(movieType,count) {
				uni.showLoading({
					title: '加载中'
				})
				if (uni.getStorageSync(movieType) && uni.getStorageSync('timestamp')) {
					this.list = uni.getStorageSync(movieType)
					console.log('从缓存加载')
				} else {
					this.$_request({
						url: this.movieType,
						method: 'GET',
						data: {
							count: count
						}
					}).then(res => {
						console.log(movieType, res)
						this.list = res.subjects
						setTimeout(()=>{
							uni.hideLoading()
						},1000)
						// uni.setStorageSync(this.movieType, res.subjects)
					})
					console.log('从网络加载')
				}
			},
			getMoreMovie(movieType, count = 20) {
				uni.showLoading({
					title: '加载中'
				})
				this.$_request({
					url: movieType,
					method: 'GET',
					data: {
						count: count
					}
				}).then(res => {
					console.log(movieType, res)
					this.list = res.subjects
					this.count = count
					setTimeout(()=>{
						uni.hideLoading()
					},1000)
					console.log(res.subjects === this.list)
					if(res.subjects === this.list) {
						this.loaded = true
						uni.showToast({
							title:'没有更多了',
							icon:'none'
						})
					}
					// uni.setStorageSync(this.movieType, res.subjects)
				})
			}
		},
		components: {
			MovieItem
		}
	}
</script>

<style lang="scss">
	.more-container {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		position: relative;

		// padding:20rpx 0rpx
		&::after {
			content: '';
			flex: auto;
		}
	}

	/deep/.movie-item {
		margin: 20rpx 0rpx 24rpx;
		// &:last-child {
		// 	margin-right: auto;
		// }
		width: 250rpx !important
	}

</style>
