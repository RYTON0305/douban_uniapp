import Vue from 'vue'
import App from './App'
import {_request} from 'service/_request.js'
Vue.prototype.$_request=_request
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
