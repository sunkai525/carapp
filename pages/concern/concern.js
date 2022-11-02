import _utils from "../../static/js/utils.js";
import {
	createApp
} from "../../static/js/vue.esm-browser-v3.2.41.js";

_utils.setPageNavTab();

createApp({
	data() {
		return {
			title : "关注"
		}
	},
	mounted() {

	},
	methods: {
		switchPages(v){//切换页面
			reloadWindow(v);
		}
	}
}).mount('#app')