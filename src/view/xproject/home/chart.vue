<template>
	<div>
	<div class="content">
		<br />
		<div ref = 'myEchart' class="_chart">
			
		</div>
	</div>	
	</div>
</template>

<script>
import echarts from 'echarts'

	export default {
		name: 'chat',
		data() {
			return {
				This: this,
				url:{
					getSummaryByDate:this.$C.xproject+'/homePage/getSummaryByDate',
				},
//	            xNum:['1号','2号','3号','4号','5号','6号','7号','8号','9号','10号'],
	            xNum:[],
	            yNum:['销售量','订单量'],
	            series:[
	                {
	                	name:'销售量',
	                	stack: '销售量',
	                	//smooth: true,//线段是否平滑
	                	type:'line',
	                	yAxisIndex:'0',
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
		                        	[{ offset: 0, color: '#b3d8ff'}, 
		                        	{ offset: 1, color: '#b3d8ff' }], false)
		                    }
		                },
		                itemStyle: { normal: { color: '#409EFF' }},
//					data:[12000, 21000, 19000, 23000, 22000, 25000, 20000,17000,13000,15000]},
					data:[]},
	           		{
	           			name:'订单量',
	           			stack: '订单量',
		           		//smooth: true,//线段是否平滑
		           		type:'line',
		           		yAxisIndex:'1',
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
		                        	[{ offset: 0, color: '#fbc4c4'}, 
		                        	{ offset: 1, color: '#fbc4c4' }], false)
		                    }
		                },
		                itemStyle: { normal: { color: '#F56C6C' }},
//		           		data:[13, 21, 24, 31, 28, 24, 21,14,19,21]},
		           		data:[]},
	            ],
			
				chart:{
					startDate:'2019-06-14',
					endDate:'2019-06-21',
				}
			}
		},
		computed: {},
		components: {},
		methods: {
			initChart(){
				let myChart = echarts.init(this.$refs.myEchart);
				myChart.setOption({
					backgroundColor: '#fff',
	                tooltip: { trigger: 'axis' },
	                legend: { data: this.yNum, },
	                grid: {left: '2%', right: '2%', bottom: '3%', top:'20%', containLabel: true,},
	                xAxis: {//X轴坐标
	                    type: 'category',
	                    boundaryGap: false,
	                    name:"日期",
	                    data: this.xNum,
					    axisTick:{ show:false },//刻度线
					    splitLine: { show:true, lineStyle: { color: '#DBDBDB'} },//网格线
	                },
	                yAxis:[//Y轴坐标
		                {
		                    type: 'value',
		                    name:"金额/k元",
		                    nameLocation: 'end',
					    	axisTick:{ show:false },//刻度线
		                    axisLabel: {
		                        formatter:function (value, index) {
		                        	return value/1000;
		                        } //'{value} '
		                    }
		                },
		                {
		                    type: 'value',
		                    name:"销量/个",
		                    nameLocation: 'end',
					    	axisTick:{ show:false },//刻度线
		                    axisLabel: {
		                        formatter: '{value} '
		                    }
		                },
	                ],
	                series: this.series,//数据点
				    toolbox: {
				        feature: {
				            magicType: {type: ['line', 'bar']},//柱状图和西和折线图切换
				            restore: {},//刷新
				            saveAsImage: {},//将图表以折线图的形式展现
				        }
				    },
				})
			},
			getSummaryByDate(){
				this.$T.fool(this.url.getSummaryByDate,this.chart,this.success);
			},
		  	success(res){ //成功回调
		  		if(res.code=="200"){
		  			this.summary=res.data;
		  			for(let i=0;i<res.data.length;i++){
		  				let item=res.data[i];
		  				this.xNum.push(item.today.substring(5));//时间
		  				this.series[0].data.push(item.turnover);//销售量
		  				this.series[1].data.push(item.orderCount);//订单量
		  			}
			        let obj = this.$refs.myEchart;
			        if(obj){
			            this.initChart();
			        }
		  		}
		  	},
		},
		created() {},
        beforeDestroy() {
        },
		mounted() {
	        this.getSummaryByDate();
		},
	}
</script>

<style scoped>
.content{
	width: 100%;
}
.content p{
	margin-top: 1rem;
	font-size: 0.4rem;
	color: #666666;
}
.seven_echarts{
	height: 11rem;
	width: 94%;
}

._chart{
    height:300px;
    width:100%;
}
</style>