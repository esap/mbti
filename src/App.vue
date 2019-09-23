<template>
  <div id="app">
	<!-- 登陆 -->
	<Modal title="登陆ESAP云平台[MBTI 3.0]"
	  :closable="true"
	  :mask-closable="true"
	  v-model="notLogin">
	  <Form :model="form">
	    <Form-item label="账号">
	      <Input v-model="form.user" autofocus @on-enter="doLogin">
		    <Icon type="person" slot="prepend"></Icon>
		  </Input>
	    </Form-item>
	    <Form-item label="密码">
		  <Input v-model="pwd" type="password" @on-enter="doLogin">
			<Icon type="ios-locked-outline" slot="prepend"></Icon>
		  </Input>
	    </Form-item>
	  </Form>
	  <span slot="footer">
	    <Button type="primary" @click="doLogin">确 定</Button>
	  </span>
	</Modal>
  <!-- header导航 -->	
  <el-menu router theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
	  <el-menu-item index="info">水镜综合试题</el-menu-item>
	  <!-- <el-submenu index="2">
	    <template slot="title">微信模块</template>
	    <el-menu-item index="wxtx">提醒</el-menu-item>
	    <el-menu-item index="wxcx">查询</el-menu-item>
	    <el-menu-item index="wxtk">图库</el-menu-item>
	    <el-menu-item index="wxqd">签到</el-menu-item>
	    <el-menu-item index="wxyj">意见</el-menu-item>
	  </el-submenu> -->
	  <!-- <el-menu-item index="wxtxl">通讯录</el-menu-item> -->
	  <!-- <el-menu-item index="email">Email</el-menu-item> -->
	  <!-- <el-menu-item index="5"><a href="https://esap.vip" target="_blank">访问官网</a></el-menu-item> -->
	  <span class="right" v-show="!!$store.state.userName">
		{{"欢迎您，" + $store.state.userName}}
	  <a @click="$store.dispatch('outlogin')">退出登陆</a>
      </span>
	</el-menu>
	<!-- 步骤显示 -->
	<div class="progress">
	  <el-steps :space="100" :active="$store.state.active" finish-status="success">
	    <el-step title="准备"></el-step>
	    <el-step title="VDA"></el-step>
	    <el-step title="MBTI"></el-step>
	    <!-- <el-step title="DDI"></el-step> -->
	    <el-step title="GLPA"></el-step>
	    <!-- <el-step title="BTR"></el-step> -->
	  </el-steps>
	</div>
	<div class="mainbody">
	<keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>
  </div>
</template>

<script>
// import eDialog from './components/e-dialog'
import md5 from 'md5'
export default {
  	name: 'app',
  	// components: { eDialog },
  	data() {
	  return {
	  	pwd:'',
	    activeIndex: '1',
	    activeIndex2: '1',
	    form: { user: '', pwd: '' },
	    modal2: false
	  };
	},
	computed: {
		notLogin() { return false },
		loginVisible() {
			return !this.$store.getters.isLogin
		}
	},
	methods: {
		handleSelect(key, keyPath) {
		console.log(key, keyPath);
		},
		doLogin() {
			this.form.pwd=md5(this.pwd)
			this.$store.dispatch('doLogin',this.form)
		}
	},
}
</script>

<style lang="stylus">
.mainbody
	margin: 10px
#app
	font-family: 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	color: #2c3e50
	margin-top: 10px
.progress 
	margin: 10px
	text-align: center
.float-footer 
	text-align: center
.right 
	margin: 15px
	float: right
	color: #fff
	font-size: 14px
	a 
		font-size: 12px
		color: #69f
		cursor: pointer
		margin: 0 5px
</style>
