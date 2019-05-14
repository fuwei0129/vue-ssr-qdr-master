import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    page: 1,
    lists: [], // 快讯列表
    detail: {} // 快讯详情
  },
  getters: {
    getFlashPage: state => { //页码
      return state.page
    },
    getFlashLists: state => { //快讯
      return state.lists
    },
    getFlashDetail: state => {
      return state.detail
    },
  },
  mutations: {
    addFlashPage (state) {
      state.page++
    },
    setFlashLists (state, data) {
      state.lists = state.lists.concat(data)
    },
    setFlashDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取快讯列表
    fetchFlashLists({ commit,rootState }, data){
      if(rootState.flash.lists.length>0){
      }else{
        return http.postmain(api.getFutures,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setFlashLists', response.data.respparam)
          }else{
            console.log("出错")
          }
        });
      }
    },
    //获取快讯详情
    fetchFlashDetail({ commit }, data){
      return http.postmain(api.futuresDetail,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setFlashDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    }
  }
}
