import Vue from 'vue'
import VueRouter from 'vue-router'
import { AuthHeader } from '../services/StorageService'
import store from '../store/index'

const Page404 = () => import('@/views/Page404')

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home"),
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/Profile")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register")
  },
  {
    path: "/oauth2/redirect",
    name: "redirect",
    beforeEnter: (to, from, next) => {
      var token = to.query.token
      var error = to.query.error
      if (token) {
        store.dispatch('auth/fetchOAuth2User', token)
      } 
      if (error) {
        return next({
          path: '/login',
          query: { error: error},
          props: true
        })
      }
    }
  },
  { path: "*", component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/oauth2/redirect']
  const authRequired = !publicPages.includes(to.path)
  const userData = AuthHeader.getAuthData()
  const loggedIn = !!userData
  console.log(loggedIn)
  if (authRequired && !loggedIn) {
    // console.log("must login!")
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (!authRequired && loggedIn) { 
    // console.log("next home!")
    return next('/')
  } else {
    // console.log("next!")
    return next()
  }
})

export default router
