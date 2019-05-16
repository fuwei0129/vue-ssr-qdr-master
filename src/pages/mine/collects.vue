<template>
  <section>
    <Head :title="title"></Head>
    <div class="pdt40">
      <div class="clst">
        <van-swipe-cell :right-width="100" :on-close="onClose" v-for="(item,index) in data" :key="index" :data-i="index">
          <div class="item" @click="todetail(item.studioid)">
            <div class="avatar" v-bind:style="{backgroundImage: 'url('+item.anchorpic+')'}"></div>
            <div class="info">
              <p class="name">{{item.title}}</p>
              <p class="des">{{item.content}}</p>
            </div>
          </div>
          <span slot="right" class="customize">删除</span>
        </van-swipe-cell>
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
import http from '../../utils/http'
import api from '../../utils/api'
import common from '../../utils/common'
import global from '../../utils/global'
import Head from '../../components/head.vue'
import { Toast } from 'mint-ui'
export default{
  name: "collects",
  data(){
    return{
      page:1,
      data:[],
      title:'我的收藏',
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
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
    var that = this
    if(sessionStorage.user){
      setTimeout(() => {
        that.fetchData(true)
      },500)
    }else{
      this.$router.push({name:'sign'})
    }
  },
  deactivated(){
    // console.log("deactivated")
  },
  methods:{
    fetchData(isFirst){
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
          page: this.page,
          size: 10,
          count: true
        },
        reqparam:{
          uid:this.user.memberId
        }
      }
      let that = this
      http.postmain(api.getCollectionList,model).then((response) => {
        if(isFirst){
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore = true
            }else{
              that.noMore = false
              that.data = response.data.respparam
            }
          }else{
            console.log("出错")
          }
        }else{
          that.isLoading = false
          if(response.data.respbase.returncode == '10000'){
            if(response.data.respparam.length == 0){
              that.noMore = true
            }else{
              that.isMoreLoading = false
              that.data = that.data.concat(response.data.respparam)
            }
          }else{
            console.log("出错")
          }
        }
      })
    },
    loadMore(){
      this.isMoreLoading = true // 设置加载更多中
      this.isLoading = true // 加载中转圈圈
      this.page++
      var that = this
      setTimeout(() => {
        that.fetchData(false)
      },1000)
    },
    onClose(clickPosition, instance) {
      let that = this
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            title: '确定要删除该收藏记录？'
          }).then(() => {
            let index = instance.$el.attributes["data-i"].nodeValue
            // instance.close();
            that.del(index);
          }).catch(() => {
            // on cancel
          });
          break;
      }
    },
    del(index){
      let data = {
        reqbase:{
          timestamp:common.getLastDate(),
          clientauthflag:common.getClientauthflag(),
          reqorigin:"xuantie",
          token:common.getToken(),
          sourceip:common.getIp()
        },
        reqpage:{},
        reqparam:{
          userId:this.user.memberId,
          roomId: global.studioId
        }
      }
      let that = this
      http.postmain(api.addOrNo,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.data.splice(index,1)
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    todetail(id){
      this.$router.push({name:'livedetail',params:{id:id}})
    }
  }
}
</script>
<style scoped>
.clst{
  margin-top:5px;
}
.clst .item{
  padding:15px 20px;
  height:80px;
  overflow: hidden;
  background:#161f2e;
  margin-bottom:2px;
  display: flex;
}
.avatar{
  width:50px;
  height:50px;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.info{
  flex:1;
  margin-left:15px;
}
.name{
  font-size:17px;
  color:#dbdbdb;
}
.des{
  height:20px;
  overflow: hidden;
  color:#898989;
}
.customize{
  height:80px;
  width:100px;
  display: block;
  background:#efa64a;
  line-height: 80px;
  color:#fff;
  font-size:18px;
  letter-spacing: 1px;
  text-align: center;
}
</style>
