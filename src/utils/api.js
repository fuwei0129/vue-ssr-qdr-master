export default {
  //****************************************
  //用户
  //****************************************
  login:'/user/login', //用户登录
  loginByCode:'/user/loginByCode', //手机验证码登录
  register:'/user/register', //用户注册
  sendSms:'/user/sendSms', //发送手机验证码
  logout:'/user/logout', //用户退出
  getChatList:'/chat/getChatList', //拉取聊天信息
  getUserSig:'/chat/getUserSig?SdkAppid=1400094844&ClientIP=127.0.0.1', //获取用户userSig
  autologin:'/user/autologin', //重新登录
  view:'/accessNotes/view', //访问记录
  keep:'/accessNotes/keep', //保持在线
  //****************************************
  //行情+快讯
  //****************************************
  getToken:'/token/access', //获取token
  stkdata:'/stkdata', //获取大行情
  //****************************************
  //期达人主要接口
  //****************************************
  getNewsRecommend:'/newsRecommend/getNewsRecommend', //推荐
  recommendDetail:'/newsRecommend/recommendDetails', //推荐详情
  getFutures:'/futures/getFutures', //7*24
  futuresDetail:'/futures/futuresDetails', //7*24详情
  getColumns:'/zhuangLan/zhuangLanList', //专栏
  columnDetail:'/zhuangLan/zhuangLanDetails', //专栏详情
  lives:'/zhiBo/zhiBoList', //直播列表
  liveBanners:'/zhiBo/showPosition', //直播列表轮播图
}
