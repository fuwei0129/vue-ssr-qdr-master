<template>
  <section>
    <div class="pdb52">
      <div
          class="futuresbox"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="true">
        <div class="item" v-for="(item,index) in questionData" :key="index">
          <div class="main">
            <div class="flex author-row">
              <div class="avatar lg-avatar" v-if="item.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
              <div class="avatar lg-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
              <div class="mid">
                <span class="uname mt5">{{item.name}}</span>
                <span class="others">{{item.showTime}} 来自{{item.source}}</span>
              </div>
              <div class="right">
                <span>关注</span>
              </div>
            </div>
            <div class="info" @click="todetail(item.questionId)">{{nameformat(item.content)}}</div>
          </div>
          <div class="reply" v-if="item.answerDTO && item.answerDTO.length">
            <div class="flex author-row">
              <div class="avatar sm-avatar" v-if="item.answerDTO[0].imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
              <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.answerDTO[0].imgUrl+')'}"></div>
              <div class="mid">
                <span class="uname mt8" style="color:#b7b8b8;">{{item.answerDTO[0].name}}</span>
              </div>
              <div class="r-time mt8">{{item.answerDTO[0].answerTime}}</div>
            </div>
            <div class="r-info">{{nameformat(item.answerDTO[0].answerContent)}}</div>
            <div class="futures-photos-box mt10" v-if="item.answerDTO[0].questionAccessory && item.answerDTO[0].questionAccessory.length">
              <span v-if="item.answerDTO[0].questionAccessory.length>3">{{item.answerDTO[0].questionAccessory.length}}图</span>
              <div class="galley">
                <div
                  class="single"
                  v-bind:style="{backgroundImage: 'url('+jtem.accessoryUrl+')'}"
                  v-for="(jtem,jndex) in item.answerDTO[0].questionAccessory"
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
    questionData(){
      return this.$store.getters.getQuestionData
    }
  },
  methods:{
    fetchList(){
      let model = {
        reqbase:{
          timestamp: common.getLastDate(),
          clientauthflag: common.getClientauthflag(),
          reqorigin: "xuantie",
          token: "",
          sourceip: common.getIp()
        },
        reqpage:{
          total:0,
          page: this.$store.getters.getQstPage,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      let that = this
      http.postmain(api.getQuestions,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam.length == 0){
              that.noMore = true
              that.isLoading = false
          }else{
            that.isMoreLoading = false
            that.isLoading = false
            that.$store.commit('setQuestionData',response.data.respparam)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addQstPage')
      var that = this
      setTimeout(() => {
        this.fetchList()
      },1000)
    },
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}});
    },
    nameformat(val){
      if(val.length>50){
        val = val.substr(0,50)+'...'
      }
      return val
    }
  }
}
</script>
<style>
</style>
