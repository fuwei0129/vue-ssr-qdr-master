<template>
  <section>
    <div class="signtop">
      <div class="flex">
        <div class="user-photo" v-if="!user || user.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></div>
        <div class="user-photo" v-else v-bind:style="{backgroundImage: 'url('+user.profilePhoto+')'}"></div>
        <div class="mid-right" v-if="user" @click="personal()">
          <span>{{user.nickName}}</span><label>{{user.remark ? user.remark : '喜欢期货，所以我用期达人'}}</label>
        </div>
        <div class="mid-right" @click="sign()" v-else>
          <span>登录/注册</span><label>喜欢期货，所以我用期达人</label>
        </div>
      </div>
      <div class="row flex">
        <div @click="access('attentions')"><span>{{personalInfo.attentionNumber ? personalInfo.attentionNumber : '0'}}</span><label>关注</label></div>
        <div @click="access('fans')"><span>{{personalInfo.fenSiNumber ? personalInfo.fenSiNumber : '0'}}</span><label>粉丝</label></div>
        <div @click="access('asks')"><span>{{personalInfo.questionListNumber ? personalInfo.questionListNumber : '0'}}</span><label>提问</label></div>
        <div @click="access('collects')"><span>{{personalInfo.collectionNumber ? personalInfo.collectionNumber : '0'}}</span><label>收藏</label></div>
      </div>
    </div>
    <div>
      <mt-cell class="mt5" title="消息" to="/mine/notification" is-link>
        <img slot="icon" src="/public/img/ico_msg.png" width="24" height="24">
      </mt-cell>
      <mt-cell class="mt5" title="联系客服" is-link @click.native="callPhone">
        <img slot="icon" src="/public/img/ico_kf.png" width="24" height="24">
      </mt-cell>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
export default{
  asyncData (store, route) {
    let user = store.getters.getUser
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
        uid:user?user.memberId:null
      }
    }
    return store.dispatch('fetchPersonalInfo', { model }) // 服务端渲染执行
  },
  name:'mineindex',
  data(){
    return{

    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    personalInfo(){
      return this.$store.getters.getPersonalInfo
    }
  },
  mounted(){
    // var that = this
    // setTimeout(() => {
    //   if(that.user){
    //     this.fetchInfo()
    //   }
    // },500)
  },
  activated(){
    var that = this
    setTimeout(() => {
      if(that.user){
        that.fetchInfo()
      }else{
        that.$store.commit('clearPersonalInfo') //清除关注量、粉丝量等等（场景：注销的时候重定向到此页面）
      }
    },500)
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    sign(){
      this.$router.push({name:'sign'})
    },
    personal(){
      this.$router.push({name:'personal'})
    },
    access(r){
      if(this.user){
        this.$router.push({name:r})
      }else{
        this.sign()
      }
    },
    fetchInfo(){
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
          uid:this.user.memberId
        }
      }
      this.$store.dispatch('fetchPersonalInfo',{ model })
    },
    callPhone(){
      window.location.href = 'tel://02160772399'
    }
  }
}
</script>
<style scoped>
.signtop{
  background:#141f30;
  padding:30px 15px 5px 15px;
}
.user-photo{
  background-repeat: no-repeat;
  background-size: cover;
  margin-right:20px;
  border-radius: 50%;
  overflow: hidden;
  flex:0 0 50px;
  height:50px;
}
.mid-right{
  flex:1 1;
  position:relative;
}
.mid-right:after{
  content:'>';
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top: 50%;
  right: 5px;
  position: absolute;
  width: 5px;
  height: 5px;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
}
.mid-right span{
  font-size:17px;
  color:#fff;
  display: block;
  vertical-align: top;
}
.mid-right label{
  font-size:12px;
  color:#445168;
}
.row{
  overflow: hidden;
}
.row div{
  margin:25px 0 10px 0;
  flex:1;
  text-align: center;
}
.row div span{
  color:#fff;
  display: block;
  font-size:16px;
  margin-bottom:5px;
}
.row div label{
  color:#6e7c95;
  display: block;
  font-size:14px;
}
</style>
