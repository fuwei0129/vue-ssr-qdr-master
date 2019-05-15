<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div class="asklst">
        <div class="item" v-for="(item,index) in data" :key="index" @click="todetail(item.tId)">
          <p class="title">{{item.content.length>40 ? item.content.substr(0,40) + '...' : item.content}}</p>
          <p><span>{{item.answerNum}}个回答·{{item.participation}}人参与</span><span class="fr time">{{item.modifyTime | datefilter3}}</span></p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
import Head from '../../components/head.vue'
import { Toast } from 'mint-ui'
export default{
  name: "asks",
  data(){
    return{
      page:1,
      data:[],
      title:'我的提问',
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
    setTimeout(() => {
      that.fetchData(true)
    },500)
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    fetchData(isFirst){
      if(this.user){
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
            uid:this.user.memberId
          }
        }
        let that = this
        http.postmain(api.getQuestionList,model).then((response) => {
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
      }else{
        this.$router.push({name:'sign'})
      }
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
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}});
    }
  }
}
</script>
<style scoped>
  .asklst{
    margin-top:5px;
  }
  .asklst .item{
    padding:15px;
    background:#161f2e;
    margin-bottom:2px;
  }
  .asklst .item p.title{
    color:#dbdbdb;
    font-size:16px;
    margin-bottom:10px;
  }
  .asklst .item span{
    color:#898989;
    height:20px;
    line-height: 20px;
    display: inline-block;
  }
  .asklst .item span.time{
    font-size:10px;
  }
</style>
