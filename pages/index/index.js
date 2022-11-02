import _utils from "../../static/js/utils.js?v=123456";
import {
	createApp
} from "../../static/js/vue.esm-browser-v3.2.41.js";


let time; //防抖定时器
let navtabTop = _utils.setPageNavTab().t;
let videoulTop = _utils.getElementPosition(".video-col-ul").top;
let seeHeight = document.body.clientHeight - navtabTop - videoulTop;
document.querySelector(".video-col-ul").style.height = seeHeight + "px";

createApp({
	data() {
		return {
			config : config,
			city:'定位中...',
			videostatus: false,
			iconElement: {
				play: '<i class="bi bi-play-fill"></i>',
				pause: '<i class="bi bi-pause-fill"></i>'
			},
			videoElement: null
		}
	},
	mounted() {
		this.scrollul();
		this.loadAddress();
	},
	methods: {
		scrollul(e) { //视频父元素滚动事件
			let that = this;
			clearTimeout(time);
			time = setTimeout(() => {
				let lis = document.querySelectorAll(".video-col-ul li");
				for (let i = 0, len = lis.length; i < len; i++) {
					let _t = lis[i].getBoundingClientRect().top;
					let _h = lis[i].getBoundingClientRect().height;
					if (_t > (videoulTop - _h / 2) && _t < seeHeight) {
						let elem = lis[i].querySelector("video");
						if (elem == that.videoElement) break;
						if (that.videoElement) {
							that.videoElement.pause();
							that.videostatus = false;
							that.videoElement.parentNode.querySelector(".old-controls").innerHTML = that.iconElement.play;
						}
						elem.play();
						elem.parentNode.querySelector(".old-controls").innerHTML = that.iconElement.pause;
						that.videostatus = true;
						that.videoElement = elem;
						break;
					}
				}
			}, 100)
		},
		videoAction() { //视频播放暂停
			if (this.videostatus) {
				this.videostatus = false;
				this.videoElement.pause();
				let parentNode = this.videoElement.parentNode;
				parentNode.querySelector(".old-controls").innerHTML = this.iconElement.play;
				parentNode.querySelector(".play-icon").innerHTML = this.iconElement.play;
				return;
			}
			this.videostatus = true;
			this.videoElement.play();
			let parentNode = this.videoElement.parentNode;
			parentNode.querySelector(".old-controls").innerHTML = this.iconElement.pause;
			parentNode.querySelector(".play-icon").innerHTML = "";
		},
		fullScreen() { //全屏播放
			this.videoElement.parentNode.classList.add("fullScreen");
		},
		recoverSmall() { //取消全屏
			this.videoElement.parentNode.classList.remove("fullScreen");
		},
		showAll(e) { //展开文字
			if (Array.from(e.currentTarget.classList).includes("showAll")) {
				e.currentTarget.classList.remove("showAll");
				e.currentTarget.classList.add("hideAll");
			} else {
				e.currentTarget.classList.remove("hideAll");
				e.currentTarget.classList.add("showAll");
			}
		},
		loadAddress() { //地区定位
			let that = this;
			let response = _utils.fatchHttp();
			response().then((data) => {
				that.city = data.city;
			});
		},
		switchPages(v){//切换页面
			reloadWindow(v);
		}
	}
}).mount('#app')