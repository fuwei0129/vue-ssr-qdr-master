<template>
  <section>
    <mt-swipe :auto="4000" :defaultIndex="0" style="height:180px">
      <mt-swipe-item
          v-for="(item,index) in accountData.adGN"
          :class="index == 0 ? 'is-active' : ''"
          :key="index"
          :prevent="false"
          :stopPropagation="false"
          v-if="item.picUrl != null">
        <img :src="item.picUrl" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="alst mt10">
      <div class="item" v-for="item in accountData.qhGN">
        <div class="logo" v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div>
        <div class="info"><span>{{item.title}}</span><label>{{item.desc}}</label></div>
        <div class="buttons"><button @click="openaccount(item.title)">开户</button></div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
export default{
  /**
   * [SSR获取所有组件的asyncData并执行获得初始数据]
   * @param  {[Object]} store [Vuex Store]
   * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
   */
  asyncData (store, route) {
    let model = {
      reqbase:{
        timestamp: common.getLastDate(),
        clientauthflag: common.getClientauthflag(),
        reqorigin: "xuantie",
        token: "",
        sourceip: "127.0.0.1"
      },
      reqpage:{
        total:0,
        page: 1,
        size: 10,
        count: true
      },
      reqparam:{}
    }
    return store.dispatch('fetchAccountList', { model }) // 服务端渲染触发
  },
  name:'accountindex',
  data(){
    return{

    }
  },
  // 计算属性
  computed: {
    accountData() {
      return this.$store.getters.getAccountList
    }
  },
  methods:{
    openaccount(title){
      if(title == '中辉期货'){
        window.open()
      }else if(title == "申银万国"){
        this.$router.push({name:'sywg'})
      }
    }
  }
}
</script>
<style scoped>
.alst .item{
  padding:15px;
  overflow: hidden;
  background:#161f2e;
  margin-bottom:2px;
  display: flex;
}
.logo{
  width:55px;
  height:55px;
  border-radius: 3px;
  margin-right:10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.info{
  flex:1;
}
.info span{
  display: block;
  color:#fff;
  font-size:17px;
  margin-bottom:5px;
}
.info label{
  display: block;
  color:#97a0b0;
  font-size:13px;
}
.buttons{
  width:100px;
  text-align: right;
}
.buttons button{
  background:#efa548;
  text-align: center;
  height:30px;
  margin-top:12px;
  padding:0 20px;
  border-radius: 3px;
  color:#171f2c;
  font-size:15px;
  letter-spacing: 1px;
}
</style>
