<template>
  <section>
    <div class="mt104 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div class="calendar-box">
        <div class="condition">
          <!-- <div class="ico_rili">05/13</div> -->
          <div class="tab-btns">
            <router-link to="/calendar/data">数据</router-link>
            <router-link class="on" to="/calendar/event">事件</router-link>
          </div>
        </div>
        <weekly @dateClick="dateClickhandler($event)" :showYear="true"></weekly>
        <div class="event-lst">
          <div class="item">
            <div class="flag" style="background-image:url(../../public/img/default.png)"></div>
            <div class="info">
              <div class="star">
                <span>07:00</span>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star1.png)"></div>
              </div>
              <div class="des">2019年FOMC票委、芝加哥联储主席埃文斯(Charles Evans)在联邦储备系统社区发展研究会议中发表讲话。</div>
            </div>
          </div>
          <div class="item">
            <div class="flag" style="background-image:url(../../public/img/default.png)"></div>
            <div class="info">
              <div class="star">
                <span>07:00</span>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star1.png)"></div>
              </div>
              <div class="des red">国家统计局发布70个大中城市住宅销售价格月度报告。</div>
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
export default{
  name:'canlendarevent',
  data(){
    return{
      navIndex:4,
      isLoading:false, //是否显示加载中
      isMoreLoading:false, //是否加载更多
      noMore:false //是否还有更多
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
  }
  .info{
    flex:1;
    padding-bottom:15px;
    border-bottom:1px solid #192230;
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
    color:#a0a0a0;
    float: left;
    margin-right:10px;
  }
  .star:after{
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
