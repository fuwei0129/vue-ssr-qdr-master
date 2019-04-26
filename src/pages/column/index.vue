<template>
  <section>
    <div class="mt50 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div class="recommend-list"
            v-if="$route.path == '/column/index'"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isMoreLoading"
            infinite-scroll-distance="0"
            infinite-scroll-immediate-check="false">
        <div class="item-main" v-for="(item,index) in lists" :key="index" @click="todetail(item)">
          <div class="flexbox">
      			<div class="item-left">
      				<div class="item-title -webkit-box-orient">{{item.title}}</div>
      				<div class="item-bottom">
      					<span class="item-source">{{item.sourcefrom}}</span><span class="item-read">{{item.readcount}}人阅读</span>
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
    return store.dispatch('fetchColumnLists', { model }) // 服务端渲染触发
  },
  name: "columnindex",
  // 数据
  data(){
    return{
      navIndex:3,
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
        return this.$store.getters.getColumns // 专栏列表
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
          page: this.$store.getters.getColPage,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      let that = this
      http.postmain(api.getColumns,model).then((response) => {
        that.isLoading = false
        if(response.data.respbase.returncode == '10000'){
          if(response.data.respparam == null){
            that.noMore = true
          }else{
            that.isMoreLoading = false
            that.$store.commit('setColumns',response.data.respparam)
          }
        }else{
          console.log("出错")
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.$store.commit('addColPage')
      var that = this
      setTimeout(() => {
        that.fetchList()
      },1000)
    },
    todetail(obj){
      this.$router.push({name:'columndetail',params:{id:obj.id,type:obj.sourceTable}});
    }
  }
}
</script>
<style>
</style>
