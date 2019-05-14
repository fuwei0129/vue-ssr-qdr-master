import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert("请求失败");
  }
  return res
}

export default {
  get (url, params) {
    var urlstr="";
    for (var variable in params) {
      urlstr+="&"+variable+"="+params[variable];
    }
    url=url+"?"+urlstr;
    return axios({
      method: 'get',
      baseURL: 'http://gw.yundzh.com',
      url,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencode'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postmarket (url,data) {
    var urlstr="";
    for (var variable in data) {
      urlstr+="&"+variable+"="+data[variable];
    }
    url=url+"?"+urlstr;
    return axios({
      method: 'post',
      baseURL: 'http://gw.yundzh.com',
      url,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencode'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postvideo (url,data) {
    return axios({
      method: 'post',
      baseURL: 'http://testvideoapi.qdr8.com',
      // baseURL: 'http://videoapi.qdr8.com',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postlog (url,data){
    return axios({
      method: 'post',
      baseURL: 'http://testlogapi.qdr8.com/',
      // baseURL: 'http://api.qdr8.com:8102',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postchat (url,data){
    return axios({
      method: 'post',
      baseURL: 'http://testchatapi.qdr8.com/',
      // baseURL: 'http://api.qdr8.com:8101',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postest (url,data){
    return axios({
      method: 'post',
      baseURL: 'http://172.16.1.185:8119/',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postmain (url,data){
    return axios({
      method: 'post',
      baseURL: 'http://testqdradminapi.qdr8.com/',
      // baseURL: 'http://qdradminapi.qdr8.com/',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
