<template>
  <section>
    <div class="mt104 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div
          class="calendar-box"
          v-if="$route.path == '/calendar/data'"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="false">
        <div class="condition">
          <!-- <div class="ico_rili">05/13</div> -->
          <div class="tab-btns">
            <router-link class="on" to="/calendar/data">数据</router-link>
            <router-link to="/calendar/event">事件</router-link>
          </div>
        </div>
        <weekly @dateClick="dateClickhandler($event)" :showYear="true"></weekly>
        <div class="data-lst" v-for="(item,index) in cddata" :key="index">
          <div class="item">
            <div class="lft">
              <span class="time">{{item.publicTime | timefilter}}</span>
              <div class="flag" v-bind:style="{backgroundImage: 'url('+item.picUrl+')'}"></div>
            </div>
            <div class="rht">
              <p class="title" :class="item.importantLevel == 3 ? 'red' :''">{{item.title}}</p>
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
              <div class="vals">
                <label v-if="item.revised"><span>前值：{{item.revised}}</span></label>
                <label v-else>
                  <span>前值：{{item.previous == null ? '--' : item.previous }}{{item.unit == '%' && item.previous ? item.unit : ''}}</span>
                </label>
                <span style="margin-left:20px;">预期值：{{item.consensus == null ? '--' : item.consensus }}{{item.unit == '%' && item.consensus ? item.unit : ''}}</span>
              </div>
              <div class="publish">
                <label>公布值</label>
                <span :class="item.actual ? 'yellow' : ''">{{item.actual ? item.actual : '暂未公布'}}{{item.unit == '%' && item.actual ? item.unit : ''}}</span>
              </div>
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
        publicTime:null,
      }
    }
    return store.dispatch('fetchFCLists', { model }) // 服务端渲染触发
  },
  name:'canlendardata',
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
    cddata() {
      return this.$store.getters.getCdData
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
      this.$store.commit('resetCdPage')
      this.$store.commit('clearCdData')
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
          page: this.$store.getters.getCdPage,
          size: 10,
          count: true
        },
        reqparam:{
          publicTime:this.date
        }
      }
      let that = this
      http.postest(api.getFinancialCalendar,model).then((response) => {
        that.isLoading = false
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam.length == 0){
            that.noMore = true
          }else{
            that.isMoreLoading = false
            that.$store.commit('setCdData',response.data.respparam)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addCdPage')
      var that = this
      setTimeout(() => {
        that.fetchList()
      },1000)
    }
  }
}
</script>
<style scoped>
.data-lst .item{
  margin-bottom:10px;
  background:#171f2c;
  padding:15px;
  display: flex;
  overflow: hidden;
  position: relative;
}
.lft{
  width:40px;
  margin-right:10px;
  text-align: center;
}
.lft span{
  color:#a0a0a0;
  display: block;
  margin-bottom:15px;
}
.lft div.flag{
  position: absolute;
  bottom:18px;
  left:15px;
  width:40px;
  height:40px;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.rht{
  flex:1;
}
.rht p.title{
  color:#fff;
  font-size:15px;
  margin-bottom:10px;
}
.red{
  color:#f55561!important;
}
.star{
  margin-bottom:5px;
}
.star div{
  float:left;
  width:22px;
  height:20px;
  background-repeat: no-repeat;
  background-size:15px 15px;
  background-position: left center;
}
.star span{
  color:#7887a6;
  border: 1px solid #7887a6;
  border-radius: 2px;
  font-size:13px;
  display: inline-block;
  padding:0 5px;
  margin-left:10px;
}
.star:after{
  content:'';
  display: block;
  clear: both;
}
.vals span{
  color:#a0a0a0;
}
.publish{
  position: absolute;
  bottom:13px;
  right:15px;
  border: 1px solid #749ee5;
  width:80px;
  text-align: center;
  border-radius: 5px;
}
.publish label{
  border-bottom:1px solid #749ee5;
  color:#5191f8;
  font-size:13px;
  display: block;
  padding:2px 0;
}
.publish span{
  color:#7887a6;
  padding:2px 0;
  font-size:14px;
  display: block;
}
.yellow{
  color:#f4a035!important;
}
</style>
