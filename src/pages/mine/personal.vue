<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div v-if="user">
        <div class="mt10">
          <mt-cell title="头像" is-link>
            <div class="user-photo" v-if="user.profilePhoto == null" style="background-image:url(../public/img/user-default.png)"></div>
            <div class="user-photo" v-else v-bind:style="{backgroundImage: 'url('+user.profilePhoto+')'}"></div>
          </mt-cell>
          <mt-cell title="性别" is-link @click.native="showpanel" :value="sexformat(user.sex)"></mt-cell>
          <mt-cell title="昵称" to="/mine/editname" is-link :value="user.nickName"></mt-cell>
          <mt-cell title="简介" to="/mine/editdes" is-link :value="remarkformat(user.remark)"></mt-cell>
        </div>
        <div class="mt10">
          <mt-cell title="手机绑定" :value="phoneformat(user.mobile)"></mt-cell>
          <mt-cell title="密码修改" to="" is-link></mt-cell>
        </div>
        <div class="mt10">
          <button class="btn-logout" @click="logout">退出登录</button>
        </div>
      </div>
      <div v-else></div>
    </div>
    <van-actionsheet
      v-model="sheetVisible"
      :actions="data"
      cancel-text="取消"
      @select="onSelect"
    />
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
import Head from '../../components/head.vue'
export default{
  name:'personal',
  data(){
    return{
      title:'个人信息',
      data: [{
        name:'男',
        val:0
      },{
        name:'女',
        val:1
      }],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
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
    if(sessionStorage.user){
    }else{
      this.$router.push({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    sexformat(val){
      if(!val){
        val = val == 0 ? '男' : '女'
      }else{
        val = "女"
      }
      return val
    },
    remarkformat(val){
      if(val == null){
        val = '喜欢期货，所以我用期达人'
      }else{
        if(val.length>15){
          val = val.substr(0,15)+'...'
        }
      }
      return val
    },
    phoneformat(val){
      if(val == null){
        val = "未知"
      }else{
        val = val.substr(0,3)+"****"+val.substr(7)
      }
      return val
    },
    onSelect(item){
      let model = {
        reqbase:{
          timestamp: common.getLastDate(),
          clientauthflag: common.getClientauthflag(),
          reqorigin: "valid",
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
          memberId:this.user.memberId,
          sex:item.val
        }
      }
      let that = this
      http.postmain(api.updateMember,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          this.sheetVisible = false
          let obj = that.$store.getters.getUser
          obj.sex = item.val
          that.$store.commit('resetUser', obj)
          that.sheetVisible = false
        }else{
          console.log("出错")
        }
      })
    },
    showpanel(){
      this.sheetVisible = true
    },
    logout(){
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
          memberId:this.user.memberId,
          source:common.iosOrAndroid()
        }
      }
      this.$store.dispatch('logout', data)
      this.$router.push('/mine/index')
    }
  }
}
</script>
<style scoped>
.user-photo{
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
  width:40px;
  height:40px;
}
.btn-logout{
  width:100%;
  display: block;
  padding:12px 0;
  background:#141f30;
  text-align: center;
  font-size:16px;
  color:#ff6969;
}
</style>
