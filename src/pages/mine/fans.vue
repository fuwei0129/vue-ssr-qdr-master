<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div
          class="fanslst"
          v-if="$route.path == '/mine/fans'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="item" v-for="(item,index) in data" :key="index">
          <div class="avatar" v-if="item.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></div>
          <div class="avatar" v-else v-bind:style="{backgroundImage: 'url('+item.profilePhoto+')'}"></div>
          <div class="info">
            <!-- <p class="name">{{item.name}}<label style="background-image:url(../../public/img/ico_v.png)"></label></p> -->
            <p class="name">{{item.name}}</p>
            <p class="des">{{item.jobName}}</p>
          </div>
          <div class="buttons">
            <span class="follow" v-if="item.focusOn" @click.prevent="follow($event,item.uid)">互相关注</span>
            <span class="unfollow" v-else @click.prevent="follow($event,item.uid)">关注</span>
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
import { Toast } from 'mint-ui'
export default{
  name: "fans",
  data(){
    return{
      page:1,
      data:[],
      title:'我的粉丝',
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
        http.postmain(api.getFenSiList,model).then((response) => {
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
    follow(e,tid){
      e.stopPropagation();
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
          let obj = that.data
          for (var i = 0; i < obj.length; i++) {
            if(obj[i].uid == tid){
              if(obj[i].focusOn == false){
                Toast({
                  message: '关注成功',
                  position: 'middle',
                  duration: 2000
                })
                obj[i].focusOn = true
              }else{
                Toast({
                  message: '取消关注',
                  position: 'middle',
                  duration: 2000
                })
                obj[i].focusOn = false
              }
            }
          }
          that.data = obj
          //更新期问列表
          let obj1 = that.$store.getters.getQuestionData
          for (var i = 0; i < obj1.length; i++) {
            if(obj1[i].memberId == tid){
              if(obj1[i].isFollowVip == 0){
                Toast({
                  message: '关注成功',
                  position: 'middle',
                  duration: 2000
                })
                obj1[i].isFollowVip = 1
              }else{
                Toast({
                  message: '取消关注',
                  position: 'middle',
                  duration: 2000
                })
                obj1[i].isFollowVip = 0
              }
            }
          }
          that.$store.commit('resetQuestionData',obj1)
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.fanslst{
  margin-top:5px;
}
.fanslst .item{
  padding:15px;
  background:#161f2e;
  margin-bottom:2px;
  display: flex;
}
.avatar{
  width:50px;
  height:50px;
  border-radius: 50%;
  margin-right:10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.info{
  flex:1;
}
.name{
  color:#dbdbdb;
  font-size:16px;
  height:25px;
  line-height: 25px;
}
.name label{
  width:15px;
  height:15px;
  margin-left:5px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  top:1px;
}
.des{
  color:#898989;
}
.buttons{
  width:100px;
}
.buttons span{
  margin-top:10px;
  display: inline-block;
  border-radius: 3px;
  float: right;
}
.unfollow{
  border:1px solid #d29446;
  color:#d29446;
  padding:3px 7px;
}
.unfollow:before{
  content:'+';
}
.follow{
  padding:3px 5px;
  border:1px solid #7183a3;
  color:#7183a3;
}
.follow:before{
  content:'';
  display: inline-block;
  width:13px;
  height:10px;
  margin-right:3px;
  background:url(/public/img/ico_mutual.png) no-repeat center;
  background-size: contain;
}
</style>
