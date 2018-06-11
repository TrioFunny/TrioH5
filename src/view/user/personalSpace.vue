<template>
	<div id="personalSpace">
		<!--头部 -->
		<headerDiv sign='1' title='个人空间'></headerDiv>
		<el-container style="padding: 0 10%;">

			<!--脸部 -->
			<el-header style="height: 200px;width: 100%;position: relative;">
				<el-upload class="avatar-uploader" style="float: left;background: white; margin-top: 1rem; margin-left: -1.3rem;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<img src="../../assets/bg/header.jpg" height="100%" width="100%" style="position: absolute;top: 0;left: 0; z-index: -10;" />
				<div>
				</div>
			</el-header>

			<!--导航栏-->
			<div>
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
			<el-container>
				<!--内容-->
				<el-main style="height: 500px;background-color: aquamarine;">
					<div v-if="activeName=='first'">
						主页
						<el-carousel :interval="4000" type="card" height="200px" autoplay='false'>
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
				]
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
			handleAvatarSuccess(res, file) {
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
			}
		},
		mounted() {
			this.getStartImage();
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
</style>