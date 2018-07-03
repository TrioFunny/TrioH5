<template>
  <div id="personalSpace" >
  		<headerDiv sign='1' title='个人空间'></headerDiv>
  		
				<el-container style="padding: 0 15%;">
					<!--脸部 -->
					 <el-header style="height: 180px;width: 100%;position: relative;min-width: 1100px;" >
					 		<img  src="../../assets/bg/header.png" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;"/>
					 			<el-row  style="height: 100%;">
								  <el-col :span="12" style="position: absolute;bottom: 0px;">
							 				<span style="float:left;margin:20px 10px 20px 20px;">
								 				<img src="../../assets/portrait.jpg" height="110" style="border-radius: 50%;border: solid skyblue 2px;"/>
							 				</span>
						<span style="float:left;text-align: left;margin: 30px 5px;">
									 				<span class="trio-user-name">{{user.nickname}}<!--无事，无趣，无聊，无谋--></span>
						<br />
						<span style="color: white;background-color:darkgrey;">{{user.introduce}}<!--我不是针对莫个人，在场的各位都是辣鸡，而我确实黄焖鸡。--></span>
						<br />
						<span class="trio-level-span">Level 12</span>
						<br />
						</span>
					</el-col>
				</el-row>
			</el-header>

			<!--脸部 -->
			<el-header style="height: 200px;width: 100%;position: relative;">
				<el-upload class="avatar-uploader" name="photofile" style="float: left;background: white; margin-top: 1rem; margin-left: -1.3rem;" action="http://127.0.0.1:8080/TrioMvc/user/getImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<img src="../../assets/bg/header.jpg" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;" />
				<div>
				</div>
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
								<img :src="item" width="100%" />
							</el-carousel-item>
						</el-carousel>
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
				<el-aside width="350px" style="height: 500px;background-color: royalblue;">
					<CalendarMonth> </CalendarMonth>
				</el-aside>
			</el-container>

		</el-container>

	</div>
</template>

<script>
	import headerDiv from '../../components/header';
	import CalendarMonth from '../../components/calendar/month';
	import Common from '../../interface/common'
	import User from '@/interface/user';
	export default {
		data() {
			return {
				activeName: 'first',
				//				imageUrl: '/static/img/headPortrait/IMG_0131.JPG',
				imageUrl: '',
				imgList: [
					'/static/img/dota/timg1.jpg',
					'./static/img/dota/timg2.jpg',
					'/static/img/dota/timg3.jpg',
					'/static/img/dota/timg4.jpg',
					'/static/img/dota/timg5.jpg',
					'/static/img/dota/timg6.jpg',
					'/static/img/dota/timg7.jpg',
					'/static/img/dota/timg8.jpg',
				],
				user: '',
			}
		},
		components: {
			headerDiv,
			CalendarMonth,
		},
		methods: {
			handleClick(tab, event) {
				//      console.log(tab, event);
			},
			goTo(url) {
				$router.push(url);
			},
			getUserInfo() {
				let param = {
					userId: '2a9650307d2f44398a3474a3245fd861',
				};
				User.getUserInfo.Post(param, this);
			},
			userInfoCallback(res) {
				if(res.code = '200') {
					this.user = res.data;
				} else {

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
			getStartImage() {
				Common.getStartImage.get("", this);
			},
			getStartImageCallback(res) {
				this.imageUrl = res.data;
				if(this.imageUrl == '' || this.imageUrl == null) {
					this.imageUrl = '/static/img/headPortrait/default.jpg';
				}
			}
		},
		mounted() {
			this.getStartImage();
			this.getUserInfo();
		},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.trio-user-name {
		font-family: Microsoft YaHei;
		color: white;
		font-size: 18px;
		font-weight: 600;
	}
	
	.trio-level-span {
		color: white;
		font-weight: 600;
		background-color: orange;
		border-radius: 5px;
		padding: 2px 5px;
		float: left;
		margin: 5px;
	}
</style>