export default {
  //用户
  login:'/member/login', //用户登录
  codeLogin:'/member/codeLogin', //手机验证码登录
  register:'/member/register', //用户注册
  sendSms:'/member/sendSms', //发送手机验证码
  logout:'/member/logout', //用户退出
  autoLogin:'/member/autoLogin', //自动登录
  // 聊天相关
  getUserSigByName:'/chat/getUserSigByName',//获取sig
  getOnLineNumber:'/accessNotes/getOnLineNumber',//获取直播室在线人数
  //行情+快讯
  getToken:'/token/access', //获取token
  stkdata:'/stkdata', //获取大行情
  //期达人主要接口
  getNewsRecommend:'/newsRecommend/getNewsRecommend', //推荐
  recommendDetail:'/newsRecommend/recommendDetails', //推荐详情
  getFutures:'/futures/getFutures', //7*24
  futuresDetail:'/futures/futuresDetails', //7*24详情
  getFinancialCalendar:'/calendenar/getFinancialCalendar',//财经日历
  getFinancialNews:'/calendenar/getFinancialNews',//财经事件
  getColumns:'/zhuangLan/zhuangLanList', //专栏
  columnDetail:'/zhuangLan/zhuangLanDetails', //专栏详情
  readingInsert:'/functionManage/insert',//阅读文章+1 or 点赞
  lives:'/zhiBo/zhiBoList', //直播列表
  liveBanners:'/zhiBo/showPosition', //直播列表轮播图
  liveDetail:'/zhiBo/show',//获取直播室详情
  addOrNo:'/zhiBo/addOrNo',//关注直播间
  getPushStreams:'/aliyun/getPushStreams',//获取视频流
  getQuestions:'/questionManage/questionList',//期问列表
  findQuestion:'/questionManage/findQuestion',//期问详情
  queryAnswerDetail:'/answerManage/queryAnswerDetail',//回答详情
  attentionOrNo:'/userInfo/attentionOrNo',//关注用户，关注（收藏）期问问题
}
