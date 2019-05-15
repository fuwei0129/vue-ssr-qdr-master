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
            <div class="auth-buttons">
              <span v-if="article.isFocusOn" @click.prevent="follow($event,article.param.tid)">已关注</span>
              <span class="unfollow" v-else @click.prevent="follow($event,article.param.tid)">关注</span>
            </div>
          </div>
          <div class="second" v-else><span class="datetime">{{article.param.time | datefilter}}</span><span class="sourceform">来源：{{article.param.sourcefrom}}</span></div>
          <div class="content" v-html="article.param.content"></div>
          <div class="article-bottom-features" v-show="article.param != null">
            <span class="fl">阅读 {{article.reading}}</span>
            <span class="fr ico_like_on" v-if="article.isDianZan">{{article.dianZan}}</span>
            <span class="fr ico_like_on" v-else-if="liked">{{article.dianZan+1}}</span>
            <span class="fr ico_like" v-else @click="like()">{{article.dianZan}}</span>
          </div>
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
import { Toast } from 'mint-ui'
export default{
  asyncData (store, route) {
    let id = route.params.id // 文章id
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
        id:id,
        sourceTable:sourceTable,
        userId:user?user.memberId:null
      }
    }
    return store.dispatch('fetchColumnDetail', { model }) // 服务端渲染执行
  },
  name: "columndetail",
  data(){
    return{
      title:'专栏详情',
      sourceTable:this.$route.params.type,
      liked:false
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    article () {
      return this.$store.getters.getColDetail // 推荐详情
    }
  },
  components:{
    Head
  },
  mounted(){
    setTimeout(() => {
      this.fetchDetail()
      this.reading()
    },500)
  },
  methods:{
    fetchDetail(){
      let fId = this.$route.params.id // 文章id
      let sourceTable = this.$route.params.type //文章类型
      let model = {
        reqbase:{
          timestamp: common.getLastDate(),
          clientauthflag: common.getClientauthflag(),
          reqorigin: "xuantie",
          token: common.getToken(),
          sourceip: common.getIp()
        },
        reqpage:{
          total:0,
          page: 1,
          size: 10,
          count: true
        },
        reqparam:{
          id:fId,
          sourceTable:sourceTable,
          userId:this.user?this.user.memberId:null
        }
      }
      this.$store.dispatch('fetchColumnDetail',{ model })
    },
    reading(){
      if(this.article.param == null){
        return
      }
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
    },
    like(){
      if(this.testWhetherDoLogin()){
        let model = {
          reqbase:{
            timestamp: common.getLastDate(),
            clientauthflag: common.getClientauthflag(),
            reqorigin:"xuantie",
            token:common.getToken(),
            sourceip:common.getIp()
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
  					fType: '2',
  					operateId: this.user.memberId
          }
        }
        var that = this
        http.postmain(api.readingInsert,model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            that.liked = true
            // console.log("已点赞")
          }else{
            console.log("出错")
          }
        })
      }
    },
    follow(e,tid){
      e.stopPropagation();
      if(this.testWhetherDoLogin()){
        let data = {
          reqbase:{
            timestamp:common.getLastDate(),
            clientauthflag:common.getClientauthflag(),
            reqorigin:"xuantie",
            token:common.getToken(),
            sourceip:common.getIp()
          },
          reqpage:{},
          reqparam:{
            tid:tid,
            type:'1',
            uid:this.user.memberId
          }
        }
        var that = this
        http.postmain(api.attentionOrNo,data).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            let obj = that.$store.getters.getColDetail
            if(obj.isFocusOn){
              obj.isFocusOn = false
              Toast({
                message: '取消关注',
                position: 'middle',
                duration: 2000
              })
            }else{
              obj.isFocusOn = true
              Toast({
                message: '关注成功',
                position: 'middle',
                duration: 2000
              })
            }
            that.$store.commit('setColDetail',obj)
          }else{
            Toast({
              message: response.data.respbase.returnmsg,
              position: 'middle',
              duration: 2000
            })
          }
        })
      }
    },
    testWhetherDoLogin() {
      if (this.user) {
        return true
      }
      this.$router.push({ name: 'sign', params: { parentPath: this.$route.path } })
    }
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
  line-height:23px;
  margin-top: 10px;
  border-radius: 14px;
  border: 1px solid #ef6838;
  color: #ef6838;
  text-align: center;
  position: relative;
}
.auth-buttons span.unfollow:before{
  content:'+ ';
}
</style>
