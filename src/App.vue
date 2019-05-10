<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
      <!-- <keep-alive v-if="$route.meta.keepAlive">
    	   <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view> -->
      <keep-alive><router-view></router-view></keep-alive>
      <Foot :showNav="showNav"></Foot>
    <!-- </transition> -->
  </div>
</template>
<script>
import '../public/style.css'
import Foot from './components/foot.vue'
import api from './utils/api'
import http from './utils/http'
import common from './utils/common'
export default {
  name: 'App',
  data(){
    return{
      showNav: true
    }
  },
  components:{
    Foot
  },
  watch: {
     // 如果路由有变化，会执行该方法
    '$route': function() {
      this.routeChange()
    }
  },
  mounted() {
    this.autoLogin()// 自动登录
    this.getSig()//获取游客信息
  },
  created() {
    this.routeChange()
  },
  methods: {
    routeChange () {
      if (this.$route.meta.showFoot) {
        this.showNav = true
      } else {
        this.showNav = false
      }
    },
    autoLogin() {
      const { commit } = this.$store
      // 如果storage中存在token，则使用storage中保存的信息进行自动登录
      if (sessionStorage.sign) {
        commit('setUser', {
          memberSign: sessionStorage.sign,
          memberInfo: JSON.parse(sessionStorage.user),
          memberToken: sessionStorage.token
        })
      }
    },
    getSig(){
      if(!common.getCookie('t_uuid')){
        let data = {
          reqbase:{
            timestamp:common.getLastDate(),
            clientauthflag:common.getClientauthflag(),
            reqorigin:"chat",
            token:common.getToken(),
            sourceip:common.getIp()
          },
          reqpage:{
            total:0,
            page:1,
            size:10,
            count:false
          },
          reqparam:{
            "SdkAppid":'1400094844',
      			"ClientIP":'127.0.0.1',
      			"userName": '',
      			"nickName": '',
            "uuid": ''
          }
        }
        http.postchat(api.getUserSigByName,data).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            common.setCookie("t_nickname",response.data.respparam.nickName,365)
          	common.setCookie("t_username",response.data.respparam.userName,365)
          	common.setCookie("t_uuid",response.data.respparam.uuid,365)
          	common.setCookie("t_sig",response.data.respparam.UserSig,365)
          }else{
            Toast({
              message: response.data.respbase.returnmsg,
              position: 'middle',
              duration: 2000
            })
          }
        })
      }
    }
  }
}
</script>
<style>
body{
  background:#09131b;
  width:100%;
  overflow-x: hidden;
}
*{
  box-sizing: border-box;
}
</style>
