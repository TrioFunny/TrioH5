<template>
  <div id="personalSpace" >
  	<!--头部 -->
  		<headerDiv sign='1' title='个人空间'></headerDiv>
				<el-container style="padding: 0 15%;">
					
					<!--脸部 -->
					 <el-header style="height: 200px;width: 100%;position: relative;min-width: 1100px;" >
					 		<img  src="../../assets/bg/header.jpg" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;"/>
					 			<el-row  style="height: 100%;">
								  <el-col :span="12" style="position: absolute;bottom: 0px;">
							 				<span style="float:left;margin:20px 10px 20px 20px;">
								 				<img src="../../assets/portrait.jpg" height="110" style="border-radius: 50%;border: solid skyblue 2px;"/>
							 				</span>
									 			<span style="float:left;text-align: left;margin: 20px 5px;">
									 				<span class="trio-user-name">无事，无趣，无聊，无谋</span>
									 				<br />
									 				<span style="color: white;background-color:darkgrey;">我不是针对莫个人，在场的各位都是辣鸡，而我确实黄焖鸡。</span>
									 				<br />
									 				<br />
									 				<span style="color:white ;font-weight: 600;background-color:orange;border-radius:5px;padding: 2px;">Level 12</span>
									 			</span>
								  </el-col>
								</el-row>
						 			

					 </el-header>
					 
					 <!--导航栏-->
					 <div style="min-width: 1100px;">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="主页" name="first">
							</el-tab-pane>
							<el-tab-pane label="项目" name="second">
							</el-tab-pane>
							<el-tab-pane label="简历" name="third">
							</el-tab-pane>
							 <el-tab-pane label="关注" name="fourth3">
							 </el-tab-pane>
							 <el-tab-pane label="经验" name="fourth1">
							 </el-tab-pane>
							 <el-tab-pane label="帖子" name="fourth2">
							 </el-tab-pane>
							 <el-tab-pane label="设置" name="fourth">
							 </el-tab-pane>
					  </el-tabs>
					 </div>
					 
					 <el-container style="min-width: 1100px;">
									<!--内容-->
							 		<el-main style="height: 500px;background-color: aquamarine;">
							 			<div v-if="activeName=='first'">
							 				主页
												  <el-carousel :interval="4000" type="card" height="200px" :autoplay='false'>
												    <el-carousel-item v-for="item in imgList" :key="item">
												      <img :src="item"  width="100%"/>
												    </el-carousel-item>
												  </el-carousel>
							 			</div>
							 			<div v-if="activeName=='second'" >
							 				项目
							 			</div >
							 			<div v-if="activeName=='third'">
							 				简历
							 			</div>
							 			<div v-if="activeName=='fourth3'">
							 				关注
							 			</div>
							 			<div v-if="activeName=='fourth1'">
							 				经验
							 			</div>
							 			<div v-if="activeName=='fourth2'">
							 				帖子
							 			</div>	
							 			<div v-if="activeName=='fourth'">
							 				设置
							 			</div>
							 		</el-main>
							 		
							 		<!--其他信息 -->
							 	 	<el-aside width="350px" style="height: 500px;background-color: royalblue;">
							 	 		 <CalendarMonth > </CalendarMonth>
							 	 	</el-aside>
					  </el-container>
					  
				</el-container>
	</div>
</template>

<script>
import headerDiv from '../../components/header';
import CalendarMonth from '../../components/calendar/month';

export default {
  data () {
    return {
    	 activeName: 'first',
    	 imgList:[
    	 '/static/dota/timg1.jpg',
    	 './static/dota/timg2.jpg',
    	 '/static/dota/timg3.jpg',
    	 '/static/dota/timg4.jpg',
    	 '/static/dota/timg5.jpg',
    	 '/static/dota/timg6.jpg',
     	 '/static/dota/timg7.jpg',
    	 '/static/dota/timg8.jpg',
    	 ]
    }
  },
	components: {
			headerDiv,CalendarMonth,
	},
  methods: {
      handleClick(tab, event) {
//      console.log(tab, event);
      },
      goTo(url){
      	$router.push(url);
      },
   }
}
</script>

<style >
.trio-user-name{
	  font-family: Microsoft YaHei;
	  color: white;
	  font-size: 18px;
	  font-weight: 600;
}
</style>
