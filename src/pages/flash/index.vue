<template>
  <section>
    <div class="flashlist">
      <div class="inner">
        <div class="item" v-for="(item,index) in flashlists" :key="index">
          <span>{{item.timeShow | datefilter1}}</span>
          <p>{{item.titleContent}}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import common from '../../utils/common'
export default{
  name: "flashindex",
  data(){
    return{

    }
  },
  // 计算属性
  computed: {
      flashlists () {
        return this.$store.getters.getFlashLists // 快讯列表
      }
  },
  mounted(){
    this.fetchList()
  },
  methods:{
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
          page: 1,
          size: 10,
          count: true
        },
        reqparam:{}
      }
      this.$store.dispatch('fetchFlashLists', { model })
    }
  }
}
</script>
<style>
  .flashlist{
    padding:10px 15px 10px 25px;
  }
  .flashlist .inner{
    border-left:1px solid #2f3954;
    padding-left:25px;
  }
  .flashlist .item{
    margin-bottom:10px;
    position: relative;
  }
  .flashlist .item:before{
    content:'';
    position: absolute;
    left:-30px;
    top:6px;
    width:10px;
    height:10px;
    background:#2f3954;
    border-radius: 50%;
  }
  .flashlist .item span{
    background:#24344e;
    color:#ffffff;
    font-size:12px;
    padding:2px 15px;
    border-radius:15px;
    text-align:center;
    position: relative;
  }
  .flashlist .item span:before{
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
</style>
