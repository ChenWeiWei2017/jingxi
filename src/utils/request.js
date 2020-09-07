import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base api url + request url
  timeout: 5000
})

// 请求拦截器配置，用于让所有请求头携带token
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 设置token到请求头中，这里的token的key要与后端约定一致
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 遇到异常时的处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截处理
service.interceptors.response.use(
  // 在此处直接处理响应，如果非200(说明有错误)，则直接在这里提醒
  // 如果业务需要获取完整的HTTP信息，如headers、status等，则不作处理直接返回 response => response

  // 这里处理的依据是后端和前端约定好的自定义状态码，定义在返回数据的code中
  response => {
    const res = response.data

    // 定义成功的状态码为200
    if (res.code !== 200) {
      Toast({
        message: res.message || '操作失败',
        icon: 'close',
        duration: 5000
      })

      // token无效或失效 异地登录
      if (res.code === 40001 || res.code === 40002) {
        Dialog.confirm({
          title: '登出提示',
          message: '您的账号已登出，是否重新登录？',
          confirmButtonText: '重新登录'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      return Promise.reject(new Error(res.message || '操作失败'))
    } else {
      // ! 注意，这里返回的是response.data，后面处理时，不需要再通过res.data获取json数据了
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: error.message,
      icon: 'fail',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
