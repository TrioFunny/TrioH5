const Utils = {};

/**
 * 储存Cookie的方法			名称(可读)<默认值>
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>
 * @param {Object} path		存储路径(不可读)<当前路径>
 * @param {Object} domain	储存域(不可读)<当前域>
 * @param {Object} secure	安全性(不可读)<false>
 */
Utils.setCookie= function(name,value,hours,path,domain,secure){
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
};
Utils.getCookie=function(name){
    var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/"); 
    return reg.test(document.cookie) ? RegExp.$1 : "";
};
 Utils.removeCookie=function(name){
    this.setCookie(name,"",0);
};





//给Date方法注入 Format 这个格式方法
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export default Utils;