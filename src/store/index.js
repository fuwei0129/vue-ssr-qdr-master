// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import recommend from './recommend/index'
import flash from './flash/index'
import live from './live/index'
import calendar from './calendar/index'
import column from './column/index'
import market from './market/index'
import futures from './futures/index'
import account from './account/index'
import user from './user/index'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules:{
      recommend,
      flash,
      live,
      calendar,
      column,
      market,
      futures,
      account,
      user
    }
  })
}
