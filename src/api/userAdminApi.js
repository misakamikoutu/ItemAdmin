import request from '@/utils/request'

export function userAdmin(data) {
  return request({
    url: '/api/useradmin/data',
    method: 'get',
    params: data
  })
}

export function userAdminInsert(data) {
  return request({
    url: '/api/useradmin/insert',
    method: 'post',
    params: data
  })
}

export function userAdminUpdate(id) {
  return request({
    url: '/api/useradmin/update',
    method: 'post',
    params: id
  })
}

export function userAdminDelete(id) {
  return request({
    url: '/api/useradmin/delete',
    method: 'post',
    params: id
  })
}
