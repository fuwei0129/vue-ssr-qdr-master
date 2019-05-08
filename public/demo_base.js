const ImBase = {
//IE9(含)以下浏览器用到的jsonp回调函数

jsonpCallback(rspData) {
	//设置接口返回的数据
	webim.setJsonpLastRspData(rspData);
},

//监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
//newMsgList 为新消息数组，结构为[Msg]

onMsgNotify(newMsgList) {
	var newMsg;
	for(var j in newMsgList) { //遍历新消息
		newMsg = newMsgList[j];
		handlderMsg(newMsg); //处理新消息
	}
},

//处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）

handlderMsg(msg) {
	var fromAccount, fromAccountNick, sessType, subType, contentHtml;

	fromAccount = msg.getFromAccount();
	if(!fromAccount) {
		fromAccount = '';
	}
	fromAccountNick = msg.getFromAccountNick();
	if(!fromAccountNick) {
		fromAccountNick = fromAccount;
	}

	//解析消息
	//获取会话类型
	//webim.SESSION_TYPE.GROUP-群聊，
	//webim.SESSION_TYPE.C2C-私聊，
	sessType = msg.getSession().type();
	//获取消息子类型
	//会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
	//会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
	subType = msg.getSubType();

	switch(sessType) {
		case webim.SESSION_TYPE.C2C: //私聊消息
			switch(subType) {
				case webim.C2C_MSG_SUB_TYPE.COMMON: //c2c普通消息
					//业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
					//或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
					contentHtml = convertMsgtoHtml(msg);
					webim.Log.warn('receive a new c2c msg: fromAccountNick=' + fromAccountNick + ", content=" + contentHtml);
					//c2c消息一定要调用已读上报接口
					var opts = {
						'To_Account': fromAccount, //好友帐号
						'LastedMsgTime': msg.getTime() //消息时间戳
					};
					webim.c2CMsgReaded(opts);
					alert('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ", 内容=" + contentHtml);
					break;
			}
			break;
		case webim.SESSION_TYPE.GROUP: //普通群消息，对于直播聊天室场景，不需要作处理
			break;
	}
},

//显示消息（群普通+点赞+提示+红包）

showMsg(msg) {
	var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
	var ul, li, paneDiv, textDiv, nickNameSpan, contentSpan;

	fromAccount = msg.getFromAccount();
	if(!fromAccount) {
		fromAccount = '';
	}
	fromAccountNick = msg.getFromAccountNick();
	if(!fromAccountNick) {
		fromAccountNick = '未知用户';
	}
	ul = document.getElementById("video_sms_list");
	var maxDisplayMsgCount = 4;
	//var opacityStep=(1.0/4).toFixed(2);
	var opacityStep = 0.2;
	var opacity;
	var childrenLiList = $("#video_sms_list").children();
	if(childrenLiList.length == maxDisplayMsgCount) {
		$("#video_sms_list").children(":first").remove();
		for(var i = 0; i < maxDisplayMsgCount; i++) {
			opacity = opacityStep * (i + 1) + 0.2;
			$('#video_sms_list').children().eq(i).css("opacity", opacity);
		}
	}
	li = document.createElement("li");
	paneDiv = document.createElement("div");
	paneDiv.setAttribute('class', 'video-sms-pane');
	textDiv = document.createElement("div");
	textDiv.setAttribute('class', 'video-sms-text');
	nickNameSpan = document.createElement("span");

	var colorList = ['red', 'green', 'blue', 'org'];
	var index = Math.round(fromAccount.length % colorList.length);
	var color = colorList[index];
	nickNameSpan.setAttribute('class', 'user-name-' + color);
	nickNameSpan.innerHTML = webim.Tool.formatText2Html("" + fromAccountNick + "");
	contentSpan = document.createElement("span");

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
			contentSpan.innerHTML = convertMsgtoHtml(msg);
			break;
		case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
			contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
			break;
		case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
			//业务自己可以增加逻辑，比如展示点赞动画效果
			contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
			//展示点赞动画
			showLoveMsgAnimation();
			break;
		case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
			contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
			break;
		default:
			contentSpan.innerHTML = msg.tipText;
			break;
	}
	textDiv.appendChild(nickNameSpan);
	textDiv.appendChild(contentSpan);

	paneDiv.appendChild(textDiv);
	li.appendChild(paneDiv);
	ul.appendChild(li);
},

//把消息转换成Html

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
				html += convertTextMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.FACE:
				html += convertFaceMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.IMAGE:
				html += convertImageMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.SOUND:
				html += convertSoundMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.FILE:
				html += convertFileMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
				//html += convertLocationMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.CUSTOM:
				html += convertCustomMsgToHtml(content);
				break;
			case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
				html += convertGroupTipMsgToHtml(content);
				break;
			default:
				webim.Log.error('未知消息元素类型: elemType=' + type);
				break;
		}
	}
	return webim.Tool.formatHtml2Text(html);
},

//解析文本消息元素

convertTextMsgToHtml(content) {
	return content.getText();
},
//解析表情消息元素

convertFaceMsgToHtml(content) {
	console.log(content);
	var faceUrl = null;
	var data = content.getData();
	var index = webim.EmotionDataIndexs[data];

	var emotion = webim.Emotions[index];
	if(emotion && emotion[1]) {
		faceUrl = emotion[1];
	}
	if(faceUrl) {
		return "<img src='" + faceUrl + "'/>";
	} else {
		return data;
	}
},
//解析图片消息元素

convertImageMsgToHtml(content) {
	var smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
	var bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
	var oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
	if(!bigImage) {
		bigImage = smallImage;
	}
	if(!oriImage) {
		oriImage = smallImage;
	}
	return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
},
//解析语音消息元素

convertSoundMsgToHtml(content) {
	var second = content.getSecond(); //获取语音时长
	var downUrl = content.getDownUrl();
	if(webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
		return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
	}
	return '<audio src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
},
//解析文件消息元素

convertFileMsgToHtml(content) {
	var fileSize = Math.round(content.getSize() / 1024);
	return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + 'KB)</i></a>';

},
//解析位置消息元素

convertLocationMsgToHtml(content) {
	return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
},
//解析自定义消息元素

convertCustomMsgToHtml(content) {
	var data = content.getData();
	var desc = content.getDesc();
	var ext = content.getExt();
	return "data=" + data + ", desc=" + desc + ", ext=" + ext;
},
//解析群提示消息元素

convertGroupTipMsgToHtml(content) {
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
			text += "进入房间";
			//房间成员数加1
			memberCount = $('#user-icon-fans').html();
			$('#user-icon-fans').html(parseInt(memberCount) + 1);
			break;
		case webim.GROUP_TIP_TYPE.QUIT: //退出群
			var quitName = content.getQuitGorupName()
			text += quitName + "离开房间";
			//房间成员数减1
			memberCount = parseInt($('#user-icon-fans').html());
			if(memberCount > 0) {
				$('#user-icon-fans').html(memberCount - 1);
			}
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

//tls登录

tlsLogin() {
	//跳转到TLS登录页面
	TLSHelper.goLogin({
		sdkappid: loginInfo.sdkAppID,
		acctype: loginInfo.accountType,
		url: window.location.href
	});
},
//第三方应用需要实现这个函数，并在这里拿到UserSig

tlsGetUserSig(res) {
	//成功拿到凭证
	if(res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
		//从当前URL中获取参数为identifier的值
		loginInfo.identifier = webim.Tool.getQueryString("identifier");
		//拿到正式身份凭证
		loginInfo.userSig = res.UserSig;
		//从当前URL中获取参数为sdkappid的值
		loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
		//从cookie获取accountType
		var accountType = webim.Tool.getCookie('accountType');
		if(accountType) {
			loginInfo.accountType = accountType;
			sdkLogin(); //sdk登录
		} else {
			location.href = location.href.replace(/\?.*$/gi, "");
		}
	} else {
		//签名过期，需要重新登录
		if(res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
			tlsLogin();
		} else {
			alert("[" + res.ErrorCode + "]" + res.ErrorInfo);
		}
	}
},

//单击图片事件

imageClick(imgObj) {
	var imgUrls = imgObj.src;
	var imgUrlArr = imgUrls.split("#"); //字符分割
	var smallImgUrl = imgUrlArr[0]; //小图
	var bigImgUrl = imgUrlArr[1]; //大图
	var oriImgUrl = imgUrlArr[2]; //原图
	webim.Log.info("小图url:" + smallImgUrl);
	webim.Log.info("大图url:" + bigImgUrl);
	webim.Log.info("原图url:" + oriImgUrl);
},

//切换播放audio对象

onChangePlayAudio(obj) {
	if(curPlayAudio) { //如果正在播放语音
		if(curPlayAudio != obj) { //要播放的语音跟当前播放的语音不一样
			curPlayAudio.currentTime = 0;
			curPlayAudio.pause();
			curPlayAudio = obj;
		}
	} else {
		curPlayAudio = obj; //记录当前播放的语音
	}
},

//发送消息(群点赞消息)

sendGroupLoveMsg() {

	if(!loginInfo.identifier) { //未登录
		if(accountMode == 1) { //托管模式
			//将account_type保存到cookie中,有效期是1天
			webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
			//调用tls登录服务
			tlsLogin();
		} else { //独立模式
			alert('请填写帐号和票据');
			$('#login_dialog').show();
		}
		return;
	}

	if(!selToID) {
		alert("您还没有进入房间，暂不能点赞");
		return;
	}

	if(!selSess) {
		selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
	}
	var isSend = true; //是否为自己发送
	var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
	var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
	var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
	//群消息子类型如下：
	//webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
	//webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
	//webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
	//webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
	var subType = webim.GROUP_MSG_SUB_TYPE.LOVEMSG;

	var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
	var msgtosend = 'love_msg';
	var text_obj = new webim.Msg.Elem.Text(msgtosend);
	msg.addText(text_obj);

	webim.sendMsg(msg, function(resp) {
		if(selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
			showMsg(msg);
		}
		webim.Log.info("点赞成功");
	}, function(err) {
		webim.Log.error("发送点赞消息失败:" + err.ErrorInfo);
		alert("发送点赞消息失败:" + err.ErrorInfo);
	});
},
//隐藏评论文本框

hideDiscussForm() {
	$(".video-discuss-form").hide();
},
//显示评论文本框

showDiscussForm() {
	$(".video-discuss-form").show();
},
//隐藏评论工具栏

hideDiscussTool() {
	$(".video-discuss-tool").hide();
},
//显示评论工具栏

showDiscussTool() {
	$(".video-discuss-tool").show();
},
//展示点赞动画

showLoveMsgAnimation() {
	//点赞数加1
	var loveCount = $('#user-icon-like').html();
	$('#user-icon-like').html(parseInt(loveCount) + 1);
	var toolDiv = document.getElementById("video-discuss-tool");
	var loveSpan = document.createElement("span");
	var colorList = ['red', 'green', 'blue'];
	var max = colorList.length - 1;
	var min = 0;
	var index = parseInt(Math.random() * (max - min + 1) + min, max + 1);
	var color = colorList[index];
	loveSpan.setAttribute('class', 'like-icon zoomIn ' + color);
	toolDiv.appendChild(loveSpan);
},

//退出大群

quitBigGroup() {
	var options = {
		'GroupId': avChatRoomId //群id
	};
	webim.quitBigGroup(
		options,
		function(resp) {

			webim.Log.info('退群成功');
			$("#video_sms_list").find("li").remove();
			//webim.Log.error('进入另一个大群:'+avChatRoomId2);
			//applyJoinBigGroup(avChatRoomId2);//加入大群
		},
		function(err) {
			alert(err.ErrorInfo);
		}
	);
},

//登出

logout() {
	//登出
	webim.logout(
		function(resp) {
			webim.Log.info('登出成功');
			loginInfo.identifier = null;
			loginInfo.userSig = null;
			$("#video_sms_list").find("li").remove();
			var indexUrl = window.location.href;
			var pos = indexUrl.indexOf('?');
			if(pos >= 0) {
				indexUrl = indexUrl.substring(0, pos);
			}
			window.location.href = indexUrl;
		}
	);
},

//点击登录按钮(独立模式)

independentModeLogin() {
	if($("#login_account").val().length == 0) {
		alert('请输入帐号');
		return;
	}
	if($("#login_pwd").val().length == 0) {
		alert('请输入UserSig');
		return;
	}
	loginInfo.identifier = $('#login_account').val();
	loginInfo.userSig = $('#login_pwd').val();
	$('#login_dialog').hide();
	sdkLogin();
},
}
