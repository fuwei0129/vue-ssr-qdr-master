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
  created () {
    this.routeChange()
  },
  methods: {
    routeChange () {
      let path = this.$route.path
      if (path === '/' || path === '/index' || path === '/futures/index') {
        this.showNav = true
      } else {
        this.showNav = false
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
</style>
