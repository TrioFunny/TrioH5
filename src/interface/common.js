//系统一些自带的 请求
//划分为 不需要登录验证的请求
import tool from '@/util/tool';
import base from './base';
import config from '@/util/config';

const Common = {}

//服务器路径
Common.url = config.serverUrl;

//登录
const login = {}
login.url = Common.url + "/login/login";
login.post = function(data, view, ) {
	let _this = this;
	console.log(data);
	console.log(_this.url);
	return tool.post(_this.url, data, view, _this.callback);
}
login.callback = function(res, view) {
	view.loginCallback(res);
}
Common.login = login;

/**
 * 注册(校验用户名是否重被使用)
 */
const registCheckUserName = {};
registCheckUserName.url = Common.url + "/login/checkUserName";
registCheckUserName.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
registCheckUserName.callback = function(res, view) {
	view.checkUserNameCallback(res);
}
const regist = {};
regist.url = Common.url + "/login/regist";
regist.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
regist.callback = function(res, view) {
	view.registCallback(res);
}
Common.registCheckUserName = registCheckUserName;
Common.regist = regist;

//修改密码
const changePassword = {};
changePassword.url = Common.url + "/login/changePassword";
changePassword.post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback);
}
changePassword.callback = function(res, view) {
	view.changePasswordCallback(res);
}
Common.changePassword = changePassword;

//增加好友分组
const friendGroup = {};
friendGroup.url = Common.url + "/chat/createGroup";
friendGroup.Post = function(data, view) {
	let _this = this;
	return tool.post(_this.url, data, view, _this.callback)
}
friendGroup.callback = function(res, view) {
	view.createGroupCallback(res);
}
Common.friendGroup = friendGroup;

export default Common;