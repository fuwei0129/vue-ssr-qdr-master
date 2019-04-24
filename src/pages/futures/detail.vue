<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <span class="icon-add" slot="right" @click="answer(1)">写回答</span>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="futures-detail-box pdt40 mt5">
      <div class="ask-box">
        <p class="title">{{questiondetail.content}}</p>
        <div class="flex author-row">
          <div class="avatar lg-avatar" v-if="questiondetail.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
          <div class="avatar lg-avatar" v-else v-bind:style="{backgroundImage: 'url('+questiondetail.imgUrl+')'}"></div>
          <div class="mid">
            <span class="uname mt5">{{questiondetail.name}}</span>
            <span class="others">{{questiondetail.showTime}}</span>
          </div>
          <div class="right">
            <span>关注</span>
          </div>
        </div>
        <div class="futures-photos-box half mt15" v-if="questiondetail.questionAccessory && questiondetail.questionAccessory.length">
          <span v-if="questiondetail.questionAccessory.length > 1">{{questiondetail.questionAccessory.length}}图</span>
          <div
              class="cover"
              v-bind:style="{backgroundImage: 'url('+questiondetail.questionAccessory[0].accessoryUrl+')'}"></div>
        </div>
      </div>
      <div class="answer-box mt8">
        <div class="summary-bar-head">
          <span>回答（{{questiondetail.answerNum}}）</span>
          <!-- <div class="fr"><label>按最新</label></div> -->
        </div>
        <div class="answer-list" v-if="questiondetail.answerDTO && questiondetail.answerDTO.length">
          <div class="answer-item" v-for="item in questiondetail.answerDTO">
            <div class="pd15">
              <div class="flex author-row">
                <div class="avatar sm-avatar" v-if="item.imgUrl==null" style="background-image:url(../../public/img/user-default.png)"></div>
                <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
                <div class="mid">
                  <span class="mini-uname">{{item.name}}</span>
                  <span class="others">金融研究院老师</span>
                </div>
                <div class="right">
                  <span>关注</span>
                </div>
              </div>
              <div class="answer-info">
                <p @click="todetail(item.answerId,questiondetail.questionId)">{{item.answerContent}}</p>
                <div class="futures-photos-box half mt5" v-if="item.questionAccessory && item.questionAccessory.length">
                  <span v-if="item.questionAccessory.length>1">{{item.questionAccessory.length}}图</span>
                  <div
                      class="cover"
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
              <div><span class="ico_like">{{item.toPraiseNum}}</span></div>
              <!-- <div><span class="ico_rewards">5</span></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
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
        userId:user?user.memberId:'0'
      }
    }
    return store.dispatch('fetchQuestionDetail', { model }) // 服务端渲染执行
  },
  name:'futuresdetail',
  data(){
    return{

    }
  },
  // 计算属性
  computed: {
    questiondetail () {
      return this.$store.getters.getQuestionDetail // 期问详情
    }
  },
  methods:{
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
