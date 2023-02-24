import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const route = {
  user: ['用户管理', '用户管理'],
  commodity: ['商品管理', '商品管理'],
  login: ['登录'],
  register: ['注册']
}

const routes = [
  {
    path: '/',
    meta: {
      value: null,
      value2: null
    },
    redirect: '/login'
  },
  {
    path: '/jump',
    name: 'MyJump',
    component: () => import('@/components/Jump/Jump')
  },
  {
    path: '/home',
    name: 'MyUser',
    meta: {
      value: null,
      value2: null
    },
    component: () => import('@/views/MyUser/MyUser')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      value: route.login[0],
      value2: null
    },
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      value: route.register[0],
      value2: null
    },
    component: () => import('@/views/Registener/Registener.vue')
  },
  {
    path: '/useradmin',
    name: 'MyUserAdmin',
    meta: {
      value: route.user[0],
      value2: route.user[1]
    },
    component: () => import('@/views/UserAdmin/UserAdmin')
  },
  {
    path: '/commodity',
    name: 'MyCommodity',
    meta: {
      value: route.commodity[0],
      value2: route.commodity[1]
    },
    component: () => import('@/views/Commodity/CommodityAdmin')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果是登录页面可以跳转
  if (to.path === '/login') return next()
  const token = localStorage.getItem('token')
  if (token == null) {
    return next('/login')
  }
  next()
})

export default router
