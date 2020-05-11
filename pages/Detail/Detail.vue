<template>
	<view class="detail-container">
		<template v-if="!isLoading">
			<view class="detail-box">
				<image class="detail-box-img" v-if="movie.images.large" :src="movie.images.large" mode=""></image>
				<view class="box-right">
					<view class="detail-box-title">
						<view class="title-c">{{movie.title}}({{movie.year}})</view>
						<view class="title-e">{{movie.original_title}}({{movie.year}})</view>
					</view>
					<view class="detail-genres">{{movie.genres.join(' ')}} / {{movie.countries.join(' ')}} / 片长{{movie.durations[0]}}</view>
					<view class="detail-btns">
						<view class="btn">
							<text class="iconfont icon-xiangkan"></text>
							想看
						</view>
						<view class="btn">
							<text class="iconfont icon-xingxing"></text>
							看过
						</view>
					</view>
				</view>
			
			</view>
			
			<view class="detail-score-box">
				<view class="score-title">
					<view class="left">豆瓣评分™</view>
					<view class="right">
						<text class="iconfont icon-iconfonxiao71"></text>
					</view>
				</view>
				<view class="scroe-main">
					<view class="score-num-box">
						<view class="num">{{movie.rating.average}}</view>
						<view class="score-rate">
							<uni-rate size="20" :value="movie.rating.average/2" max="5"></uni-rate>
						</view>
					</view>
			
					<view class="score-progress-box">
						<view>
							<view class="score-stars">
								<view class="star-line" v-for="line in 5" :key='line'>
									<view class="stars">
										<!-- #ifdef H5 -->
										<text v-for="star in 6-line" :key='star' class="iconfont icon-xingxing1"></text>
										<!-- #endif -->
										<!-- #ifdef MP-WEIXIN -->
										<text v-for="star in 5-line" :key='star' class="iconfont icon-xingxing1"></text>
										<!-- #endif -->
									</view>
									<view class="progress-bar">
										<progress border-radius='5' backgroundColor="#F5F5F5" activeColor="#FFAC2D" stroke-width='12' :percent="movie.rating.details[6-line]/movie.ratings_count*100" />
									</view>
			
								</view>
							</view>
						</view>
						<view class="score-count">{{movie.ratings_count}}人评分</view>
					</view>
				</view>
			</view>
			
			<view class="detail-intro">
				<view class="detail-title">简介</view>
				<view :class="['intro-main',isFold?'fold':'']">{{movie.summary}}</view>
				<view class="intro-toggle" @click="toggleFold">{{isFold?'展开':'收起'}}</view>
			</view>
			
			<view class="detail-cast">
				<view class="detail-title">影人</view>
				<scroll-view scroll-x="true">
					<view class="cast-box">
						<view class="cast-actor" v-for='dir in movie.directors' :key='dir.id'>
							<image class="cast-image" :src="dir.avatars.large" mode=""></image>
							<view class="cast-name">{{dir.name}}</view>
							<view class="cast-as">导演</view>
						</view>
						<view class="cast-actor" v-for="actor in movie.casts" :key='actor.id'>
							<image class="cast-image" :src="actor.avatars.large" mode=""></image>
							<view class="cast-name">{{actor.name}}</view>
							<view class="cast-as">演员</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="detail-photo">
				<view class="detail-title">剧照</view>
				<scroll-view scroll-x="true" >
					<view class="photo-box">
						<view v-for="img in movie.photos">
							<image class="photo-image" :src="img.image" mode="heightFix"></image>
						</view>
					</view>
				</scroll-view>
					
			</view>
		</template>
		
	</view>
</template>

<script>
	import MovieItem from '../../components/MovieItem.vue'
	import movie from '../../test.json'
	export default {
		data() {
			return {
				movie: {},
				isFold: true,
				isLoading: true
			};
		},
		onLoad(options) {
			
				uni.showLoading({
					title:'加载中'
				})
		
			this.$_request({
				url:`/subject/${options.id}`
			}).then(res=>{
				console.log(res)
				this.movie = res
				this.isLoading = false
			
					uni.hideLoading()
				
			})
	
		},
		mounted() {

		},
		methods: {
			toggleFold() {
				this.isFold = !this.isFold
			}
		},
		components: {
			MovieItem
		}
	}
</script>

<style lang="scss">
	.detail-container {
		background-color: #F9F7F4;
		padding: 40rpx 30rpx;
	}

	.detail-box {
		&::after {
			content: '';
			height: 0;
			clear: both;
			display: block;
			visibility: hidden;
		}

		.detail-box-img {
			float: left;
			width: 200rpx;
			height: 280rpx;
			border-radius: 8rpx;
			margin-right: 32rpx;
		}
	}

	.detail-box-title {
		margin-bottom: 30rpx;
		font-size: 45rpx;

		.title-c {
			font-weight: 700;
		}

		.title-e {
			color: #818181;
			font-size: 28rpx;
		}
	}

	.box-right {
		display: flex;
		flex-direction: column;
	}

	.detail-genres {
		font-size: 20rpx;
		color: #818181;
		margin-bottom: 45rpx;
	}

	.detail-btns {
		display: flex;
		justify-content: space-around;

		.btn {
			width: 210rpx;
			height: 74rpx;
			border-bottom: #E1DFDC 1rpx solid;
			border-radius: 8rpx;
			background-color: #fff;
			color: #4C4C4C;
			font-size: 30rpx;
			font-weight: 700;
			text-align: center;
			line-height: 74rpx;

			.iconfont {
				font-size: 30rpx;
				color: #FFAC2D;
				margin-right: 10rpx;
			}
		}
	}

	.detail-score-box {
		margin: 50rpx 0;
		border-radius: 14rpx;
		background-color: #fff;
	}

	.score-title {
		font-size: 22rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 25rpx;

		.left {
			font-weight: 700;
		}

		.right {
			color: #818181
		}
	}

	.scroe-main {
		padding: 20rpx 0 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.score-num-box {
		font-size: 45rpx;
		font-weight: 700;
		text-align: center;
		margin-right: 22rpx;

		.score-rate {
			height: 20rpx;
			// overflow: hidden;
		}

		.num {
			margin-bottom: 20rpx;
			overflow: hidden;
		}
	}

	.score-progress-box {}

	.star-line {

		display: flex;
		align-items: center;
		margin-bottom: 10rpx;

		.stars {
			width: 75rpx;
			line-height: 15rpx;
			height: 15rpx;
			// overflow: hidden;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			// height: 15rpx;
			margin-right: 10rpx;

			.icon-xingxing1 {
				font-size: 15rpx;
			}
		}

		.progress-bar {
			width: 200rpx;
			height: 15rpx;
			overflow: hidden;
		}
	}

	.score-count {
		font-size: 16rpx;
		text-align: right;
		color: #C0C0C0;
	}

	.detail-intro {
		margin: 50rpx 0;

		&::after {
			content: '';
			display: block;
			height: 0;
			visibility: hidden;
			clear: both;
		}
	}

	.detail-title {
		font-size: 32rpx;
		color: #191919;
		font-weight: 700;
		margin: 26rpx 0;
	}

	.intro-main {
		font-size: 28rpx;
		color: #191919;
		line-height: 48rpx;


	}

	.fold {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}

	.intro-toggle {
		float: right;
		font-size: 28rpx;
		color: #C0C0C0;
	}

	.detail-cast {
		margin-bottom: 60rpx;
	}

	.cast-box {
		display: flex;
	}

	.cast-actor {
		width: 160rpx;
		margin-right: 30rpx;
	}

	.cast-image {
		width: 160rpx;
		height: 225rpx;
		border-radius: 7rpx;
	}

	.cast-name {
		font-size: 25rpx;
		color: #191919;
		margin: 20rpx 0;
		width: 140rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cast-as {
		font-size: 20rpx;
		color: #818181;
	}
	.photo-box {
		display: flex;
	}
	.photo-image {
		height: 320rpx;
		width: 440rpx;
		margin-right: 5rpx;
	}
</style>
