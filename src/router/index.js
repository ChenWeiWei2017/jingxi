import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '京西首页'
        },
        component: () => import('@/views/home/index')
      },
      {
        path: 'type',
        name: 'type',
        meta: {
          title: '京西商品分类'
        },
        component: () => import('@/views/type/index')
      },
      {
        path: 'shopping-cart',
        name: 'shopping-cart',
        meta: {
          requireAuth: true,
          title: '购物车'
        },
        component: () => import('@/views/shopping-cart/index')
      },
      {
        path: 'mine',
        name: 'mine',
        meta: {
          requireAuth: true,
          title: '个人中心'
        },
        component: () => import('@/views/mine/index')
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
