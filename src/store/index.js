// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import recommend from './recommend/index'
import flash from './flash/index'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules:{
      recommend,
      flash
    }
  })
}
