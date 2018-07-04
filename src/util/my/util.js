const Utils = {};



/**
 * 储存Cookie的方法			
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>小时
 */
Utils.SetCookie= function(key, value, days) {
	var cdata = name + "=" + value;
	var date = new Date();
	if(days) {
		date.setDay(date.getDay()+days);
		cdata += "; expires=" + d.toGMTString();
	}
	document.cookie = cdata;
};
/**
 * 获取Cookie对应key的 值
 * @param {Object} name 对应的Key值
 */
Utils.GetCookie = function(key) {
  var name = key + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) 
    return c.substring(name.length,c.length);
  }
  return "";
};
/**
 * 情况Cookie数据
 * @param {Object} name
 */
Utils.RemoveCookie = function(key) {
	this.setCookie(name,"",-1);
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