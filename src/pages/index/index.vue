<template>
  <section>
      <news :banners="newsbanners" :lists="newslists"></news>
  </section>
</template>
<script>
import news from '../news/index.vue'
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
    }
  },
  components:{
    news
  },
  // 计算属性
  computed: {
    newsbanners(){
      return this.$store.getters.getBanners // 推荐列表(banner轮播)
    },
    newslists () {
      return this.$store.getters.getRecNews // 推荐列表（新闻）
    }
  }
}
</script>
<style>
</style>
