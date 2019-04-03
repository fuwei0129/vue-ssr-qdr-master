import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    lists: [], // 推荐列表
    banners:[], //banner轮播图
    news: [], //新闻列表
    detail: {} // 推荐详情
  },
  getters: {
    getBanners: state => { //轮播图
      return state.banners
    },
    getRecNews: state => { //新闻
      return state.news
    },
    getRecDetail: state => {
      return state.detail
    },
  },
  mutations: {
    setBanners (state, data) {
      state.banners = data
    },
    setRecNews (state, data) {
      state.news = state.news.concat(data)
    },
    setRecDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取推荐列表
    fetchRecommendLists({ commit,rootState }, data){
      if(rootState.recommend.news.length>0){
      }else{
        return http.postmain(api.getNewsRecommend,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setBanners', response.data.respparam.first)
            commit('setRecNews', response.data.respparam.news)
          }else{
            console.log("出错")
          }
        })
      }
    },
    //获取推荐详情
    fetchRecommendDetail({ commit }, data){
      return http.postmain(api.recommendDetails,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setRecDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      })
    }
  }
}
