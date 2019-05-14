import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    cpage: 1,
    cddata: [], //财经日历
    epage:1,
    eventData: [] // 财经事件
  },
  getters: {
    getCdPage: state => {
      return state.cpage
    },
    getEventPage: state => {
      return state.epage
    },
    getCdData: state => {
      return state.cddata
    },
    getEventData: state => {
      return state.eventData
    },
  },
  mutations: {
    addCdPage (state) {
      state.cpage++
    },
    addEventPage (state) {
      state.epage++
    },
    resetCdPage (state) {
      state.cpage = 1
    },
    clearCdData (state) {
      state.cddata = []
    },
    setCdData (state, data) {
      state.cddata = state.cddata.concat(data)
    },
    resetEventPage (state) {
      state.epage = 1
    },
    clearEventData (state, data) {
      state.eventData = []
    },
    setEventData (state, data) {
      state.eventData = state.eventData.concat(data)
    }
  },
  actions: {
    //获取财经日历列表
    fetchFCLists({ commit,rootState }, data){
      if(rootState.calendar.cddata.length>0){
      }else{
        return http.postest(api.getFinancialCalendar,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setCdData', response.data.respparam)
          }else{
            console.log("出错")
          }
        })
      }
    },
    //获取财经事件列表
    fetchFNLists({ commit,rootState }, data){
      if(rootState.calendar.eventData.length>0){
      }else{
        return http.postest(api.getFinancialNews,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setEventData', response.data.respparam)
          }else{
            console.log("出错")
          }
        })
      }
    },
  }
}
