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
        <div class="article-bottom-features">
          <span class="fl">阅读 {{article.reading}}</span>
          <span class="fr ico_like">{{article.dianZan}}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../utils/api'
import http from '../../utils/http'
import common from '../../utils/common'
import Head from '../../components/head.vue'
export default{
  asyncData (store, route) {
    let fId = route.params.id // 文章id
    let sourceTable = route.params.type //文章类型
    let user = store.getters.getUser //user
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
        createBy:user?user.memberId:null,
        fId:fId,
        sourceTable:sourceTable
      }
    }
    return store.dispatch('fetchRecommendDetail', { model }) // 服务端渲染执行
  },
  name: "newsdetail",
  data(){
    return{
      title:'新闻详情'
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    article () {
      return this.$store.getters.getRecDetail // 推荐详情
    }
  },
  components:{
    Head
  },
  mounted(){
    console.log(this.user)
    this.reading()
  },
  methods:{
    reading(){
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
          busiId: this.article.param.id,
					busiType: this.article.type,
					fType: '1',
					operateId: this.user ? this.user.memberId : null
        }
      }
      http.postmain(api.readingInsert,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          // console.log("阅读文章+1")
        }else{
          // console.log("出错")
        }
      })
    }
  }
}
</script>
<style>
</style>
