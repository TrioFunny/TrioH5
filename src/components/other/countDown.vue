<template>
<div>
<span v-show="show" @click="getCode">获取验证码</span>
<span v-show="!show" class="count">{{count}} s</span>
</div>
</template>

<script>
export default {
	name: 'date',
	data() {
		return {
	   show: true,
	   count: '',
	   timer: null,
		}
	},
	mounted() {

	},
	created() {
	},
	methods: {
		 getCode(){
		     const TIME_COUNT = 60;
		     if (!this.timer) {
		       this.count = TIME_COUNT;
		       this.show = false;
		       this.timer = setInterval(() => {
		       if (this.count > 0 && this.count <= TIME_COUNT) {
		         this.count--;
		        } else {
		         this.show = true;
		         clearInterval(this.timer);
		         this.timer = null;
		        }
		       }, 1000)
		      }
		   }  
		 }
	}
</script>

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
	font-size: 1rem;
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