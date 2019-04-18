<template>
  <section>
    <div class="full-log-box">
      <div class="bg-log" style="background-image:url(/public/default.png)">
        <div class="bottom">
          <span :class="index == 1 ? 'on':''" @click="setVal(1)">注册</span>
          <span :class="index == 2 ? 'on':''" @click="setVal(2)">登录</span>
        </div>
      </div>
      <div class="panel" v-if="index == 1">
        <div class="form">
          <div class="form-group">
            <div class="normal"><input type="text" placeholder="用户名/手机号" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="text" placeholder="请输入昵称" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="password" placeholder="请输入密码" /></div>
          </div>
          <div class="form-group">
            <div class="small fl"><input type="password" placeholder="请输入密码" /></div>
            <div class="get-code fr">获取验证码</div>
          </div>
          <div class="action-group">
            <button class="btn-submit">免费注册</button>
          </div>
          <div class="link">
            <input class="checkbox fl" checked="checked" type="checkbox" />
            <span class="fl">注册即表示同意&nbsp;<label>期达人用户协议</label></span>
          </div>
        </div>
      </div>
      <div class="panel" v-if="index == 2">
        <div class="form" v-if="type == 1">
          <div class="form-group">
            <div class="normal"><input type="tel" maxlength="11" placeholder="请输入手机号" /></div>
          </div>
          <div class="form-group">
            <div class="normal"><input type="password" placeholder="请输入密码" /></div>
          </div>
          <div class="action-group">
            <button class="btn-submit">登录账户</button>
          </div>
          <div class="link">
            <span class="fl" @click="setType(2)">切换手机验证码登录</span>
            <span class="fr">忘记密码?</span>
          </div>
        </div>
        <div class="form" v-if="type == 2">
          <div class="form-group">
            <div class="normal"><input type="tel" maxlength="11" placeholder="请输入手机号" /></div>
          </div>
          <div class="form-group">
            <div class="small fl"><input type="password" placeholder="请输入密码" /></div>
            <div class="get-code fr">获取验证码</div>
          </div>
          <div class="action-group">
            <button class="btn-submit">登录账户</button>
          </div>
          <div class="link">
            <span class="fl" @click="setType(1)">切换密码登录</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  name:'login',
  data(){
    return{
      index:2,
      type:1, //登录方式：1密码登录，2验证码登录
    }
  },
  methods:{
    setVal(val){
      this.index = val
    },
    setType(val){
      this.type = val
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
  top:2px;
}
.link span{
  color:#fff;
  font-size:12px;
}
.link label{
  color:blue;
}
</style>
