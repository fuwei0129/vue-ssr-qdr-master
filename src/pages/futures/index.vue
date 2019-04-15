<template>
  <section>
    <div class="futuresbox pdb52">
      <div class="item">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(3)">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
        <div class="reply">
          <div class="flex author-row">
            <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt8" style="color:#b7b8b8;">郑梦琦</span>
            </div>
            <div class="r-time mt8">今天 10:59</div>
          </div>
          <div class="r-info">预测人工智能会引发的失业规模，这个已经成为全球经济学家...</div>
          <div class="futures-photos-box mt10">
            <span>6图</span>
            <div class="galley">
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/4bda031877e7aca23fabcd558191915b506fc356.jpeg" />
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190123/5a9b102f3bc1b1a0e2ae08464a3d95b05581945b.jpeg" />
            </div>
          </div>
        </div>
        <div class="item-buttons-bottom">
          <div><span class="ico_zf">20</span></div>
          <div><span class="ico_comment">999+</span></div>
          <div><span class="ico_like">10</span></div>
          <div><span class="ico_rewards">5</span></div>
        </div>
      </div>
      <div class="item">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(4)">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
      </div>
      <div class="item">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(5)">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
      </div>
      <div class="item">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(6)">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
        </div>
      </div>
      <div class="item">
        <div class="main">
          <div class="flex author-row">
            <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
            <div class="mid">
              <span class="uname mt5">郑梦琦</span>
              <span class="others">2分钟前 来自iPhone</span>
            </div>
            <div class="right">
              <span>关注</span>
            </div>
          </div>
          <div class="info" @click="todetail(1)">来自李开复的365种工作未来消亡概率图谱，看看有没有你的行业？</div>
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
  methods:{
    todetail(id){
      this.$router.push({name:'futuresdetail',params:{id:id}});
    }
  }
}
</script>
<style>
</style>
