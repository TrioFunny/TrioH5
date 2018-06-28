//系统一些自带的 请求
//划分为 不需要登录验证的请求
import tool from '../util/tool';
import base from './base';

const User = {}


/**
 * 获取用户信息
 */
const getUserInfo = {};
getUserInfo.title = '获取用户信息';
getUserInfo.url = window.url + 'user/getUserInfo'
getUserInfo.Post = function (data, view) {
  let _this = this;
  return tool.post(_this.url, data, view, _this.callback);
}
getUserInfo.callback = function (res, view) {
  view.userInfoCallback(res);
}
User.getUserInfo = getUserInfo;


/**
 * 修改用户信息
 */
const alterUserInfo = {};
alterUserInfo.title = '获取用户信息';
alterUserInfo.url = window.url + 'user/alterUserInfo'
alterUserInfo.Post = function (data, view) {
  let _this = this;
  return tool.post(_this.url, data, view, _this.callback);
}
alterUserInfo.callback = function (res, view) {
  view.callback(res);
}
User.alterUserInfo = alterUserInfo;


export default User;
