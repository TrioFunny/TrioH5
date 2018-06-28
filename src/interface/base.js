const Base= {};

Base.log=function(data,title){
	console.log('--------------------'+title+'--------------------');
	let msg=JSON.stringify(data);
	console.log('data:'+msg);
	console.log('--------------------'+title+'--------------------');
}

Base.request_log=function(data,url,title){
	console.log('--------------------'+title+'--------------------');
	let msg=JSON.stringify(data);
	console.log('data:'+msg);
	console.log('url:'+url);
	console.log('--------------------'+title+'--------------------');
}

Base.response_log=function(data,title){
	console.log('--------------------'+title+'--------------------');
	let msg=JSON.stringify(data);
	console.log('data:'+msg);
	console.log('--------------------'+title+'--------------------');
}





Base.init=function(data,url,title,view){
	//加密
	
	//调试日志
	Base.request_log(data,url,title,);
}


Base.Success==function(data,url,title,view){
	//调试日志
	Base.request_log(data,url,title,);
}
Base.Error==function(data,url,title,view){
	//调试日志
	Base.request_log(data,url,title,);
}



Base.encrypt=function(){
	function Zero(){
		
	}
	function Solo(){
		
	}
	function Duet(){
		
	}
	function Trio(){
		
	}
	function Quartet(){
		
	}
	this.encrypt=function(){
		let arg=arguments;
		let len=arg.length;
		switch(len){
			case 0:
				return Zero();
			case 1:
				return Solo();
			case 2:
				return Duet();
			case 3:
				return Trio();
			case 4:
				return Quartet();
			default:
				return '参数太多';
		}
		
	}
}

export default Base;



