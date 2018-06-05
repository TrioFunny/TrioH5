import util from '../util/util';
import tool from '../util/tool';

const Base = {};


/**
 * 示例
 * 接口实现
 */
const Post = function(view) {
	//打印日志
	//登录验证
	//加载等待图标防止多次点击
	console.log("预先操作");
	view.realPost();
}

const Callback = function(view) {
	//打印日志
	//加载等待图标取消
	console.log("开始完毕");
	view.realCallback();
}

let operation = {}
operation.url = "123";
operation.realPost = function(data, view) {
	console.log("开始操作");
	let _this=this;
	return util.post(_this.url, data, view, _this.callback);
}
operation.realCallback = function(res, view) {
	console.log("结束");
}
operation.post = Post(operation);
operation.callback = Callback(operation);

Base.operation = operation;

