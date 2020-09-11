import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/v1/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/v1/userinfo',
    method: 'get'
  })
}
