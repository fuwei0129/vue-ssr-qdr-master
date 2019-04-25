<template>
  <section>
    <mt-tabbar v-model="selected" v-show="showNav" fixed>
      <mt-tab-item id="1">
        <img
            slot="icon"
            src="../../public/img/ico_01_on.png"
            v-if="route === '/' || route === '/flash/index' || route === '/live/index' || route === '/column/index'">
        <img slot="icon" src="../../public/img/ico_01.png" v-else>
        资讯
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../../public/img/ico_02_on.png" v-if="route === '/market/index'">
        <img slot="icon" src="../../public/img/ico_02.png" v-else>
        行情
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../../public/img/ico_03_on.png" v-if="route === '/futures/index'">
        <img slot="icon" src="../../public/img/ico_03.png" v-else>
        达人
      </mt-tab-item>
      <mt-tab-item id="4">
        <img slot="icon" src="../../public/img/ico_04_on.png" v-if="selected == '4'">
        <img slot="icon" src="../../public/img/ico_04.png" v-else>
        开户
      </mt-tab-item>
      <mt-tab-item id="5">
        <img slot="icon" src="../../public/img/ico_05_on.png" v-if="route === '/mine/index'">
        <img slot="icon" src="../../public/img/ico_05.png" v-else>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </section>
</template>
<script>
export default{
  props: {
  	'showNav': {
  		type: Boolean,
  		default: true
  	}
  },
  data(){
    return{
      selected:'1'
    }
  },
  computed: {
  	route () {
      if(this.$route.path == "/"){
        this.selected = '1'
      }else if(this.$route.path == "/market/index"){
        this.selected = '2'
      }else if(this.$route.path == "/futures/index"){
        this.selected = '3'
      }else if(this.$route.path == "/mine/index"){
        this.selected = '5'
      }
      return this.$route.path
  	}
  },
  watch: {
      selected: function (val, oldVal) {
          if(val == "1"){
            this.$router.push({name:'index'})
          }else if(val == "2"){
            this.$router.push({name:'marketindex'})
          }else if(val == "3"){
            this.$router.push({name:'futuresindex'})
          }else if(val == "4"){

          }else if(val == "5"){
            this.$router.push({name:'mineindex'})
          }
      }
  }
}
</script>
<style>
.mint-tabbar.is-fixed{
  z-index:4;
}
.mint-tabbar{
  background-color:#08111c;
  background-image:none;
}
.mint-tabbar > .mint-tab-item.is-selected{
  background-color:#08111c;
  color:#efa548;
}
.mint-tabbar .mint-tab-item{
  color:#c2ccdd;
}
.mint-tabbar .mint-tab-item-icon{
  width:20px;
  height:20px;
}
.mint-tabbar .mint-tab-item-label{
  font-size:13px;
}
</style>
