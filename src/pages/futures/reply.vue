<template>
  <section>
    <mt-header fixed>
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="futures-detail-box pdt40 mt5">
      <div class="answer-box pd15">
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
          <p>黑色的相对重要度不高。有时候行情不一定会和数据产生的效果一直，所以只能仅供参考。</p>
          <div class="futures-photos-box half mt5">
            <span>6图</span>
            <div class="cover">
              <img src="http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20190122/128a3b665f91662b5fd3f42a842adf8e93ca3ba2.jpeg" />
            </div>
          </div>
          <span class="time">2019-02-05 14:22:21</span>
        </div>
      </div>
      <div class="comment-box mt8">
        <div class="summary-bar-head">
          <span>评论（1）</span>
          <div class="fr"><label>按最新</label></div>
        </div>
        <div class="reply-comment-list">
          <div class="item">
            <div class="flex author-row">
              <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
              <div class="mid">
                <span class="mini-uname">郑梦琦</span>
                <span class="others">04-09 12:18</span>
              </div>
              <div class="ct-right">
                <span>8</span>
              </div>
            </div>
            <div class="comment-info">
              <p>黑色的相对重要度不高。有时候行情不一定会和数据产生的效果一直，所以只能仅供参考。</p>
            </div>
          </div>
          <div class="item">
            <div class="flex author-row">
              <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
              <div class="mid">
                <span class="mini-uname">郑梦琦</span>
                <span class="others">04-09 12:18</span>
              </div>
              <div class="ct-right">
                <span>1.3k</span>
              </div>
            </div>
            <div class="comment-info">
              <p>黑色的相对重要度不高。</p>
            </div>
          </div>
          <div class="item">
            <div class="flex author-row">
              <div class="avatar sm-avatar" style="background-image:url(http://qdrwebsite.oss-cn-beijing.aliyuncs.com/20181122/122c8e81033b85e3214e20d74a09d3b376fb60e6.png)"></div>
              <div class="mid">
                <span class="mini-uname">郑梦琦</span>
                <span class="others">04-09 12:18</span>
              </div>
              <div class="ct-right">
                <span>8</span>
              </div>
            </div>
            <div class="comment-info">
              <p>。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-add">
        <div></div>
        <div></div>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  name:'futuresreply',
  data(){
    return{

    }
  }
}
</script>
<style>
</style>
