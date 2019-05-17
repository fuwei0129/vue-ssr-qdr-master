import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    accounts: {} // 开户列表
  },
  getters: {
    getAccountList: state => {
      return state.accounts
    }
  },
  mutations: {
    setAccountList (state, data) {
      state.accounts = data
    }
  },
  actions: {
    //获取开户列表
    fetchAccountList({ commit,rootState }, data){
      if(rootState.account.accounts.length>0){
      }else{
        return http.postmain(api.getList,data.model).then((response) => {
          if(response.data.respbase.returncode == '10000'){
            commit('setAccountList', response.data.respparam)
          }else{
            console.log("出错")
          }
        })
      }
    },
  }
}
