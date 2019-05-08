<template>
  <section>
    <div class="online-box">
      <div class="basicio">
				<div class="wrap">
					<div class="avatar" style="background-image:url(../../public/img/default.png)"></div>
      		<div class="lname"><span>期达人直播室</span><span>{{online}}</span></div>
          <span class="btn-subscribe" v-if="liveDetail.isAttention">已关注</span>
          <span class="btn-subscribe" v-else>关注</span>
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
                <span v-for="item in liveDetail.noticeboard">{{item.title}}</span>
              </marquee>
            </div>
					</div>
					<div class="notice"><label>平台公告：</label><span>{{liveDetail.theme}}</span></div>
				</div>
				<div class="chatlst">
					<ul class="video-sms-list" id="video_sms_list" style="display:none"></ul>
					<div class="wrap">
            <div class="item" :class="item.userRole == 0 ? 'admin':''" v-for="(item,index) in chatData" :key="index">
              <span class="nickname">{{item.sender}}：</span>
		          <span class="message" v-html="item.chatContent"></span>
            </div>
          </div>
				</div>
			</div>
    </div>
  </section>
</template>
<script>
import 'public/jquery.mCustomScrollbar.min.css'
import 'jquery-mousewheel'
import 'malihu-custom-scrollbar-plugin'
import common from '../../utils/common'
import http from '../../utils/http'
import api from '../../utils/api'
import global from '../../utils/global'
import ImBase from 'public/demo_base.js'
import { Toast } from 'mint-ui'
export default{
  name:'livedetail',
  data(){
    return{
      online:'0',
      liveDetail:{},
      groupId:'',
      studioId:'',
      avChatRoomId:'',
      chatData:[{
        userRole:0,
        sender:'管理员',
        chatContent:'直播内容仅限用户交流和探讨，不构成任何投资建议。市场有风险，投资需谨慎；主播观点不代表期达人立场；勿轻信外部链接，谨防诈骗，欢迎举报。'
      }],
      WebIm: { // WebIm
        accountMode: null, // 帐号模式，0-表示独立模式，1-表示托管模式
        sdkAppID: null, // 官方 demo appid,需要开发者自己修改（托管模式）
        accountType: null,
        avChatRoomId: null, // 默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
        loginInfo: {},
        listeners: {}, // 监听事件
        options: {}, // 其他对象，选填
        selType: null,
        selToID: null,
        selSess: null, // 当前聊天会话
        selSessHeadUrl: '',
        openEmotionFlag: null //是否打开过表情
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  mounted(){
    $(".chatlst").mCustomScrollbar({
      theme:"light", //主题颜色
      scrollInertia:1000
    });
    let that = this
    that.onlinenumber()
    setTimeout(() => {
      that.getSig()
      that.getStream()
    },500)
    setTimeout(() => {
      that.init()
      that.LiveDetail()
    },800)
  },
  beforeDestroy(){
    this.logout()  //webim注销
  },
  methods:{
    LiveDetail(){
      let data = {
        reqbase:{
          timestamp:common.getLastDate(),
          clientauthflag:common.getClientauthflag(),
          reqorigin:"xuantie",
          token:common.getToken(),
          sourceip:common.getIp()
        },
        reqpage:{
          total:0,
          page:1,
          size:10,
          count:false
        },
        reqparam:{
          userId:this.user?this.user.memberId:null,
          roomId:global.studioId
        }
      }
      let that = this
      http.postmain(api.liveDetail,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.liveDetail = response.data.respparam
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    onlinenumber(){
      let data = {
        reqbase:{
          timestamp:common.getLastDate(),
          clientauthflag:common.getClientauthflag(),
          reqorigin:"chat",
          token:common.getToken(),
          sourceip:common.getIp()
        },
        reqpage:{
          total:0,
          page:1,
          size:10,
          count:false
        },
        reqparam:{
          studioId:global.studioId
        }
      }
      let that = this
      http.postlog(api.getOnLineNumber,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          that.online = response.data.respparam.total
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    init(){
        //帐号模式，0-表示独立模式，1-表示托管模式
    		this.WebIm.accountMode = 1;
    		//官方 demo appid,需要开发者自己修改（托管模式）
        // this.WebIm.sdkAppID = 1400094844;
    		// this.WebIm.accountType = 27616;
        this.WebIm.sdkAppID = 1400126465;
    		this.WebIm.accountType = 35080;
        // this.WebIm.avChatRoomId = '@TGS#aQJ4UZUFK'; //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
        this.WebIm.avChatRoomId = '@TGS#aCJEMZXFI'; //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
    		if(webim.Tool.getQueryString("groupid")) {
    			this.WebIm.avChatRoomId = webim.Tool.getQueryString("groupid"); //用户自定义房间群id
    		}
    		this.WebIm.selType = webim.SESSION_TYPE.GROUP;
    		this.WebIm.selToID = this.WebIm.avChatRoomId; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    		this.WebIm.selSess = null; //当前聊天会话
    //		console.log(selType);
    		//默认群组头像(选填)
    		this.WebIm.selSessHeadUrl = '';
    		//当前用户身份
    		this.WebIm.loginInfo = {
    			'sdkAppID': this.WebIm.sdkAppID, //用户所属应用id,必填
    			'appIDAt3rd': this.WebIm.sdkAppID, //用户所属应用id，必填
    			'accountType': this.WebIm.accountType, //用户所属应用帐号类型，必填
    			'identifier': this.user?this.user.nickName:common.getCookie("t_nickname"), //当前用户ID,必须是否字符串类型，选填
    			'identifierNick': this.user?this.user.nickName:common.getCookie("t_nickname"), //当前用户昵称，选填
    			'userSig': sessionStorage.sig?sessionStorage.sig:common.getCookie("t_sig"), //当前用户身份凭证，必须是字符串类型，选填
    			'headurl': '' //当前用户默认头像，选填
    		};
    		//监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    		//注意每个数字代表的含义，比如，
    		//1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
    		var onGroupSystemNotifys = {
    			//"1": onApplyJoinGroupRequestNotify, //申请加群请求（只有管理员会收到,暂不支持）
    			//"2": onApplyJoinGroupAcceptNotify, //申请加群被同意（只有申请人能够收到,暂不支持）
    			//"3": onApplyJoinGroupRefuseNotify, //申请加群被拒绝（只有申请人能够收到,暂不支持）
    			//"4": onKickedGroupNotify, //被管理员踢出群(只有被踢者接收到,暂不支持)
    			"5": ImBase.onDestoryGroupNotify, //群被解散(全员接收)
    			//"6": onCreateGroupNotify, //创建群(创建者接收,暂不支持)
    			//"7": onInvitedJoinGroupNotify, //邀请加群(被邀请者接收,暂不支持)
    			//"8": onQuitGroupNotify, //主动退群(主动退出者接收,暂不支持)
    			//"9": onSetedGroupAdminNotify, //设置管理员(被设置者接收,暂不支持)
    			//"10": onCanceledGroupAdminNotify, //取消管理员(被取消者接收,暂不支持)
    			"11": ImBase.onRevokeGroupNotify, //群已被回收(全员接收)
    			"255": ImBase.onCustomGroupNotify //用户自定义通知(默认全员接收)
    		};
    		//监听连接状态回调变化事件
    		this.WebIm.listeners.onConnNotify = function(resp) {
    			switch(resp.ErrorCode) {
    				case webim.CONNECTION_STATUS.ON:
    					//webim.Log.warn('连接状态正常...');
    					break;
    				case webim.CONNECTION_STATUS.OFF:
    					webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
    					break;
    				default:
    					webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
    					break;
    			}
    		};
    		//监听事件
    		this.WebIm.listeners = {
    			"onConnNotify": this.WebIm.listeners.onConnNotify, //选填
    			"jsonpCallback": ImBase.jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
    			"onBigGroupMsgNotify": this.onBigGroupMsgNotify, //监听新消息(大群)事件，必填
    			"onMsgNotify": ImBase.onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
    			"onGroupSystemNotifys": ImBase.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
    			"onGroupInfoChangeNotify": ImBase.onGroupInfoChangeNotify //监听群资料变化事件，选填
    		};
    		var isAccessFormalEnv = true; //是否访问正式环境
    		if(webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
    			isAccessFormalEnv = false; //访问测试环境
    		}
    		var isLogOn = false; //是否在浏览器控制台打印sdk日志
    		//其他对象，选填
    		var options = {
    			'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
    			'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
    		};
    		var curPlayAudio = null; //当前正在播放的audio对象
    		this.WebIm.openEmotionFlag = false; //是否打开过表情
    		this.sdkLogin();
    		if(/debug/gi.test(location.hash)) {}
    },
    getSig(){
      if(this.user){
        let data = {
          reqbase:{
            timestamp:common.getLastDate(),
            clientauthflag:common.getClientauthflag(),
            reqorigin:"chat",
            token:common.getToken(),
            sourceip:common.getIp()
          },
          reqpage:{
            total:0,
            page:1,
            size:10,
            count:false
          },
          reqparam:{
            "SdkAppid":'1400094844',
      			"ClientIP":'127.0.0.1',
      			"userName": this.user.nickName,
      			"nickName": this.user.nickName,
            "uuid": ''
          }
        }
        http.postchat(api.getUserSigByName,data).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            sessionStorage.setItem('sig', response.data.respparam.UserSig)
          }else{
            Toast({
              message: response.data.respbase.returnmsg,
              position: 'middle',
              duration: 2000
            })
          }
        })
      }
    },
    //sdk登录
    sdkLogin() {
      let that = this
      let identifierNick = that.WebIm.loginInfo.identifierNick
    	//web sdk 登录
    	webim.login(this.WebIm.loginInfo, this.WebIm.listeners, this.WebIm.options,
    		function(identifierNick) {
    			//identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
    			webim.Log.info('webim登录成功');
    			that.applyJoinBigGroup(that.WebIm.avChatRoomId); //加入大群
    		},
    		function(err) {
    			console.log(err.ErrorInfo);
    		}
    	);
    },
    //进入大群
    applyJoinBigGroup(groupId) {
      let that = this
    	var options = {
    		'GroupId': groupId //群id
    	};
    	webim.applyJoinBigGroup(
    		options,
    		function(resp) {
    			//JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
    			if(resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
    				webim.Log.info('进群成功');
    				that.WebIm.selToID = groupId;
    			} else {
    				console.log('进群失败');
    			}
    		},
    		function(err) {
    			console.log(err.ErrorInfo);
    		}
    	);
    },
    //监听大群新消息（普通，点赞，提示，红包）
    onBigGroupMsgNotify(msgList) {
      let that = this;
    	for(var i = msgList.length - 1; i >= 0; i--) { //遍历消息，按照时间从后往前
    		var msg = msgList[i];
    		webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
        that.showMsg(msg);
    		if(msg.getElems()[msg.getElems().length - 1].content.ext == undefined) {
    			return;
    		}
    		let msgResult = msg.getElems()[msg.getElems().length - 1].content.ext;
    		let res = JSON.parse(msgResult);
        if(res.msgType == '11'){
          that.getStream(); //视频流发生变化
          return;
        }
        that.chatData.push(res)
        that.scrollToLast();
    	}
    },
    showMsg(msg) {
    	var isSelfSend, fromAccount, fromAccountNick, sessType, subType;

    	fromAccount = msg.getFromAccount();
    	if(!fromAccount) {
    		fromAccount = '';
    	}
    	fromAccountNick = msg.getFromAccountNick();
    	if(!fromAccountNick) {
    		fromAccountNick = '未知用户';
    	}
    	//解析消息
    	//获取会话类型，目前只支持群聊
    	//webim.SESSION_TYPE.GROUP-群聊，
    	//webim.SESSION_TYPE.C2C-私聊，
    	sessType = msg.getSession().type();
    	//获取消息子类型
    	//会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    	//会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    	subType = msg.getSubType();

    	isSelfSend = msg.getIsSend(); //消息是否为自己发的

    	switch(subType) {
    		case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
    			this.convertMsgtoHtml(msg);
    			break;
    		case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
    			this.convertMsgtoHtml(msg);
    			break;
    		case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
    			//业务自己可以增加逻辑，比如展示点赞动画效果
    			this.convertMsgtoHtml(msg);
    			//展示点赞动画
    			break;
    		case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
    			this.convertMsgtoHtml(msg);
    			break;
    		default:
    			break;
    	}
    },
    convertMsgtoHtml(msg) {
    	var html = "",
    	elems, elem, type, content;
    	elems = msg.getElems(); //获取消息包含的元素数组
    	for(var i in elems) {
    		elem = elems[i];
    		type = elem.getType(); //获取元素类型
    		content = elem.getContent(); //获取元素对象
    		switch(type) {
    			case webim.MSG_ELEMENT_TYPE.TEXT:
    				html += ImBase.convertTextMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.FACE:
    				html += ImBase.convertFaceMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.IMAGE:
    				html += ImBase.convertImageMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.SOUND:
    				html += ImBase.convertSoundMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.FILE:
    				html += ImBase.convertFileMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
    				//html += convertLocationMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.CUSTOM:
    				html += ImBase.convertCustomMsgToHtml(content);
    				break;
    			case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
    				html += this.convertGroupTipMsgToHtml(content);
    				break;
    			default:
    				webim.Log.error('未知消息元素类型: elemType=' + type);
    				break;
    		}
    	}
    	return webim.Tool.formatHtml2Text(html);
    },
    convertGroupTipMsgToHtml(content) {
      var that = this;
    	var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    	var text = "";
    	var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    	var opType, opUserId, userIdList;
    	var memberCount;
    	opType = content.getOpType(); //群提示消息类型（操作类型）
    	opUserId = content.getOpUserId(); //操作人id
    	userIdList = content.getUserInfo();
    	switch(opType) {
    		case webim.GROUP_TIP_TYPE.JOIN: //加入群
    			//text += opUserId + "邀请了";
    			for(var m in userIdList) {
    				if(userIdList[m].NickName != undefined) {
    					text += userIdList[m].NickName + ",";
    				} else {
    					text += userIdList[m].UserId + ",";
    				}
    				if(userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
    					text += "等" + userIdList.length + "人";
    					break;
    				}
    			}
    			text = text.substring(0, text.length - 1);
    			text = '<span>'+text+'</span>进入了房间';
    			//房间成员数加1
    			memberCount = $('#user-icon-fans').html();
    			$('#user-icon-fans').html(parseInt(memberCount) + 1);
          that.online++;
    			break;
    		case webim.GROUP_TIP_TYPE.QUIT: //退出群
    			var quitName = content.opUserId
    			text = '<span>'+quitName+'</span>离开了房间';
    			//房间成员数减1
    			memberCount = parseInt($('#user-icon-fans').html());
    			if(memberCount > 0) {
    				$('#user-icon-fans').html(memberCount - 1);
    			}
          that.online--;
    			break;
    		case webim.GROUP_TIP_TYPE.KICK: //踢出群
    			text += opUserId + "将";
    			for(var m in userIdList) {
    				if(userIdList[m].NickName != undefined) {
    					text += userIdList[m].NickName + ",";
    				} else {
    					text += userIdList[m].UserId + ",";
    				}
    				if(userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
    					text += "等" + userIdList.length + "人";
    					break;
    				}
    			}
    			text += "踢出该群";
    			break;
    		case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
    			text += opUserId + "将";
    			for(var m in userIdList) {
    				if(userIdList[m].NickName != undefined) {
    					text += userIdList[m].NickName + ",";
    				} else {
    					text += userIdList[m].UserId + ",";
    				}
    				if(userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
    					text += "等" + userIdList.length + "人";
    					break;
    				}
    			}
    			text += "设为管理员";
    			break;
    		case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
    			text += opUserId + "取消";
    			for(var m in userIdList) {
    				if(userIdList[m].NickName != undefined) {
    					text += userIdList[m].NickName + ",";
    				} else {
    					text += userIdList[m].UserId + ",";
    				}
    				if(userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
    					text += "等" + userIdList.length + "人";
    					break;
    				}
    			}
    			text += "的管理员资格";
    			break;

    		case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
    			text += opUserId + "修改了群资料：";
    			var groupInfoList = content.getGroupInfoList();
    			var type, value;
    			for(var m in groupInfoList) {
    				type = groupInfoList[m].getType();
    				value = groupInfoList[m].getValue();
    				switch(type) {
    					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
    						text += "群头像为" + value + "; ";
    						break;
    					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
    						text += "群名称为" + value + "; ";
    						break;
    					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
    						text += "群主为" + value + "; ";
    						break;
    					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
    						text += "群公告为" + value + "; ";
    						break;
    					case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
    						text += "群简介为" + value + "; ";
    						break;
    					default:
    						text += "未知信息为:type=" + type + ",value=" + value + "; ";
    						break;
    				}
    			}
    			break;

    		case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
    			text += opUserId + "修改了群成员资料:";
    			var memberInfoList = content.getMemberInfoList();
    			var userId, shutupTime;
    			for(var m in memberInfoList) {
    				userId = memberInfoList[m].getUserId();
    				shutupTime = memberInfoList[m].getShutupTime();
    				text += userId + ": ";
    				if(shutupTime != null && shutupTime !== undefined) {
    					if(shutupTime == 0) {
    						text += "取消禁言; ";
    					} else {
    						text += "禁言" + shutupTime + "秒; ";
    					}
    				} else {
    					text += " shutupTime为空";
    				}
    				if(memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
    					text += "等" + memberInfoList.length + "人";
    					break;
    				}
    			}
    			break;
    		default:
    			text += "未知群提示消息类型：type=" + opType;
    			break;
    	}
    	return text;
    },
    getStream(){
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
          studioId: global.studioId
        }
      }
      http.postvideo(api.getPushStreams,data).then((res) => {
        if(res.data.respbase.returncode == '10000'){
          var data = res.data.respparam
					if(data.liveFlag == 0){
						if(data.videoSource  == 0){
							var player = new Aliplayer({
						        "id": 'playbox',
						        "source":  data.pushRtmpStreams,
						        "width": "100%",
						        "height": "100%",
						        "autoplay": true,
						        "isLive": true,
						        "rePlay": true,
						        "playsinline": true,
						        "preload": true,
						        "controlBarVisibility": "hover",
						        "useH5Prism": true
					      	}, function (player) {
					        	console.log("播放器创建了。");
					      	})
						}else if(data.videoSource == 1){
							var player = new TcPlayer('playbox', {
	                	"m3u8": data.pushM3u8Streams, //请替换成实际可用的播放地址
	                	"flv": data.pushFlvStreams,
	                	"autoplay": true, //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
	                	"coverpic": "",
	                	"width": '100%', //视频的显示宽度，请尽量使用视频分辨率宽度
	                	"height": '100%' //视频的显示高度，请尽量使用视频分辨率高度
	                });
            	}
	        	}else{
			          $('#playbox').html('');
      					$('#playbox').css({ "background":'url(' + data.coverUrl + ')', 'background-size': '100% 100%' });
					}
        }else{
          Toast({
            message: res.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    backtolist(){
      this.quitBigGroup()
      this.$router.back(-1)
    },
    quitBigGroup() {
      var that = this
      var options = {
      	'GroupId': that.WebIm.avChatRoomId //群id
      };
      webim.quitBigGroup(
      	options,
      	function(resp) {
          that.online--;
      		webim.Log.info('退群成功');
      	},
      	function(err) {
      		console.log(err.ErrorInfo);
      	}
      );
    },
    //登出
    logout() {
      var that = this
    	webim.logout(
    		function(resp) {
    			webim.Log.info('登出成功');
    		}
    	);
    },
    //新消息出来后滚动到最下方
    scrollToLast() {
    	setTimeout(function() {
    		$(".chatlst").mCustomScrollbar('scrollTo', 'last');
    	}, 500)
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
  background:url(/public/img/icon-exit.png) no-repeat;
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
.noticebox .notice{
	padding:0 10px;
}
.noticebox .notice label{
	color:#fff;
	font-size:15px;
}
.noticebox .notice span{
	color:#e4a859;
	font-size:15px;
}
.chatbox .item{
	margin-bottom:5px;
  overflow: hidden;
}
.chatlst{
  height:calc(100% - 65px);
	margin-top:5px;
	padding: 0 5px 10px 10px;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
}
.chatbox .item .nickname{
	color:#fff;
	margin-right: 5px;
  float:left;
}
.chatbox .item.admin .nickname{
	color:#fe5c38;
	font-weight:bold;
}
.chatbox .item .red{
	color:#fe5c38;
	margin-right:10px;
}
.chatbox .item .message{
  float:left;
	color:#9caed1;
	line-height: 22px;
  word-break: break-all;
}
.chatbox .item .message img{
	max-width:200px;
	vertical-align: middle;
}
</style>
