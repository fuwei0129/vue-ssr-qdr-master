<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div class="article-normal-box">
        <div v-if="article.param == null">
          <div class="nodata"></div>
        </div>
        <div v-else>
          <div class="title">{{article.param.title}}</div>
          <div class="second"><span class="datetime">{{article.param.time | datefilter}}</span><span class="sourceform">来源：{{article.param.sourcefrom}}</span></div>
          <div class="content" v-html="article.param.content"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
import Head from '../../components/head.vue'
export default{
  asyncData (store, route) {
    let id = route.params.id // 文章id
    let sourceTable = route.params.type //文章类型
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
      reqparam:{
        id:id,
        sourceTable:sourceTable,
        userId:null
      }
    }
    return store.dispatch('fetchColumnDetail', { model }) // 服务端渲染执行
  },
  name: "columndetail",
  data(){
    return{
      title:'专栏详情'
    }
  },
  // 计算属性
  computed: {
    article () {
      return this.$store.getters.getColDetail // 推荐详情
    }
  },
  components:{
    Head
  },
  mounted(){
    // let fId = this.$route.params.id // 文章id
    // let sourceTable = this.$route.params.type //文章类型
    // console.log(fId+'-'+sourceTable)
  }
}
</script>
<style>
</style>
