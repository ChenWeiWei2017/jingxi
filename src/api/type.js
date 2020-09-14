// 分类页的API
import request from '@/utils/request'

export function getAllTypes() {
  return request({
    url: '/api/v1/type',
    method: 'get'
  })
}

export function getGoodsByType(typeId) {
  return request({
    url: '/api/v1/type/goods',
    method: 'get',
    params: { typeId }
  })
}
