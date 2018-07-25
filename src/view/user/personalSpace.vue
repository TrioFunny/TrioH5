<template>

	<div id="personalSpace">
		<!--头-->
		<headerDiv sign='1' title='个人空间'></headerDiv>
		
		<el-container >  
			<!--头像 -->
			<el-header class="trio-space-head" >
				<img src="../../assets/bg/bilibili.jpg" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;" />
				<el-row style="height: 100%;">
					<el-col :span="12" style="position: absolute;bottom: 0px;height: 100px;">
						<!-- 头像 -->
						<span style="float:left;">
							<img src="../../assets/portrait.jpg" height="80" style="border-radius: 50%;border: solid skyblue 2px;"/>
						</span>
						
						<span style="float:left;text-align: left;height: 80px;margin: 10px;">
							<span class="trio-user-name" ><span style="padding: 3px 5px;background-color:darkgrey;border-radius: 10px;">{{user.nickname}}</span> <span class="trio-level-span">Level 12</span></span>
						<br />
						<span style="color: white;background-color:darkgrey;padding: 3px 10px;border-radius: 10px;">{{user.introduce}}我不是针对莫个人，在场的各位都是辣鸡，而我确实黄焖鸡。</span>
						<br />
						
						<br />
						</span>
					</el-col>
				</el-row>
			</el-header>
			<!--脸部 -->
			<el-header v-if="false" class="trio-space-face">
				<el-upload class="avatar-uploader" name="photofile" style="float: left;background: white; margin-top: 1rem; margin-left: -1.3rem;" action="http://127.0.0.1:8080/user/postImage?userId=2a9650307d2f44398a3474a3245fd861" :on-error="error" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<img src="../../assets/bg/header.jpg" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;" />
				<div></div>
			</el-header>

	<!--<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
		    <el-radio-button label="top">top</el-radio-button>
		    <el-radio-button label="right">right</el-radio-button>
		    <el-radio-button label="bottom">bottom</el-radio-button>
		    <el-radio-button label="left">left</el-radio-button>
		  </el-radio-group>-->
		  
		<!--导航栏-->
			<div  class="trio-space-lead" >
				<el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tabPosition">
					<el-tab-pane label="." name="zreo" disabled style="color: royalblue ">
					</el-tab-pane>
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

			<el-container class="trio-space-main">
				<!--内容-->
				<el-main style="height: 1000px;border-radius: 5px;background-color: white;">
					<div v-if="activeName=='first'">
						主页
						<el-carousel :interval="4000" type="card" height="200px" :autoplay='false'>
							<el-carousel-item v-for="item in imgList" :key="item">
								<img :src="item" width="100%" />
							</el-carousel-item>
						</el-carousel>
						<iframe :src="iframeUrl" width="100%" height="600px" v-if="page.iframeShow"></iframe>
					</div>
					<div v-if="activeName=='second'">
						项目
					</div>
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
				<el-aside width="350px" style="height: 1200px;padding:10px;">
					<div style="width: 100%;max-height: 200px;min-height: 100px; background-color:white;border-radius: 5px;padding: 20px 30px;">
						<el-button type="primary" icon="el-icon-edit" 	title="写帖子" @click="goToApplication('写帖子')"></el-button>
						<el-button type="primary" icon="el-icon-star-on" title="我的收藏" @click="goToApplication('我的收藏')"></el-button>
						<el-button type="primary" icon="el-icon-search" title="搜索" @click="goToApplication('搜索')"></el-button>
						<el-button type="primary" icon="el-icon-upload" title="文件上传" @click="goToApplication('文件上传')"></el-button>
						<br /><br />
						<el-button type="primary" icon="el-icon-goods" title="购物" @click="goToApplication('买买买')"></el-button>
						<el-button type="primary" icon="el-icon-message" title="消息" @click="goToApplication('消息')"></el-button>
						<el-button type="primary" icon="el-icon-date"   title="日历" 	@click="goToApplication('date')"></el-button>
						<el-button type="primary" icon="el-icon-menu" title="更多应用" @click="goToApplication('更多应用')"></el-button>
					</div>
					<CalendarMonth v-if="page.calendarShow"> </CalendarMonth>
					<div style="width: 100%;height: 240px;margin:20px 0px; background-color:white;border-radius: 5px;padding: 10px;">
						<div style="padding: 5px 10px;">公告</div>
						<hr />
					</div>
					<div style="width: 100%;height: 80px; background-color:white;border-radius: 5px;"></div>
					<div style="width: 100%;height: 80px; background-color:white;border-radius: 5px;"></div>
					<div style="width: 100%;height: 80px; background-color:white;border-radius: 5px;"></div>
				</el-aside>
			</el-container>

		</el-container>

	</div>
</template>

<script>
	import headerDiv from '@/components/header';
	import CalendarMonth from '@/components/calendar/month';
	import Common from '@/interface/common'
	import { mapState,mapActions} from 'vuex'
	import User from '@/interface/user';
	import Util from '@/util/my/util';
	
	export default {
		data() {
			return {
				tabPosition: 'top',
				activeName: 'first',
				//				imageUrl: '/static/img/headPortrait/IMG_0131.JPG',
				imageUrl: '',
				imgList: [
					'/static/img/dota/timg1.jpg',
					'./static/img/dota/timg2.jpg',
					'/static/img/dota/timg3.jpg',
					'/static/img/dota/timg4.jpg',
					'/static/img/dota/timg5.jpg',
				],
				action:window.url+"user/postImage?userId=2a9650307d2f44398a3474a3245fd861",
				user:'',
				userId:'',
				
				//
				iframeUrl:'http://www.baidu.com',
				page:{
					calendarShow:true,
					iframeShow:false,
				}
			}
		},
		components: {
			headerDiv,
			CalendarMonth,
		},
		computed:{
			
		},
		methods: {
			handleClick(tab, event) {
				//      console.log(tab, event);
			},
	      	getUserInfo(){
	      		let param={
	      			userId:this.userId,
	      		};
	      		User.getUserInfo.post(param,this);
	     	 },
		     userInfoCallback(res){
		     	if(res.code='200'){
		      		this.user=res.data;
		      	}else{
		      		
		      	}
		      },
			handleAvatarSuccess(res, file) {
				if(res.code == '400') {
					this.$message.error(res.error_msg);
					this.$router.push('/login');
					return;
				}
				if(res.code == '500') {
					this.$message.error('上传失败，请稍后再试....');
					return;
				}
				this.$message.success('更换头像成功');
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			error(res,file){
				console.log(res);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			goToApplication(msg){
				if(msg=='date'){
					if(this.page.calendarShow){
						this.page.calendarShow=false;
						this.$message.error("隐藏日历");
					}else{
						this.page.calendarShow=true;
						this.$message.success("显示日历");
					}
					return;
				}
				this.$message.success(msg);
				if(msg=="买买买"){
					if(this.page.iframeShow){
						this.iframeUrl='http://www.taobao.com'
					}else{
						this.page.iframeShow=true;
						this.iframeUrl='http://www.taobao.com'
					}
					return;
				}
				if(msg=="搜索"){
					if(this.page.iframeShow){
						this.iframeUrl='http://www.baidu.com'
					}else{
						this.page.iframeShow=true;
						this.iframeUrl='http://www.baidu.com'
					}
					return;
				}
			},
		},
		created(){
			this.userId=Util.getCookie("userId");
		},
		mounted() {
			console.log(this.userId)
			this.getUserInfo();
		},
	}
</script>

<style>
	.trio-user-name {
		font-family: Microsoft YaHei;
		color: white;
		font-size: 18px;
		font-weight: 600;
	}
	
	.trio-level-span {
		color: white;font-size: 12px;
		font-weight: 600;
		background-color: orange;
		border-radius: 5px;
		padding: 2px 3px;
		margin:2px 5px;
	}
	.trio-space-head{
		height: 200px !important;
		width: 100%;position: relative;min-width: 1100px;max-width: 1280px;margin: auto;
	}
	.trio-space-face{
		height: 200px;width: 100%;position: relative; max-width: 1280px; margin: auto;
	}
	.trio-space-lead{
		width:100%;min-width: 1100px; max-width:1280px; margin: auto;
	}
	.trio-space-main{
		width:100%; min-width: 1100px; max-width: 1280px;margin: auto;
	}
</style>