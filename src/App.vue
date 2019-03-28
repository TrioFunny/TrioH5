<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  	width: 100%;
	height: 100%;
	position: absolute;
}
html body {
	width: 100%;
	height: 100%;
	margin: 0px;
}

/*admin/questionList.vue*/
.v-title1{
	text-align: center;padding: 30px 30px;color: lightskyblue;font-size: 22px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  
  /*admin/index.vue*/
.router-link-active {
    text-decoration: none;
}
a{
    text-decoraction: none;
}
  /*admin/questionInfo.vue*/
.disabled-radio{
	display: block;
	padding: 10px;
	margin: 0px !important;
}
</style>
