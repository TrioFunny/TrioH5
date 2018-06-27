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

Base.request_init=function(data){
	//数据加密
	
	//打开遮挡板
	
}

Base.response_init=function(data){
	//
	Base.response_log();
	//判断成功代码
	
	//关闭遮挡板
	
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



