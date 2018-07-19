//系统一些自带的 请求
//划分为 不需要登录验证的请求
import tool from '../util/tool';
import base from './base';
import config from '@/util/config';

const User = {}

//服务器路径
User.url =config.serverUrl;

//请求失败
let error=function(view,title){
	base.error(view,title);
}

/**
 * 获取用户信息
 */
const getUserInfo = {};
getUserInfo.title = '获取用户信息';
getUserInfo.url = User.url + '/user/getUserInfo'
getUserInfo.post = function (data, view) {
  let _this = this;
  base.ready(this.url,data,view,this.title)
  return tool.post(_this.url, data, view, _this.success,error,_this.title);
}
getUserInfo.success = function (res, view) {
	base.success(res, view,getUserInfo.title)
 	view.userInfoCallback(res);
}

User.getUserInfo = getUserInfo;


/**
 * 修改用户信息
 */
const alterUserInfo = {};
alterUserInfo.title = '获取用户信息';
alterUserInfo.url = User.url + '/user/alterUserInfo'
alterUserInfo.Post = function (data, view) {
  let _this = this;
  return tool.post(_this.url, data, view, error(view,_this.title));
}
alterUserInfo.success = function (res, view) {
	base.success(res, view,alterUserInfo.title)
  	view.callback(res);
}
User.alterUserInfo = alterUserInfo;



export default User;
