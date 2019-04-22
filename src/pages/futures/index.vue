<template>
  <section>
    <div class="futuresbox pdb52">
      <div class="item" v-for="(item,index) in questionData" :key="index">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" v-if="item.imgUrl==''" style="background-image:url(/public/default.png)"></div>
            <div class="avatar lg-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
            <div class="mid">
              <span class="uname mt5">{{item.name}}</span>
              <span class="others">{{item.showTime}} 来自{{item.source}}</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(3)">{{nameformat(item.content)}}</div>
        </div>
        <div class="reply" v-if="item.answerDTO">
          <div class="flex author-row">
            <div class="avatar sm-avatar" v-if="item.answerDTO[0].imgUrl==''" style="background-image:url(/public/default.png)"></div>
            <div class="avatar sm-avatar" v-else v-bind:style="{backgroundImage: 'url('+item.answerDTO[0].imgUrl+')'}"></div>
            <div class="mid">
              <span class="uname mt8" style="color:#b7b8b8;">{{item.answerDTO[0].name}}</span>
            </div>
            <div class="r-time mt8">{{item.answerDTO[0].answerTime}}</div>
          </div>
          <div class="r-info">{{nameformat(item.answerDTO[0].answerContent)}}</div>
          <div class="futures-photos-box mt10">
            <span>6图</span>
            <div class="galley">
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/4bda031877e7aca23fabcd558191915b506fc356.jpeg" />
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/5a9b102f3bc1b1a0e2ae08464a3d95b05581945b.jpeg" />
            </div>
          </div>
        </div>
        <div class="item-buttons-bottom">
          <div><span class="ico_zf">20</span></div>
          <div><span class="ico_comment">999+</span></div>
          <div><span class="ico_like">10</span></div>
          <div><span class="ico_rewards">5</span></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
export default{
  /**
   * [SSR获取所有组件的asyncData并执行获得初始数据]
   * @param  {[Object]} store [Vuex Store]
   * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
   */
  asyncData (store, route) {
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
      reqparam:{}
    }
    return store.dispatch('fetchQuestions', { model }) // 服务端渲染触发
  },
  name:'futuresindex',
  data(){
    return{

    }
  },
  // 计算属性
  computed: {
    questionData(){
      return this.$store.getters.getQuestionData
    }
  },
  methods:{
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}});
    },
    nameformat(val){
      if(val.length>50){
        val = val.substr(0,50)+'...'
      }
      return val
    }
  }
}
</script>
<style>
</style>
