const Base= {};

//请求前
Base.ready=function(url,data,view,title){
	view.$loading({text: '加载中..'});
	console.log('--------------------'+title+'--------------------');
	console.log('url:'+url);
	console.log(data);
	console.log('--------------------'+title+'--------------------');
}

//失败时执行
Base.error=function(view,title){
	console.log('--------------------'+title+'--------------------');
	console.log("失败：")
	console.log('--------------------'+title+'--------------------');
	view.$loading().close();
	view.$message.error('加载失败！服务器无响应。');
}

//成功时执行
Base.success=function(res, view,title){
	console.log('--------------------'+title+'--------------------');
	console.log("成功：")
	console.log(data);
	console.log('--------------------'+title+'--------------------');
	view.$loading().close();
        view.$message({
          message: '操作成功',
          type: 'success'
        });
}


//加密
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



