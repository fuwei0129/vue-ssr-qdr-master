<template>
  <section>
    <Head :title="title"></Head>
    <div class="acbox">
      <div class="banner"><img src="/public/img/sywg.jpg" /></div>
      <div class="form">
        <div class="form-gp">
          <div class="normal"><input type="tel" maxlength="11" v-model="accountModel.mobile" placeholder="请输入您的手机号码" /></div>
        </div>
        <div class="form-gp" v-show = 'showImgCode'>
          <div class="small fl"><input type="text" maxlength="4" placeholder="图形验证码" v-model="accountModel.validateCode" /></div>
          <img class="imgcode fr" @click="refresh()" :src="accountModel.uri" />
        </div>
        <div class="form-gp">
          <div class="small fl"><input type="text" maxlength="6" v-model="accountModel.code" placeholder="请输入验证码" /></div>
          <div class="get-code fr" @click="getcode()">{{ setText() }}</div>
        </div>
        <div class="form-ac">
          <button class="btn-submit" @click="save()">立即开户</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../../utils/api'
import http from '../../utils/http'
import common from '../../utils/common'
import global from '../../utils/global'
import Head from '../../components/head.vue'
import { Toast } from 'mint-ui'
export default{
  name:'sywg',
  data(){
    return{
      title:'申银万国',
      accountModel:{
        mobile:'',
        code:'',
        validateCode:'',
        uri:''
      },
      showImgCode:false,
      wait_timer:false
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
        that.accountModel.mobile = this.user.mobile
      },500)
    }else{
      this.$router.replace({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    setText:function(){
      if(this.wait_timer > 0){
          return this.wait_timer+'s后获取';
      }else{
          return '获取验证码';
      }
    },
    refresh(){
      this.accountModel.validateCode = ""
      var i = Math.ceil(Math.random() * 100) //生成一个随机数（防止缓存）
      let uuid = common.getCookie("t_uuid")
      this.accountModel.uri = global.path+"/member/validateCode?uuid=" + uuid + "_" + i
    },
    getcode(){ //注册获取验证码
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.wait_timer > 0) {
        return
      }
      if(!reg.test(this.accountModel.mobile)){
        Toast({
          message: '请输入有效手机号',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.showImgCode && this.accountModel.validateCode == ""){
        Toast({
          message: '图片验证码不能为空',
          position: 'middle',
          duration: 2000
        });
        return;
      }
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
          mobile:this.accountModel.mobile,
          sendVerify:'v',
          code:this.accountModel.validateCode,
          uuid:common.getCookie("t_uuid")
        }
      }
      let that = this
      http.postmain(api.sendSms,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.wait_timer = 59;
          var timer_interval = setInterval(function(){
              if(that.wait_timer > 0){
                  that.wait_timer -- ;
              }else{
                  clearInterval(timer_interval);
              }
          },1000);
          Toast({
            message: '验证码已发送至您的手机',
            position: 'middle',
            duration: 2000
          })
        }else if(response.data.respbase.returncode == '21000'){
          that.refresh()
          that.showImgCode = true
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    save(){

    }
  }
}
</script>
<style scoped>
.acbox{
  position: absolute;
  top:40px;
  left:0;
  height:100%;
  width:100%;
  background:#fff;
}
.form{
  margin:0 30px;
}
.form-gp{
  overflow: hidden;
  margin-bottom:20px;
}
.form-gp div{
    border: 1px solid #ccc;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
}
.small {
  width: 65%;
}
.form-gp input{
  outline: none;
  border: none;
  border-radius: 5px;
  background: #eee;
  color: #333;
  font-size: 15px;
  width: 100%;
  height: 43px;
  padding-left:10px;
}
.get-code{
  width: 30%;
  color: #ef9e34;
  text-align: center;
  border:1px solid #ef9e34!important;
}
.btn-submit{
    width: 100%;
    display: block;
    border: 1px solid #ef9e34;
    outline: none;
    border-radius: 5px;
    height: 45px;
    line-height: 45px;
    background: #ef9e34;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
}
</style>
