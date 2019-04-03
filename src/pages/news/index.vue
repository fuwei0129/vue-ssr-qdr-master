<template>
  <div>
    <mt-swipe :auto="4000" :defaultIndex="0" style="height:150px">
      <mt-swipe-item
          v-for="(item,index) in banners"
          :class="firstindex == 0 ? 'is-active' : ''"
          :key="index"
          :prevent="true"
          :stopPropagation="true"
          v-if="item.picUrl != null">
        <img :src="item.picUrl" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="recommend-list">
      <div class="item-main" v-for="(item,index) in lists" :key="index" @click="ltodetail(item)">
        <div class="normalbox" v-if="(index+1)%4 == 0">
          <div class="item-title -webkit-box-orient">{{item.title}}</div>
          <div class="item-photo" v-if="item.pic==''" style="background-image:url(./public/default.png)"></div>
          <div class="item-photo" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div>
          <div class="item-bottom">
            <span class="item-author">{{item.sourceFrom}}</span><span class="item-created">{{item.createTime | datefilter1}}</span>
          </div>
        </div>
        <div class="flexbox" v-else>
    			<div class="item-left">
    				<div class="item-title -webkit-box-orient">{{item.title}}</div>
    				<div class="item-bottom">
    					<span class="item-author">{{item.sourceFrom}}</span><span class="item-created">{{item.createTime | timefilter}}</span>
    				</div>
    			</div>
    			<div class="item-right" v-if="item.pic==''" style="background-image:url(./public/default.png)"></div>
          <div class="item-right" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from '../../utils/common'
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
      firstindex:0,
      page: 1 // 页码
    }
  },
  mounted(){
  },
  methods:{
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
</style>
