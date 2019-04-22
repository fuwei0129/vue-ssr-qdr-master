<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
      <keep-alive v-if="$route.meta.keepAlive">
    	   <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
      <Foot :showNav="showNav"></Foot>
    <!-- </transition> -->
  </div>
</template>
<script>
import '../public/style.css'
import Foot from './components/foot.vue'
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
    // 自动登录
    this.autoLogin()
  },
  created() {
    this.routeChange()
  },
  methods: {
    routeChange () {
      let path = this.$route.path
      if (path === '/' || path === '/index' || path === '/market/index' || path === '/futures/index' || path === '/mine/index') {
        this.showNav = true
      } else {
        this.showNav = false
      }
    },
    autoLogin() {
      const { dispatch } = this.$store
      // 如果storage中存在token，则使用storage中保存的信息进行自动登录
      if (sessionStorage.sign) {
        let data = {
          reqbase:{
            timestamp:common.getLastDate(),
            clientauthflag:common.getClientauthflag(),
            reqorigin:"xuantie",
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
            memberSign:sessionStorage.sign
          }
        }
        dispatch('autoLogin',data)
      }
    },
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
