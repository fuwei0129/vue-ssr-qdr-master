import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    lists: [], // 直播列表
    livebanners:[], //直播列表的轮播图
    detail: {} // 直播详情
  },
  getters: {
    getLives: state => {
      return state.lists
    },
    getLiveBanners: state => {
      return state.livebanners
    },
    getLiveDetail: state => {
      return state.detail
    },
  },
  mutations: {
    setLives (state, data) {
      state.lists = state.lists.concat(data)
    },
    setLiveBanners (state, data) {
      state.livebanners = data
    },
    setLiveDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取直播列表
    fetchLives({ commit }, data){
      return http.postmain(api.lives,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setLives', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    },
    //获取直播列表的轮播图
    fetchLiveBanners({ commit }, data){
      return http.postmain(api.liveBanners,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setLiveBanners', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    },
  }
}
