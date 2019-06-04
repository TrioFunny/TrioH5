import { Toast } from 'vant';

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
            title:null,
            success: function (view) { }, //请求成功执行方法
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
        	if(setting.dataType=='img'){
        		console.log('上传图片');
        		var formData = new FormData();
      			formData.append('123', null);
        		xhr.open(setting.type, setting.url, setting.async);
	            xhr.setRequestHeader("Content-type", "multipart/form-data");
	            xhr.send(formData);
        	}else{
			    for (var attr in setting.data) {
			        aData.push(attr + '=' + filter(setting.data[attr]));
			    }
			    sData = aData.join('&');
	            xhr.open(setting.type, setting.url, setting.async);
	            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	            xhr.send(sData);
        	}
            
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
Tool.post = function (pathname, data,view,success, error,title) {
    var setting = {
        url: pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        data: data, //发给服务器的数据
        view:view,
        title:title,
        success: success || function () { }, //请求成功执行方法
        error: error || function () {} //请求失败执行方法
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
Tool.get = function (pathname, data, success, error) {
    var setting = {
        url:  pathname, //默认ajax请求地址
        type: 'GET', //请求的方式
        data: data, //发给服务器的数据
        success: success || function () { }, //请求成功执行方法
        error: error || function () { } //请求失败执行方法
    };
    return Tool.ajax(setting);
};


Tool.upImg = function (pathname, data,view, success, error) {
    var setting = {
        url: pathname, //默认ajax请求地址
        type: 'POST', //请求的方式
        dataType:'img',
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
    console.log("储存cookies");
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


Tool.DataGoodsPackage = null;          //商品套餐数据
Tool.DataGoodsLabel = null;            //商品标签数据
Tool.DataGoodsSort = null;             //商品分类数据
Tool.DataGoodsSpecification = null;    //商品规格数据
Tool.DataGoodsSalesTime = null;        //商品售卖时间数据
Tool.GoodsInfo = null;					//商品信息
Tool.ResumeActivityView = null;         //返回app需要做处理的页面
/**
 * 设置数据
 * @param {String} type 数据种类
 * @param {Object} para 数据对象
 */
Tool.setData = function(type,para){
	switch(type)
	{
		case 'package':
			Tool.DataGoodsPackage = para;
			break;
		
		case 'label':
			Tool.DataGoodsLabel = para;
			break;
		
		case 'sort':
			Tool.DataGoodsSort = para;
			break;
			
		case 'specification':
			Tool.DataGoodsSpecification = para;
			break;
			
		case 'salesTime':
			Tool.DataGoodsSalesTime = para;
			break;
			
		case 'goodsInfo':
			Tool.GoodsInfo=para;
			break;
		
		case 'Clear':
			Tool.DataGoodsPackage = null;
			Tool.DataGoodsLabel = null;
			Tool.DataGoodsSort = null;
			Tool.DataGoodsSpecification = null;
			Tool.DataGoodsSalesTime = null;
			Tool.GoodsInfo=null;
			break;
			
		default:
			break;
	}
};

/**
 * 获取新建商品数据
 * @param {String} type 数据种类
 */
Tool.getData = function(type){
	switch(type)
	{
		case 'package':
			return JSON.parse(JSON.stringify(Tool.DataGoodsPackage));
			break;
			
		case 'label':
			return JSON.parse(JSON.stringify(Tool.DataGoodsLabel));
		
		case 'sort':
			return JSON.parse(JSON.stringify(Tool.DataGoodsSort));
			
		case 'specification':
			return JSON.parse(JSON.stringify(Tool.DataGoodsSpecification));
			
		case 'salesTime':
			return JSON.parse(JSON.stringify(Tool.DataGoodsSalesTime));
			
		case 'goodsInfo':
			return JSON.parse(JSON.stringify(Tool.Tool.GoodsInfo));
		case 'All':
			let goodsPara = {};
			goodsPara.package = JSON.parse(JSON.stringify(Tool.DataGoodsPackage));
			goodsPara.label = JSON.parse(JSON.stringify(Tool.DataGoodsLabel));
			goodsPara.sort = JSON.parse(JSON.stringify(Tool.DataGoodsSort));
			goodsPara.specification = JSON.parse(JSON.stringify(Tool.DataGoodsSpecification));
			goodsPara.salesTime = JSON.parse(JSON.stringify(Tool.DataGoodsSalesTime));
			goodsPara.GoodsInfo= JSON.parse(JSON.stringify(Tool.GoodsInfo));
			return goodsPara;
			
		default:
			break;
	}
};

/**
 * 检测元素是否使用特定的class
 * @param {Object} elements  对象的引用
 * @param {String} cName     class名
 */
Tool.hasClass = function(elements,cName){ 
	// ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断  
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
};

/**
 * 判断平台
 */
Tool.judgePlatform=function(){
    switch ( plus.os.name ) {
        case "Android":
        	return "Android";
        break;
        case "iOS":
        	return "iOS";
        break;
        default:
        	return "Others";
        break;
    }
}

/**
 * plusready扩展API代码库加载完成，注册事件监听器
 */
Tool.plusActivity=function(){
	plus.navigator.setStatusBarBackground("#fe8f40");
	plus.navigator.setStatusBarStyle("light");
	//plus.runtime.arguments = null;
	//app从后台唤醒
	document.addEventListener("resume", function(){
		//Toast("resume")
		Tool.resumeCallBack();
	}, false );
	
	//app被第三方唤醒
	document.addEventListener("newintent", function(){
		Toast("newintent")
	}, false );
	//首次开启时检测是否需要跳转处理
	Tool.resumeCallBack();
};

/**
 * app后台唤醒响应
 */
Tool.resumeCallBack=function(){
	if(Tool.ResumeActivityView != null){
		Tool.ResumeActivityView.onResume();
	}
	
	if(plus.runtime.arguments)
	{
		//Toast(plus.runtime.arguments);
		var value = Tool.getUrlParam(plus.runtime.arguments);
		if(value['page'])//跳转页面
		{
			//Toast(value['page']);
			Tool.viewObject.$router.push({
				path: "/" + value['page']
			});
			plus.runtime.arguments = null;
		}
		if(value['act'])//事件回调
		{
			//微信支付结果回调
			if(value['act'] == "wxpay")
			{
				Tool.showTips(value['param']);
//				if(value['param'] == "2")
//				{
//					Toast("支付成功");
//				}
//				if(value['param'] == "1")
//				{
//					Toast("支付失败");
//					//window.history.back();
//				}
//				if(value['param'] == "0")
//				{
//					Toast("用户取消支付");
//					//window.history.back();
//				}

				//跳转到个人中心
//				Tool.viewObject.$router.push({
//					path: '/personalCenter',
//					query:{'roleType':''}
//				});
				
				plus.runtime.arguments = null;
			}
		}
	}
};

/**
 * 弹出提示
 * @param {Object} id 提示id
 */
Tool.showTips=function(id){
	let check = parseInt(id);
	if(check != NaN)
	{	
		switch(check)
		{
			case 0:
			{
				//Toast('用户取消支付')
				break;
			}
			case 1:
			{
				Toast('支付失败')
				break;
			}
			case 2:
			{
				Toast('支付成功')
				break;
			}
			default:
			{
				Toast("异常");
				break;
			}
		}
	}

};

/**
 * 调安卓原生方法
 * @param {String} name 方法名
 * @param {Object} args 传递参数
 */
Tool.callAndroid=function(name,args){
	//var mainAct = plus.android.newObject("com.XianYun.XianYunBao.SDK_WebApp");
	var mainAct = plus.android.runtimeMainActivity();
	plus.android.invoke(mainAct,name,args);
//	var mainAct = plus.ios.importClass("WebAppController");
//	plus.ios.invoke(mainAct,"WebCallPhone",args);
};

/**
 * 调iOS原生方法
 * @param {String} act 方法名
 * @param {Object} args 传递参数
 */
Tool.calliOS=function(act,args){
	plus.ios.importClass("WebAppController").AppCall(act,args);
};


export default Tool;