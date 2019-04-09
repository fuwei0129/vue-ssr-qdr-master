<template>
  <section>
    <mt-tabbar v-model="selected" v-show="showNav" fixed>
      <mt-tab-item id="1">
        <img slot="icon" src="../../public/ico_01_on.png" v-if="selected == '1'">
        <img slot="icon" src="../../public/ico_01.png" v-else>
        资讯
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../../public/ico_02_on.png" v-if="selected == '2'">
        <img slot="icon" src="../../public/ico_02.png" v-else>
        行情
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../../public/ico_03_on.png" v-if="selected == '3'">
        <img slot="icon" src="../../public/ico_03.png" v-else>
        达人
      </mt-tab-item>
      <mt-tab-item id="4">
        <img slot="icon" src="../../public/ico_04_on.png" v-if="selected == '4'">
        <img slot="icon" src="../../public/ico_04.png" v-else>
        开户
      </mt-tab-item>
      <mt-tab-item id="5">
        <img slot="icon" src="../../public/ico_05_on.png" v-if="selected == '5'">
        <img slot="icon" src="../../public/ico_05.png" v-else>
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

}
</script>
<style>
.mint-tabbar.is-fixed{
  z-index:4;
}
.mint-tabbar{
  background-color:#08111c;
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
