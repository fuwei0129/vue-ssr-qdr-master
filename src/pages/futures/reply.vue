<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="futures-detail-box pdt40 mt5">
      <div class="answer-box pd15">
        <div class="flex author-row">
          <div class="avatar sm-avatar" v-if="answerdetail.imgUrl==''" style="background-image:url(/public/default.png)"></div>
          <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+answerdetail.imgUrl+')'}"></div>
          <div class="mid">
            <span class="mini-uname">{{answerdetail.name}}</span>
            <span class="others">金融研究院老师</span>
          </div>
          <div class="right">
            <span>关注</span>
          </div>
        </div>
        <div class="answer-info">
          <p>{{answerdetail.answerContent}}</p>
          <div class="futures-photos-box half mt5" v-if="answerdetail.questionAccessory && answerdetail.questionAccessory.length">
            <span v-if="answerdetail.questionAccessory.length>1">{{answerdetail.questionAccessory.length}}图</span>
            <div
                class="cover"
                v-bind:style="{backgroundImage: 'url('+answerdetail.questionAccessory[0].accessoryUrl+')'}"></div>
          </div>
          <span class="time">{{answerdetail.answerTime}}</span>
        </div>
      </div>
      <div class="comment-box mt8">
        <div class="summary-bar-head">
          <span v-if="answerdetail.commentList && answerdetail.commentList.length">评论（{{answerdetail.commentList.length}}）</span>
          <span v-else>评论（0）</span>
          <div class="fr"><label>按最新</label></div>
        </div>
        <div class="reply-comment-list" v-if="answerdetail.commentList && answerdetail.commentList.length">
          <div class="item" v-for="item in answerdetail.commentList">
            <div class="flex author-row">
              <div class="avatar sm-avatar" v-if="item.imgUrl==''" style="background-image:url(/public/default.png)"></div>
              <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
              <div class="mid">
                <span class="mini-uname">{{item.name}}</span>
                <span class="others">{{item.commentTime}}</span>
              </div>
              <div class="ct-right">
                <span>{{item.toPraiseNum}}</span>
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
import common from '../../utils/common'
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
    answerdetail () {
      return this.$store.getters.getAnswerDetail // 期问问答详情
    }
  }
}
</script>
<style>
</style>
