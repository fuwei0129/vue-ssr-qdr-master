<template>
  <div class="nav">
    <div class="tab-item">
      <span class="on" v-if="navIndex == 0">推荐</span>
      <router-link class="initial" v-else to="/">推荐</router-link>
    </div>
    <div class="tab-item">
      <span class="on" v-if="navIndex == 1">7*24</span>
      <router-link class="initial" v-else to="/flash/index">7*24</router-link>
    </div>
    <div class="tab-item">
      <span class="on" v-if="navIndex == 2">直播</span>
      <router-link class="initial" v-else to="/live/index">直播</router-link>
    </div>
    <div class="tab-item">
      <span class="on" v-if="navIndex == 4">日历</span>
      <router-link class="initial" v-else to="/calendar/data">日历</router-link>
    </div>
    <div class="tab-item">
      <span class="on" v-if="navIndex == 3">专栏</span>
      <router-link class="initial" v-else to="/column/index">专栏</router-link>
    </div>
  </div>
</template>
<script>
export default{
  props:{
    navIndex:{
      type:Number,
      default: () => {
        return 0
      }
    }
  },
  data(){
    return{

    }
  },
}
</script>
<style scoped>
  .nav{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    display: flex;
    height:50px;
    background:#171f2c;
    z-index:4;
  }
  .tab-item{
    flex:1;
    text-align: center;
    height:50px;
    line-height: 50px;
  }
  .initial{
    font-size: 15px;
    color: #7b92a5;
  }
  .on{
    color: #dfa55b;
    position: relative;
  }
  .on:after{
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    margin-left: -10px;
    width: 20px;
    height: 4px;
    background: #dfa55b;
  }
</style>
