//系统一些自带的 请求
//划分为 不需要登录验证的请求
import tool from '../util/tool';
import base from './base';

const User= {}
//var url = window.url;
var url='http://127.0.0.1:8080/';


/**
 * 获取用户信息
 */
const getUserInfo={};
getUserInfo.title='获取用户信息';
getUserInfo.url=url+'TrioMvc/user/getUserInfo'
getUserInfo.Post=function(data,view){
	let _this = this;
	base.request_init(data);
	base.request_log(data,_this.url,_this.title);
	return tool.post(_this.url,data,view, _this.callback);
}
getUserInfo.callback=function(res, view) {
	let _this = this;
	base.response_log(res,_this.title);
	base.response_init(res);
	view.userInfoCallback(res);
}
User.getUserInfo=getUserInfo;


/**
 * 修改用户信息
 */
const alterUserInfo={};
alterUserInfo.title='获取用户信息';
alterUserInfo.url=url+'TrioMvc/user/alterUserInfo'
alterUserInfo.Post=function(data,view){
	let _this = this;
	base.request_init(data);
	base.request_log(data,_this.url,_this.title);
	return tool.post(_this.url, data, view, _this.callback);
}
alterUserInfo.callback=function(res, view) {
	let _this = this;
	base.response_log(res,_this.title);
	base.response_init(res);
	view.callback(res);
}
User.alterUserInfo=alterUserInfo;


export default User;