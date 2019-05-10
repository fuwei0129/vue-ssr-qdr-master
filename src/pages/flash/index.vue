<template>
  <section>
    <div class="mt50 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div class="flashlist"
            v-if="$route.path == '/flash/index'"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isMoreLoading"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="false">
        <div class="inner">
          <div class="item" v-for="(item,index) in lists" :key="index">
            <div class="days" v-if="item.flag || index == 0">
              <label class="monthday">{{item.month}}-{{item.day}}</label>
              <label class="year">{{item.year}}</label>
            </div>
            <span class="time">{{item.time | timefilter1}}</span>
            <p v-if="item.content && item.content.length>100">{{item.content.substr(0,100)+'...'}}<span>详见></span></p>
            <p v-else>{{item.content}}</p>
          </div>
        </div>
      </div>
      <!--显示加载中-->
      <div class="loading-box" v-if="isLoading">
          <mt-spinner type="snake" class="loading-more"></mt-spinner>
          <span class="loading-more-txt">加载中...</span>
      </div>
      <div class="no-more" v-if="noMore">没有更多了~</div>
    </div>
  </section>
</template>
<script>
import mynav from '../../components/nav.vue'
import common from '../../utils/common'
import http from '../../utils/http'
import api from '../../utils/api'
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
    return store.dispatch('fetchFlashLists', { model }) // 服务端渲染触发
  },
  name: "flashindex",
  data(){
    return{
      navIndex:1,
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
    }
  },
  components:{
    mynav
  },
  // 计算属性
  computed: {
      lists () {
        return this.$store.getters.getFlashLists // 快讯列表
      }
  },
  mounted(){
  },
  methods:{
    fetchList(){
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
          page: this.$store.getters.getFlashPage,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      let that = this
      http.postmain(api.getFutures,model).then((response) => {
        that.isLoading = false
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam == null){
            that.noMore = true
          }else{
            that.isMoreLoading = false
            that.$store.commit('setFlashLists',response.data.respparam)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addFlashPage')
      var that = this
      setTimeout(() => {
        that.fetchList()
      },1000)
    }
  }
}
</script>
<style>
  .flashlist{
    padding:10px 15px 0 25px;
  }
  .flashlist .inner{
    border-left:1px solid #2f3954;
    padding-left:28px;
  }
  .flashlist .item{
    margin-bottom:15px;
    position: relative;
  }
  .flashlist .item:before{
    content:'';
    position: absolute;
    left:-33px;
    top:6px;
    width:10px;
    height:10px;
    background:#2f3954;
    border-radius: 50%;
  }
  .flashlist .item div.days{
    position: absolute;
    top:0;
    left:-45px;
    width:38px;
    border-radius: 3px;
    background:#ea7b33;
    border:1px solid #ea7b33;
    font-size:12px;
    transform: scale(0.9);
    transform-origin:0 0;
    z-index:3;
  }
  .flashlist .item div.days label{
    text-align:center;
    display: block;
  }
  .flashlist .item div.days .monthday{
    color:#fff;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .flashlist .item div.days .year{
    color:#333;
    background:#fff;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .flashlist .item span.time{
    background:#24344e;
    color:#ffffff;
    font-size:12px;
    padding:2px 15px;
    border-radius:15px;
    text-align:center;
    position: relative;
  }
  .flashlist .item span.time:before{
    content:'';
    position: absolute;
    left:-25px;
    top:9px;
    width:25px;
    height:1px;
    background:#2f3954;
  }
  .flashlist .item p{
    margin-top:15px;
    color:#bec8d4;
    text-align:justify;
    font-size:13px;
  }
  .flashlist .item p span{
    color:#c00;
  }
</style>
