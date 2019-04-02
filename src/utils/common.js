const CryptoJS = require('crypto-js/crypto-js');
// 发送信息的时间
export function getMsgDate() {
  let date = new Date();
  let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;//月
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//日
	let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//小时
	let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分钟
	let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
	return  h +':'+ m+':' + s;
}
// 每条信息的id
export function getMsgId(len, radix){
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [], i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
		  if (!uuid[i]) {
		    r = 0 | Math.random()*16;
		    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		  }
		}
	}
	return uuid.join('');
}
//时间戳转换普通时间
export function toLocale(time){
  var unixTimestamp = new Date(time * 1000)
  var time = unixTimestamp.toLocaleString()
  return time;
}
// 获取标准年月日
export function getNewDate() {
 let date = new Date();
 let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;//月
 let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//日
 let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//小时
 let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分钟
 let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
 return date.getFullYear()+ '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
}
// aes加密
export function Encrypt(word,keys) {
  let key = CryptoJS.enc.Utf8.parse("%$xuanti!#"+keys);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}

//时间戳
export function getCurrentTime(){
  let currentTime = new Date().getTime()
  return currentTime
}

// 获取标准年月日
export function getLastDate() {
 let date = new Date();
 let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;//月
 let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();//日
 let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//小时
 let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分钟
 let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
 return date.getFullYear().toString() + month.toString() + day.toString() + h.toString() + m.toString() + s.toString();
}

//获取客户端鉴权标识
export function getClientauthflag(){
  let Nowclientauthflag = "xuanti!123!batch" + getLastDate()
  let clientauthflag = Encrypt(Nowclientauthflag, getLastDate().slice(-6))
  return clientauthflag
}
//获取客户端鉴权标识（other way)
export function getOtherClientauthflag(){
  let Nowclientauthflag = "xuanti!123" + getLastDate()
  let clientauthflag = Encrypt(Nowclientauthflag, getLastDate().slice(-6))
  return clientauthflag
}

//获取token
export function getToken(){
  let token = getCookie('userToken') ? getCookie('userToken') : ''
  return token
}

//获取userSign
export function getuserSign(){
  let userSign = getCookie('userSign') ? getCookie('userSign') : ''
  return userSign
}

//获取Ip
export function getIp(){
  let ip = returnCitySN.cip
  return ip
}
//获取城市名字
export function getCname(){
  let cname = returnCitySN.cname
  return cname
}
export function Appendzero(obj){ //不足2位补0
  if(obj<10) return "0" +""+ obj;
  else return obj;
}
//手机号显示处理
export function telformat(phone){
  return phone.substr(0, 3) + '****' + phone.substr(7)
}
export function getCookie(name) { //获取cookie
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
export function setCookie(c_name, value, expiredays) { //设置cookie
	var exdate = new Date();
	// var expiredays = 24 * 365
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}
export function delCookie(name) { //删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
export function logout(){  //删除用户信息
  delCookie("userId")
  delCookie("levelNum")
  delCookie("mobile")
  delCookie("nickName")
  delCookie("oldStudioId")
  delCookie("profilePhoto")
  delCookie("remark")
  delCookie("sex")
  delCookie("userType")
  delCookie("uuid")
  delCookie("userToken")
  delCookie("userSign")
  delCookie("userSig")
}
export default{
  getMsgDate,
  getMsgId,
  toLocale,
  getNewDate,
  getCurrentTime,
  getLastDate,
  getClientauthflag,
  getOtherClientauthflag,
  getToken,
  getuserSign,
  getIp,
  getCname,
  Appendzero,
  telformat,
  getCookie,
  setCookie,
  delCookie,
  logout
}
