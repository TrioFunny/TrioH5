//系统一些自带的 请求
//划分为 不需要登录验证的请求
import tool from '@/util/tool';

const Common = {}
Common.url = window.url;

/**
 * 
 * 登录
 */
const login = {}
login.url = window.url + "/login/login";
login.post = function(data, view,) {
	let _this = this;
	console.log(data);
	console.log(_this.url);
	return tool.post(_this.url, data, view, _this.callback);
}
login.callback = function(res, view) {
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
registCheckUserName.url = window.url + "/login/checkUserName";
registCheckUserName.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
registCheckUserName.callback = function(res, view) {
	view.checkUserNameCallback(res);
}
const regist = {};
regist.url = window.url + "/login/regist";
regist.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
regist.callback = function(res, view) {
	view.registCallback(res);
}
Common.registCheckUserName = registCheckUserName;
Common.regist = regist;

/**
 * 修改密码
 */
const changePassword = {};
changePassword.url = window.url + "/login/changePassword";
changePassword.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
changePassword.callback = function(res, view) {
	view.changePasswordCallback(res);
}
Common.changePassword = changePassword;


export default Common;