import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    lists: [], // 推荐列表
    detail: {} // 推荐详情
  },
  getters: {
    getBannerLists: state => { //轮播图
      return state.lists.first
    },
    getRecLists: state => { //新闻
      return state.lists.news
    },
    getRecDetail: state => {
      return state.detail
    },
  },
  mutations: {
    setRecLists (state, data) {
      state.lists = data
    },
    setRecDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取推荐列表
    fetchRecommendLists({ commit }, data){
      return http.postmain(api.getNewsRecommend,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setRecLists', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    },
    //获取推荐详情
    fetchRecommendDetail({ commit }, data){
      return http.postmain(api.recommendDetails,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setRecDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      });
    }
  }
}
