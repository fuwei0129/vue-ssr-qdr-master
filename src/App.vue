<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    	<router-view></router-view>
    </transition>
  </div>
</template>
<script>
import '../public/style.css'
export default {
  name: 'App'
}
</script>
<style>
body{
  background:#19202b;
  width:100%;
  overflow-x: hidden;
}
.mint-swipe-indicator{
  background:#333!important;
  opacity: 1!important;
}
.mint-swipe-indicator.is-active{
  background:#4595e6!important;
}
</style>
