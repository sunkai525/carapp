import _utils from "../../static/js/utils.js?v=123456";
import {
	createApp
} from "../../static/js/vue.esm-browser-v3.2.41.js";

_utils.setPageNavTab();

createApp({
	data() {
		return {
			title : "切换城市",
			letter : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
		}
	},
	mounted() {

	},
	methods: {
		back(){
			reloadWindow();
		},
		scrollCity(v){
			let letter = document.querySelector("#letter" + v);
			window.scrollTo({
				top: letter.offsetTop - letter.clientHeight,
				behavior: "smooth"
			});
		}
	}
}).mount('#app')