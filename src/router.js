import { createRouter, createWebHistory } from 'vue-router'
import LogIn from './views/LogIn.vue'
import SignUp from './views/SignUp.vue'
import HomeView from './views/Home.vue'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/home',
    name: "home",
    component: HomeView
  },
  {
    path: '/auth/login',
    name: "login",
    component: LogIn
  },
  {
    path: '/auth/signup',
    name: "signup",
    component: SignUp
  },
  {
    path: '/account',
    name: "account",
    component: () => import(/* webpackChunkName: "account" */ './views/Account.vue') // other form of importing
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
