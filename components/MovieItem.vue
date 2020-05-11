<template>
	<view class="movie-item" v-if="movie" :class="{'movie-item-more':itemFrom==='more'}" @click="handleToDetail(movie.id)">
			<!-- <view class="movie-item" v-if="movie" :class="{'movie-item-more':itemFrom==='more'}" :style="{width:itemFrom==='more'?'180rpx':'160rpx'}"> -->
		<image :src="movie.images.large" class="movie-img"></image>
		<view class="movie-title" :class="itemFrom==='more'?'movie-title-more':'movie-title-list'">{{ movie.title }}</view>
		<view class="movie-rating">
			<uni-rate :value="movie.rating.average / 2" max="5" v-if="movie.rating.average"></uni-rate>
			<view class="movie-score">{{
        movie.rating.average ? movie.rating.average.toFixed(1) : '暂无评分'
      }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			movie: {
				type: Object,
				default: null,
			},
			itemFrom: {
				type: String,
				validator(value) {
					return ['more', 'list'].indexOf(value) !== -1
				},
			},
		},
		data() {
			return {}
		},
		methods:{
			handleToDetail(id){
			uni.navigateTo({
			    url: `/pages/Detail/Detail?id=${id}`
			});
			console.log(id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.movie-item {
		width: 160rpx;
		&.movie-item-more {
			// width: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.movie-img {
		width: 160rpx;
		height: 224rpx;
		border-radius: 8rpx;
	}

	.movie-title {
		font-weight: 700;
		font-size: 24rpx;
		padding: 20rpx 0 20rpx;
		white-space: nowrap;

		&.movie-title-more {
			max-width: 200rpx;
			text-align: center;
			font-size: 20rpx;
			font-weight: normal;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		&.movie-title-list {
			text-align: left;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.movie-rating {
		height: 25rpx;
		font-size: 17rpx;
		color: #818181;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/deep/.uni-rate__icon-on {
			top: -9rpx !important;
			// bottom:-50%!important
		}

		/deep/.uni-icons {
			font-size: 20rpx !important;
		}

		.uni-rate {
			width: 112rpx;
			display: flex;
			justify-content: space-around;
		}

		.movie-score {
			font-weight: 700;
			font-size: 16rpx;
			margin-right: 4rpx;
			text-align: center;
			width: 100%;
		}
	}
</style>
