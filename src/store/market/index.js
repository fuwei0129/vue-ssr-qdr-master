import http from '../../utils/http'
import api from '../../utils/api'
// import common from '../../utils/common'
import global from '../../utils/global'

export default{
  state: {
    token: '', // token
    quotes:[] //行情
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getQuotes: state => {
      return state.quotes
    }
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    },
    setQuotes (state, data) {
      state.quotes = data
    }
  },
  actions: {
    getToken({commit}){
      let model = {
        appid:global.appid,
        secret_key:global.secret_key
      }
      return http.get(api.getToken,model).then((response) => {  //获取token
        if(response.data.Err == 0){
          let token = response.data.Data.RepDataToken[0].token
          // common.setCookie("token",token,1)
          commit('setToken', token)
        }else{
          console.log("出错");
        }
      })
    },
    //获取行情列表
    fetchQuotes({ dispatch,commit,rootState },data){
      console.log(rootState.market.quotes.length)
      if(rootState.market.quotes.length>0){
      }else{
        return http.postmarket(api.stkdata,data.model).then((response) => {
          if(response.data.Err == 0){
            commit('setQuotes',response.data.Data.RepDataStkData)
          }else{
            console.log("出错");
          }
        })
      }
    }
  }
}
