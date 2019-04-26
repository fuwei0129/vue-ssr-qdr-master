import http from '../../utils/http'
import api from '../../utils/api'
import { Toast } from 'mint-ui'

export default{
  state: {
    signIndex:1, //当前是登录面板还是注册面板
    sign:null,
    user:null,
    token:null
  },
  getters: {
    getSignIndex: state => {
      return state.signIndex
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setSignIndex (state, val) {
      state.signIndex = val
    },
    setUser (state, val) {
      let { memberSign,memberInfo,memberToken } = val
      state.sign = memberSign
      state.user = memberInfo
      state.token = memberToken
      sessionStorage.setItem('sign', memberSign)
      sessionStorage.setItem('user', JSON.stringify(memberInfo))
      sessionStorage.setItem('token', memberToken)
    },
    signOut (state) {
      state.sign = null
      state.user = null
      state.token = null
      sessionStorage.removeItem('sign')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
  },
  actions: {
    //自动登录
    autoLogin({ commit }, data){
      return http.postaccount(api.autoLogin,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setUser', response.data.respparam)
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
    //注销
    logout({ commit }, data){
      return http.postaccount(api.logout,data).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('signOut')
        }else{
          Toast({
            message: response.data.respbase.returnmsg,
            position: 'middle',
            duration: 2000
          })
        }
      })
    },
  }
}
