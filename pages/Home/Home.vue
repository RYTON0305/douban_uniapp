<template>
	<view>
		<view class="searchbar" @click="handleToSearch">
			<view class="search-input">
				<text class="iconfont icon-iconset0157"></text>
				搜索
			</view>
		</view>
		<MovieList v-for='(item,key,index) in itemList' :key='key' :title='key' :movie-type='item'></MovieList>
	</view>
</template>

<script>
	import MovieList from '../../components/MovieList.vue'
	// import {
	// 	getInTheaters
	// } from '../../service/inTheaters.js'
	export default {
		data() {
			return {
				itemList: {
					'影院热映': '/in_theaters',
					'即将上映': '/coming_soon',
					'Top250': '/top250',
					'口碑榜': '/weekly',
					'北美票房榜': '/us_box',
					'新片榜': '/new_movies'
				},
				// /new_movies
				// /top250
				// /weekly
				// /us_box
				// /in_theaters
				// /coming_soon
			}
		},
		components: {
			MovieList
		},
		methods: {
			funTimestamp(delay) {
				const now = Date.parse(new Date())
				if (uni.getStorageSync('timestamp')) {
					const timestamp = uni.getStorageSync('timestamp')
					const timeout = timestamp + delay
					if (now > timeout) {
						uni.removeStorageSync('timestamp')
					} else {
						console.log('数据未到过期时间')
					}
				} else {
					const timestamp = Date.parse(new Date())
					uni.setStorageSync('timestamp', timestamp)
				}
			},
			handleToSearch() {
				uni.navigateTo({
					url: '../Search/Search'
				})
			}
		},
		mounted() {
			this.funTimestamp(1000 * 60 * 60)
		}
	}
</script>

<style scoped lang="scss">
	.searchbar {
		padding: 16rpx;
		background-color: $uni-color-primary;
	}

	.search-input {
		padding: 16rpx 0;
		background-color: #fff;
		text-align: center;
		border-radius: 10rpx;
		font-size: 24rpx;
		color: #acacac;

		.icon-iconset0157 {
			color: #acacac;
			font-size: 24rpx;
			margin-right: 12rpx;
		}
	}
</style>
