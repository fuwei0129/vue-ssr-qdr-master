// router.js
import Vue from 'vue'
import Router from 'vue-router'

import index from '../pages/index/index.vue'
import newsdetail from '../pages/news/detail.vue'
import columndetail from '../pages/column/detail.vue'
import futuresindex from '../pages/futures/index.vue'

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
        path: '/futures/index',
        name:'futuresindex',
        component: futuresindex,
        meta:{
          keepAlive: true,
          title:'期达人-期问',
          content:'期达人-期问列表'
        }
      },
    ]
  })
}
