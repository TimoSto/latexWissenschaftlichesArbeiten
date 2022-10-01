import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from "@/views/HomeView.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomeView
  }
]

const router = new VueRouter({
  routes
})

export default router
