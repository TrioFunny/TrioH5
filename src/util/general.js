import Vue from 'vue'

const General= {};

General.Resource={
	addressList:[],
}

General.goToByName=function(_this,_name){
	_this.$router.push({name: _name});
}
//跳转
General.goTo=function(_this,_url,params){
	_this.$router.push({path: _url,query:params});
}
//克隆对象
General.clone=function(obj){
    let temp = null;
    if(obj instanceof Array){
        temp = obj.concat();
    }else if(obj instanceof Function){
        //函数是共享的是无所谓的，js也没有什么办法可以在定义后再修改函数内容
        temp = obj;
    }else{
        temp = new Object();
        for(let item in obj){
            let val = obj[item];
          
            //temp[item] = typeof val == 'object'?General.clone(val):val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
        	if(typeof val == 'object'&&val!=null){
        		temp[item]=General.clone(val);
        	}else{
        		temp[item]=val;
        	}
        }
    }
    return temp;
}
//回退
General.back=function(_this){
	_this.$router.back(-1);
}
/**把毫秒 或者字符串 时间转换成  yyyy-MM-DD hh:mm:ss;
 * 
 * @param {Object} time
 */
General.formatDate=function(time){
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +month + '-' +day + ' ' +
                hour + ':' + min + ':' +sec;
    return newTime;         
}
//时间格式化
General.formatYYMMDD=function(time){
	if(time==""||time==null){
		return "";
	}
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate();
    var newTime = year + '-' +month + '-' +day + ' ';
    return newTime;         
}

//时间格式化
 General.format=function(time, format) {
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  },

//计算年龄
General.getAge=function(birthday)
{
    //出生时间 毫秒
    var birthDayTime = new Date(birthday).getTime(); 
    //当前时间 毫秒
    var nowTime = new Date().getTime(); 
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime-birthDayTime)/31536000000);
}

//自动清空
General.emptyFrame=function(obj){
     for(let key in obj){
         obj[key]  = ''
		}
  }

/**
 * 储存Cookie的方法			名称(可读)<默认值>
 * @param {Object} name		cookie名称(可读取)
 * @param {Object} value	cookie值(可读取)
 * @param {Object} hours	有效期(不可读)<session>
 * @param {Object} path		存储路径(不可读)<当前路径>
 * @param {Object} domain	储存域(不可读)<当前域>
 * @param {Object} secure	安全性(不可读)<false>
 */
General.setCookie= function(name,value,hours,path,domain,secure){
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
General.getCookie=function(name){
    var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/"); 
    return reg.test(document.cookie) ? RegExp.$1 : "";
};
General.removeCookie=function(name){
    this.setCookie(name,"",0);
};






export default General;
