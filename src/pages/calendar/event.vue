<template>
  <section>
    <div class="mt104 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div
          class="calendar-box"
          v-if="$route.path == '/calendar/event'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="condition">
          <!-- <div class="ico_rili">05/13</div> -->
          <div class="tab-btns">
            <router-link to="/calendar/data">数据</router-link>
            <router-link class="on" to="/calendar/event">事件</router-link>
          </div>
        </div>
        <weekly @dateClick="dateClickhandler($event)" :showYear="true"></weekly>
        <div class="event-lst" v-for="(item,index) in eventdata" :key="index">
          <div class="item">
            <div class="flag" v-bind:style="{backgroundImage: 'url('+item.picUrl+')'}"></div>
            <div class="info">
              <div class="top">
                <span>{{item.eventTime | timefilter}}</span>
                <div class="star" v-if="item.importantLevel == 1">
                  <div style="background-image:url(../../public/img/ico_star2.png)"></div>
                  <div v-for="i in 4" style="background-image:url(../../public/img/ico_star1.png)"></div>
                </div>
                <div class="star" v-else-if="item.importantLevel == 2">
                  <div v-for="i in 2" style="background-image:url(../../public/img/ico_star2.png)"></div>
                  <div v-for="i in 3" style="background-image:url(../../public/img/ico_star1.png)"></div>
                </div>
                <div class="star" v-else-if="item.importantLevel == 3">
                  <div v-for="i in 3" style="background-image:url(../../public/img/ico_star3.png)"></div>
                  <div v-for="i in 2" style="background-image:url(../../public/img/ico_star1.png)"></div>
                </div>
                <div class="star" v-else-if="item.importantLevel == 4">
                  <div v-for="i in 4" style="background-image:url(../../public/img/ico_star3.png)"></div>
                  <div style="background-image:url(../../public/img/ico_star1.png)"></div>
                </div>
                <div class="star" v-else-if="item.importantLevel == 5">
                  <div v-for="i in 5" style="background-image:url(../../public/img/ico_star3.png)"></div>
                </div>
              </div>
              <div class="des">{{item.title}}</div>
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
    </div>
  </section>
</template>
<script>
import mynav from '../../components/nav.vue'
import weekly from '../../components/weekly.vue'
import http from '../../utils/http'
import api from '../../utils/api'
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
      reqparam:{
        eventTime:null,
      }
    }
    return store.dispatch('fetchFNLists', { model }) // 服务端渲染触发
  },
  name:'canlendarevent',
  data(){
    return{
      navIndex:4,
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false, //是否还有更多
      date:null //查询日期
    }
  },
  // 计算属性
  computed: {
    eventdata() {
      return this.$store.getters.getEventData
    }
  },
  components:{
    mynav,
    weekly
  },
  methods:{
    dateClickhandler(e){
      $(e.currentTarget).addClass("on");
      $(e.currentTarget).parent().siblings().find("div").removeClass("on");
      $(e.currentTarget).parent().siblings().find("div").css({
        'background-color':'',
        'color':''
      });
      this.date = $(e.currentTarget).attr("data-val");
      this.noMore = false
      this.$store.commit('resetEventPage')
      this.$store.commit('clearEventData')
      let that = this
      setTimeout(() =>{
        that.fetchList()
      },300)
    },
    fetchList(){
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
          page: this.$store.getters.getEventPage,
          size: 10,
          count: true
        },
        reqparam:{
          eventTime:this.date
        }
      }
      let that = this
      http.postest(api.getFinancialNews,model).then((response) => {
        that.isLoading = false
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam.length == 0){
            that.noMore = true
          }else{
            that.isMoreLoading = false
            that.$store.commit('setEventData',response.data.respparam)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addEventPage')
      var that = this
      setTimeout(() => {
        that.fetchList()
      },1000)
    }
  }
}
</script>
<style scoped>
  .event-lst .item{
    padding:15px 15px 0 15px;
    display: flex;
    overflow: hidden;
  }
  .flag{
    width:40px;
    height:40px;
    margin-top:5px;
    margin-right:15px;
    border-radius: 50%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .info{
    flex:1;
    padding-bottom:15px;
    border-bottom:1px solid #192230;
  }
  .top{
    margin-bottom:5px;
  }
  .star{
    float: left;
  }
  .star div{
    float:left;
    width:22px;
    height:20px;
    background-repeat: no-repeat;
    background-size:15px 15px;
    background-position: left center;
  }
  .top span{
    color:#a0a0a0;
    float: left;
    margin-right:10px;
  }
  .top:after{
    content:'';
    display: block;
    clear: both;
  }
  .des{
    color:#fff;
    text-align: justify;
  }
  .red{
    color:#f55561!important;
  }
</style>
