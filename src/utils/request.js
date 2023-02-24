import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5 * 1000 // 响应时间
})

// 请求拦截器
service.interceptors.request.use(
  // 发送请求前做什么
  (config) => {
    return config
  },
  // 对发送请求错误后做什么
  (err) => {
    if (err) {
      console.log(err)
    }
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data !== 200) {
      switch (data.code) {
        case -1:
          Message({
            type: 'error',
            message: data.message
          })
          break
      }
    }
    return response.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
