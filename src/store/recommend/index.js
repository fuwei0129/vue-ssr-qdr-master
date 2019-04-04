import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    currentTabIndex: '1', //当前选中的tab项
    banners:[], //banner轮播图
    page: 1,
    news: [], //新闻列表
    detail: {} // 推荐详情
  },
  getters: {
    getCurrentTabIndex: state => {
      return state.currentTabIndex
    },
    getBanners: state => { //轮播图
      return state.banners
    },
    getRecPage: state => { //页码
      return state.page
    },
    getRecNews: state => { //新闻
      return state.news
    },
    getRecDetail: state => {
      return state.detail
    },
  },
  mutations: {
    setCurrentTabIndex (state, val) {
      state.currentTabIndex = val
    },
    setBanners (state, data) {
      state.banners = data
    },
    addRecPage (state) {
      state.page++
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
      return http.postmain(api.recommendDetail,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setRecDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      })
    }
  }
}
