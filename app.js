var _div = document.createElement("div");
_div.setAttribute("id", "app");
var _style = document.createElement("style");
var _script = document.createElement("script");
_script.setAttribute("type", "module");


const config = {
	http : `${location.origin}/php/Http.php`,
	images : `${location.origin}/static/images`,
	video : `${location.origin}/static/video`
}

//https://webapi.amap.com/loader.js
const pages = {
	"login" : "./pages/login/",
	"index" : "./pages/index/",
	"address" : "./pages/address/",
	"search" : "./pages/search/",
	"concern" : "./pages/concern/",
	"Inquiry" : "./pages/Inquiry/",
	"user" : "./pages/user/",
	"message" : "./pages/message/"
}


const pageList = {
	get(){
		let arr = this.handle();
		return arr.length > 0 ? arr[arr.length - 1] : false;
	},
	go(value){
		let arr = this.handle();
		arr.push(value);
		localStorage.setItem("pages",arr.join(","));
	},
	back(){
		let arr = this.handle();
		arr.pop();
		localStorage.setItem("pages",arr.join(","));
	},
	handle(){
		let _val = localStorage.getItem("pages");
		return _val ? _val.split(",") : [];
	}
}




//加载动画
function loadAnimation() { 
	let _load = document.createElement("div");
	_load.setAttribute("class", "dot-bouncing dot-window");
	document.body.append(_load);
}
//关闭加载动画
function closeAnimation() { 
	document.querySelector(".dot-bouncing").remove();
}
//随机数
function randomNum(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//切换页面刷新
function reloadWindow(val) {
	val ? pageList.go(val) : pageList.back();
	location.reload(true);
}


window.onload = function () {
	onLoadPage();
}

function onLoadPage() {
	_path = pageList.get() || "index";
	loadAnimation();
	let filePath = pages[_path] + _path;
	let fileArr = [`${filePath}.css`,`${filePath}.html`,`${filePath}.js`];
	fileArr.forEach((v,k) => {
		fetch(v).then(response => response.text()).then(text => {
			if(k == 0){
				_style.innerHTML = text;
				document.body.append(_style);
			}else if(k == 1){
				_div.innerHTML = text;
				document.body.append(_div);
			}else if(k == 2){
				_script.innerHTML = text;
				document.body.append(_script);
				let timer = setInterval(function () {
				    if (document.readyState === 'complete') {
				        window.clearInterval(timer);
				        closeAnimation();
				    }
				}, 500)
			}
		})
	});
}
