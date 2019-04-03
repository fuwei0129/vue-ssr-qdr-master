import http from '../../utils/http'
import api from '../../utils/api'

export default{
  state: {
    page: 1,
    columns: [], //专栏列表
    detail: {} // 专栏详情
  },
  getters: {
    getColPage: state => {
      return state.page
    },
    getColumns: state => {
      return state.columns
    },
    getColDetail: state => {
      return state.detail
    },
  },
  mutations: {
    addColPage (state) {
      state.page++
    },
    setColumns (state, data) {
      state.columns = state.columns.concat(data)
    },
    setColDetail (state, data) {
      state.detail = data
    }
  },
  actions: {
    //获取专栏列表
    fetchColumnLists({ commit }, data){
      return http.postmain(api.getColumns,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setColumns', response.data.respparam)
        }else{
          console.log("出错")
        }
      })
    },
    //获取专栏详情
    fetchColumnDetail({ commit }, data){
      return http.postmain(api.columnDetail,data.model).then((response) => {
        if(response.data.respbase.returncode == '10000'){
          commit('setColDetail', response.data.respparam)
        }else{
          console.log("出错")
        }
      })
    }
  }
}
