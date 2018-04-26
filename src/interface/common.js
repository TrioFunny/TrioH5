//系统一些自带的 请求
//划分为 不需要登录验证的请求
import util from '../util/util';

const Common={}
Common.url = window.url;


/**
 * 示例
 * 接口实现
 */
const test=function(view){
	console.log("开始");
	view.post();
}

let operation={}
operation.url="123";
operation.post=function(data,view){
	console.log("测试");
	this.callback();
}
operation.callback=function(res,view){
	console.log("成功");
}
operation.test=test(operation);
Common.operation=operation;





export default Common;
