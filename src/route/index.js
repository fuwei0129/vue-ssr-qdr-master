// router.js
import Vue from 'vue'
import Router from 'vue-router'

import index from '../pages/index/index.vue'
import newsdetail from '../pages/news/detail.vue'
import flashindex from '../pages/flash/index.vue'
import liveindex from '../pages/live/index.vue'
import livedetail from '../pages/live/detail.vue'
import calendardata from '../pages/calendar/data.vue'
import calendarevent from '../pages/calendar/event.vue'
import columnindex from '../pages/column/index.vue'
import columndetail from '../pages/column/detail.vue'
import marketindex from '../pages/market/index.vue'
import futuresindex from '../pages/futures/index.vue'
import futuresdetail from '../pages/futures/detail.vue'
import futuresreply from '../pages/futures/reply.vue'
import answer from '../pages/futures/answer.vue'
import accountindex from '../pages/account/index.vue'
import sywg from '../pages/account/sywg.vue'
import mineindex from '../pages/mine/index.vue'
import notification from '../pages/mine/notification.vue'
import personal from '../pages/mine/personal.vue'
import editname from '../pages/mine/editname.vue'
import editdes from '../pages/mine/editdes.vue'
import attentions from '../pages/mine/attentions.vue'
import fans from '../pages/mine/fans.vue'
import asks from '../pages/mine/asks.vue'
import collects from '../pages/mine/collects.vue'
import sign from '../pages/sign.vue'
import registerprotocol from '../pages/registerprotocol.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history', // SSR必须使用history模式
    scrollBehavior: () => ({y: 0}),
    routes: [
      // 主页
  		{
        path: '/',
        name:'index',
        component: index,
        meta:{
          keepAlive: true,
          showFoot:true,
          title:'期达人国际期货_期达人期货咨询_期货投资咨询-期达人官网',
          keywords:'期达人锦囊,期达人期货指南,期货投资技巧,期达人官网',
          content:'期达人锦囊，为个人期货投资者提供期货投资技巧，以订阅的方式，提供期达人期货指南，帮助您获取最大的期货收益，您可以访问期达人锦囊，了解更多的期货投资指南，获取属于您的“锦囊妙计”。'
        }
      },
      {
        path: '/news/detail/:id/:type',
        name:'newsdetail',
        component: newsdetail,
        meta:{
          keepAlive: false,
          title:'期达人-推荐详情',
          keywords:'',
          content:'期达人-推荐详情描述'
        }
      },
      {
        path: '/flash/index',
        name:'flashindex',
        component: flashindex,
        meta:{
          keepAlive: true,
          showFoot:true,
          title:'期达人-7*24',
          keywords:'',
          content:'期达人-7*24快讯'
        }
      },
      {
        path: '/live/index',
        name:'liveindex',
        component: liveindex,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-视频',
          keywords:'',
          content:'期达人-视频列表'
        }
      },
      {
        path: '/live/detail/:id',
        name:'livedetail',
        component: livedetail,
        meta:{
          keepAlive: false,
          title:'期达人-视频详情',
          keywords:'',
          content:'期达人-视频详情'
        }
      },
      {
        path: '/calendar/data',
        name:'calendardata',
        component: calendardata,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-日历',
          keywords:'',
          content:'期达人-日历'
        }
      },
      {
        path: '/calendar/event',
        name:'calendarevent',
        component: calendarevent,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-日历',
          keywords:'',
          content:'期达人-日历'
        }
      },
      {
        path: '/column/index',
        name:'columnindex',
        component: columnindex,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-专栏列表',
          keywords:'',
          content:'期达人-专栏详情'
        }
      },
      {
        path: '/column/detail/:id/:type',
        name:'columndetail',
        component: columndetail,
        meta:{
          keepAlive: false,
          title:'期达人-专栏详情',
          keywords:'',
          content:'期达人-专栏详情描述'
        }
      },
      {
        path: '/market/index',
        name:'marketindex',
        component: marketindex,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-行情',
          keywords:'',
          content:'期达人-行情列表'
        }
      },
      {
        path: '/futures/index',
        name:'futuresindex',
        component: futuresindex,
        meta:{
          keepAlive: true,
          showFoot:true,
          title:'期达人-期问',
          keywords:'',
          content:'期达人-期问列表'
        }
      },
      {
        path: '/futures/detail/:id',
        name:'futuresdetail',
        component: futuresdetail,
        meta:{
          keepAlive: false,
          title:'期达人-期问详情',
          keywords:'',
          content:'期达人-期问详情描述'
        }
      },
      {
        path: '/futures/answer/:id',
        name:'answer',
        component: answer,
        meta:{
          keepAlive: false,
          title:'期达人-期问填写回答',
          keywords:'',
          content:'期达人-期问填写回答'
        }
      },
      {
        path: '/futures/reply/:id/:qid',
        name:'futuresreply',
        component: futuresreply,
        meta:{
          keepAlive: false,
          title:'期达人-期问回答详情',
          keywords:'',
          content:'期达人-期问回答详情描述'
        }
      },
      {
        path: '/account/index',
        name:'accountindex',
        component: accountindex,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-开户列表',
          keywords:'',
          content:'期达人-开户列表'
        }
      },
      {
        path: '/account/sywg',
        name:'sywg',
        component: sywg,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-申银万国',
          keywords:'',
          content:'期达人-申银万国'
        }
      },
      {
        path: '/mine/index',
        name:'mineindex',
        component: mineindex,
        meta:{
          keepAlive: false,
          showFoot:true,
          title:'期达人-我的',
          keywords:'',
          content:'期达人-个人中心'
        }
      },
      {
        path: '/mine/notification',
        name:'notification',
        component: notification,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-消息中心',
          keywords:'',
          content:'期达人-消息中心'
        }
      },
      {
        path: '/mine/personal',
        name:'personal',
        component: personal,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-个人信息',
          keywords:'',
          content:'期达人-个人信息'
        }
      },
      {
        path: '/mine/editname',
        name:'editname',
        component: editname,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-修改昵称',
          keywords:'',
          content:'期达人-修改昵称'
        }
      },
      {
        path: '/mine/editdes',
        name:'editdes',
        component: editdes,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-修改描述',
          keywords:'',
          content:'期达人-修改描述'
        }
      },
      {
        path: '/mine/attentions',
        name:'attentions',
        component: attentions,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-我的关注',
          keywords:'',
          content:'期达人-我的关注'
        }
      },
      {
        path: '/mine/fans',
        name:'fans',
        component: fans,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-我的粉丝',
          keywords:'',
          content:'期达人-我的粉丝'
        }
      },
      {
        path: '/mine/asks',
        name:'asks',
        component: asks,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-我的提问',
          keywords:'',
          content:'期达人-我的提问'
        }
      },
      {
        path: '/mine/collects',
        name:'collects',
        component: collects,
        meta:{
          keepAlive: false,
          showFoot:false,
          title:'期达人-我的收藏',
          keywords:'',
          content:'期达人-我的收藏'
        }
      },
      {
        path: '/sign',
        name:'sign',
        component: sign,
        meta:{
          keepAlive: true,
          title:'登录/注册',
          keywords:'',
          content:'登录/注册'
        }
      },
      {
        path: '/registerprotocol',
        name:'registerprotocol',
        component: registerprotocol,
        meta:{
          keepAlive: true,
          title:'注册协议',
          keywords:'',
          content:'注册协议'
        }
      }
    ]
  })
}
