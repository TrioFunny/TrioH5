import Vue from 'vue'

const General= {};

let server='http://127.0.0.1:8080/solo';


General.goToByName=function(_this,_name){
	_this.$router.push({name: _name});
}
General.goTo=function(_this,_url,params){
	_this.$router.push({path: _url,query:params});
}
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
            temp[item] = typeof val == 'object'?clone(val):val; //这里也没有判断是否为函数，因为对于函数，我们将它和一般值一样处理
        }
    }
    return temp;
}
//回退
General.back=function(_this){
	_this.$router.back(-1);
}

General.server=server;
export default General;
