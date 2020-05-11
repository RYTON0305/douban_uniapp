export const BASE_URL = 'https://douban.uieee.com/v2/movie'
export const _request = options => (
	new Promise((resolve, reject) => {
		uni.request({
			// #ifdef MP-WEIXIN
			url: BASE_URL + options.url,
			// #endif
			// #ifdef H5
			url: '/api' + options.url,
			// #endif
			method: options.method || 'GET',
			data: options.data || {},
			// dataType: 'json',
			// header: {
			// 	"Content-Type": "json"
			// },
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
		}).then(data => {
			let [error, res] = data
			if (res.statusCode && res.statusCode === 200) {
				resolve(res.data)
			} else {
				reject(error)
			}
		}).catch(error => {
			console.log(error)
		})
	})
)
// /new_movies
// /top250
// /weekly
// /us_box
// /in_theaters
// /coming_soon
