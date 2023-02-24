import request from '@/utils/request'

// 获得物品
export function getItem() {
  return request({
    url: '/api/item/data',
    method: 'get'
  })
}
