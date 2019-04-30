<template>
  <section>
    <div class="full-log-box">
      <div class="bg-log" style="background-image:url(../public/img/default.png)">
        <div class="bottom">
          <span :class="signIndex == 0 ? 'on':''" @click="setVal(0)">注册</span>
          <span :class="signIndex == 1 ? 'on':''" @click="setVal(1)">登录</span>
        </div>
      </div>
      <div class="panel" v-if="signIndex == 0">
        <div class="form">
          <div class="form-group">
            <div class="normal"><input type="text" placeholder="用户名/手机号" maxlength="11" v-model="regModel.mobile" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="text" placeholder="请输入昵称" v-model="regModel.nickName" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="password" placeholder="请输入密码" v-model="regModel.password" /></div>
          </div>
          <div class="form-group" v-show = 'showregImgCode'>
            <div class="small fl"><input type="text" maxlength="4" placeholder="图形验证码" v-model="regModel.validateCode" /></div>
            <img class="imgcode fr" @click="regrefresh()" :src="regModel.uri" />
          </div>
          <div class="form-group">
            <div class="small fl"><input type="text" maxlength="6" placeholder="请输入验证码" v-model="regModel.code" /></div>
            <div class="get-code fr" @click="getregcode()">{{ setregText() }}</div>
          </div>
          <div class="action-group">
            <button class="btn-submit" @click="register()">免费注册</button>
          </div>
          <div class="link">
            <input class="checkbox fl" id="ckagree" checked="checked" type="checkbox" />
            <label for="ckagree">注册即表示同意</label>
            <router-link to="/registerprotocol">期达人用户协议</router-link>
          </div>
        </div>
      </div>
      <div class="panel" v-if="signIndex == 1">
        <div class="form" v-if="type == 1">
          <div class="form-group">
            <div class="normal"><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="loginModel.mobile" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="password" placeholder="请输入密码" v-model="loginModel.password" /></div>
          </div>
          <div class="action-group">
            <button class="btn-submit" @click="login()">登录账户</button>
          </div>
          <div class="link">
            <label class="fl" @click="setType(2)">切换手机验证码登录</label>
            <label class="fr">忘记密码?</label>
          </div>
        </div>
        <div class="form" v-if="type == 2">
          <div class="form-group">
            <div class="normal"><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="codeLoginModel.mobile" /></div>
          </div>
          <div class="form-group" v-show = 'showlogImgCode'>
            <div class="small fl"><input type="text" maxlength="4" placeholder="图形验证码" v-model="codeLoginModel.validateCode" /></div>
            <img class="imgcode fr" @click="logrefresh()" :src="codeLoginModel.uri" />
          </div>
          <div class="form-group">
            <div class="small fl"><input type="text" maxlength="6" placeholder="请输入验证码" v-model="codeLoginModel.code" /></div>
            <div class="get-code fr" @click="getlogcode()">{{ setlogText() }}</div>
          </div>
          <div class="action-group">
            <button class="btn-submit" @click="codeLogin()">登录账户</button>
          </div>
          <div class="link">
            <label class="fl" @click="setType(1)">切换密码登录</label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import api from '../utils/api'
import http from '../utils/http'
import common from '../utils/common'
import { Toast } from 'mint-ui'
export default{
  name:'sign',
  data(){
    return{
      signIndex:this.$store.getters.getSignIndex,
      type:1, //登录方式：1密码登录，2验证码登录
      log_wait_timer:false,
      reg_wait_timer:false,
      loginModel:{
        mobile:'',
        password:''
      },
      codeLoginModel:{
        mobile:'',
        code:'',
        validateCode:'',
        uri:''
      },
      regModel:{
        mobile:'',
        nickName:'',
        password:'',
        code:'',
        validateCode:'',
        uri:'',
        source:''
      },
      showregImgCode:false,
      showlogImgCode:false
    }
  },
  methods:{
    setVal(val){
      this.signIndex = val
      this.$store.commit('setSignIndex',val)
    },
    setType(val){
      this.type = val
    },
    setlogText:function(){
      if(this.log_wait_timer > 0){
          return this.log_wait_timer+'s后获取';
      }else{
          return '获取验证码';
      }
    },
    setregText:function(){
      if(this.reg_wait_timer > 0){
          return this.reg_wait_timer+'s后获取';
      }else{
          return '获取验证码';
      }
    },
    regrefresh(){
      this.regModel.validateCode = ""
      var i = Math.ceil(Math.random() * 100) //生成一个随机数（防止缓存）
      let uuid = common.getCookie("t_uuid")
      this.regModel.uri = "http://172.16.1.208:8119/member/validateCode?uuid=" + uuid + "_" + i
    },
    logrefresh(){
      this.codeLoginModel.validateCode = ""
      var i = Math.ceil(Math.random() * 100) //生成一个随机数（防止缓存）
      let uuid = common.getCookie("t_uuid")
      this.codeLoginModel.uri = "http://172.16.1.208:8119/member/validateCode?uuid=" + uuid + "_" + i
    },
    login(){
      if(this.loginModel.mobile == ""){
        Toast({
          message: '手机号不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.loginModel.password == ""){
        Toast({
          message: '密码不能为空',
          position: 'middle',
          duration: 2000
        })
        return
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
          mobile:this.loginModel.mobile,
          password:this.loginModel.password
        }
      }
      http.postaccount(api.login,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          this.$store.commit('setUser', response.data.respparam)
          // 登录后，清除input项的值
          this.loginModel.mobile = ''
          this.loginModel.password = ''
          // 跳转到登录前的页面或个人中心

          if(this.$route.params.parentPath){
            this.$router.replace(this.$route.params.parentPath)
          }else{
            this.$router.push('/mine/index')
          }
        }else if(response.data.respbase.returncode == '20000'){
          Toast({
            message: '用户名或密码错误',
            position: 'middle',
            duration: 2000
          })
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    getregcode(){ //注册获取验证码
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.reg_wait_timer > 0) {
        return
      }
      if(!reg.test(this.regModel.mobile)){
        Toast({
          message: '请输入有效手机号',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.showregImgCode && this.regModel.validateCode == ""){
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
          mobile:this.regModel.mobile,
          sendVerify:'n',
          code:this.regModel.validateCode,
          uuid:common.getCookie("t_uuid")
        }
      }
      let that = this
      http.postaccount(api.sendSms,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.reg_wait_timer = 59;
          var timer_interval = setInterval(function(){
              if(that.reg_wait_timer > 0){
                  that.reg_wait_timer -- ;
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
          that.regrefresh()
          that.showregImgCode = true
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    register(){ //注册
      if(this.regModel.mobile == ""){
        Toast({
          message: '手机号不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.regModel.nickName == ""){
        Toast({
          message: '昵称不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.regModel.password == ""){
        Toast({
          message: '密码不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.regModel.code == ""){
        Toast({
          message: '验证码不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if (!document.getElementById("ckagree").checked) {
          Toast({
            message: '请阅读并同意期达人用户协议',
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
          mobile:this.regModel.mobile,
          code:this.regModel.code,
          password:this.regModel.password,
          rePassword:this.regModel.password,
          nickName:this.regModel.nickName,
          source:'1'
        }
      }
      http.postaccount(api.register,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          this.$store.commit('setUser', response.data.respparam)
          // 注册后，清除input项的值
          this.regModel.mobile = ''
          this.regModel.nickName = ''
          this.regModel.password = ''
          this.regModel.code = ''
          this.regModel.validateCode = ''
          // 跳转到个人中心
          this.$router.push('/mine/index')
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    getlogcode(){ //获取登录验证码
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.log_wait_timer > 0) {
        return
      }
      if(!reg.test(this.codeLoginModel.mobile)){
        Toast({
          message: '请输入有效手机号',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.showlogImgCode && this.codeLoginModel.validateCode == ""){
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
          mobile:this.codeLoginModel.mobile,
          sendVerify:'v',
          code:this.codeLoginModel.validateCode,
          uuid:common.getCookie("t_uuid")
        }
      }
      let that = this
      http.postaccount(api.sendSms,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.log_wait_timer = 59;
          var timer_interval = setInterval(function(){
              if(that.log_wait_timer > 0){
                  that.log_wait_timer -- ;
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
          that.logrefresh()
          that.showlogImgCode = true
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    codeLogin(){ //验证码登录
      if(this.codeLoginModel.mobile == ""){
        Toast({
          message: '手机号不能为空',
          position: 'middle',
          duration: 2000
        })
        return
      }else if(this.codeLoginModel.code == ""){
        Toast({
          message: '验证码不能为空',
          position: 'middle',
          duration: 2000
        })
        return
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
          mobile:this.codeLoginModel.mobile,
          code:this.codeLoginModel.code
        }
      }
      http.postaccount(api.codeLogin,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          this.$store.commit('setUser', response.data.respparam)
          // 登录后，清除input项的值
          this.codeLoginModel.mobile = ''
          this.codeLoginModel.code = ''
          this.codeLoginModel.validateCode = ''
          // 跳转到个人中心
          this.$router.push('/mine/index')
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.full-log-box{
  background:#141f30;
  width: 100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
}
.bg-log{
  background-repeat: no-repeat;
  background-size:100% 200px;
  height:200px;
  position: relative;
}
.bg-log .bottom{
  width:86%;
  position: absolute;
  left:7%;
  bottom:10px;
}
.bg-log .bottom span{
  width:50%;
  display: inline-block;
  text-align: center;
  color:#dedede;
}
.bg-log .bottom span.on{
  color:#fff;
}
.form{
  margin:30px;
}
.form .form-group{
  margin-bottom:20px;
  overflow: hidden;
}
.form .form-group div{
  border:1px solid #ccc;
  height:45px;
  line-height: 45px;
  padding:0 10px;
  border-radius: 5px;
}
.form .form-group div.small{
  width:65%;
}
.form .form-group .imgcode{
  height:45px;
  width:30%;
}
.form .form-group div.get-code{
  width:30%;
  color:#fff;
}
.form .form-group input{
  outline: none;
  border:none;
  background:transparent;
  color:#fff;
  font-size:15px;
  width:100%;
  height:45px;
}
.action-group{
    margin-bottom:20px;
}
.btn-submit{
  width:100%;
  display:block;
  border:1px solid #f00;
  outline:none;
  border-radius: 5px;
  height:45px;
  line-height:45px;
  background:#f00;
  color:#fff;
  font-size:15px;
  letter-spacing: 1px;
}
.link{
  overflow: hidden;
}
.link .checkbox{
  -webkit-appearance:checkbox;
  margin-right:5px;
  position: relative;
  top:5px;
}
.link label{
  color:#fff;
  font-size:12px;
}
.link a{
  margin-left:5px;
  color:#f00;
}
</style>
