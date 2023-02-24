import request from '@/utils/request'

export function articleData(data) {
  return request({
    url: '/api/article/data',
    method: 'get',
    params: data
  })
}

export function articleInsert(data) {
  return request({
    url: '/api/article/insert',
    method: 'post',
    params: data
  })
}

export function articleUpdate(data) {
  return request({
    url: '/api/article/update',
    method: 'post',
    params: data
  })
}

export function articleDelete(data) {
  return request({
    url: '/api/article/delete',
    method: 'post',
    params: data
  })
}
