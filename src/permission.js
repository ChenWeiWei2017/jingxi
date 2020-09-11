import router from './router'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth' // get token from cookie

Toast.allowMultiple()

const whiteList = ['/login', '/auth-redirect'] // 白名单

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '京西商城'

  const hasToken = getToken()

  const shouldLogin = to.meta.requireAuth && !hasToken

  if (shouldLogin) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      Toast({
        message: '请先登录',
        icon: 'warning-o'
      })
      next(`/login?redirect=${to.path}`)
    }
  } else {
    next()
  }
})
