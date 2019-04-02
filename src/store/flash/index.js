import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    lists: [], // 快讯列表
    detail: {} // 快讯详情
  },
  getters: {
    getFlashLists: state => { //快讯
      return state.lists
    },
    getFlashDetail: state => {
      return state.detail
    },
  },
  mutations: {
    setLists (state, data) {
      state.lists = data
    },
    setDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取快讯列表
    fetchFlashLists({ commit }, data){
      return http.postmain(api.getFutures,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setLists', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    },
    //获取快讯详情
    fetchFlashDetail({ commit }, data){
      return http.postmain(api.futuresDetails,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    }
  }
}
