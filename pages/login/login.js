import _utils from "../../static/js/utils.js";
import {
	createApp
} from "../../static/js/vue.esm-browser-v3.2.41.js";

let time;//防抖定时器
createApp({
	data() {
		return {
			tel: null,
			login: false
		}
	},
	methods: {
		telinput(t) {//输入手机号
			let that = this;
			clearTimeout(time);
			time = setTimeout(() => {
				that.login = _utils.checkPhone(that.tel);
			},200)
		}
	},
	mounted() {}
}).mount('#app')