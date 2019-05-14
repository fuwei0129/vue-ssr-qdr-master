<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <!-- <span class="icon-add" slot="right" @click="answer(1)">写回答</span> -->
      <mt-button icon="more" slot="right" @click="showpopup"></mt-button>
    </mt-header>
    <div class="pop-panel" v-show="popupVisible" @click="hidepopup">
      <div class="customize-widget" @click.prevent="$event.stopPropagation();">
        <span v-if="questiondetail.isFollowQuestion == 0" @click="followQst(questiondetail.questionId)">关注</span>
        <span v-else @click="followQst(questiondetail.questionId)">已关注</span>
      </div>
    </div>
    <div class="futures-detail-box pdt40 mt5">
      <div class="ask-box">
        <p class="title">{{questiondetail.content}}</p>
        <div class="flex author-row">
          <div class="avatar lg-avatar" v-if="questiondetail.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
          <div class="avatar lg-avatar" v-else v-bind:style="{backgroundImage: 'url('+questiondetail.imgUrl+')'}"></div>
          <div class="mid">
            <p>
              <span class="uname mt5">{{questiondetail.name}}</span>
              <label v-if="questiondetail.isVip==1" style="background-image:url(../../public/img/ico_vip.png)"></label>
            </p>
            <p class="others">{{questiondetail.showTime}}</p>
          </div>
          <div class="right">
            <span v-if="questiondetail.isFollowVip == 1" @click.prevent="followUser($event,questiondetail.memberId,'1')">已关注</span>
            <span v-else @click.prevent="followUser($event,questiondetail.memberId,'1')">关注</span>
          </div>
        </div>
        <div class="futures-photos-box half mt15" v-if="questiondetail.questionAccessory && questiondetail.questionAccessory.length">
          <span v-if="questiondetail.questionAccessory.length > 1">{{questiondetail.questionAccessory.length}}图</span>
          <div
              class="cover"
              @click.prevent="preview($event,questiondetail.questionAccessory)"
              v-bind:style="{backgroundImage: 'url('+questiondetail.questionAccessory[0].accessoryUrl+')'}"></div>
        </div>
      </div>
      <div class="answer-box mt8">
        <div class="summary-bar-head">
          <span>回答（{{questiondetail.answerNum}}）</span>
          <!-- <div class="fr"><label>按最新</label></div> -->
        </div>
        <div class="answer-list" v-if="questiondetail.answerDTO && questiondetail.answerDTO.length">
          <div class="answer-item" v-for="item in questiondetail.answerDTO" @click="todetail(item.answerId,questiondetail.questionId)">
            <div class="pd15">
              <div class="flex author-row">
                <div class="avatar sm-avatar" v-if="item.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
                <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
                <div class="mid">
                  <p>
                    <span class="mini-uname">{{item.name}}</span>
                    <label v-if="item.isVip==1" style="background-image:url(../../public/img/ico_vip.png)"></label>
                  </p>
                  <p class="others">{{item.source}}</p>
                </div>
                <div class="right">
                  <span v-if="item.isFollowVip == 1" @click.prevent="followUser($event,item.answerMemberId,'2')">已关注</span>
                  <span v-else @click.prevent="followUser($event,item.answerMemberId,'2')">关注</span>
                </div>
              </div>
              <div class="answer-info">
                <p>{{item.answerContent}}</p>
                <div class="futures-photos-box half mt5" v-if="item.questionAccessory && item.questionAccessory.length">
                  <span v-if="item.questionAccessory.length>1">{{item.questionAccessory.length}}图</span>
                  <div
                      class="cover"
                      @click.prevent="preview($event,item.questionAccessory)"
                      v-bind:style="{backgroundImage: 'url('+item.questionAccessory[0].accessoryUrl+')'}"></div>
                </div>
                <span class="time">{{item.answerTime}}</span>
              </div>
              <div class="comment-list" v-if="item.commentList && item.commentList.length">
                <div class="comment-item" v-for="kitem in item.commentList">
                  <div class="flex author-row">
                    <div class="avatar mini-avatar" v-if="kitem.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
                    <div class="avatar mini-avatar" v-else v-bind:style="{backgroundImage: 'url('+kitem.imgUrl+')'}"></div>
                    <div class="mid">
                      <span class="mini-uname mt5">{{kitem.name}}</span>
                    </div>
                  </div>
                  <p>{{kitem.comment}}</p>
                </div>
              </div>
            </div>
            <div class="item-buttons-bottom border-top">
              <div><span class="ico_zf">{{item.shareNum}}</span></div>
              <div><span class="ico_comment">{{item.commentNum}}</span></div>
              <div v-if="item.isToPraise == 1" @click.prevent="$event.stopPropagation();"><span class="ico_like ico_like_on">{{item.toPraiseNum}}</span></div>
              <div v-else @click.prevent="like($event,item.answerId)"><span class="ico_like">{{item.toPraiseNum}}</span></div>
              <!-- <div><span class="ico_rewards">5</span></div> -->
            </div>
          </div>
        </div>
      </div>
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
  asyncData (store, route) {
    let questionId = route.params.id // 期问id
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
        questionId:questionId,
        userId:user?user.memberId:null
      }
    }
    return store.dispatch('fetchQuestionDetail', { model }) // 服务端渲染执行
  },
  name:'futuresdetail',
  data(){
    return{
      popupVisible:false
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    questiondetail () {
      return this.$store.getters.getQuestionDetail // 期问详情
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchDetail()
    },500)
  },
  activated(){
    // console.log("activated")
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    showpopup(){
      this.popupVisible = true
    },
    hidepopup(){
      this.popupVisible = false
    },
    fetchDetail(){
      let questionId = this.$route.params.id // 期问id
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
          questionId:questionId,
          userId:this.user?this.user.memberId:null
        }
      }
      let that = this
      http.postmain(api.findQuestion,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.$store.commit('setQuestionDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      })
    },
    testWhetherDoLogin() {
      if (this.user) {
        return true
      }
      this.$router.push({ name: 'sign', params: { parentPath: this.$route.path } })
    },
    preview(e,imgs){
      e.stopPropagation();
      let arr = []
      for (var i = 0; i < imgs.length; i++) {
        arr.push(imgs[i].accessoryUrl)
      }
      ImagePreview(arr)
    },
    followQst(tid,type){
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
            type:'3',
            uid:this.user.memberId
          }
        }
        var that = this
        http.postmain(api.attentionOrNo,data).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            let obj = that.$store.getters.getQuestionDetail
            if(obj.isFollowQuestion == 0){
              obj.isFollowQuestion = 1
              Toast({
                message: '关注成功',
                position: 'middle',
                duration: 2000
              })
            }else{
              obj.isFollowQuestion = 0
              Toast({
                message: '取消关注',
                position: 'middle',
                duration: 2000
              })
            }
            that.popupVisible = false
            that.$store.commit('setQuestionDetail',obj)
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
    followUser(e,tid,type){
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
            let obj = that.$store.getters.getQuestionDetail
            if(type == '1'){ //关注提问题的人
              if(obj.isFollowVip == 0){
                obj.isFollowVip = 1
                Toast({
                  message: '关注成功',
                  position: 'middle',
                  duration: 2000
                })
              }else{
                obj.isFollowVip = 0
                Toast({
                  message: '取消关注',
                  position: 'middle',
                  duration: 2000
                })
              }
            }else if(type == '2'){//关注回答的人
              for (var i = 0; i < obj.answerDTO.length; i++) {
                if(obj.answerDTO[i].answerMemberId == tid){
                  if(obj.answerDTO[i].isFollowVip == 0){
                    Toast({
                      message: '关注成功',
                      position: 'middle',
                      duration: 2000
                    })
                    obj.answerDTO[i].isFollowVip = 1
                  }else{
                    Toast({
                      message: '取消关注',
                      position: 'middle',
                      duration: 2000
                    })
                    obj.answerDTO[i].isFollowVip = 0
                  }
                }
              }
            }
            that.$store.commit('setQuestionDetail',obj)

            //更新外面的列表的状态
            let obj1 = that.$store.getters.getQuestionData
            for (var i = 0; i < obj1.length; i++) {
              if(obj1[i].memberId == tid){
                if(obj1[i].isFollowVip == 0){
                  obj1[i].isFollowVip = 1
                }else{
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
    },
    like(e,bid){
      e.stopPropagation();
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
            busiId: bid,
  					busiType: 10,
  					fType: '2',
  					operateId: this.user.memberId
          }
        }
        var that = this
        http.postmain(api.readingInsert,model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            let obj = that.$store.getters.getQuestionDetail
            for (var i = 0; i < obj.answerDTO.length; i++) {
              if(obj.answerDTO[i].answerId == bid){
                obj.answerDTO[i].isToPraise = 1
                obj.answerDTO[i].toPraiseNum++
              }
            }
            that.$store.commit('setQuestionDetail',obj)
          }else{
            console.log("出错")
          }
        })
      }
    },
    answer(id){
      this.$router.push({name:'answer',params:{id:id}});
    },
    todetail(id,qid){
      this.$router.push({name:'futuresreply',params:{id:id,qid:qid}});
    }
  }
}
</script>
<style>
</style>
