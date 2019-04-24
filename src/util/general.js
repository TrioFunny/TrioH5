import Vue from 'vue'

const General= {};

let server='http://123.206.92.79:8080/solo';
//let server='http://127.0.0.1:8080/solo';

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

//
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

General.server=server;
export default General;