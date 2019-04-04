<template>
  <section>
    <mt-swipe :auto="4000" :defaultIndex="0" style="height:150px">
      <mt-swipe-item
          v-for="(item,index) in banners"
          :class="index == 0 ? 'is-active' : ''"
          :key="index"
          :prevent="true"
          :stopPropagation="true"
          v-if="item.pic != null">
        <img :src="item.pic" style="width:100%;height:100%;" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="lives mt10">
      <div class="item" v-for="(item,index) in lives" v-if="item.pic != null">
        <img :src="item.pic" style="width:100%;height:100%;" />
        <div class="info">
          <span class="fl">{{item.title}}</span>
          <span class="fr">{{item.livenum}}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
import http from '../../utils/http'
import api from '../../utils/api'
export default{
  name: "liveindex",
  props:{
    panel:''
  },
  data(){
    return{
    }
  },
  // 计算属性
  computed: {
      banners () {
        return this.$store.getters.getLiveBanners
      },
      lives () {
        return this.$store.getters.getLives
      }
  },
  mounted(){
    if(this.$store.getters.getLiveBanners.length > 0){
      return
    }
    this.getLiveBanners()
    this.getLives()
  },
  methods:{
    getLiveBanners(){
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
          page: 1,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      this.$store.dispatch('fetchLiveBanners', { model })
    },
    getLives(){
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
          page: 1,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      this.$store.dispatch('fetchLives', { model })
    }
  }
}
</script>
<style>
  .lives .item{
    margin-bottom:10px;
    width:48%;
    height:125px;
    float:left;
    position: relative;
  }
  .lives .item:nth-child(2n){
    float:right;
  }
  .lives .info{
    position: absolute;
    bottom:5px;
    left:0;
    width:100%;
  }
  .lives .info span{
    color:#fff;
    margin:0 5px;
    display: block;
    font-size:13px;
  }
</style>
