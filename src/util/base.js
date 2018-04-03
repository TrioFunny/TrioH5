
const Base={};
/**
 * 基础接口
 */
const baseInterface={}
//输入参数
baseInterface.param={};
//post方法
baseInterface.post=function(){};
//get方法
baseInterface.get=function(){};
//回调函数
baseInterface.callback=function(){};

Base.baseInterface=baseInterface;


////////////////////操作Cookie的方法////////////////////

/**
 * 储存Cookie的方法			名称(可读)<默认值>
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>
 * @param {Object} path		存储路径(不可读)<当前路径>
 * @param {Object} domain	储存域(不可读)<当前域>
 * @param {Object} secure	安全性(不可读)<false>
 */
Base.setCookie= function(name,value,hours,path,domain,secure){
	var cdata = name + "=" + value;
	if(hours){
		var d = new Date();
		d.setHours(d.getHours() + hours);
        cdata += "; expires=" + d.toGMTString();
    }
    cdata +=path ? ("; path=" + path) : "" ;
    cdata +=domain ? ("; domain=" + domain) : "" ;
    cdata +=secure ? ("; secure=" + secure) : "" ;
    document.cookie = cdata;
    console.log("储存cookies");
};

/**
 * 获取 Cookie的方法
 * @param {Object} name 对应cookie的 key
 */
Base.getCookie=function(name){
    var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/"); 
    return reg.test(document.cookie) ? RegExp.$1 : "";
};

/**
 * 清除cookie 的值
 * @param {Object} name
 */
Base.removeCookie=function(name){
    this.setCookie(name,"-1",);
};

/**
 * 验证登录
 */
Base.validIsUser=function(){
	//获取cookies
	if(Tool.getCookie("userId")==null||Tool.getCookie("userId")==''){
		return false;
	}
	return true ;
};
