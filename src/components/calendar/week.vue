<template>
<div id="calendar">
 <!-- 年份 月份 -->
 <div class="month">
	 <ul>
	  <li class="arrow" @click="weekPre(currentYear,currentMonth)">❮</li>
	  <!--<li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>-->
	  <li class="year-month" @click="pickYear(currentYear,currentMonth)">
	  	<span class="choose-year">{{ currentYear }}-{{ currentMonth }}</span>
	 	 <!--<span class="choose-month">{{ currentYear }}-{{ currentMonth }}</span>-->
	  </li>
	  <!--<li class="arrow" @click="pickNext(currentYear,currentMonth)">></li>-->
	  <li class="arrow" @click="weekNext(currentYear,currentMonth)">></li>
	 </ul>
 </div>
 <!-- 星期 -->
	 <ul class="weekdays">
		 <li>一</li>
		 <li>二</li>
		 <li>三</li>  
		 <li>四</li>
		 <li>五</li>
		 <li style="color:red">六</li>
		 <li style="color:red">日</li>
	 </ul>
 <!-- 日期 -->
 <ul class="days">
	 <li @click="pick(day)" v-for="day in days">
	  <!--本月-->
	  	<span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
		<span v-else>
	  <!--今天-->
		  <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
		  <span v-else>{{ day.getDate() }}</span>
	 	</span>
	 </li>
 </ul>
 <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">8:00-10:00</li>
 	<li>说说</li>
 	<li>日志</li>
 	<li>项目</li>
 	<li>问题</li>
 	<li>技术</li>
 	<li>√</li>
 </ul>
 <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">10:00-12:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">12:00-14:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">14:00-16:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">16:00-18:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">18:00-20:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">20:00-22:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">17:00-20:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">17:00-20:00</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
  <ul class="time">
 	<li style="width: 100%;padding: 1px;color: gray;font-size: 5px;">17:00-20:00</li>
 	<li>申请中</li>
 	<li>待审核</li>
 	<li>成功</li>
 	<li>失败</li>
 	<li>√</li>
 	<li>√</li>
 </ul>
</div>
</template>

<script>
export default {
	name: 'date',
	data() {
		return {
			currentYear: 1970, // 年份
			currentMonth: 1, // 月份
			currentDay: 1, // 日期
			currentWeek: 1, // 星期
			days: [],
		}
	},
	mounted() {

	},
	created() {
		this.initData(null)
	},
	methods: {
		formatDate(year, month, day) {
			const y = year
			let m = month
			if(m < 10) m = `0${m}`
			let d = day
			if(d < 10) d = `0${d}`
			return `${y}-${m}-${d}`
		},
		initData(cur) {
			let date = ''
			if(cur) {
				date = new Date(cur)
			} else {
				date = new Date()
			}
			this.currentDay = date.getDate() // 今日日期 几号
			this.currentYear = date.getFullYear() // 当前年份
			this.currentMonth = date.getMonth() + 1 // 当前月份
			this.currentWeek = date.getDay() // 1...6,0   // 星期几
			if(this.currentWeek === 0) {
				this.currentWeek = 7
			}
			const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay) // 今日日期 年-月-日
			this.days.length = 0
			// 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
			/* eslint-disabled */
			for(let i = this.currentWeek - 1; i >= 0; i--) {
				const d = new Date(str)
				d.setDate(d.getDate() - i)
				this.days.push(d)
			}
			for(let i = 1; i <= 7 - this.currentWeek; i++) {
				const d = new Date(str)
				d.setDate(d.getDate() + i)
				this.days.push(d)
			}
		},
		//  上个星期
		weekPre() {
			const d = this.days[0] // 如果当期日期是7号或者小于7号
			d.setDate(d.getDate() - 7)
			this.initData(d)
		},
		//  下个星期
		weekNext() {
			const d = this.days[6] // 如果当期日期是7号或者小于7号
			d.setDate(d.getDate() + 7)
			this.initData(d)
		},
		// 上一個月   传入当前年份和月份
		pickPre(year, month) {
			const d = new Date(this.formatDate(year, month, 1))
			d.setDate(0)
			this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
		},
		// 下一個月   传入当前年份和月份
		pickNext(year, month) {
			const d = new Date(this.formatDate(year, month, 1))
			d.setDate(35)
			this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
		},
		// 当前选择日期
		pick(date) {
			alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
		},
	},
}</script>

<style>
*{
	box-sizing: border-box;
	}
ul{
	list-style-type: none;
	}
body{
	font-family: Verdana, sans-serif;
	background: #E8F0F3;
	}
#calendar{
	width: 95%;
	margin: 0 auto;
	margin-top: 20px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.month {
	width: 100%;
	background: #00B8EC;
}
.month ul {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: space-between;
}
.year-month {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
.year-month:hover {
	background: rgba(150, 2, 12, 0.1);
}
.choose-year {
	padding-left: 20px;
	padding-right: 20px;
}
.choose-month {
	text-align: center;
	font-size: 1.5rem;
}
.arrow {
	padding: 30px;
}
.arrow:hover {
	background: rgba(100, 2, 12, 0.1);
}
.month ul li {
	color: white;
	font-size: 20px;
	text-transform: uppercase;
	letter-spacing: 3px;
}
.weekdays {
	margin: 0;
	padding: 10px 0;
	background-color: #00B8EC;
	display: flex;
	flex-wrap: wrap;
	color: #FFFFFF;
	justify-content: space-around;
	border: solid 1px gainsboro;
}
.weekdays li {
	display: inline-block;
	width: 13.6%;
	text-align: center;
}
.days {
	padding: 0;
	background: #FFFFFF;
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.days li {
	list-style-type: none;
	display: inline-block;
	width: 14.2%;
	text-align: center;
	padding-bottom: 10px;
	padding-top: 10px;
	font-size: 1rem;
	color: #000;
}
.days li .active {
	padding: 6px 10px;
	border-radius: 50%;
	background: #00B8EC;
	color: #fff;
}
.days li .other-month {
	padding: 5px;
	color: gainsboro;
}
.days li:hover {
	background: #e1e1e1;
}
/*时间*/
.time {
	padding: 0;
	background: #FFFFFF;
	margin: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.time li {
	list-style-type: none;
	display: inline-block;
	width: 14.2%;
	text-align: center;
	padding-bottom: 5px;
	padding-top: 5px;
	font-size: 0.8rem;
	color: #000;
	border: solid 1px gainsboro;
}
.time li .active {
	padding: 6px 10px;
	border-radius: 50%;
	background: #00B8EC;
	color: #fff;
}
.time li .other-month {
	padding: 5px;
	color: gainsboro;
}
.time li:hover {
	background: #e1e1e1;
}


.date {
	height: px2rem(180);
	color: #333;
	.month {
		font-size: px2rem(24);
		text-align: center;
		margin-top: px2rem(20);
	}
	.weekdays {
		display: flex;
		font-size: px2rem(28);
		margin-top: px2rem(20);
		li {
			flex: 1;
			text-align: center;
		}
	}
	.days {
		display: flex;
		li {
			flex: 1;
			font-size: px2rem(30);
			text-align: center;
			margin-top: px2rem(10);
			line-height: px2rem(60);
			.active {
				display: inline-block;
				width: px2rem(60);
				height: px2rem(60);
				color: #fff;
				border-radius: 50%;
				background-color: #fa6854;
			}
			.other-month {
				color: #e4393c;
			}
		}
	}
}</style>