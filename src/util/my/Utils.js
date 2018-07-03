const Utils = {};



/**
 * 储存Cookie的方法			
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>小时
 */
Utils.setCookie= function(key, value, days) {
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
Utils.getCookie = function(key) {
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
Utils.removeCookie = function(key) {
	this.setCookie(name,"",-1);
};




