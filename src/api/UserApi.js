import request from '@/utils/request'

// 登录
export function user(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    params: data
  })
}

export function userMessage(id) {
  return request({
    url: '/api/user/data',
    method: 'post',
    params: id
  })
}
