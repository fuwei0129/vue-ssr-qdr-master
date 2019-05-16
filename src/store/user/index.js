import http from '../../utils/http'
import api from '../../utils/api'
import { Toast } from 'mint-ui'

export default{
  state: {
    sign:null,
    user:null,
    token:null,
    personalInfo:{}//个人信息（关注量，粉丝量等等）
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getPersonalInfo: state => {
      return state.personalInfo
    }
  },
  mutations: {
    resetUser (state, val){
      state.user = val
      sessionStorage.setItem('user', JSON.stringify(val))
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
    setPersonalInfo (state, data) {
      state.personalInfo = data
    },
    signOut (state) {
      state.sign = null
      state.user = null
      state.token = null
      sessionStorage.removeItem('sig')
      sessionStorage.removeItem('sign')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
  },
  actions: {
    //自动登录
    autoLogin({ commit }, data){
      return http.postmain(api.autoLogin,data).then((response) => {
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
    //获取我的关注量、粉丝量等等
    fetchPersonalInfo({ commit,rootState }, data){
      if(rootState.user){
        return http.postmain(api.getPersonalInfo,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setPersonalInfo',response.data.respparam)
          }else{
            Toast({
              message: response.data.respbase.returnmsg,
              position: 'middle',
              duration: 2000
            })
          }
        })
      }else{
      }
    },
    //注销
    logout({ commit }, data){
      return http.postmain(api.logout,data).then((response) => {
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
    }
  }
}
