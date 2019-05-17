<template>
  <section>
    <div class="pdb52">
      <div
          class="futuresbox"
          v-if="$route.path == '/futures/index'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="item" v-for="(item,index) in questionData" :key="index" @click="todetail(item.questionId)">
          <div class="main">
            <div class="flex author-row">
              <div class="avatar lg-avatar" v-if="item.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
              <div class="avatar lg-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
              <div class="mid">
                <p>
                  <span class="uname mt5">{{item.name}}</span>
                  <label v-if="item.isVip==1" style="background-image:url(../../public/img/ico_vip.png)"></label>
                </p>
                <p class="others">{{item.showTime}} 来自{{item.source}}</p>
              </div>
              <div class="right">
                <span v-if="item.isFollowVip == 1" @click.prevent="follow($event,item.memberId)">已关注</span>
                <span class="unfollow" v-else @click.prevent="follow($event,item.memberId)">关注</span>
              </div>
            </div>
            <div class="info">{{nameformat(item.content)}}</div>
          </div>
          <div class="reply" v-if="item.answerDTO && item.answerDTO.answerId" @click.prevent="torydetail($event,item.answerDTO.answerId,item.questionId)">
            <div class="flex author-row">
              <div class="avatar sm-avatar" v-if="item.answerDTO.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
              <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.answerDTO.imgUrl+')'}"></div>
              <div class="mid">
                <p>
                  <span class="uname mt8" style="color:#b7b8b8;">{{item.answerDTO.name}}</span>
                  <label v-if="item.answerDTO.isVip==1" style="background-image:url(../../public/img/ico_vip.png)"></label>
                </p>
              </div>
              <div class="r-time mt8">{{item.answerDTO.answerTime}}</div>
            </div>
            <div class="r-info">{{nameformat(item.answerDTO.answerContent)}}</div>
            <div class="futures-photos-box mt10" v-if="item.answerDTO.questionAccessory && item.answerDTO.questionAccessory.length">
              <span v-if="item.answerDTO.questionAccessory.length>3">{{item.answerDTO.questionAccessory.length}}图</span>
              <div class="galley">
                <div
                  class="single"
                  v-bind:style="{backgroundImage: 'url('+jtem.accessoryUrl+')'}"
                  v-for="(jtem,jndex) in item.answerDTO.questionAccessory"
                  @click.prevent="preview($event,jndex,item.answerDTO.questionAccessory)"
                  v-if="jndex < 3"></div>
              </div>
            </div>
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
import { ImagePreview } from 'vant'
import { Toast } from 'mint-ui'
export default{
  /**
   * [SSR获取所有组件的asyncData并执行获得初始数据]
   * @param  {[Object]} store [Vuex Store]
   * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
   */
  asyncData (store, route) {
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
        questionId:'',
        userId:user?user.memberId:null
      }
    }
    return store.dispatch('fetchQuestions', { model }) // 服务端渲染触发
  },
  name:'futuresindex',
  data(){
    return{
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    questionData(){
      var lst = []
      var data = this.$store.getters.getQuestionData
      for(var i=0;i<data.length;i++){
        if(data[i].answerDTO && data[i].answerDTO.length<=1){
          var arr = {
            questionId:'',
            answerNum: 0,
            showTime: "",
            source: "",
            content: "",
            memberId: "",
            name: "",
            imgUrl: "",
            isFollowVip: 0,
            isFollowQuestion: 0,
            isToPraise: 0,
            isVip: 0,
            answerDTO:null,
            questionAccessory:null
          }
          arr.questionId = data[i].questionId
          arr.answerNum = data[i].answerNum
          arr.showTime = data[i].showTime
          arr.source = data[i].source
          arr.content = data[i].content
          arr.memberId = data[i].memberId
          arr.name = data[i].name
          arr.imgUrl = data[i].imgUrl
          arr.isFollowVip = data[i].isFollowVip
          arr.isFollowQuestion = data[i].isFollowQuestion
          arr.isToPraise = data[i].isToPraise
          arr.isVip = data[i].isVip
          arr.questionAccessory = data[i].questionAccessory
          arr.answerDTO = data[i].answerDTO[0]
          lst.push(arr)
        }else{
            for(var j = 0;j<data[i].answerDTO.length;j++){
              var arr = {
                questionId:'',
                answerNum: 0,
            		showTime: "",
            		source: "",
            		content: "",
            		memberId: "",
            		name: "",
            		imgUrl: "",
            		isFollowVip: 0,
            		isFollowQuestion: 0,
            		isToPraise: 0,
            		isVip: 0,
                answerDTO:null,
                questionAccessory:null
              }
              arr.questionId = data[i].questionId
              arr.answerNum = data[i].answerNum
              arr.showTime = data[i].showTime
              arr.source = data[i].source
              arr.content = data[i].content
              arr.memberId = data[i].memberId
              arr.name = data[i].name
              arr.imgUrl = data[i].imgUrl
              arr.isFollowVip = data[i].isFollowVip
              arr.isFollowQuestion = data[i].isFollowQuestion
              arr.isToPraise = data[i].isToPraise
              arr.isVip = data[i].isVip
              arr.questionAccessory = data[i].questionAccessory
              arr.answerDTO = data[i].answerDTO[j]
              lst.push(arr)
            }
        }
      }
      return lst
    }
  },
  watch:{
    user(newVal,oldVal){
      if(newVal != oldVal){
        this.$store.commit('resetQstPage')
        setTimeout(() => {
          this.fetchList(true)
        },500)
      }
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchList(true)
    },500)
  },
  activated(){
    // console.log("activated")
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    preview(e,index,imgs){
      e.stopPropagation();
      let arr = []
      for (var i = 0; i < imgs.length; i++) {
        arr.push(imgs[i].accessoryUrl)
      }
      ImagePreview({
        images: arr,
        startPosition: index
      })
    },
    fetchList(isFirst){
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
          page: isFirst?1:this.$store.getters.getQstPage,
          size: 10,
          count: true
        },
        reqparam:{
          questionId:'',
          userId:this.user?this.user.memberId:null
        }
      }
      let that = this
      http.postmain(api.getQuestions,model).then((response) => {
        if(isFirst){
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              console.log("无数据")
            }else{
              that.$store.commit('resetQuestionData',response.data.respparam)
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
              that.$store.commit('setQuestionData',response.data.respparam)
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
      this.$store.commit('addQstPage')
      var that = this
      setTimeout(() => {
        that.fetchList(false)
      },1000)
    },
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}})
    },
    torydetail(e,id,qid){
      e.stopPropagation();
      this.$router.push({name:'futuresreply',params:{id:id,qid:qid}})
    },
    nameformat(val){
      if(val.length>50){
        val = val.substr(0,50)+'...'
      }
      return val
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
            let obj = that.$store.getters.getQuestionData
            for (var i = 0; i < obj.length; i++) {
              if(obj[i].memberId == tid){
                if(obj[i].isFollowVip == 0){
                  Toast({
                    message: '关注成功',
                    position: 'middle',
                    duration: 2000
                  })
                  obj[i].isFollowVip = 1
                }else{
                  Toast({
                    message: '取消关注',
                    position: 'middle',
                    duration: 2000
                  })
                  obj[i].isFollowVip = 0
                }
              }
            }
            that.$store.commit('resetQuestionData',obj)
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
<style>
</style>
