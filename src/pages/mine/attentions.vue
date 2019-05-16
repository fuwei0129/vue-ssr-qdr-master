<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div class="tab">
        <div @click="setVal(0)"><span :class="currentIndex == 0 ? 'on' : ''">问题</span></div>
        <div @click="setVal(1)"><span :class="currentIndex == 1 ? 'on' : ''">用户</span></div>
      </div>
      <div v-show="currentIndex == 0">
        <div
            class="qlst"
            v-if="$route.path == '/mine/attentions' && currentIndex == 0"
            v-infinite-scroll="loadMore1"
            infinite-scroll-disabled="isMoreLoading1"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="false">
          <div class="item" v-for="(item,index) in data1" :key="index" @click="todetail(item.tId)">
            <p class="title">{{item.content && item.content.length>40 ? item.content.substr(0,40) + '...' : item.content}}</p>
            <p><span>{{item.answerNum}}个回答·{{item.participation}}人关注</span></p>
          </div>
        </div>
        <!--显示加载中-->
        <div class="loading-box" v-if="isLoading1">
            <mt-spinner type="snake" class="loading-more"></mt-spinner>
            <span class="loading-more-txt">加载中...</span>
        </div>
        <div class="no-more" v-if="noMore1">没有更多了~</div>
      </div>
      <div v-show="currentIndex == 1">
        <div
            class="flst"
            v-if="$route.path == '/mine/attentions' && currentIndex == 1"
            v-infinite-scroll="loadMore2"
            infinite-scroll-disabled="isMoreLoading2"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="false">
          <div class="item" v-for="(item,index) in data2" :key="index">
            <div class="avatar" v-if="item.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></div>
            <div class="avatar" v-else v-bind:style="{backgroundImage: 'url('+item.profilePhoto+')'}"></div>
            <div class="info">
              <p class="name">{{item.name}}</p>
              <p class="des">{{item.jobName}}</p>
            </div>
          </div>
        </div>
        <div class="loading-box" v-if="isLoading2">
            <mt-spinner type="snake" class="loading-more"></mt-spinner>
            <span class="loading-more-txt">加载中...</span>
        </div>
        <div class="no-more" v-if="noMore2">没有更多了~</div>
        <!-- <span style="color:#fff;">12321</span> -->
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
  name: "attentions",
  data(){
    return{
      title:'我的关注',
      currentIndex:0,
      page1:1,
      data1:[],
      isLoading1:false, //是否显示加载中
      isMoreLoading1:false, //是否加载更多
      noMore1:false, //是否还有更多
      page2:1,
      data2:[],
      isLoading2:false, //是否显示加载中
      isMoreLoading2:false, //是否加载更多
      noMore2:false //是否还有更多
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
        that.fetchData1(true)
        that.fetchData2(true)
      },500)
    }else{
      this.$router.push({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    setVal(v){
      this.currentIndex = v
    },
    fetchData1(isFirst){
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
          page: this.page1,
          size: 10,
          count: true
        },
        reqparam:{
          uid:this.user.memberId
        }
      }
      let that = this
      http.postmain(api.getAttentionQuesList,model).then((response) => {
        if(isFirst){
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore1 = true
            }else{
              that.noMore1 = false
              that.data1 = response.data.respparam
            }
          }else{
            console.log("出错")
          }
        }else{
          that.isLoading1 = false
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore1 = true
            }else{
              that.isMoreLoading1 = false
              that.data1 = that.data1.concat(response.data.respparam)
            }
          }else{
            console.log("出错")
          }
        }
      })
    },
    fetchData2(isFirst){
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
          page: this.page2,
          size: 10,
          count: true
        },
        reqparam:{
          uid:this.user.memberId
        }
      }
      let that = this
      http.postmain(api.getAttentionManList,model).then((response) => {
        if(isFirst){
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore2 = true
            }else{
              that.noMore2 = false
              that.data2 = response.data.respparam
            }
          }else{
            console.log("出错")
          }
        }else{
          that.isLoading2 = false
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore2 = true
            }else{
              that.isMoreLoading2 = false
              that.data2 = that.data2.concat(response.data.respparam)
            }
          }else{
            console.log("出错")
          }
        }
      })
    },
    loadMore1(){
      this.isMoreLoading1 = true // 设置加载更多中
      this.isLoading1 = true // 加载中转圈圈
      this.page1++
      var that = this
      setTimeout(() => {
        that.fetchData1(false)
      },1000)
    },
    loadMore2(){
      this.isMoreLoading2 = true // 设置加载更多中
      this.isLoading2 = true // 加载中转圈圈
      this.page2++
      var that = this
      setTimeout(() => {
        that.fetchData2(false)
      },1000)
    },
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}});
    }
  }
}
</script>
<style scoped>
.tab{
  background:#161f2e;
  padding:15px 20px;
  display: flex;
  margin-top:1px;
}
.tab div{
  flex:1;
}
.tab div span{
  width:60px;
  margin:0 auto;
  text-align: center;
  display: block;
  color:#dbdbdb;
  font-size:15px;
}
.tab div span.on{
  color:#efa64a;
  position: relative;
}
.tab div span.on:after{
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 60px;
  height: 3px;
  background: #dfa55b;
}
.qlst{
  margin-top:5px;
}
.qlst .item{
  padding:15px;
  background:#161f2e;
  margin-bottom:2px;
}
.qlst .item p.title{
  color:#dbdbdb;
  font-size:16px;
  margin-bottom:10px;
}
.qlst .item span{
  color:#898989;
  height:20px;
  line-height: 20px;
  display: inline-block;
}
.qlst .item span.time{
  font-size:10px;
}
.flst{
  margin-top:5px;
}
.flst .item{
  padding:15px;
  background:#161f2e;
  margin-bottom:2px;
  display: flex;
}
.avatar{
  width:50px;
  height:50px;
  border-radius: 50%;
  margin-right:15px;
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
  word-break: break-all;
}
</style>
