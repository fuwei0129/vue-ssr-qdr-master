<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div
          class="nlst"
          v-if="$route.path == '/mine/notification'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="item" v-for="(item,index) in data" :key="index" @click="todetail(item)">
          <span class="time">{{item.createTime | datefilter3}}</span>
          <div class="main">
            <div class="inner">
              <span class="avatar" v-if="item.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></span>
              <span class="avatar" v-else v-bind:style="{backgroundImage: 'url('+user.profilePhoto+')'}"></span>
              <span class="uname">#{{item.nickName}}</span>
              <label class="tips" v-if="item.noticeType == 'QWA'">回答了您的提问</label>
              <label class="tips" v-else>评论了您的回答</label>
            </div>
            <p class="content">{{item.content}}</p>
          </div>
        </div>
      </div>
      <!--显示加载中-->
      <div class="loading-box" v-if="isLoading">
          <mt-spinner type="snake" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="no-more" v-if="noMore">没有更多了~</div>
    </div>
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
import Head from '../../components/head.vue'
export default{
  name:'notification',
  data(){
    return{
      title:'消息中心',
      page:1,
      data:[],
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  components:{
    Head
  },
  mounted(){
    // var that = this
    // setTimeout(() => {
    //   that.fetchData()
    // },500)
  },
  activated(){
    var that = this
    if(sessionStorage.user){
      setTimeout(() => {
        that.fetchData(true)
      },500)
    }else{
      this.$router.replace({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    fetchData(isFirst){
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
          page: this.page,
          size: 10,
          count: true
        },
        reqparam:{
          busiType: 3,
          recieverID: this.user.memberId
        }
      }
      let that = this
      http.postmain(api.getNotice,model).then((response) => {
        if(isFirst){
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore = true
            }else{
              that.noMore = false
              that.data = response.data.respparam
            }
          }else{
            console.log("出错")
          }
        }else{
          that.isLoading = false
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore = true
            }else{
              that.isMoreLoading = false
              that.data = that.data.concat(response.data.respparam)
            }
          }else{
            console.log("出错")
          }
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.page++
      var that = this
      setTimeout(() => {
        that.fetchData(false)
      },1000)
    },
    todetail(item){
      if(item.noticeType == "QWA"){
        this.$router.push({name:'futuresdetail',params:{id:item.answerId}})
      }else{
        this.$router.push({name:'futuresreply',params:{id:item.answerId,qid:item.questionId}})
      }
    }
  }
}
</script>
<style scoped>
.nlst{
  margin-top:10px;
}
.item{
  margin-bottom:10px;
  text-align: center;
}
.time{
  display: inline-block;
  background:#161f2e;
  padding:3px 5px;
  border-radius: 5px;
  font-size:12px;
  color:#777;
  margin:0 auto 10px auto;
}
.main{
  padding:15px 20px;
  overflow: hidden;
  background:#161f2e;
  text-align: left;
}
.inner{
  clear:both;
  height:30px;
  margin-bottom:10px;
}
.avatar{
  width:30px;
  height:30px;
  border-radius: 50%;
  margin-right:10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: block;
  float:left;
}
.uname{
  color:#dfa55b;
  font-size:15px;
  float:left;
  display: block;
  height:30px;
  line-height: 30px;
}
.tips{
  float:left;
  margin-left:10px;
  color:#fff;
  font-size:15px;
  height:30px;
  line-height: 30px;
}
.content{
  color:#777;
}
</style>
