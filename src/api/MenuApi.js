import request from '@/utils/request'

export function menuData() {
  return request({
    url: '/api/menu',
    method: 'get'
  })
}
