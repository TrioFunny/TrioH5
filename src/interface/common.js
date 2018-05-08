//系统一些自带的 请求
//划分为 不需要登录验证的请求
import util from '../util/util';
import tool from '../util/tool';

const Common = {}
Common.url = window.url;

/**
 * 示例
 * 接口实现
 */
const test = function(view) {
	console.log("开始");
	view.post();
}

let operation = {}
operation.url = "123";
operation.post = function(data, view) {
	console.log("测试");
	this.callback();
}
operation.callback = function(res, view) {
	console.log("成功");
}

operation.test = test(operation);
Common.operation = operation;

/**
 * 
 * 登录
 */
const login = {}
login.url = "http://127.0.0.1:8080/TrioMvc/login/login";
login.post = function(data, view) {
	let _this = this;
	console.log(data);
	console.log(_this.url);
	//	return util.post(_this.url,data,view,_this.callback); 
	return util.post(_this.url, data, view, _this.callback);

}
login.callback = function(res, view) {
	//	console.log(res);
	view.loginCallback(res);
}
Common.login = login;

Common.test1 = function() {
	console.log("测试成功！");
}
/**
 * 注册(校验用户名是否重被使用)
 */
const registCheckUserName = {};
registCheckUserName.url = "http://127.0.0.1:8080/TrioMvc/login/checkUserName";
registCheckUserName.post = function(data, view) {
	let _this = this;
	return util.post(_this.url, data, view, _this.callback);
}
registCheckUserName.callback = function(res, view) {
	view.checkUserNameCallback(res);
}
const regist = {};
regist.url = "http://127.0.0.1:8080/TrioMvc/login/regist";
regist.post = function(data, view) {
	let _this = this;
	return util.post(_this.url, data, view, _this.callback);
}
regist.callback = function(res, view) {
	view.registCallback(res);
}
Common.registCheckUserName = registCheckUserName;
Common.regist = regist;

export default Common;