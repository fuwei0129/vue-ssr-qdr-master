<template>
  <section>
    <mt-swipe :auto="4000" :defaultIndex="0" style="height:150px">
      <mt-swipe-item
          v-for="(item,index) in banners"
          :class="index == 0 ? 'is-active' : ''"
          :key="index"
          :prevent="false"
          :stopPropagation="false"
          @click.native="btodetail(item)"
          v-if="item.picUrl != null">
        <img :src="item.picUrl" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="recommend-list"
          v-if="panel==1"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="isMoreLoading"
          infinite-scroll-distance="0"
          infinite-scroll-immediate-check="true">
      <div class="item-main" v-for="(item,index) in lists" :key="index" @click="ltodetail(item)">
        <div class="normalbox" v-if="(index+1)%4 == 0">
          <div class="item-title -webkit-box-orient">{{item.title}}</div>
          <div class="item-photo" v-if="item.pic==''" style="background-image:url(../../public/img/default.png)"></div>
          <div class="item-photo" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div>
          <div class="item-bottom">
            <span class="item-author">{{item.sourceFrom}}</span><span class="item-created">{{item.createTime | timefilter}}</span>
          </div>
        </div>
        <div class="flexbox" v-else>
    			<div class="item-left">
    				<div class="item-title -webkit-box-orient">{{item.title}}</div>
    				<div class="item-bottom">
    					<span class="item-author">{{item.sourceFrom}}</span><span class="item-created">{{item.createTime | timefilter}}</span>
    				</div>
    			</div>
    			<div class="item-right" v-if="item.pic==''" style="background-image:url(../../public/img/default.png)"></div>
          <div class="item-right" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div>
        </div>
      </div>
    </div>
    <!--显示加载中-->
    <div class="loading-box" v-if="isLoading">
        <mt-spinner type="snake" class="loading-more"></mt-spinner>
        <span class="loading-more-txt">加载中...</span>
    </div>
    <div class="no-more" v-if="noMore">没有更多了~</div>
  </section>
</template>
<script>
import common from '../../utils/common'
import http from '../../utils/http'
import api from '../../utils/api'
export default{
  /**
   * [SSR获取所有组件的asyncData并执行获得初始数据]
   * @param  {[Object]} store [Vuex Store]
   * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
   */
  // asyncData (store, route) {
  //   let model = {
  //     reqbase:{
  //       timestamp: common.getLastDate(),
  //       clientauthflag: common.getClientauthflag(),
  //       reqorigin: "xuantie",
  //       token: "",
  //       sourceip: "127.0.0.1"
  //     },
  //     reqpage:{
  //       total:0,
  //       page: 1,
  //       size: 10,
  //       count: true
  //     },
  //     reqparam:{}
  //   }
  //   return store.dispatch('fetchRecommendLists', { model }) // 服务端渲染触发
  // },
  name: "newsindex",
  props:{
    panel:'',
    banners:{
      type:Array,
      default:function(){
        return []
      }
    },
    lists:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  // 数据
  data() {
    return {
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
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
          token: "",
          sourceip: common.getIp()
        },
        reqpage:{
          total:0,
          page: this.$store.getters.getRecPage,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      let that = this
      http.postmain(api.getNewsRecommend,model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam.news.length == 0){
              that.noMore = true
              that.isLoading = false
          }else{
            that.isMoreLoading = false
            that.isLoading = false
            that.$store.commit('setRecNews',response.data.respparam.news)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addRecPage')
      var that = this
      setTimeout(() => {
        this.fetchList()
      },1000)
    },
    btodetail(obj){
      this.$router.push({name:'newsdetail',params:{id:obj.id,type:obj.sourceTable}});
    },
    ltodetail(obj){
      this.$router.push({name:'newsdetail',params:{id:obj.fId,type:obj.sourceTable}});
    }
  }
}
</script>
<style>
.mint-swipe-indicator{
  background:#333!important;
  opacity: 1!important;
}
.mint-swipe-indicator.is-active{
  background:#4595e6!important;
}
</style>
