<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="futures-detail-box pdt40 mt5">
      <div class="answer-box pd15">
        <div class="flex author-row">
          <div class="avatar sm-avatar" v-if="answerdetail.imgUrl==null" style="background-image:url(../../../public/img/user-default.png)"></div>
          <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+answerdetail.imgUrl+')'}"></div>
          <div class="mid">
            <p>
              <span class="mini-uname">{{answerdetail.name}}</span>
              <label v-if="answerdetail.isVip==1" style="background-image:url(../../../public/img/ico_vip.png)"></label>
            </p>
            <p class="others">{{answerdetail.source}}</p>
          </div>
          <div class="right">
            <span v-if="answerdetail.isFollowVip == 1" @click.prevent="follow($event,answerdetail.answerMemberId)">已关注</span>
            <span v-else @click.prevent="follow($event,answerdetail.answerMemberId)">关注</span>
          </div>
        </div>
        <div class="answer-info">
          <p>{{answerdetail.answerContent}}</p>
          <div class="futures-photos-box half mt5" v-if="answerdetail.questionAccessory && answerdetail.questionAccessory.length">
            <span v-if="answerdetail.questionAccessory.length>1">{{answerdetail.questionAccessory.length}}图</span>
            <div
                class="cover"
                @click.prevent="preview($event,answerdetail.questionAccessory)"
                v-bind:style="{backgroundImage: 'url('+answerdetail.questionAccessory[0].accessoryUrl+')'}"></div>
          </div>
          <span class="time">{{answerdetail.answerTime}}</span>
        </div>
      </div>
      <div class="comment-box mt8">
        <div class="summary-bar-head">
          <span>评论（{{answerdetail.commentNum}}）</span>
          <!-- <div class="fr"><label>按最新</label></div> -->
        </div>
        <div class="reply-comment-list" v-if="answerdetail.commentList && answerdetail.commentList.length">
          <div class="item" v-for="item in answerdetail.commentList">
            <div class="flex author-row">
              <div class="avatar sm-avatar" v-if="item.imgUrl==null" style="background-image:url(../../../public/img/user-default.png)"></div>
              <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
              <div class="mid">
                <p><span class="mini-uname">{{item.name}}</span></p>
                <p class="others">{{item.commentTime}}</p>
              </div>
              <div class="ct-right">
                <span class="ico_like_on" v-if="item.isToPraise == 1" @click.prevent="$event.stopPropagation();">{{item.toPraiseNum}}</span>
                <span class="ico_like" v-else @click.prevent="like($event,item.commentId)">{{item.toPraiseNum}}</span>
              </div>
            </div>
            <div class="comment-info">
              <p>{{item.comment}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-add">
        <div></div>
        <div></div>
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
    let answerId = route.params.id // 期问问答id
    let questionId = route.params.qid // 期问问题qid
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
        answerId:answerId,
        questionId:questionId,
        userId:user?user.memberId:'0'
      }
    }
    return store.dispatch('fetchAnswerDetail', { model }) // 服务端渲染执行
  },
  name:'futuresreply',
  data(){
    return{
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    answerdetail () {
      return this.$store.getters.getAnswerDetail // 期问问答详情
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchDetail()
    },500)
  },
  methods:{
    fetchDetail(){
      let answerId = this.$route.params.id // 期问问答id
      let questionId = this.$route.params.qid // 期问问题qid
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
          page: 1,
          size: 10,
          count: true
        },
        reqparam:{
          answerId:answerId,
          questionId:questionId,
          userId:this.user?this.user.memberId:null
        }
      }
      let that = this
      http.postmain(api.queryAnswerDetail,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.$store.commit('setAnswerDetail', response.data.respparam)
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
            let obj = that.$store.getters.getAnswerDetail
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
            that.$store.commit('setAnswerDetail',obj)

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
    like(e,cid){
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
            busiId: cid,
  					busiType: 11,
  					fType: '2',
  					operateId: this.user.memberId
          }
        }
        var that = this
        http.postmain(api.readingInsert,model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            let obj = that.$store.getters.getAnswerDetail
            for (var i = 0; i < obj.commentList.length; i++) {
              if(obj.commentList[i].commentId == cid){
                obj.commentList[i].isToPraise = 1
                obj.commentList[i].toPraiseNum++
              }
            }
            that.$store.commit('setAnswerDetail',obj)
          }else{
            console.log("出错")
          }
        })
      }
    },
    preview(e,imgs){
      e.stopPropagation();
      let arr = []
      for (var i = 0; i < imgs.length; i++) {
        arr.push(imgs[i].accessoryUrl)
      }
      ImagePreview(arr)
    },
  }
}
</script>
<style>
</style>
