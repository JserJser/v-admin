import Vue from 'vue'
import Router from 'vue-router'
import { SET_PERMISSION_ROUTES } from '@/store/mutation-types'
import { cookie } from 'cookie_js'
import store from './store'

Vue.use(Router)

const Layout = () => import('@/pages/layout/index.vue')
const Login = () => import('@/pages/login/index.vue')
const Index = () => import('@/pages/index/index.vue')
const Error = () => import('@/pages/error/index.vue')
const ResetPassword = () => import('@/pages/reset_password/index.vue')
const ShopManage = () => import('@/pages/user_manage/shop/index.vue')
const MemberManage = () => import('@/pages/user_manage/member/index.vue')
const FrontendCategoryManage = () => import('@/pages/category_manage/frontend_category/index.vue')
const BackendCategoryManage = () => import('@/pages/category_manage/backend_category/index.vue')
const authManage = () => import('@/pages/auth/index.vue')

const whiteList = ['/login']
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Layout,
      name: '首页',
      redirect: '/index',
      children: [
        {
          path: 'index',
          component: Index,
        },
      ],
    },
  ],
})

const asyncRouterMap = [
  {
    path: '/category',
    component: Layout,
    name: '类目管理',
    icon: 'ios-apps',
    children: [
      {
        path: 'frontend',
        component: FrontendCategoryManage,
        name: '前台类目',
        icon: 'ios-paper',
        meta: {
          role: ['user'],
        },
      },
      {
        path: 'backend',
        component: BackendCategoryManage,
        name: '后台类目',
        icon: 'ios-paper',
        meta: {
          role: ['user'],
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    icon: 'ios-paper',
    children: [
      {
        path: 'shop',
        component: ShopManage,
        name: '商家管理',
        icon: 'ios-paper',
        meta: {
          role: ['user'],
        },
      },
      {
        path: 'member',
        component: MemberManage,
        name: '会员管理',
        icon: 'ios-paper',
        meta: {
          role: ['user'],
        },
      },
    ],
  },
  {
    path: '/reset-password',
    component: Layout,
    name: '修改密码',
    icon: 'ios-albums',
    children: [
      {
        path: 'index',
        component: ResetPassword,
        icon: 'ios-paper',
      },
    ],
  },
  {
    path: '/auth',
    component: Layout,
    name: '角色管理',
    icon: 'ios-albums',
    children: [
      {
        path: 'index',
        component: authManage,
        icon: 'ios-paper',
      },
    ],
  },
  {
    path: '/404',
    component: Error,
    name: '404',
    hidden: true,
  },
  {
    path: '*',
    redirect: '/404',
    name: 'no-router',
    hidden: true,
  },
]

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  }
  return true
}

const filterAsyncRouter = (asyncRouter, roles) => {
  const accessedRouters = asyncRouter.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const generateRoutes = roles => {
  let accessedRouters
  if (roles.indexOf('admin') >= 0) {
    accessedRouters = asyncRouterMap
  } else {
    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
  }
  return accessedRouters
}

router.beforeEach((to, from, next) => {
  const userToken = cookie.get('userToken')
  if (userToken && userToken !== 'undefined' && userToken !== 'null') {
    // 判断是否有token
    if (to.path === '/login') {
      next({
        path: '/',
      })
    } else {
      if (store.state.roles.length === 0) {
        store.dispatch('GetUserInfo').then(() => {
          const permissionRoutes = generateRoutes(store.state.roles)
          store.commit(SET_PERMISSION_ROUTES, permissionRoutes)
          router.addRoutes(permissionRoutes)
          next({
            ...to,
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

export default router
