<template>
  <section>
    <div class="online-box">
      <div class="basicio">
				<div class="wrap">
					<div class="avatar" style="background-image:url(/public/default.png)"></div>
      		<div class="lname"><span>期达人直播室</span><span>123123</span></div>
          <span class="btn-subscribe">关注</span>
				</div>
        <span class="icon-exit" @click="backtolist()"></span>
      </div>
      <div class="videobox">
				<div id="playbox"></div>
      </div>
      <div class="chatbox" id="chatbox">
				<!--<div class="bk-enter" id="bk-enter"></div>-->
				<div class="noticebox">
					<div class="infomation">
						<div class="lft"><span>期达人财经</span></div>
						<div class="rht">
              <marquee class="noticeText" id="noticeText" scrollamount="2.0" width="100%">
                <span>“糖周期”要来了？ 券商：糖价反转可期</span>
                <span>“糖周期”要来了？ 券商：糖价反转可期</span>
              </marquee>
            </div>
					</div>
					<div class="notice" style="margin-bottom:5px;"></div>
					<div class="notice"></div>
				</div>
				<div class="chatlst">
					<ul class="video-sms-list" id="video_sms_list" style="display:none"></ul>
					<div class="wrap">
            <div class="item">
              <div class="basic">
                <span class="nickname">士君天空</span>
                <span class="time">15:04:02</span>
              </div>
              <div class="message">老师铜可以接多不</div>
            </div>
            <div class="item admin">
              <div class="basic">
                <span class="nickname">admin</span>
                <span class="time">15:04:02</span>
              </div>
              <div class="message">游客朋友注册下会员游客朋友注册下会员再来提问哦游客朋友注册下会员再来提问哦游客朋友注册下会员再来提问哦游客朋友注册下会员再来提问哦再来提问哦</div>
            </div>
          </div>
				</div>
			</div>
    </div>
  </section>
</template>
<script>
export default{
  name:'livedetail',
  data(){
    return{

    }
  },
  methods:{
    backtolist(){
      this.$router.back(-1);
    }
  }
}
</script>
<style scoped>
.online-box{
  position: absolute;
  width:100%;
  height:100%;
  left:0;
  top:0;
  overflow: hidden;
}
.basicio{
  padding:0 10px;
  margin:10px 0;
  position: relative;
  overflow: hidden;
}
.basicio .wrap{
  float: left;
  height: 50px;
  border-radius: 25px;
  background: #182947;
}
.basicio .wrap .avatar{
  width: 50px;
  height: 50px;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size:100% 50px;
}
.basicio .lname{
    float: left;
    margin-top: 5px;
    margin-left: 10px;
}
.basicio .lname span{
    display: block;
    color: #8c94a3;
    height: 20px;
    line-height: 20px;
}
.basicio .btn-subscribe{
  display: block;
  margin-top: 12px;
  margin-left: 15px;
  margin-right: 10px;
  float: right;
  padding: 3px 10px;
  border-radius: 15px;
  color: #333;
  background: #e4a859;
}
.basicio .icon-exit{
  background:url(/public/icon-exit.png) no-repeat;
  position: absolute;
  top: 10px;
  right: 15px;
  width: 20px;
  height: 20px;
  display: block;
  background-size: 20px;
  z-index: 3;
}
.videobox{
    height: 210px;
    background: #10141c;
    position: relative;
    overflow: hidden;
}
#playbox{
  width:100%;
  height:100%;
}
.chatbox {
    height: calc(100% - 280px);
}
.noticebox .infomation {
    overflow: hidden;
    background: #e4a859;
    height: 40px;
    padding: 5px 0;
    margin-bottom: 10px;
}
.noticebox .lft {
    float: left;
    width: 30%;
    height: 30px;
}
.noticebox .lft span {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #FFFFFF;
    font-size: 15px;
}
.noticebox .rht {
    width: 70%;
    background: #fff;
    float: right;
    height: 30px;
    padding-left: 10px;
}
.noticebox .noticeText {
    height: 30px;
    line-height: 30px;
    color: #2f3e59;
    font-size: 15px;
}
.noticebox .noticeText span {
    margin-right: 5px;
}
.chatbox .item{
	margin-bottom:5px;
}
.chatbox .item.itemgift{
	height:30px;
	line-height: 30px;
}
.chatbox .item.itemgift span{
	display: block;
	float: left;
}
.chatbox .item.itemgift .gift{
	display: block;
	float: left;
	width:30px;
	height:30px;
}
.chatbox .item:last-child{
	margin-bottom:0;
}
.chatlst{
	margin-top:10px;
	padding: 0 0 10px 10px;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
}
.chatbox .item .nickname{
	color:#fff;
	margin-right: 5px;
}
.chatbox .item.admin .nickname{
	color:#fe5c38;
	font-weight:bold;
}
.chatbox .item .time{
	margin-right: 5px;
    font-size: 13px;
    color: #999;
}
.chatbox .item .red{
	color:#fe5c38;
	margin-right:10px;
}
.chatbox .item .message{
	padding:5px 0;
	color:#9caed1;
	line-height: 22px;
  word-break: break-all;
}
.chatbox .item.admin .message{
	color:#fe5c38;
	font-weight:bold;
}
.chatbox .item .message img{
	max-width:200px;
	vertical-align: middle;
}
</style>
