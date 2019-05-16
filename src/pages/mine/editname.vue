<template>
  <section>
    <mt-header title="修改昵称" fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <!-- <span class="icon-add" slot="right" @click="answer(1)">写回答</span> -->
      <mt-button slot="right" @click="save">保存</mt-button>
    </mt-header>
    <div class="pdt40">
      <div class="pd15">
        <p class="subtitle">一个响亮的名字是行走江湖的必备工具</p>
        <div class="nickname">
          <input type="text" v-model="nickName" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
export default{
  name:'editname',
  data(){
    return{
      nickName:''
    }
  },
  // 计算属性
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  mounted(){
    // var that = this
    // setTimeout(() => {
    //   that.fetchData()
    // },500)
  },
  activated(){
    if(sessionStorage.user){
      setTimeout(() =>{
        this.nickName = this.user.nickName
      },500)
    }else{
      this.$router.push({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    save(){
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
          nickName:this.nickName
        }
      }
      let that = this
      http.postmain(api.updateMember,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          let obj = that.$store.getters.getUser
          obj.nickName = that.nickName
          that.$store.commit('resetUser', obj)
          that.$router.back(-1)
        }else{
          console.log("出错")
        }
      })
    }
  }
}
</script>
<style scoped>
.subtitle{
  color:#445168;
  margin-bottom:5px;
  font-size:16px;
}
.nickname{
  background:#161f2e;
  padding:15px;
}
.nickname input{
  background: transparent;
  outline:none;
  color:#fff;
  display: block;
  width:100%;
}
</style>
