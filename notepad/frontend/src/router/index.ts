import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import Home from '@/components/Home.vue'
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";


const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: "home",
    component: Home
  },
  {
    path: '/login',
    name: "login",
    component: Login
  },
  {
    path: '/signup',
    name: "signup",
    component: SignUp
  },
  {
    path: "/redir",
    redirect: "/hello"
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
