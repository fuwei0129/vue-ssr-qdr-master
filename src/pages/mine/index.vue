<template>
  <section>
    <div class="signtop">
      <div class="flex">
        <div class="user-photo" v-if="!user || user.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></div>
        <div class="user-photo" v-else v-bind:style="{backgroundImage: 'url('+user.profilePhoto+')'}"></div>
        <div class="mid-right" v-if="user">
          <span>{{user.nickName}}</span><label>喜欢期货，所有我用期达人</label>
        </div>
        <div class="mid-right" @click="sign()" v-else>
          <span>登录/注册</span><label>喜欢期货，所有我用期达人</label>
        </div>
      </div>
      <div class="row">
        <span class="fl">0关注</span>
        <span class="fr">0收藏</span>
      </div>
    </div>
    <div>
      <mt-cell class="mt5" title="消息" to="" is-link></mt-cell>
      <mt-cell class="mt5" title="锦囊" to="" is-link></mt-cell>
      <mt-cell class="mt5" title="订阅" to="" is-link></mt-cell>
      <mt-cell class="mt5" title="开户" to="" is-link></mt-cell>
      <mt-cell class="mt5" title="购买记录" to="" is-link></mt-cell>
      <mt-cell class="mt15" title="在线客服" is-link></mt-cell>
      <mt-cell class="mt15" v-if="user" @click.native="logout()" title="注销" is-link></mt-cell>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
export default{
  name:'mineindex',
  data(){
    return{

    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods:{
    sign(){
      this.$router.push({name:'sign'});
    },
    logout(){
      let user = this.$store.getters.getUser
      let data = {
        reqbase:{
          timestamp:common.getLastDate(),
          clientauthflag:common.getClientauthflag(),
          reqorigin:"xuantie",
          token:common.getToken(),
          sourceip:common.getIp()
        },
        reqpage:{
          total:0,
          page:1,
          size:10,
          count:false
        },
        reqparam:{
          memberId:user.memberId,
          source:1
        }
      }
      this.$store.dispatch('logout', data)
    }
  }
}
</script>
<style>
.signtop{
  background:#141f30;
  padding:30px 15px 5px 15px;
}
.user-photo{
  background-repeat: no-repeat;
  background-size: cover;
  margin-right:10px;
  border-radius: 50%;
  overflow: hidden;
  flex:0 0 50px;
  height:50px;
}
.mid-right{
  margin-left:10px;
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
  margin-bottom:2px;
}
.mid-right label{
  font-size:10px;
  color:#fff;
}
.row{
  margin-top:15px;
  padding:0 50px;
  overflow: hidden;
}
.row span{
  color:#fff;
  font-size:10px;
}
.mint-cell{
  background:#141f30;
}
.mint-cell-text{
  color:#fff;
  font-size:14px;
}
.mint-cell-wrapper{
  background-image:none;
  background-size:0;
}
.mint-cell:last-child{
  background-image:none;
  background-size:0;
}
</style>
