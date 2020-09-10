// 首页的一些api
import request from '@/utils/request'

export function bannerList() {
  return request({
    url: '/api/v1/home/banners',
    method: 'GET'
  })
}
