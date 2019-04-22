import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    questionData: [], //期问列表
    page: 1,
    detail: {} // 期问详情
  },
  getters: {
    getQstPage: state => { //页码
      return state.page
    },
    getQuestionData: state => {
      return state.questionData
    }
  },
  mutations: {
    addQstPage (state) {
      state.page++
    },
    setQuestionData (state, data) {
      state.questionData = state.questionData.concat(data)
    }
  },
  actions: {
    //获取期问列表
    fetchQuestions({ commit,rootState }, data){
      if(rootState.futures.questionData.length>0){
      }else{
        return http.postmain(api.getQuestions,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setQuestionData', response.data.respparam)
          }else{
            console.log("出错")
          }
        })
      }
    }
  }
}
