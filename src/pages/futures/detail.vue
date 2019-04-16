<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <span class="icon-add" slot="right" @click="answer(1)">写回答</span>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="futures-detail-box pdt40 mt5">
      <div class="ask-box">
        <p class="title">如果有一天你突然有了130万美元，将会是一种什么样的感受呢？</p>
        <div class="flex author-row">
          <div class="avatar lg-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
          <div class="mid">
            <span class="uname mt5">郑梦琦</span>
            <span class="others">6小时前</span>
          </div>
          <div class="right">
            <span>关注</span>
          </div>
        </div>
        <div class="futures-photos-box half mt15">
          <span>6图</span>
          <div class="cover">
            <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
          </div>
        </div>
      </div>
      <div class="answer-box mt8">
        <div class="summary-bar-head">
          <span>回答（32）</span>
          <div class="fr"><label>按最新</label></div>
        </div>
        <div class="answer-list">
          <div class="answer-item">
            <div class="pd15">
              <div class="flex author-row">
                <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
                <div class="mid">
                  <span class="mini-uname">郑梦琦</span>
                  <span class="others">金融研究院老师</span>
                </div>
                <div class="right">
                  <span>关注</span>
                </div>
              </div>
              <div class="answer-info">
                <p @click="todetail(2)">黑色的相对重要度不高。有时候行情不一定会和数据产生的效果一直，所以只能仅供参考。</p>
                <div class="futures-photos-box half mt5">
                  <span>6图</span>
                  <div class="cover">
                    <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
                  </div>
                </div>
                <span class="time">2019-02-05 14:22:21</span>
              </div>
              <div class="comment-list">
                <div class="comment-item">
                  <div class="flex author-row">
                    <div class="avatar mini-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
                    <div class="mid">
                      <span class="mini-uname mt5">郑梦琦</span>
                    </div>
                  </div>
                  <p>如果有一天我突然有了100多万元，先买房在买车...</p>
                </div>
                <div class="comment-item">
                  <div class="flex author-row">
                    <div class="avatar mini-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
                    <div class="mid">
                      <span class="mini-uname mt5">郑梦琦</span>
                    </div>
                  </div>
                  <p>如果有一天我突然有了100多万元，先买房在买车...</p>
                </div>
              </div>
            </div>
            <div class="item-buttons-bottom border-top">
              <div><span class="ico_zf">20</span></div>
              <div><span class="ico_comment">999+</span></div>
              <div><span class="ico_like">10</span></div>
              <div><span class="ico_rewards">5</span></div>
            </div>
          </div>
          <div class="answer-item">
            <div class="pd15">
              <div class="flex author-row">
                <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
                <div class="mid">
                  <span class="mini-uname">郑梦琦</span>
                  <span class="others">金融研究院老师</span>
                </div>
                <div class="right">
                  <span>关注</span>
                </div>
              </div>
              <div class="answer-info">
                <p @click="todetail(3)">黑色的相对重要度不高。有时候行情不一定会和数据产生的效果一直，所以只能仅供参考。</p>
                <div class="futures-photos-box half mt5">
                  <span>6图</span>
                  <div class="cover">
                    <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
                  </div>
                </div>
                <span class="time">2019-02-05 14:22:21</span>
              </div>
            </div>
            <div class="item-buttons-bottom border-top">
              <div><span class="ico_zf">20</span></div>
              <div><span class="ico_comment">999+</span></div>
              <div><span class="ico_like">10</span></div>
              <div><span class="ico_rewards">5</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  name:'futuresdetail',
  data(){
    return{

    }
  },
  methods:{
    answer(id){
      this.$router.push({name:'answer',params:{id:id}});
    },
    todetail(id){
      this.$router.push({name:'futuresreply',params:{id:id}});
    }
  }
}
</script>
<style>
</style>
