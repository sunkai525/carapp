const _obj = {
	isEmpty(val) { // 判空
		if (!val || val == 0) {
			return true;
		}
		return false;
	},
	randomNum(min,max){//随机数
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	checkPhone(phone) { //验证手机号
		if (!(/^1[3589]\d{9}$/.test(phone))) {
			return false;
		}
		return true;
	},
	getElementPosition(elname) { //获取元素位置
		return document.querySelector(elname).getBoundingClientRect();
	},
	setPageNavTab() { //这只页面上下导航
		let ele = {};
		let nav = document.querySelector(".navigation");
		let tabbar = document.querySelector(".tabBar");
		if (nav) {
			ele.n = nav.clientHeight;
			document.querySelector("#app").style.paddingTop = nav.clientHeight + "px";
		}
		if (tabbar) {
			ele.t = tabbar.clientHeight;
			document.querySelector("#app").style.paddingBottom = tabbar.clientHeight + "px";
		}
		return ele;
	},
	fatchHttp(url) {
		let options = {
			method: "GET",
			headers: {
				"Content-Type" : "application/json;charset=utf-8"
			},
			mode: "cors"
		};
		// body: 'foo=bar&lorem=ipsum',
		return async function(){
			let response = await fetch(config.http, options);
			return await response.json();
		}
	}
}




export default _obj;