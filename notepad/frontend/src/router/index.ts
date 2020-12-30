import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import Home from '@/components/Home.vue'
import { defineComponent } from 'vue'


const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: "home",
    component: Home
  }, {
    path: "/redir",
    redirect: "/hello"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router