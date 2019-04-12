<template>
  <section>
    <div class="futuresbox pdb52">
      <div class="item">
        <div class="main">
          <div class="flex summary">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
        <div class="reply">
          <div class="flex summary">
            <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt8" style="color:#b7b8b8;">郑梦琦</span>
            </div>
            <div class="r-time mt8">今天 10:59</div>
          </div>
          <div class="r-info">预测人工智能会引发的失业规模，这个已经成为全球经济学家...</div>
          <div class="photos">
            <span>6图</span>
            <div class="flex">
              <div class="child"><img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" /></div>
              <div class="child"><img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/4bda031877e7aca23fabcd558191915b506fc356.jpeg" /></div>
              <div class="child"><img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/5a9b102f3bc1b1a0e2ae08464a3d95b05581945b.jpeg" /></div>
            </div>
          </div>
        </div>
        <div class="buttons-bottom">
          <span class="ico_zf">20</span>
          <span class="ico_comment">205</span>
          <span class="ico_like">10</span>
          <span class="ico_rewards">5</span>
        </div>
      </div>
      <div class="item">
        <div class="main">
          <div class="flex summary">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  name:'futuresindex',
  data(){
    return{

    }
  },
}
</script>
<style>
.futuresbox .item{
  margin-bottom:10px;
}
.futuresbox .item .main{
  padding:15px;
  background:#141f30;
}
.futuresbox .avatar{
  background-size: contain;
  margin-right:10px;
  border-radius: 50%;
  overflow: hidden;
}
.futuresbox .lg-avatar{
  flex:0 0 50px;
  height:50px;
}
.futuresbox .sm-avatar{
  flex:0 0 40px;
  height:40px;
}
.futuresbox .mid{
  flex:1 1;
}
.futuresbox .mid span{
  display: block;
}
.futuresbox .mid span.uname{
  font-size:16px;
  color:#dededc;
}
.futuresbox .mid span.others{
  font-size:12px;
  color:#828487;
}
.futuresbox .right:after{
  content:'';
}
.futuresbox .right span{
  color:#7183a3;
  display: inline-block;
  margin-top:5px;
  font-size:15px;
  border:1px solid #7183a3;
  border-radius: 5px;
  padding:3px 10px;
}
.futuresbox .right span:before{
  content:'+';
}
.futuresbox .item .info{
  font-size:17px;
  color:#c2ccdd;
  margin-top:10px;
  line-height: 25px;
}
.futuresbox .item .info:before{
  content:"?";
  width:17px;
  height:17px;
  line-height: 17px;
  text-align: center;
  display: inline-block;
  background:#e26b2b;
  font-size:12px;
  border-radius: 1px;
  margin-right:8px;
}
.futuresbox .item .r-info{
  font-size:17px;
  color:#b6b6b6;
  margin-top:10px;
  line-height: 25px;
}
.futuresbox .item .r-time{
  color:#7183a3;
  font-size:13px;
}
.futuresbox .reply{
  padding:15px;
  background:#0f1623;
}
.futuresbox .photos{
  margin-top:10px;
  position: relative;
}
.futuresbox .photos .child{
  flex:1;
}
.futuresbox .photos .child:nth-child(2n){
  margin:0 5px;
}
.futuresbox .photos .child img{
  width:100%;
  height:70px;
}
.futuresbox .photos span{
  position: absolute;
  bottom:0;
  right:0;
  color:#fff;
  background:#5678a3;
  display: inline-block;
  padding:2px 5px;
  border-top-left-radius: 3px;
}
.futuresbox .buttons-bottom{
  margin-top:3px;
  background:#141f30;
  padding:12px 0;
  display: flex;
}
.futuresbox .buttons-bottom span{
  flex:1;
  text-align: center;
  color:#7183a3;
}
.futuresbox .buttons-bottom span.ico_zf{
  background:url(../../../public/ico_zf.png) no-repeat center;
  background-size:15px;
  padding-left:40px;
}
.futuresbox .buttons-bottom span.ico_comment{
  background:url(../../../public/ico_comment.png) no-repeat center;
  background-size:15px;
  padding-left:40px;
}
.futuresbox .buttons-bottom span.ico_like{
  background:url(../../../public/ico_like.png) no-repeat center;
  background-size:15px;
  padding-left:45px;
}
.futuresbox .buttons-bottom span.ico_rewards{
  background:url(../../../public/ico_rewards.png) no-repeat center;
  background-size:15px;
  padding-left:40px;
}
</style>
