const Tool = {};
/**
 * 发送ajax请求和服务器交互
 * @param {object} mySetting 配置ajax的配置
 */
Tool.ajax = function (mySetting) {
        var setting = {
            url: window.location.pathname, //默认ajax请求地址
            async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
            type: 'GET', //请求的方式
            data: {}, //发给服务器的数据
            dataType: 'json',
            view:null,
            success: function (text,view) { }, //请求成功执行方法
            error: function (view) { } //请求失败执行方法
        };


    var aData = []; //存储数据
    var sData = ''; //拼接数据
    //属性覆盖
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }

    setting.type = setting.type.toUpperCase();
	
    var xhr = new XMLHttpRequest();
    try {
        if (setting.type == 'GET') { //get方式请求
		    for (var attr in setting.data) {
		        aData.push(attr + '=' + filter(setting.data[attr]));
		    }
			
		    sData = aData.join('&');
            sData = setting.url + '?' + sData;
            xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
            xhr.send();
        } else if(setting.type=='POST'){ //post方式请求
			    for (var attr in setting.data) {
			        aData.push(attr + '=' + filter(setting.data[attr]));
			    }
			    sData = aData.join('&');
	            xhr.open(setting.type, setting.url, setting.async);
	            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	            xhr.send(sData);
            
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener('readystatechange', httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;
            //将服务器返回的数据，转换成json

            if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status == 200) {
                setting.success(response,setting.view, setting, xhr);
            } else {
                setting.error(setting.view,setting, xhr);
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener('readystatechange', httpEnd, false);
    }

    function filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }
    return xhr;
};
/**
 * 封装ajax post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.post = function (pathname, data,view,success, error) {
    var setting = {
        url: pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        view:view,
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};
/**
 * 封装ajax get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 * @param {function} success  请求成功执行方法
 * @param {function} error    请求失败执行方法
 */
Tool.get = function (pathname, data,view,success, error) {
    var setting = {
        url:  pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        view:view,
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};



///////////////////////////////////////////////////////////////////////
/**
 * 储存Cookie的方法			名称(可读)<默认值>
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>
 * @param {Object} path		存储路径(不可读)<当前路径>
 * @param {Object} domain	储存域(不可读)<当前域>
 * @param {Object} secure	安全性(不可读)<false>
 */
Tool.setCookie= function(name,value,hours,path,domain,secure){
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
Tool.getCookie=function(name){
    var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/"); 
    return reg.test(document.cookie) ? RegExp.$1 : "";
};
 Tool.removeCookie=function(name){
    this.setCookie(name,"-1",);
};
Tool.validIsUser=function(){
	//获取cookies
	if(Tool.getCookie("userId")==null||Tool.getCookie("userId")==''){
		return false;
	}
	return true ;
};

export default Tool;