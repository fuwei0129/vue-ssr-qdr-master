<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div class="nlst">
        <div class="item">
          <span class="time">2019-03-11 19:19:02</span>
          <div class="main">
            <div class="inner">
              <span class="avatar" style="background-image:url(../public/img/user-default.png)"></span>
              <span class="uname">#小静</span><label class="tips">评论了您的回答</label>
            </div>
            <p class="content">怎么会这样呢</p>
          </div>
        </div>
        <div class="item">
          <span class="time">2019-03-11 19:19:02</span>
          <div class="main">
            <div class="inner">
              <span class="avatar" style="background-image:url(../public/img/user-default.png)"></span>
              <span class="uname">#小静</span><label class="tips">评论了您的回答</label>
            </div>
            <p class="content">怎么会这样呢</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
import Head from '../../components/head.vue'
export default{
  name:'notification',
  data(){
    return{
      title:'消息中心',
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

  }
}
</script>
<style scoped>
.nlst{
  margin-top:10px;
}
.item{
  margin-bottom:10px;
  text-align: center;
}
.time{
  display: inline-block;
  background:#161f2e;
  padding:5px;
  border-radius: 5px;
  font-size:12px;
  color:#777;
  margin:0 auto 10px auto;
}
.main{
  padding:15px 20px;
  overflow: hidden;
  background:#161f2e;
  text-align: left;
}
.inner{
  clear:both;
  height:30px;
  margin-bottom:10px;
}
.avatar{
  width:30px;
  height:30px;
  border-radius: 50%;
  margin-right:10px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: block;
  float:left;
}
.uname{
  color:#dfa55b;
  font-size:15px;
  float:left;
  display: block;
  height:30px;
  line-height: 30px;
}
.tips{
  float:left;
  margin-left:10px;
  color:#fff;
  font-size:15px;
  height:30px;
  line-height: 30px;
}
.content{
  color:#777;
}
</style>
