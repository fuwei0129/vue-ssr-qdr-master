<template>
  <section>
    <div class="mt104 pdb52">
      <mynav :navIndex="navIndex"></mynav>
      <div class="calendar-box">
        <div class="condition">
          <!-- <div class="ico_rili">05/13</div> -->
          <div class="tab-btns">
            <router-link class="on" to="/calendar/data">数据</router-link>
            <router-link to="/calendar/event">事件</router-link>
          </div>
        </div>
        <weekly @dateClick="dateClickhandler($event)" :showYear="true"></weekly>
        <div class="data-lst">
          <div class="item">
            <div class="lft">
              <span class="time">10:04</span>
              <div class="flag" style="background-image:url(../../public/img/default.png)"></div>
              <!-- <div class="flag" v-if="item.pic==''" style="background-image:url(../../public/img/default.png)"></div>
              <div class="flag" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div> -->
            </div>
            <div class="rht">
              <p class="title">韩国4月外汇储备（亿美元）</p>
              <div class="star">
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star1.png)"></div>
              </div>
              <div class="vals">
                <span>前值：-1.7%</span>
                <span style="margin-left:20px;">预期值：--</span>
              </div>
              <div class="publish">
                <label>公布值</label>
                <span>即将公布</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="lft">
              <span class="time">10:04</span>
              <div class="flag" style="background-image:url(../../public/img/default.png)"></div>
              <!-- <div class="flag" v-if="item.pic==''" style="background-image:url(../../public/img/default.png)"></div>
              <div class="flag" v-else v-bind:style="{backgroundImage: 'url('+item.pic+')'}"></div> -->
            </div>
            <div class="rht">
              <p class="title red">韩国4月外汇储备（亿美元）韩国4月外汇储备（亿美元）韩国4月外汇储备（亿美元）</p>
              <div class="star">
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star3.png)"></div>
                <div style="background-image:url(../../public/img/ico_star1.png)"></div>
                <span>已公布</span>
              </div>
              <div class="vals">
                <span>前值：-1.7%</span>
                <span style="margin-left:20px;">预期值：--</span>
              </div>
              <div class="publish">
                <label>公布值</label>
                <span class="yellow">1.0%</span>
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
export default{
  name:'canlendardata',
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
