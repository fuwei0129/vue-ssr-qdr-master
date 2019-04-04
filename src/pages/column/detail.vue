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

          <div class="authorbox" v-if="sourceTable=='tpt_dkgd'">
            <div class="author-avatar"><img :src="article.profilePhoto" /></div>
            <div class="author-info"><span class="name">{{article.name}}</span><span class="time">{{article.param.time | datefilter}}</span></div>
            <div class="auth-buttons"><span>关注</span></div>
          </div>

          <div class="second" v-else><span class="datetime">{{article.param.time | datefilter}}</span><span class="sourceform">来源：{{article.param.sourcefrom}}</span></div>
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
      title:'专栏详情',
      sourceTable:this.$route.params.type
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
<style scoped>
.authorbox{
  margin-top:15px;
  display: flex;
  padding:0 5px;
}
.author-avatar{
  flex:0 0 50px;
  height:50px;
  margin-right:10px;
  border-radius: 50%;
  overflow: hidden;
}
.author-info{
  flex:1 1;
}
.author-info span{
  display:block;
  font-size:13px;
}
.name{
  margin-top:5px;
  color:#ef6838;
}
.time{
  color:#a2a7ad;
}
.auth-buttons span{
  display: inline-block;
  width:60px;
  height:25px;
  line-height:25px;
  margin-top: 10px;
  border-radius: 14px;
  border: 1px solid #ef6838;
  color: #ef6838;
  text-align: center;
  position: relative;
}
.auth-buttons span:before{
  content:'+ ';
}
</style>
