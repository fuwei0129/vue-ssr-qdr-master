// router.js
import Vue from 'vue'
import Router from 'vue-router'

import index from '../pages/index/index.vue'
import newsdetail from '../pages/news/detail.vue'
import columndetail from '../pages/column/detail.vue'
import marketindex from '../pages/market/index.vue'
import futuresindex from '../pages/futures/index.vue'
import futuresdetail from '../pages/futures/detail.vue'
import futuresreply from '../pages/futures/reply.vue'
import answer from '../pages/futures/answer.vue'

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
          title:'期达人-推荐',
          content:'期达人-推荐'
        }
      },
      {
        path: '/news/detail/:id/:type',
        name:'newsdetail',
        component: newsdetail,
        meta:{
          keepAlive: false,
          title:'期达人-推荐详情',
          content:'期达人-推荐详情描述'
        }
      },
      {
        path: '/column/detail/:id/:type',
        name:'columndetail',
        component: columndetail,
        meta:{
          keepAlive: false,
          title:'期达人-专栏详情',
          content:'期达人-专栏详情描述'
        }
      },
      {
        path: '/market/index',
        name:'marketindex',
        component: marketindex,
        meta:{
          keepAlive: false,
          title:'期达人-行情',
          content:'期达人-行情列表'
        }
      },
      {
        path: '/futures/index',
        name:'futuresindex',
        component: futuresindex,
        meta:{
          keepAlive: true,
          title:'期达人-期问',
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
          content:'期达人-期问填写回答'
        }
      },
      {
        path: '/futures/reply/:id',
        name:'futuresreply',
        component: futuresreply,
        meta:{
          keepAlive: false,
          title:'期达人-期问回答详情',
          content:'期达人-期问回答详情描述'
        }
      },
    ]
  })
}
