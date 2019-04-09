<template>
  <section>
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="1">推荐</mt-tab-item>
      <mt-tab-item id="2">7*24</mt-tab-item>
      <mt-tab-item id="3">直播</mt-tab-item>
      <mt-tab-item id="4">专栏</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1"><news :panel="selected" :banners="newsbanners" :lists="newslists"></news></mt-tab-container-item>
      <mt-tab-container-item id="2"><flash :panel="selected"></flash></mt-tab-container-item>
      <mt-tab-container-item id="3"><live :panel="selected"></live></mt-tab-container-item>
      <mt-tab-container-item id="4"><columns :panel="selected"></columns></mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>
<script>
import news from '../news/index.vue'
import flash from '../flash/index.vue'
import live from '../live/index.vue'
import columns from '../column/index.vue'
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
    return store.dispatch('fetchRecommendLists', { model }) // 服务端渲染触发
  },
  data(){
    return{
      selected:this.$store.getters.getCurrentTabIndex
    }
  },
  components:{
    news,
    flash,
    live,
    columns
  },
  // 计算属性
  computed: {
    newsbanners(){
      return this.$store.getters.getBanners // 推荐列表(banner轮播)
    },
    newslists () {
      return this.$store.getters.getRecNews // 推荐列表（新闻）
    }
  },
  watch: {
    selected: function (val, oldVal){
      this.$store.commit('setCurrentTabIndex',val)
    }
  }
}
</script>
<style>
.mint-navbar.is-fixed{
  z-index:4;
}
.mint-navbar{
  background:#131a25;
  height:50px;
}
.mint-navbar .mint-tab-item{
  color:#7b92a5;
  position: relative;
}
.mint-navbar .mint-tab-item.is-selected{
  color:#dfa55b;
  border-bottom:none;
}
.mint-navbar .mint-tab-item.is-selected:after{
  content:'';
  position: absolute;
  bottom:12px;
  left:50%;
  margin-left:-10px;
  width:20px;
  height:4px;
  background:#dfa55b;
}
.mint-navbar .mint-tab-item-label{
  font-size:14px;
}
.mint-tab-container{
  margin-top:50px;
  margin-bottom:52px;
}
</style>
